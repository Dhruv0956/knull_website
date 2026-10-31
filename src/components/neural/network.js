// Canvas renderer for the four-region neural architecture.
// Topology is generated from a fixed seed, so the same canvas size always yields the same network.
import { LAYERS } from './layers';

const TAU = Math.PI * 2;
const REGION_COLORS = LAYERS.map((l) => l.color);
const BIO_COLOR = LAYERS[2].accent;
const PATTERN_COLORS = ['#6EE7B7', '#FDBA74', '#A5B4FC'];
const PATTERN_NAMES = ['α', 'β', 'γ'];
const IVORY = '#F8F7F2';
const MAX_PULSES = 160;

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

// Region placement shared with the section so connector lines land on the right region.
export function computeLayout(w, h) {
  const compact = w / h < 1.35;
  const spots = compact
    ? [[0.27, 0.27], [0.73, 0.27], [0.73, 0.73], [0.27, 0.73]]
    : [[0.125, 0.5], [0.375, 0.46], [0.625, 0.52], [0.875, 0.47]];
  const rw = compact ? w * 0.2 : w * 0.105;
  const rh = compact ? h * 0.19 : h * 0.3;
  const regions = spots.map(([x, y]) => {
    const cx = x * w;
    const cy = y * h;
    return { cx, cy, rw, rh, top: { x: cx, y: cy - rh - 18 }, bottom: { x: cx, y: cy + rh + 18 } };
  });
  return { w, h, compact, regions };
}

function makeDendrites(rng, len, branches, depth, steps, curl) {
  const segs = [];
  const grow = (x, y, ang, l, d) => {
    let px = x;
    let py = y;
    let a = ang;
    for (let s = 0; s < steps; s++) {
      a += (rng() - 0.5) * curl;
      const nx = px + (Math.cos(a) * l) / steps;
      const ny = py + (Math.sin(a) * l) / steps;
      segs.push(px, py, nx, ny);
      px = nx;
      py = ny;
    }
    if (d > 0) {
      grow(px, py, a - 0.45 - rng() * 0.3, l * 0.62, d - 1);
      grow(px, py, a + 0.45 + rng() * 0.3, l * 0.62, d - 1);
    }
  };
  for (let b = 0; b < branches; b++) grow(0, 0, (b / branches) * TAU + rng() * 0.8, len * (0.7 + rng() * 0.6), depth);
  return segs;
}

