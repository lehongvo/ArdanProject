'use client';

import { useAppStore } from '@/lib/progress-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function HeatMap() {
  const completedDays = useAppStore((s) => s.completedDays);
  const dayRatings = useAppStore((s) => s.dayRatings);

  const weeks = [];
  for (let i = 0; i < 120; i += 7) {
    weeks.push(
      Array.from({ length: Math.min(7, 120 - i) }, (_, j) => i + j + 1)
    );
  }

  const getColor = (dayId: number) => {
    if (!completedDays.includes(dayId)) return 'bg-muted';
    const rating = dayRatings[dayId];
    if (!rating || rating <= 2) return 'bg-emerald-900';
    if (rating <= 3) return 'bg-emerald-700';
    if (rating <= 4) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  return (
    <Card data-testid="heatmap">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Activity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((dayId) => (
                <Tooltip key={dayId}>
                  <TooltipTrigger
                    render={
                      <div
                        className={`w-3 h-3 rounded-sm ${getColor(dayId)} transition-colors`}
                      />
                    }
                  />
                  <TooltipContent>
                    <p className="text-xs">
                      Day {dayId}{' '}
                      {completedDays.includes(dayId) ? '(completed)' : '(pending)'}
                      {dayRatings[dayId] ? ` - ${dayRatings[dayId]}/5` : ''}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
