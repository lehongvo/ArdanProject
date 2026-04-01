'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  BarChart3,
  FileQuestion,
  Briefcase,
  BookOpen,
  Flame,
} from 'lucide-react';
import { useAppStore } from '@/lib/progress-store';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/mock-exam', label: 'Mock Exam', icon: FileQuestion },
  { href: '/job-tracker', label: 'Job Tracker', icon: Briefcase },
  { href: '/resources', label: 'Resources', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const streak = useAppStore((s) => s.streak);

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg bg-[#DEA584] flex items-center justify-center">
            <span className="text-lg font-bold text-black">R</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground">Rust Cert</h1>
            <p className="text-xs text-muted-foreground">120-Day Roadmap</p>
          </div>
        </div>

        {streak > 0 && (
          <div className="mx-4 mt-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">{streak} day streak!</span>
          </div>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            Ardan Labs Rust Certification
          </p>
        </div>
      </div>
    </aside>
  );
}
