'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  BarChart3,
  FileQuestion,
  Briefcase,
  BookOpen,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/mock-exam', label: 'Mock Exam', icon: FileQuestion },
  { href: '/job-tracker', label: 'Job Tracker', icon: Briefcase },
  { href: '/resources', label: 'Resources', icon: BookOpen },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" data-testid="mobile-menu-toggle" />}
      >
        <Menu className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-[#DEA584] flex items-center justify-center">
            <span className="text-lg font-bold text-black">R</span>
          </div>
          <div>
            <h2 className="text-base font-bold">Rust Cert</h2>
            <p className="text-xs text-muted-foreground">120-Day Roadmap</p>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
