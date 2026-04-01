'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({ totalSeconds, onTimeUp, isRunning }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    if (remaining <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, remaining, onTimeUp]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isLow = remaining < 600;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-medium ${
        isLow ? 'bg-red-500/10 text-red-500' : 'bg-muted text-foreground'
      }`}
      data-testid="exam-timer"
    >
      <Clock className="w-4 h-4" />
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
