'use client';

import { useAppStore } from '@/lib/progress-store';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export default function StreakCounter() {
  const streak = useAppStore((s) => s.streak);
  const completedDays = useAppStore((s) => s.completedDays);

  const getMessage = () => {
    if (streak === 0 && completedDays.length === 0) return 'Start your journey today!';
    if (streak === 0) return 'Get back on track!';
    if (streak < 7) return 'Building momentum!';
    if (streak < 14) return 'One week strong!';
    if (streak < 30) return 'Unstoppable!';
    return 'Legendary streak!';
  };

  return (
    <Card data-testid="streak-counter">
      <CardContent className="pt-6 flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${streak > 0 ? 'bg-amber-500/10' : 'bg-muted'}`}>
          <Flame className={`w-7 h-7 ${streak > 0 ? 'text-amber-500' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="text-3xl font-bold">{streak}</p>
          <p className="text-sm text-muted-foreground">{getMessage()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
