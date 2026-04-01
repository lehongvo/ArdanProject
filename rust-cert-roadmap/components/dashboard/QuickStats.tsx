'use client';

import { useAppStore } from '@/lib/progress-store';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, FileQuestion, Briefcase, Flame } from 'lucide-react';

export default function QuickStats() {
  const completedDays = useAppStore((s) => s.completedDays);
  const mockExamResults = useAppStore((s) => s.mockExamResults);
  const jobApplications = useAppStore((s) => s.jobApplications);
  const streak = useAppStore((s) => s.streak);

  const avgScore =
    mockExamResults.length > 0
      ? Math.round(
          mockExamResults.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 100, 0) /
            mockExamResults.length
        )
      : 0;

  const appliedJobs = jobApplications.filter(
    (j) => j.status !== 'bookmarked'
  ).length;

  const stats = [
    {
      label: 'Days Completed',
      value: completedDays.length,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Mock Avg',
      value: mockExamResults.length > 0 ? `${avgScore}%` : '--',
      icon: FileQuestion,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Jobs Applied',
      value: appliedJobs,
      icon: Briefcase,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Streak',
      value: streak,
      icon: Flame,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-testid="quick-stats">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
