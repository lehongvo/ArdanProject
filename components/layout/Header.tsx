'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Map, BarChart2, Brain, Code2, Rocket, Briefcase, BookOpen,
} from 'lucide-react';

const NAV = [
  { href: '/', label: 'Tổng Quan', icon: Home },
  { href: '/roadmap', label: 'Lộ Trình', icon: Map },
  { href: '/progress', label: 'Tiến Độ', icon: BarChart2 },
  { href: '/mock-exam', label: 'Luyện Thi', icon: Brain },
  { href: '/leetcode', label: 'LeetCode', icon: Code2 },
  { href: '/projects', label: 'Dự Án', icon: Rocket },
  { href: '/job-tracker', label: 'Việc Làm', icon: Briefcase },
  { href: '/resources', label: 'Tài Liệu', icon: BookOpen },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#222] bg-[#0d0d0d] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-lg">🦀</span>
          <span className="text-sm font-bold text-white">Lộ Trình Học</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-[#888] hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Slide-out menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 w-64 bg-[#0d0d0d] border-r border-[#222] z-50 md:hidden flex flex-col p-4 space-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🦀</span>
                <div>
                  <p className="text-sm font-bold text-white">Lộ Trình Học</p>
                  <p className="text-xs text-[#888]">Blockchain · ZK · Rust</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#888] hover:text-white">
                <X size={16} />
              </button>
            </div>
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#F97316]/10 text-[#F97316]'
                      : 'text-[#888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 2.5 : 1.5} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