export function buildNetwork(layout) {
  const rng = mulberry32(0x6b6e756c);
  const { regions, compact } = layout;
  const k = compact ? 0.75 : 1;
  const nodes = [];
  const edges = [];
  const seen = new Set();
  const d2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  const nearest = (n, pool, count) =>
    pool.filter((p) => p !== n).sort((p, q) => d2(n, p) - d2(n, q)).slice(0, count);

  const addNode = (region, x, y, o = {}) => {
    const kind = o.kind || 'art';
    const n = {
      i: nodes.length,
      x,
      y,
      region,
      kind,
      z: rng(),
      r: o.r ?? (1.5 + rng() * 1.3) * k,
      cluster: o.cluster ?? -1,
      group: o.group ?? -1,
      phase: rng() * TAU,
      dend:
        kind === 'bio'
          ? makeDendrites(rng, layout.regions[2].rh * 0.26 * k, compact ? 3 : 4, 2, 3, 0.7)
          : makeDendrites(rng, (7 + rng() * 6) * k, compact ? 2 : 3, compact ? 0 : 1, 2, 0.5),
    };
    nodes.push(n);
    return n;
  };

  const addEdge = (a, b, kind, bend = (rng() - 0.5) * 0.35) => {
    const key = a.i < b.i ? `${a.i}-${b.i}` : `${b.i}-${a.i}`;
    if (seen.has(key)) return -1;
    seen.add(key);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    edges.push({
      a: a.i,
      b: b.i,
      kind,
      ra: a.region,
      rb: b.region,
      cx: (a.x + b.x) / 2 - dy * bend,
      cy: (a.y + b.y) / 2 + dx * bend,
      len: len * (1 + Math.abs(bend) * 0.6),
    });
    return edges.length - 1;
  };

  // Region 01: input. Loose columns so arriving signals settle into an ordered pattern.
  const R0 = regions[0];
  const cols = (compact ? [4, 4, 3] : [5, 6, 5]).map((count, c) => {
    const x = R0.cx + [-0.45, 0.1, 0.65][c] * R0.rw;
    return Array.from({ length: count }, (_, j) =>
      addNode(0, x + (rng() - 0.5) * R0.rw * 0.18, R0.cy + ((j + 0.5) / count - 0.5) * 1.7 * R0.rh + (rng() - 0.5) * 10)
    );
  });
  cols.forEach((col, c) => {
    if (c < cols.length - 1) col.forEach((n) => nearest(n, cols[c + 1], 2).forEach((m) => addEdge(n, m, 'syn')));
    col.forEach((n, j) => j > 0 && rng() < 0.35 && addEdge(col[j - 1], n, 'syn', 0.3));
  });
  const streams = cols[0].map((n) => {
    const y0 = n.y + (rng() - 0.5) * R0.rh * 0.7;
    return { node: n.i, x0: 0, y0, cx: n.x * 0.45, cy: y0 + (n.y - y0) * 0.15, x1: n.x - n.r - 2, y1: n.y };
  });

  // Region 02: four sub-clusters with dense internal wiring and sparser links between them.
  const R1 = regions[1];
  const offsets = [[-0.55, -0.4], [0.5, -0.5], [-0.42, 0.52], [0.55, 0.42]];
  const clusters = offsets.map(([ox, oy], c) => {
    const ccx = R1.cx + ox * R1.rw;
    const ccy = R1.cy + oy * R1.rh;
    return Array.from({ length: compact ? 6 : 11 }, () => {
      const a = rng() * TAU;
      const rr = Math.sqrt(rng());
      return addNode(1, ccx + Math.cos(a) * rr * R1.rw * 0.42, ccy + Math.sin(a) * rr * R1.rh * 0.36, { cluster: c });
    });
  });
  clusters.forEach((cl) => cl.forEach((n) => nearest(n, cl, 3).forEach((m) => addEdge(n, m, 'syn'))));
  const clusterLinks = clusters.map(() => clusters.map(() => []));
  for (let a = 0; a < 4; a++) {
    for (let b = a + 1; b < 4; b++) {
      for (let j = 0; j < 2; j++) {
        const n = clusters[a][Math.floor(rng() * clusters[a].length)];
        const m = nearest(n, clusters[b], 1)[0];
        const e = addEdge(n, m, 'syn', (rng() - 0.5) * 0.5);
        if (e >= 0) {
          clusterLinks[a][b].push([e, 1]);
          clusterLinks[b][a].push([e, -1]);
        }
      }
    }
  }

  // Region 03: artificial lattice on one side, biology-inspired neurons on the other, a proposed interface between.
  // In the compact snake layout the biological side faces region 04, so the halves swap.
  const R2 = regions[2];
  const side = compact ? -1 : 1;
  const membraneX = R2.cx;
  const art = [];
  const ac = compact ? 3 : 4;
  for (let c = 0; c < ac; c++) {
    for (let j = 0; j < ac; j++) {
      const x = R2.cx - side * (R2.rw * (0.22 + (c / (ac - 1)) * 0.72)) + (rng() - 0.5) * 6;
      const y = R2.cy + ((j + 0.5) / ac - 0.5) * 1.65 * R2.rh + (rng() - 0.5) * 8;
      art.push(addNode(2, x, y, { kind: 'art' }));
    }
  }
  art.forEach((n) => nearest(n, art, 3).forEach((m) => addEdge(n, m, 'art', 0)));
  const bio = [];
  for (let tries = 0; bio.length < (compact ? 4 : 6) && tries < 200; tries++) {
    const x = R2.cx + side * R2.rw * (0.3 + rng() * 0.62);
    const y = R2.cy + (rng() - 0.5) * 1.6 * R2.rh;
    const c = { x, y };
    if (bio.every((b) => d2(b, c) > (R2.rh * 0.42) ** 2)) bio.push(addNode(2, x, y, { kind: 'bio', r: (3 + rng() * 1.6) * k }));
  }
  bio.forEach((n) => nearest(n, bio, 2).forEach((m) => addEdge(n, m, 'axon', (rng() < 0.5 ? -1 : 1) * (0.35 + rng() * 0.25))));
  const bridges = art
    .slice()
    .sort((p, q) => Math.abs(p.x - membraneX) - Math.abs(q.x - membraneX))
    .slice(0, compact ? 3 : 4)
    .map((n) => addEdge(n, nearest(n, bio, 1)[0], 'bridge', (rng() - 0.5) * 0.25))
    .filter((e) => e >= 0);

  // Region 04: an organic, densely recurrent cluster split into three interacting groups.
  const R3 = regions[3];
  const emo = [];
  for (let tries = 0; emo.length < (compact ? 30 : 58) && tries < 2000; tries++) {
    const a = rng() * TAU;
    const rr = Math.sqrt(rng());
    const x = R3.cx + Math.cos(a) * rr * R3.rw * (0.92 + 0.12 * Math.sin(3 * a));
    const y = R3.cy + Math.sin(a) * rr * R3.rh * (0.9 + 0.1 * Math.cos(2 * a));
    const c = { x, y };
    if (emo.every((m) => d2(m, c) > (R3.rw * (compact ? 0.15 : 0.11)) ** 2)) {
      emo.push(addNode(3, x, y, { group: Math.floor(((a + Math.PI) / TAU) * 3) % 3 }));
    }
  }
  const emoR = Math.max(R3.rw, R3.rh);
  emo.forEach((n) => {
    const dist = Math.hypot(n.x - R3.cx, n.y - R3.cy) / emoR;
    const ang = Math.atan2(n.y - R3.cy, n.x - R3.cx);
    n.patterns = [dist * TAU * 1.1, ang + dist * TAU * 0.8, (n.group * TAU) / 3 + dist * 0.6];
    n.dist = dist;
    nearest(n, emo, 4).forEach((m) => addEdge(n, m, 'emo'));
  });

  // Forward links between regions, plus feedback arcs from region 04 back to 02 and 01.
  const l1Out = cols[cols.length - 1];
  const l2All = clusters.flat();
  const toward = (pool, target, count) => pool.slice().sort((p, q) => d2(p, target) - d2(q, target)).slice(0, count);
  const center = (R) => ({ x: R.cx, y: R.cy });
  const artCenter = { x: R2.cx - side * R2.rw * 0.6, y: R2.cy };
  const inter = [
    ...toward(l1Out, center(R1), 3).map((n) => addEdge(n, nearest(n, l2All, 1)[0], 'inter')),
    ...toward(l2All, artCenter, 3).map((n) => addEdge(n, nearest(n, art, 1)[0], 'inter')),
    ...toward(bio, center(R3), 2).map((n) => addEdge(n, nearest(n, emo, 1)[0], 'inter', 0.2)),
  ].filter((e) => e >= 0);
  const feedback = [
    ...toward(emo, center(R1), 2).map((n) => addEdge(n, nearest(n, l2All, 1)[0], 'feedback', compact ? 0.18 : 0.32)),
    addEdge(toward(emo, center(R0), 1)[0], nearest(center(R0), cols[1], 1)[0], 'feedback', compact ? 0.12 : 0.22),
  ].filter((e) => e >= 0);

  const adj = nodes.map(() => []);
  edges.forEach((e, idx) => {
    adj[e.a].push({ e: idx, dir: 1, other: e.b });
    adj[e.b].push({ e: idx, dir: -1, other: e.a });
  });

  return {
    nodes,
    edges,
    adj,
    streams,
    clusters,
    clusterLinks,
    art,
    bio,
    bridges,
    emo,
    inter,
    feedback,
    membraneX,
    emoCenter: { x: R3.cx, y: R3.cy },
    byRegion: [0, 1, 2, 3].map((r) => nodes.filter((n) => n.region === r)),
  };
}

