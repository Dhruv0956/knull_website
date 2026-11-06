import React, { useEffect, useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { LAYERS, SECTION_COPY } from './neural/layers';
import { CARD_SIDE, computeLayout, createNeuralRenderer } from './neural/network';

const CYCLE_STEP_MS = 3400;

// Desktop card placement around the stack, aligned with each plane (see PLANE_Y in network.js).
const CARD_POSITION = [
  'lg:right-0 lg:bottom-0',
  'lg:left-0 lg:top-[62%] lg:-translate-y-1/2',
  'lg:right-0 lg:top-[38%] lg:-translate-y-1/2',
  'lg:left-0 lg:top-0',
];

function tint(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function NeuralArchitecture() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const rendererRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [cycling, setCycling] = useState(false);
  const [connectors, setConnectors] = useState([]);
  const [canvasFailed, setCanvasFailed] = useState(false);

  const active = hovered ?? selected;

  // Renderer lifecycle: size tracking, connector geometry, and pausing while offscreen or in a hidden tab.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = createNeuralRenderer(canvasRef.current, { reducedMotion: reduced });
    if (!renderer) {
      setCanvasFailed(true);
      return undefined;
    }
    rendererRef.current = renderer;

    const measure = () => {
      const stage = stageRef.current.getBoundingClientRect();
      const c = canvasWrapRef.current.getBoundingClientRect();
      if (!c.width || !c.height) return;
      renderer.resize(c.width, c.height);
      // Connectors only when the cards flank the stack (desktop); stacked cards below need none.
      if (getComputedStyle(cardRefs.current[0]).position !== 'absolute') {
        setConnectors([]);
        return;
      }
      const layout = computeLayout(c.width, c.height);
      setConnectors(
        LAYERS.map((_, i) => {
          const card = cardRefs.current[i].getBoundingClientRect();
          const left = CARD_SIDE(i) === 'left';
          const anchor = layout.regions[i][CARD_SIDE(i)];
          const x1 = c.left - stage.left + anchor.x + (left ? -6 : 6);
          const y1 = c.top - stage.top + anchor.y;
          const x2 = (left ? card.right : card.left) - stage.left;
          const y2 = card.top - stage.top + card.height / 2;
          const mx = (x1 + x2) / 2;
          return { d: `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`, x1, y1, x2, y2 };
        })
      );
    };

    let visible = false;
    const sync = () => renderer.setRunning(visible && !document.hidden);
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(sectionRef.current);
    document.addEventListener('visibilitychange', sync);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.setFocus(selected, hovered);
  }, [selected, hovered]);

  // Optional walkthrough: Input → Processing → Bio-neural interface → Emotional learning.
  useEffect(() => {
    if (!cycling) return undefined;
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      if (step < LAYERS.length) {
        setSelected(step);
      } else {
        setCycling(false);
        setSelected(null);
      }
    }, CYCLE_STEP_MS);
    return () => clearInterval(id);
  }, [cycling]);

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !rendererRef.current) return;
    const r = canvasWrapRef.current.getBoundingClientRect();
    rendererRef.current.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const selectLayer = (i) => {
    setCycling(false);
    setSelected((s) => (s === i ? null : i));
  };

  const caption =
    active == null
      ? 'Idle activity. Select a layer to focus its region of the network.'
      : `Layer ${LAYERS[active].number}: ${LAYERS[active].focusNote}`;

  return (
    <section
      id="building"
      ref={sectionRef}
      aria-labelledby="building-heading"
      className="py-28 md:py-36 bg-[#0E0E10] border-b border-[#27272A] overflow-hidden relative"
    >
      <div className="absolute inset-x-0 top-1/3 h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(200,230,58,0.05),transparent_65%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 md:mb-14 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">{SECTION_COPY.eyebrow}</span>
          </div>
          <h2
            id="building-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#F8F7F2] leading-[0.95]"
          >
            {SECTION_COPY.heading[0]} <span className="font-serif italic font-normal">{SECTION_COPY.heading[1]}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed">{SECTION_COPY.intro}</p>
        </div>

        {/* Live caption and walkthrough control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <p id="neural-caption" aria-live="polite" className="text-xs font-mono text-[#A1A1AA] leading-relaxed max-w-xl min-h-[2.5em]">
            {caption}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <ol className="hidden md:flex items-center gap-1.5 font-mono text-[10px]" aria-hidden="true">
              {LAYERS.map((l, i) => (
                <li
                  key={l.id}
                  className="px-1.5 py-0.5 rounded border transition-colors duration-300"
                  style={{
                    color: selected === i ? l.color : '#52525B',
                    borderColor: selected === i ? tint(l.color, 0.4) : '#27272A',
                  }}
                >
                  {l.number}
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => {
                if (!cycling) setSelected(0);
                setCycling(!cycling);
              }}
              aria-pressed={cycling}
              className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#121215] px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-[#F8F7F2] hover:border-[#3F3F46] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C8E63A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E10]"
            >
              {cycling ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {cycling ? 'Stop walkthrough' : 'Trace the proposed flow'}
            </button>
          </div>
        </div>

        {/* Stage: the stacked network in the centre, layer cards flanking it on desktop, joined by connector lines */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => rendererRef.current?.setPointer(0, 0)}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:block lg:h-[920px]"
        >
          <div ref={canvasWrapRef} className="relative h-[600px] md:h-[760px] md:col-span-2 lg:absolute lg:inset-y-0 lg:left-[25%] lg:right-[25%] lg:h-auto">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Illustration of Knull's proposed four-layer neural architecture, rising from a square input base through neural processing and a proposed bio-neural interface to emotional neural learning, shaped as two brain hemispheres at the top."
              className="absolute inset-0 w-full h-full"
            />
            {canvasFailed && (
              <p className="absolute inset-0 flex items-center justify-center text-center px-6 text-sm text-[#71717A]">
                The interactive illustration isn't available in this browser. The four layers below describe the architecture.
              </p>
            )}
          </div>

          <svg className="pointer-events-none absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
            {connectors.map((c, i) => {
              const on = active === i;
              const color = LAYERS[i].color;
              return (
                <g key={LAYERS[i].id}>
                  <path
                    d={c.d}
                    fill="none"
                    stroke={on ? color : '#3F3F46'}
                    strokeOpacity={on ? 0.9 : 0.7}
                    strokeWidth="1"
                    strokeDasharray={on ? '4 4' : undefined}
                    className={on ? 'motion-safe:animate-[neural-dash_0.9s_linear_infinite]' : ''}
                  />
                  <circle cx={c.x1} cy={c.y1} r="3" fill={on ? color : '#52525B'} />
                  <circle cx={c.x2} cy={c.y2} r="2.5" fill={on ? color : '#3F3F46'} />
                </g>
              );
            })}
          </svg>

          {LAYERS.map((layer, i) => {
            const isSelected = selected === i;
            const isActive = active === i;
            return (
              <button
                key={layer.id}
                ref={(el) => (cardRefs.current[i] = el)}
                type="button"
                aria-pressed={isSelected}
                aria-describedby="neural-caption"
                onClick={() => selectLayer(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(null)}
                onFocus={(e) => e.target.matches(':focus-visible') && setHovered(i)}
                onBlur={() => setHovered(null)}
                className={`relative z-10 lg:absolute lg:w-[calc(25%-28px)] flex flex-col justify-start text-left rounded-2xl border p-5 sm:p-6 transition-[border-color,background-color,box-shadow] duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C8E63A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E10] ${CARD_POSITION[i]}`}
                style={{
                  borderColor: isActive ? tint(layer.color, 0.55) : '#27272A',
                  background: isSelected ? `linear-gradient(180deg, ${tint(layer.color, 0.08)}, #121215 65%)` : '#121215',
                  boxShadow: isSelected ? `0 20px 50px ${tint(layer.color, 0.08)}` : 'none',
                }}
              >
                <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-4">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase whitespace-nowrap" style={{ color: layer.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: layer.color }} />
                    Layer {layer.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#71717A] border border-[#27272A] rounded-full px-2 py-0.5 whitespace-nowrap">
                    {layer.status}
                  </span>
                </span>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-2">{layer.title}</span>
                <span className="block text-lg font-[550] text-[#F8F7F2] leading-snug tracking-[-0.01em]">{layer.headline}</span>
                <span className="block mt-2 text-sm text-[#A1A1AA] leading-relaxed">{layer.description}</span>
              </button>
            );
          })}
        </div>

        {/* Closing research statement */}
        <div className="mt-20 md:mt-24 pt-10 border-t border-[#27272A] grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <span className="block text-xs font-mono uppercase tracking-widest text-[#71717A] mb-4">{SECTION_COPY.closingEyebrow}</span>
            <p className="text-2xl sm:text-3xl font-[550] tracking-[-0.02em] text-[#F8F7F2] leading-tight">{SECTION_COPY.closing}</p>
          </div>
          <dl className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 self-end">
            {SECTION_COPY.timeline.map((item, i) => (
              <div key={item.label} className="rounded-2xl border border-[#27272A] bg-[#121215] p-5">
                <dt className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                  <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#C8E63A]' : 'bg-[#52525B]'}`} />
                  {item.label}
                </dt>
                <dd className="mt-2 text-lg font-[550] text-[#F8F7F2]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
