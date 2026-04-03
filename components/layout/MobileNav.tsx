'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Brain, Code2, Briefcase } from 'lucide-react';

const TABS = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/roadmap', icon: Map, label: 'Lộ Trình' },
  { href: '/mock-exam', icon: Brain, label: 'Thi' },
  { href: '/leetcode', icon: Code2, label: 'Code' },
  { href: '/job-tracker', icon: Briefcase, label: 'Jobs' },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0d0d0d] border-t border-[#222] flex z-50">
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${
              active ? 'text-[#F97316]' : 'text-[#666]'
            }`}
          >
            <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
