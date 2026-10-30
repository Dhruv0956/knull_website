import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Share2, Play, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';

export default function InteractiveCanvas() {
  const [activeTab, setActiveTab] = useState('exec');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedCount, setEnhancedCount] = useState(1);
  const [actionItems, setActionItems] = useState([
    { id: 1, text: 'Migrate PostgreSQL geo-queries to Redis GEOADD & GEORADIUS for sub-15ms lookup', done: true },
    { id: 2, text: 'Send updated enterprise SLA & data privacy addendum to client legal team', done: true },
    { id: 3, text: 'Prepare slide deck for investor & college evaluation demo by Friday', done: false },
    { id: 4, text: 'Review autonomous MAVLink edge telemetry script on Raspberry Pi/Jetson', done: false },
  ]);

  const toggleAction = (id) => {
    setActionItems(items =>
      items.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhancedCount(c => c + 1);
    }, 1200);
  };

  return (
    <div id="canvas" className="mt-14 bg-[#121215] rounded-3xl border border-[#222226] shadow-[0_20px_40px_-8px_rgba(20,20,19,0.08)] overflow-hidden">
      {/* Top window chrome */}
      <div className="bg-[#171717] px-5 py-3.5 border-b border-[#222226] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          <span className="ml-3 text-xs font-mono text-[#71717A]">
            Startup Desktop — Sprint Plan & Customer Intelligence
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121215] border border-[#222226] text-xs font-mono text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A530E] animate-pulse"></span>
            Memory Graph: Active ({enhancedCount} Syncs)
          </span>
        </div>
      </div>

      {/* Main split canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#222226] bg-[#121215]">
        
        {/* Left: Founder raw notes */}
        <div className="md:col-span-5 p-6 sm:p-8 bg-[#171717]/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#71717A]">Founder Raw Bullets</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#EBE7DF] text-[#A1A1AA]">
                Auto-Captured Audio
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-[#F8F7F2] mb-3">Live Meeting Stream</h3>

            {/* Note items */}
            <div className="bg-[#121215] p-5 rounded-2xl border border-[#222226] shadow-sm space-y-3 font-sans text-xs text-[#A1A1AA] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E10] mt-1.5 shrink-0"></span>
                <p>
                  <strong className="text-[#F8F7F2]">Call with Tier-1 Partner:</strong> Loves real-time telemetry, hates waiting for batch reports.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E10] mt-1.5 shrink-0"></span>
                <p>
                  <strong className="text-[#F8F7F2]">Engineering Bottleneck:</strong> Current database takes 180ms on spatial queries. Need Redis geospatial indexing.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E10] mt-1.5 shrink-0"></span>
                <p>
                  <strong className="text-[#F8F7F2]">Action Item:</strong> Target 15ms latency threshold before Friday demo.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#D1E043]/20 rounded-xl border border-[#D1E043]/50 text-[11px] text-[#F8F7F2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8E63A] shrink-0" />
                <span>Audio stream buffered from hardware mic.</span>
              </div>
              <button 
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="px-2.5 py-1 bg-[#121215] hover:bg-[#171717] border border-[#222226] rounded-md font-semibold text-[10px] text-[#F8F7F2] transition-colors flex items-center gap-1"
              >
                {isEnhancing ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-[#C8E63A]" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#F8F7F2]" />
                    Re-Enhance
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#222226] text-[11px] text-[#71717A] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Private Local Audio (No Bot)
            </span>
            <span className="text-emerald-300 font-medium">100% Encrypted</span>
          </div>
        </div>

        {/* Right: Granola Ruled Notepad Canvas */}
        <div className="md:col-span-7 p-6 sm:p-8 bg-[#121215] notepad-lines flex flex-col justify-between">
          <div>
            {/* Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('exec')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeTab === 'exec'
                      ? 'bg-[#0E0E10] text-white font-semibold'
                      : 'text-[#A1A1AA] hover:bg-[#171717]'
                  }`}
                >
                  Executive Summary
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeTab === 'actions'
                      ? 'bg-[#0E0E10] text-white font-semibold'
                      : 'text-[#A1A1AA] hover:bg-[#171717]'
                  }`}
                >
                  Action Items ({actionItems.filter(i => !i.done).length} open)
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeTab === 'code'
                      ? 'bg-[#0E0E10] text-white font-semibold'
                      : 'text-[#A1A1AA] hover:bg-[#171717]'
                  }`}
                >
                  Architecture Spec
                </button>
              </div>
              <span className="text-[11px] font-mono text-[#71717A]">Markdown</span>
            </div>

            {/* Tab 1: Executive Summary */}
            {activeTab === 'exec' && (
              <div className="bg-[#121215]/95 p-6 rounded-2xl border border-[#222226] shadow-sm space-y-3 font-sans transition-all">
                <h4 className="text-xl font-serif text-[#F8F7F2] font-bold">
                  Customer Bottleneck & Real-Time Strategy
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  The client requires <span className="marker-highlight font-medium text-[#F8F7F2]">real-time spatial response under 20ms</span>. Replacing disk-bound batch queries with an in-memory sliding window unlocks their pilot deployment.
                </p>
                <div className="pt-3 border-t border-[#222226] space-y-2 text-xs text-[#A1A1AA]">
                  <div className="flex items-center gap-2 text-[#F8F7F2] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Directly addresses revenue milestone ($80k ARR contract)
                  </div>
                  <div className="flex items-center gap-2 text-[#F8F7F2] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Zero invasive bots in confidential stakeholder discussions
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Action Items */}
            {activeTab === 'actions' && (
              <div className="bg-[#121215]/95 p-6 rounded-2xl border border-[#222226] shadow-sm space-y-3 font-sans transition-all">
                <h4 className="text-xl font-serif text-[#F8F7F2] font-bold">
                  Synchronized Tasks ({actionItems.filter(i => i.done).length}/{actionItems.length} completed)
                </h4>
                <div className="space-y-2 text-xs">
                  {actionItems.map((item) => (
                    <label 
                      key={item.id} 
                      className="flex items-start gap-2.5 p-2.5 bg-[#171717] rounded-lg border border-[#222226] cursor-pointer hover:bg-[#1F1F22] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleAction(item.id)}
                        className="rounded text-[#F8F7F2] mt-0.5 focus:ring-0 cursor-pointer"
                      />
                      <span className={item.done ? 'line-through text-[#71717A]' : 'text-[#F8F7F2] font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Architecture Spec */}
            {activeTab === 'code' && (
              <div className="bg-[#121215]/95 p-6 rounded-2xl border border-[#222226] shadow-sm space-y-2 font-mono text-xs transition-all">
                <div className="text-[#71717A]">// Generated Execution Spec</div>
                <div className="text-emerald-200 bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/25 leading-relaxed">
                  <strong>Ingestion:</strong> Hardware Mic Stream via WebAudio (48kHz)<br />
                  <strong>Inference:</strong> Claude 3.5 Sonnet + Local Episodic Knowledge Graph<br />
                  <strong>Dispatch:</strong> Linear Issue Created #LIN-1049 &bull; Slack Alert to #eng-core
                </div>
              </div>
            )}
          </div>

          {/* Bottom Control Bar */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#222226] text-xs text-[#A1A1AA]">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              1-Click Sync to Linear, Notion, and Slack
            </span>
            <span className="font-semibold text-[#F8F7F2] hover:underline cursor-pointer">
              Export Note as Markdown →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
