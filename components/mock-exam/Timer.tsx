'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalSeconds: number;
  onExpire: () => void;
  isRunning: boolean;
}

export function Timer({ totalSeconds, onExpire, isRunning }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining, isRunning, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isWarning = remaining <= 600; // 10 min
  const isCritical = remaining <= 120; // 2 min
  const pct = (remaining / totalSeconds) * 100;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors ${
        isCritical
          ? 'border-red-500/50 bg-red-500/10 animate-pulse'
          : isWarning
          ? 'border-orange-500/40 bg-orange-500/10'
          : 'border-[#222] bg-[#111]'
      }`}
    >
      <Clock
        size={16}
        className={isCritical ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-[#888]'}
      />
      <span
        className={`font-mono font-bold tabular-nums text-lg ${
          isCritical ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-white'
        }`}
      >
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
      <div className="w-20 h-1.5 rounded-full bg-[#222] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: isCritical ? '#ef4444' : isWarning ? '#f97316' : '#8B5CF6',
          }}
        />
      </div>
    </div>
  );
}
