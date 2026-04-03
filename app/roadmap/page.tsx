import Link from 'next/link';
import { PHASES } from '@/lib/roadmap-data';

export default function RoadmapPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white">Lộ Trình 10 Giai Đoạn</h1>
        <p className="text-sm text-[#888] mt-0.5">12 months · Rust → Solana → ZK → Web3 Job</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PHASES.map((phase) => (
          <Link
            key={phase.id}
            href={`/phase/${phase.id}`}
            className="card p-5 hover:border-[#333] transition-all hover:scale-[1.01] group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: phase.color + '22' }}>
                  {phase.icon}
                </div>
                <div>
                  <p className="text-xs text-[#888]">Phase {phase.id}</p>
                  <h3 className="text-sm font-bold text-white">{phase.name}</h3>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full border"
                style={{ borderColor: phase.color + '44', color: phase.color }}>
                {phase.duration}
              </span>
            </div>

            <p className="text-xs text-[#888] mb-3 line-clamp-2">{phase.goal}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {phase.skills.slice(0, 4).map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#888]">{s}</span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#888]">
              <span>{phase.totalWeeks} tuần</span>
              <span className="group-hover:text-white transition-colors">Xem chi tiết →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Timeline */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Timeline 12 Tháng</h2>
        <div className="relative pl-4">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="flex gap-4 mb-4 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ background: phase.color }} />
                {i < PHASES.length - 1 && <div className="w-px flex-1 bg-[#222] my-1" />}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{phase.icon} {phase.name}</span>
                  <span className="text-xs text-[#888]">· {phase.duration}</span>
                </div>
                <p className="text-xs text-[#666] mt-0.5">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