const glowCache = new Map();
function glow(color) {
  if (glowCache.has(color)) return glowCache.get(color);
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, rgba(color, 0.95));
  grad.addColorStop(0.22, rgba(color, 0.4));
  grad.addColorStop(1, rgba(color, 0));
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  glowCache.set(color, c);
  return c;
}

export function createNeuralRenderer(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rng = Math.random;
  let layout;
  let net;
  let act; // decaying activation per node
  let px;
  let py;
  let dpr = 1;
  let raf = 0;
  let running = false;
  let last = 0;
  let t = 0;
  let pulses = [];
  let particles = [];
  let events = [];
  let membraneHits = [];
  let membraneFlash = 0;
  let selected = null;
  let hover = null;
  const weights = [1, 1, 1, 1];
  const drive = [0.2, 0.2, 0.2, 0.2];
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const timers = { spike: 0.2, stream: 0, l2: 1.2, l3a: 1.5, l3b: 4, l3s: 3, l4: 0, pattern: 0 };

  const focus = () => (hover ?? selected);
  const targetWeight = (r) => {
    const f = focus();
    if (f == null) return 1;
    if (r === f) return 1;
    return hover != null ? 0.4 : 0.26;
  };
  const targetDrive = (r) => {
    const f = focus();
    if (f == null) return 0.2;
    return r === f ? 1 : 0.1;
  };
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const at = (delay, fn) => events.push({ at: t + delay, fn });
  const edgeWeight = (e) => Math.max(weights[e.ra], weights[e.rb]);

  function resize(w, h) {
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    if (layout && layout.w === w && layout.h === h && dpr === nextDpr) return;
    dpr = nextDpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    layout = computeLayout(w, h);
    net = buildNetwork(layout);
    act = new Float32Array(net.nodes.length);
    px = new Float32Array(net.nodes.length);
    py = new Float32Array(net.nodes.length);
    pulses = [];
    particles = [];
    events = [];
    membraneHits = [];
    if (reducedMotion) drawStatic();
    else if (!running) draw();
  }

  // ---- signal mechanics ----

  function spawn(e, dir, o = {}) {
    if (pulses.length >= MAX_PULSES) return;
    const edge = net.edges[e];
    const from = dir > 0 ? edge.a : edge.b;
    pulses.push({
      e,
      dir,
      t: 0,
      speed: o.speed ?? (edge.kind === 'axon' ? 70 : edge.kind === 'emo' ? 110 : 150),
      color: o.color ?? (net.nodes[from].kind === 'bio' ? BIO_COLOR : REGION_COLORS[net.nodes[from].region]),
      budget: o.budget ?? 0,
      chain: o.chain ?? [],
      onArrive: o.onArrive,
      side: Math.sign(net.nodes[from].x - net.membraneX),
    });
  }

  function spread(n, budget, fromEdge, color) {
    const region = net.nodes[n].region;
    const options = net.adj[n].filter(
      (o) => o.e !== fromEdge && net.edges[o.e].kind !== 'feedback' && net.nodes[o.other].region >= region
    );
    for (let j = 0; j < 2 && options.length; j++) {
      if (j > 0 && rng() < 0.45) break;
      const o = options.splice(Math.floor(rng() * options.length), 1)[0];
      spawn(o.e, o.dir, { budget: budget - 1, color });
    }
  }

  function fire(n, strength, budget) {
    act[n] = Math.max(act[n], strength);
    if (budget > 0) spread(n, budget, -1);
  }

  function burst(list, strength) {
    list.forEach((n) => at(rng() * 0.25, () => (act[n.i] = Math.max(act[n.i], strength))));
  }

  function route(from, to) {
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    const backward = from > to;
    const start = pick(net.byRegion[from]).i;
    const prev = new Map([[start, null]]);
    const queue = [start];
    let goal = -1;
    while (queue.length) {
      const n = queue.shift();
      if (net.nodes[n].region === to) {
        goal = n;
        break;
      }
      for (const o of net.adj[n]) {
        const r = net.nodes[o.other].region;
        if (prev.has(o.other) || r < lo || r > hi) continue;
        if (!backward && net.edges[o.e].kind === 'feedback') continue;
        prev.set(o.other, [n, o.e, o.dir]);
        queue.push(o.other);
      }
    }
    if (goal < 0) return;
    const path = [];
    for (let n = goal; prev.get(n); n = prev.get(n)[0]) path.unshift([prev.get(n)[1], prev.get(n)[2]]);
    act[start] = 1;
    const [e, dir] = path[0];
    spawn(e, dir, { chain: path.slice(1), speed: 320, color: REGION_COLORS[to], onArrive: () => fire(goal, 1, 2) });
  }

  // ---- region behaviours ----

  function episodeL2(strength) {
    const src = Math.floor(rng() * 4);
    burst(net.clusters[src], strength);
    const others = [0, 1, 2, 3].filter((c) => c !== src).sort(() => rng() - 0.5).slice(0, 2);
    at(0.35, () =>
      others.forEach((c) => {
        let reached = false;
        net.clusterLinks[src][c].forEach(([e, dir]) =>
          spawn(e, dir, {
            onArrive: () => {
              if (!reached) burst(net.clusters[c], 0.5 * strength);
              reached = true;
            },
          })
        );
      })
    );
    // One interpretation wins and is passed on; the other fades.
    at(1.5, () => burst(net.clusters[others[0]], strength));
    if (strength > 0.8) {
      at(1.8, () =>
        net.inter
          .filter((e) => net.edges[e].ra === 1)
          .forEach((e) => spawn(e, 1, { budget: 2, color: REGION_COLORS[1] }))
      );
    }
  }

  function bridgePulse(dir) {
    if (!net.bridges.length) return;
    const e = pick(net.bridges);
    const edge = net.edges[e];
    act[dir > 0 ? edge.a : edge.b] = 0.9;
    spawn(e, dir, { budget: dir > 0 ? 2 : 1, speed: 95 });
  }

  function syncL3() {
    membraneFlash = 1;
    net.byRegion[2].forEach((n) =>
      at((Math.abs(n.x - net.membraneX) / layout.regions[2].rw) * 0.6, () => (act[n.i] = Math.max(act[n.i], 0.85)))
    );
  }

  function flashL4() {
    net.emo.forEach((n) => at(n.dist * 0.35, () => (act[n.i] = 1)));
  }

  function feedbackL4() {
    net.feedback.forEach((e) => spawn(e, 1, { budget: 1, speed: 210, color: PATTERN_COLORS[timers.pattern] }));
  }

  function behave(dt) {
    if ((timers.spike -= dt) <= 0) {
      timers.spike = 0.3 + rng() * 0.4;
      const r = pick([0, 1, 2, 3].flatMap((r) => Array(1 + Math.round(drive[r] * 4)).fill(r)));
      const n = pick(net.byRegion[r]);
      fire(n.i, 0.75, 1 + (drive[r] > 0.5 ? 1 : 0));
    }

    timers.stream += dt * (0.7 + 5 * drive[0]);
    while (timers.stream >= 1) {
      timers.stream -= 1;
      particles.push({ s: Math.floor(rng() * net.streams.length), t: 0, speed: 0.45 + rng() * 0.35 });
    }

    if ((timers.l2 -= dt) <= 0) {
      timers.l2 = drive[1] > 0.5 ? 2.4 : 6.5;
      episodeL2(drive[1] > 0.5 ? 1 : 0.55);
    }

    if ((timers.l3a -= dt) <= 0) {
      timers.l3a = drive[2] > 0.5 ? 1.2 : 4.5;
      bridgePulse(1);
    }
    if ((timers.l3b -= dt) <= 0) {
      timers.l3b = drive[2] > 0.5 ? 3.1 : 9;
      bridgePulse(-1);
    }
    if (drive[2] > 0.5 && (timers.l3s -= dt) <= 0) {
      timers.l3s = 6.2;
      syncL3();
    }

    // Region 04 cycles through learned patterns; each one grows more coherent, peaks in a coordinated response, then feeds back.
    const before = timers.l4;
    timers.l4 += dt / (drive[3] > 0.5 ? 4.6 : 8);
    if (drive[3] > 0.5 && before < 0.78 && timers.l4 >= 0.78) flashL4();
    if (drive[3] > 0.5 && before < 0.86 && timers.l4 >= 0.86) feedbackL4();
    if (timers.l4 >= 1) {
      timers.l4 -= 1;
      timers.pattern = (timers.pattern + 1) % 3;
    }
  }

  function emoLevel(n, time, phaseT) {
    const coherence = Math.min(1, phaseT / 0.7);
    const target = n.patterns[timers.pattern];
    const phase = n.phase + (target - n.phase) * coherence;
    const wave = 0.5 + 0.5 * Math.sin(time * 2.4 - phase);
    return wave * wave * wave * (0.25 + 0.75 * drive[3]);
  }

  function update(dt) {
    const ease = 1 - Math.exp(-dt * 4);
    for (let r = 0; r < 4; r++) {
      weights[r] += (targetWeight(r) - weights[r]) * ease;
      drive[r] += (targetDrive(r) - drive[r]) * ease;
    }
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;

    if (events.length) {
      const due = events.filter((ev) => ev.at <= t);
      events = events.filter((ev) => ev.at > t);
      due.forEach((ev) => ev.fn());
    }

    behave(dt);

    particles = particles.filter((p) => {
      p.t += dt * p.speed * (0.6 + drive[0]);
      if (p.t < 1) return true;
      fire(net.streams[p.s].node, 0.95, drive[0] > 0.5 ? 3 : 1);
      return false;
    });

    const next = [];
    for (const p of pulses) {
      const edge = net.edges[p.e];
      p.t += (dt * p.speed) / Math.max(edge.len, 1);
      if (edge.kind === 'bridge') {
        const pt = edgePoint(edge, p.dir > 0 ? p.t : 1 - p.t);
        const s = Math.sign(pt[0] - net.membraneX);
        if (s !== p.side && s !== 0) {
          p.side = s;
          membraneHits.push({ y: pt[1], t });
          p.color = net.nodes[p.dir > 0 ? edge.b : edge.a].kind === 'bio' ? BIO_COLOR : REGION_COLORS[2];
        }
      }
      if (p.t < 1) {
        next.push(p);
        continue;
      }
      const target = p.dir > 0 ? edge.b : edge.a;
      act[target] = Math.max(act[target], 0.9);
      if (p.chain.length) {
        const [e, dir] = p.chain[0];
        next.push({ ...p, e, dir, t: 0, chain: p.chain.slice(1) });
        continue;
      }
      p.onArrive?.();
      if (p.budget > 0) spread(target, p.budget, p.e, p.color);
    }
    pulses = next;

    for (let i = 0; i < act.length; i++) act[i] *= Math.exp(-dt * (net.nodes[i].kind === 'bio' ? 1.2 : 2.3));
    membraneFlash *= Math.exp(-dt * 1.6);
    membraneHits = membraneHits.filter((h) => t - h.t < 0.9);
  }

  // ---- drawing ----

  function positions(time) {
    for (const n of net.nodes) {
      const sway = n.kind === 'bio' ? 2.4 : n.region === 3 ? 1.4 : 0.8;
      const pz = n.z - 0.5;
      px[n.i] = n.x + Math.sin(time * 0.5 + n.phase) * sway + pointer.x * pz * 16;
      py[n.i] = n.y + Math.cos(time * 0.43 + n.phase * 1.3) * sway + pointer.y * pz * 10;
    }
  }

  function edgePoint(edge, s) {
    const ax = px[edge.a];
    const ay = py[edge.a];
    const bx = px[edge.b];
    const by = py[edge.b];
    const cx = edge.cx + (ax - net.nodes[edge.a].x + bx - net.nodes[edge.b].x) / 2;
    const cy = edge.cy + (ay - net.nodes[edge.a].y + by - net.nodes[edge.b].y) / 2;
    const u = 1 - s;
    return [u * u * ax + 2 * u * s * cx + s * s * bx, u * u * ay + 2 * u * s * cy + s * s * by];
  }

  function traceEdge(edge) {
    const cx = edge.cx + (px[edge.a] - net.nodes[edge.a].x + px[edge.b] - net.nodes[edge.b].x) / 2;
    const cy = edge.cy + (py[edge.a] - net.nodes[edge.a].y + py[edge.b] - net.nodes[edge.b].y) / 2;
    ctx.moveTo(px[edge.a], py[edge.a]);
    ctx.quadraticCurveTo(cx, cy, px[edge.b], py[edge.b]);
  }

  function nodeColor(n) {
    return n.kind === 'bio' ? BIO_COLOR : REGION_COLORS[n.region];
  }

  function draw(levels) {
    const { regions, compact } = layout;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, layout.w, layout.h);
    positions(t);
    const eff = levels ?? act;
    const phaseT = timers.l4;
    const emoEff = new Float32Array(net.nodes.length);
    for (const n of net.emo) emoEff[n.i] = Math.max(eff[n.i], emoLevel(n, t, phaseT));
    const level = (i) => (net.nodes[i].region === 3 ? emoEff[i] : eff[i]);

    // Ground planes and auras give each region its own depth layer.
    regions.forEach((R, r) => {
      const w = weights[r];
      ctx.globalAlpha = (0.05 + 0.12 * drive[r]) * w;
      ctx.drawImage(glow(REGION_COLORS[r]), R.cx - R.rw * 1.5, R.cy - R.rh * 1.3, R.rw * 3, R.rh * 2.6);
      ctx.globalAlpha = 0.1 * w;
      ctx.strokeStyle = REGION_COLORS[r];
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.ellipse(R.cx, R.cy + R.rh * 0.95, R.rw * 1.05, R.rh * 0.14, 0, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Region 01 input streams.
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = REGION_COLORS[0];
    ctx.globalAlpha = (0.08 + 0.14 * drive[0]) * weights[0];
    ctx.beginPath();
    net.streams.forEach((s) => {
      ctx.moveTo(s.x0, s.y0);
      ctx.quadraticCurveTo(s.cx, s.cy, s.x1, s.y1);
    });
    ctx.stroke();

    // Synapses, batched by style.
    const styles = [
      ['syn', (e) => REGION_COLORS[e.ra], 0.17, 0.7],
      ['art', () => REGION_COLORS[2], 0.24, 0.7],
      ['axon', () => BIO_COLOR, 0.22, 1.1],
      ['emo', () => REGION_COLORS[3], 0.16, 0.7],
    ];
    for (const [kind, color, alpha, lw] of styles) {
      ctx.lineWidth = lw;
      for (let r = 0; r < 4; r++) {
        ctx.strokeStyle = color({ ra: r });
        ctx.globalAlpha = alpha * weights[r];
        ctx.beginPath();
        net.edges.forEach((e) => e.kind === kind && e.ra === r && traceEdge(e));
        ctx.stroke();
      }
    }
    for (const idx of [...net.inter, ...net.bridges, ...net.feedback]) {
      const e = net.edges[idx];
      ctx.strokeStyle = e.kind === 'feedback' ? PATTERN_COLORS[0] : e.kind === 'bridge' ? IVORY : REGION_COLORS[e.ra];
      ctx.globalAlpha = (e.kind === 'feedback' ? 0.1 + 0.15 * drive[3] : 0.22) * edgeWeight(e);
      ctx.lineWidth = e.kind === 'bridge' ? 0.9 : 0.8;
      ctx.setLineDash(e.kind === 'feedback' ? [3, 6] : e.kind === 'bridge' ? [1, 3] : []);
      ctx.beginPath();
      traceEdge(e);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Synapses between co-active neurons light up, so groups visibly influence each other.
    ctx.lineWidth = 1.1;
    for (const e of net.edges) {
      const m = Math.min(level(e.a), level(e.b));
      if (m < 0.12) continue;
      ctx.strokeStyle = e.ra === 3 ? PATTERN_COLORS[timers.pattern] : nodeColor(net.nodes[e.a]);
      ctx.globalAlpha = Math.min(1, m * 0.9) * edgeWeight(e);
      ctx.beginPath();
      traceEdge(e);
      ctx.stroke();
    }

    // Dendrites.
    for (let r = 0; r < 4; r++) {
      for (const kind of ['art', 'bio']) {
        ctx.strokeStyle = kind === 'bio' ? BIO_COLOR : REGION_COLORS[r];
        ctx.lineWidth = kind === 'bio' ? 0.8 : 0.55;
        ctx.globalAlpha = (kind === 'bio' ? 0.3 : 0.14) * weights[r];
        ctx.beginPath();
        for (const n of net.byRegion[r]) {
          if (n.kind !== kind) continue;
          const d = n.dend;
          const bend = n.kind === 'bio' ? Math.sin(t * 0.7 + n.phase) * 0.04 : 0;
          for (let s = 0; s < d.length; s += 4) {
            ctx.moveTo(px[n.i] + d[s] + d[s + 1] * bend, py[n.i] + d[s + 1] - d[s] * bend);
            ctx.lineTo(px[n.i] + d[s + 2] + d[s + 3] * bend, py[n.i] + d[s + 3] - d[s + 2] * bend);
          }
        }
        ctx.stroke();
      }
    }

    // Proposed interface between the artificial and biological halves of region 03.
    const R2 = regions[2];
    const w2 = weights[2];
    ctx.globalAlpha = (0.05 + 0.18 * drive[2] + 0.35 * membraneFlash) * w2;
    ctx.drawImage(glow(IVORY), net.membraneX - 14, R2.cy - R2.rh * 1.05, 28, R2.rh * 2.1);
    ctx.strokeStyle = IVORY;
    ctx.lineWidth = 1;
    ctx.globalAlpha = (0.22 + 0.4 * membraneFlash) * w2;
    ctx.beginPath();
    for (let y = -R2.rh; y <= R2.rh; y += 4) {
      const x = net.membraneX + Math.sin(y * 0.09 + t * 1.4) * 2.2;
      if (y === -R2.rh) ctx.moveTo(x, R2.cy + y);
      else ctx.lineTo(x, R2.cy + y);
    }
    ctx.stroke();
    for (let y = -R2.rh + 6; y <= R2.rh; y += 12) {
      const hit = membraneHits.reduce((m, h) => Math.max(m, 1 - Math.abs(h.y - (R2.cy + y)) / 22 - (t - h.t)), 0);
      ctx.globalAlpha = (0.16 + 0.8 * Math.max(0, hit) + 0.5 * membraneFlash) * w2;
      ctx.beginPath();
      ctx.moveTo(net.membraneX - 4, R2.cy + y);
      ctx.lineTo(net.membraneX + 4, R2.cy + y);
      ctx.stroke();
    }

    // Neurons.
    for (const n of net.nodes) {
      const w = weights[n.region];
      const lv = level(n.i);
      const r = n.r * (0.75 + 0.5 * n.z);
      const color = n.region === 3 && lv > 0.15 ? PATTERN_COLORS[timers.pattern] : nodeColor(n);
      if (lv > 0.04) {
        ctx.globalAlpha = Math.min(1, lv) * w;
        const g = r * (n.kind === 'bio' ? 9 : 7);
        ctx.drawImage(glow(color), px[n.i] - g, py[n.i] - g, g * 2, g * 2);
      }
      ctx.globalAlpha = (0.4 + 0.45 * n.z) * w;
      ctx.fillStyle = color;
      ctx.beginPath();
      if (n.region === 2 && n.kind === 'art') ctx.rect(px[n.i] - r, py[n.i] - r, r * 2, r * 2);
      else ctx.arc(px[n.i], py[n.i], r, 0, TAU);
      ctx.fill();
      if (lv > 0.25) {
        ctx.globalAlpha = (lv - 0.25) * w;
        ctx.fillStyle = IVORY;
        ctx.beginPath();
        ctx.arc(px[n.i], py[n.i], r * 0.6, 0, TAU);
        ctx.fill();
      }
      if (n.kind === 'bio') {
        ctx.globalAlpha = 0.5 * w;
        ctx.strokeStyle = BIO_COLOR;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(px[n.i], py[n.i], r + 2.5 + lv * 3, 0, TAU);
        ctx.stroke();
      }
    }

    // Input particles: short dashes travelling along the streams.
    ctx.strokeStyle = REGION_COLORS[0];
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    for (const p of particles) {
      if (p.t < 0) continue;
      const s = net.streams[p.s];
      const a = quad(s, p.t);
      const b = quad(s, Math.max(0, p.t - 0.06));
      ctx.globalAlpha = (0.35 + 0.6 * drive[0]) * weights[0];
      ctx.beginPath();
      ctx.moveTo(b[0], b[1]);
      ctx.lineTo(a[0], a[1]);
      ctx.stroke();
    }
    ctx.lineCap = 'butt';

    // Signal pulses. On the biological side of the interface they travel as rings.
    for (const p of pulses) {
      const edge = net.edges[p.e];
      const [x, y] = edgePoint(edge, p.dir > 0 ? p.t : 1 - p.t);
      const w = edgeWeight(edge);
      const ring =
        edge.kind === 'axon' ||
        (edge.kind === 'bridge' && Math.sign(x - net.membraneX) === Math.sign(net.nodes[edge.b].x - net.membraneX));
      ctx.globalAlpha = 0.85 * w;
      ctx.drawImage(glow(p.color), x - 9, y - 9, 18, 18);
      if (ring) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, TAU);
        ctx.stroke();
      } else {
        ctx.globalAlpha = w;
        ctx.fillStyle = IVORY;
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, TAU);
        ctx.fill();
      }
    }

    // Labels.
    ctx.font = `500 ${compact ? 9 : 10}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'alphabetic';
    regions.forEach((R, r) => {
      ctx.globalAlpha = (0.35 + 0.5 * drive[r]) * weights[r];
      ctx.fillStyle = REGION_COLORS[r];
      ctx.textAlign = 'left';
      ctx.fillText(LAYERS[r].number, R.cx - R.rw - (compact ? 4 : 0), R.cy - R.rh - 6);
    });
    if (!compact || drive[2] > 0.5) {
      ctx.font = '500 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.globalAlpha = (0.3 + 0.5 * drive[2]) * w2;
      ctx.fillStyle = IVORY;
      ctx.fillText('PROPOSED INTERFACE', net.membraneX, R2.cy - R2.rh - 6);
      if (!compact) {
        ctx.fillStyle = REGION_COLORS[2];
        ctx.fillText('ARTIFICIAL', net.membraneX - R2.rw * 0.6, R2.cy + R2.rh + 12);
        ctx.fillStyle = BIO_COLOR;
        ctx.fillText('BIO-INSPIRED', net.membraneX + R2.rw * 0.62, R2.cy + R2.rh + 12);
      }
    }
    if (drive[3] > 0.5) {
      const R3 = regions[3];
      ctx.font = '500 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = PATTERN_COLORS[timers.pattern];
      ctx.globalAlpha = 0.75 * weights[3];
      ctx.fillText(`LEARNED PATTERN ${PATTERN_NAMES[timers.pattern]}`, R3.cx, R3.cy - R3.rh - 6);
    }
    ctx.globalAlpha = 1;
  }

  function quad(s, u) {
    const v = 1 - u;
    return [v * v * s.x0 + 2 * v * u * s.cx + u * u * s.x1, v * v * s.y0 + 2 * v * u * s.cy + u * u * s.y1];
  }

  // Reduced motion: one deterministic frame that still shows which region is in focus.
  function drawStatic() {
    for (let r = 0; r < 4; r++) {
      weights[r] = targetWeight(r);
      drive[r] = targetDrive(r);
    }
    const f = focus();
    const levels = new Float32Array(net.nodes.length);
    net.nodes.forEach((n, i) => {
      if (n.region === f) levels[i] = i % 3 === 0 ? 0.85 : 0.2;
      else if (f == null && i % 7 === 0) levels[i] = 0.45;
    });
    t = 1.3;
    timers.l4 = 0.75;
    draw(levels);
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    t += dt;
    update(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  return {
    resize,
    setFocus(nextSelected, nextHover) {
      const prev = selected;
      selected = nextSelected;
      hover = nextHover;
      if (reducedMotion) {
        if (net) drawStatic();
        return;
      }
      // Transition: carry signals from the previously selected region to the new one.
      if (net && nextSelected != null && nextSelected !== prev) {
        const from = prev ?? 0;
        if (from !== nextSelected) [0, 0.14, 0.28].forEach((d) => at(d, () => route(from, nextSelected)));
        else for (let j = 0; j < 6; j++) particles.push({ s: j % net.streams.length, t: -j * 0.08, speed: 0.9 });
      }
    },
    setPointer(x, y) {
      pointer.tx = x;
      pointer.ty = y;
    },
    setRunning(on) {
      if (reducedMotion || on === running) return;
      running = on;
      if (on) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else cancelAnimationFrame(raf);
    },
    destroy() {
      cancelAnimationFrame(raf);
      running = false;
    },
  };
}
