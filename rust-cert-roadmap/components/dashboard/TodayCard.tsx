'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/progress-store';
import { roadmapData, getPhaseInfo } from '@/lib/roadmap-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Target } from 'lucide-react';

const phaseColorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  red: 'bg-red-500/10 text-red-500 border-red-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  pink: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

export default function TodayCard() {
  const currentDay = useAppStore((s) => s.currentDay);
  const today = roadmapData.find((d) => d.id === currentDay);

  if (!today) {
    return (
      <Card className="border-[#DEA584]/30 bg-gradient-to-br from-[#DEA584]/5 to-transparent">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Congratulations! You have completed all 120 days!
          </p>
        </CardContent>
      </Card>
    );
  }

  const phaseInfo = getPhaseInfo(today.phase);
  const totalMinutes = today.lessons.reduce((sum, l) => sum + l.duration, 0);

  return (
    <Card className="border-[#DEA584]/30 bg-gradient-to-br from-[#DEA584]/5 to-transparent" data-testid="today-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={phaseColorMap[phaseInfo.color] || ''}>
            {phaseInfo.name}
          </Badge>
          <span className="text-sm text-muted-foreground">Day {today.id} of 120</span>
        </div>
        <CardTitle className="text-xl mt-2">{today.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{today.goal}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{totalMinutes > 0 ? `${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m` : '~4h'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4" />
            <span>{today.lessons.length} lessons</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {today.targetSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <Link href={`/day/${today.id}`}>
          <Button className="w-full mt-2 bg-[#DEA584] hover:bg-[#c8916f] text-black font-semibold" data-testid="start-today-btn">
            Start Today
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
