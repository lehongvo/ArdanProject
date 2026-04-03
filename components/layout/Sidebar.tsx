'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Map, BarChart2, Brain, Code2, Rocket, Briefcase, BookOpen,
} from 'lucide-react';
import { useProgressStore, computePhaseProgress } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

const NAV_GROUPS = [
  {
    label: 'Học',
    items: [
      { href: '/', label: 'Dashboard', vi: 'Tổng Quan', icon: Home },
      { href: '/roadmap', label: 'Roadmap', vi: 'Lộ Trình', icon: Map },
      { href: '/progress', label: 'Progress', vi: 'Tiến Độ', icon: BarChart2 },
    ],
  },
  {
    label: 'Track',
    items: [
      { href: '/mock-exam', label: 'Mock Exam', vi: 'Luyện Thi', icon: Brain },
      { href: '/leetcode', label: 'LeetCode', vi: 'LeetCode', icon: Code2 },
      { href: '/projects', label: 'Projects', vi: 'Dự Án', icon: Rocket },
    ],
  },
  {
    label: 'Career',
    items: [
      { href: '/job-tracker', label: 'Job Tracker', vi: 'Việc Làm', icon: Briefcase },
      { href: '/resources', label: 'Resources', vi: 'Tài Liệu', icon: BookOpen },
    ],
  },
];

const PHASE_GRADIENT: Record<number, string> = {
  1: 'from-orange-500 to-orange-600',
  2: 'from-amber-500 to-amber-600',
  3: 'from-red-500 to-red-600',
  4: 'from-yellow-500 to-yellow-600',
  5: 'from-purple-500 to-purple-600',
  6: 'from-violet-500 to-violet-600',
  7: 'from-blue-500 to-blue-600',
  8: 'from-cyan-500 to-cyan-600',
  9: 'from-emerald-500 to-emerald-600',
  10: 'from-pink-500 to-pink-600',
};

export function Sidebar() {
  const pathname = usePathname();
  const { currentPhase, completedTasks, studyStreak } = useProgressStore();
  const phase = PHASES.find((p) => p.id === currentPhase);
  const totalTasks = phase?.weeks.reduce((s, w) => s + w.tasks.length, 0) ?? 0;
  const pct = computePhaseProgress(currentPhase, totalTasks, completedTasks);
  const gradient = PHASE_GRADIENT[currentPhase] ?? 'from-orange-500 to-orange-600';

  return (
    <aside className="hidden md:flex flex-col shrink-0 h-full border-r" style={{ width: 256, background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, #F97316, #8B5CF6)' }}>
            <span>🦀</span>
          </div>
          <div>
            <p className="text-sm font-bold gradient-text leading-tight">Web3 Academy</p>
            <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Rust · Solana · ZK</p>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, vi, icon: Icon }) => {
                const active = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'text-white border-l-2 border-[#F97316]'
                        : 'border-l-2 border-transparent hover:border-white/10'
                    }`}
                    style={active
                      ? { background: 'var(--accent-dim)' }
                      : { color: 'var(--muted)' }
                    }
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all ${active ? 'bg-[#F97316]' : ''}`}
                    >
                      <Icon size={14} strokeWidth={active ? 2.5 : 1.5} className={active ? 'text-white' : ''} />
                    </span>
                    <span>{vi}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
        {/* Current phase card */}
        {phase && (
          <div className="rounded-xl p-3 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border-bright)' }}>
            {/* Gradient top bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`} />
            <p className="text-[10px] mb-1.5" style={{ color: 'var(--muted)' }}>Phase hiện tại</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{phase.icon}</span>
              <p className="text-xs font-semibold text-white truncate">{phase.shortName}</p>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
              <div
                className={`h-1.5 rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>{pct}% hoàn thành</p>
          </div>
        )}

        {/* Streak */}
        <div className="flex items-center gap-2 px-1">
          <span className={`text-lg ${studyStreak > 0 ? 'fire-animate' : 'opacity-30'}`}>🔥</span>
          <span className="text-base font-black text-white">{studyStreak}</span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>ngày liên tiếp</span>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--muted)' }}>
            120d
          </span>
        </div>
      </div>
    </aside>
  );
}
