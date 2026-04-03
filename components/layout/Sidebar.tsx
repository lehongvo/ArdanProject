'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Map, BarChart2, Brain, Code2, Rocket, Briefcase, BookOpen, Flame,
} from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

const NAV = [
  { href: '/', label: 'Dashboard', vi: 'Tổng Quan', icon: Home },
  { href: '/roadmap', label: 'Roadmap', vi: 'Lộ Trình', icon: Map },
  { href: '/progress', label: 'Progress', vi: 'Tiến Độ', icon: BarChart2 },
  { href: '/mock-exam', label: 'Mock Exam', vi: 'Luyện Thi', icon: Brain },
  { href: '/leetcode', label: 'LeetCode', vi: 'LeetCode', icon: Code2 },
  { href: '/projects', label: 'Projects', vi: 'Dự Án', icon: Rocket },
  { href: '/job-tracker', label: 'Job Tracker', vi: 'Việc Làm', icon: Briefcase },
  { href: '/resources', label: 'Resources', vi: 'Tài Liệu', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentPhase, studyStreak } = useProgressStore();
  const phase = PHASES.find((p) => p.id === currentPhase);

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-[#222] bg-[#0d0d0d] h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#222]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🦀</span>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Lộ Trình Học</p>
            <p className="text-xs text-[#888]">Blockchain · ZK · Rust</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, vi, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#F97316]/10 text-[#F97316]'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 1.5} />
              {vi}
            </Link>
          );
        })}
      </nav>

      {/* Footer — current phase + streak */}
      <div className="px-4 py-4 border-t border-[#222] space-y-3">
        {phase && (
          <div className="rounded-lg p-3 bg-[#111]">
            <p className="text-xs text-[#888] mb-1">Phase hiện tại</p>
            <div className="flex items-center gap-2">
              <span>{phase.icon}</span>
              <p className="text-xs font-medium text-white truncate">{phase.shortName}</p>
            </div>
            <div className="mt-2 h-1 rounded-full bg-[#222]">
              <div
                className="h-1 rounded-full"
                style={{ width: '5%', background: phase.color }}
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Flame size={16} className={studyStreak > 0 ? 'text-orange-400' : 'text-[#555]'} />
          <span className="font-bold text-white">{studyStreak}</span>
          <span className="text-[#888] text-xs">ngày liên tiếp</span>
        </div>
      </div>
    </aside>
  );
}
