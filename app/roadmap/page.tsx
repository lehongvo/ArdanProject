import Link from 'next/link';
import { PHASES } from '@/lib/roadmap-data';
import { Lock, ArrowRight } from 'lucide-react';

const PHASE_GRADIENTS: Record<number, [string, string]> = {
  1:  ['#F97316', '#EA580C'],
  2:  ['#F59E0B', '#D97706'],
  3:  ['#EF4444', '#DC2626'],
  4:  ['#EAB308', '#CA8A04'],
  5:  ['#8B5CF6', '#7C3AED'],
  6:  ['#7C3AED', '#6D28D9'],
  7:  ['#3B82F6', '#2563EB'],
  8:  ['#06B6D4', '#0891B2'],
  9:  ['#10B981', '#059669'],
  10: ['#EC4899', '#DB2777'],
};

const SKILL_COLORS: Record<number, string> = {
  1: '#F97316', 2: '#F59E0B', 3: '#EF4444', 4: '#EAB308',
  5: '#8B5CF6', 6: '#7C3AED', 7: '#3B82F6', 8: '#06B6D4',
  9: '#10B981', 10: '#EC4899',
};

export default function RoadmapPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(139,92,246,0.08), var(--card))',
          border: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #F97316, #8B5CF6, transparent)' }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ background: '#F97316' }} />
        <div className="absolute -bottom-6 left-20 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-10"
          style={{ background: '#8B5CF6' }} />

        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
            12 Tháng · 10 Giai Đoạn
            <span className="block gradient-text">Web3 Job Ready</span>
          </h1>
          <p className="text-sm" style={{ color: 'rgba(232,232,240,0.6)' }}>
            Rust → Solana → ZK Proofs → Remote Web3 Engineer
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {['480 ngày học', '10 phases', '40 tuần', 'Ardan Cert'].map((badge) => (
              <span key={badge} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(232,232,240,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phase grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PHASES.map((phase) => {
          const [colorA, colorB] = PHASE_GRADIENTS[phase.id] ?? ['#F97316', '#EA580C'];
          const skillColor = SKILL_COLORS[phase.id] ?? '#F97316';

          return (
            <Link
              key={phase.id}
              href={`/phase/${phase.id}`}
              className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'var(--card)',
                border: `1px solid ${colorA}25`,
              }}
            >
              {/* Gradient top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${colorA}, ${colorB})` }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${colorA}08, transparent 70%)` }}
              />

              <div className="relative">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Phase number badge */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                      style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})`, color: 'white' }}
                    >
                      {phase.id}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5" style={{ color: colorA }}>
                        Phase {phase.id}
                      </p>
                      <h3 className="text-sm font-bold text-white leading-tight">{phase.name}</h3>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span
                    className="text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0"
                    style={{ background: `${colorA}15`, color: colorA }}
                  >
                    {phase.duration}
                  </span>
                </div>

                {/* Icon + goal */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl leading-none shrink-0">{phase.icon}</span>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(232,232,240,0.55)' }}>
                    {phase.goal}
                  </p>
                </div>

                {/* Skills as colored pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {phase.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${skillColor}15`, color: skillColor }}
                    >
                      {skill}
                    </span>
                  ))}
                  {phase.skills.length > 5 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--muted)' }}>
                      +{phase.skills.length - 5}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    {phase.totalWeeks} tuần · {phase.weeks.reduce((s, w) => s + w.tasks.length, 0)} tasks
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-white"
                    style={{ color: colorA }}
                  >
                    Bắt đầu
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--muted)' }}>
          Timeline 12 Tháng
        </h2>
        <div className="relative pl-4">
          {PHASES.map((phase, i) => {
            const [colorA] = PHASE_GRADIENTS[phase.id] ?? ['#F97316', '#EA580C'];
            return (
              <div key={phase.id} className="flex gap-4 mb-4 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full shrink-0 mt-0.5"
                    style={{ background: colorA, boxShadow: `0 0 0 2px #0f0f1e, 0 0 0 3px ${colorA}` }} />
                  {i < PHASES.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: 'var(--border)' }} />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{phase.icon} {phase.name}</span>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>· {phase.duration}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      style={{ background: `${colorA}15`, color: colorA }}>
                      {phase.totalWeeks}w
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(107,114,128,0.8)' }}>
                    {phase.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
