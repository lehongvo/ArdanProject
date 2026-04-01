'use client';

import { useAppStore } from '@/lib/progress-store';
import { Flame, Calendar } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header() {
  const streak = useAppStore((s) => s.streak);
  const currentDay = useAppStore((s) => s.currentDay);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-sm md:pl-64">
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="hidden md:flex items-center gap-2 ml-4">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Day {currentDay} of 120</span>
      </div>

      <div className="flex items-center gap-4">
        {streak > 0 && (
          <div className="flex items-center gap-1.5 md:hidden">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">{streak}</span>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-[#DEA584] flex items-center justify-center">
          <span className="text-sm font-bold text-black">V</span>
        </div>
      </div>
    </header>
  );
}
