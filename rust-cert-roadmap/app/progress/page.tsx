'use client';

import { useAppStore } from '@/lib/progress-store';
import ProgressChart from '@/components/progress/ProgressChart';
import HeatMap from '@/components/progress/HeatMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Clock, Target, TrendingUp, Calendar } from 'lucide-react';

const skillDimensions = [
  'Ownership',
  'Type System',
  'Error Handling',
  'Concurrency',
  'Traits & Generics',
  'Memory',
  'Async',
  'Testing',
];

export default function ProgressPage() {
  const completedDays = useAppStore((s) => s.completedDays);
  const mockExamResults = useAppStore((s) => s.mockExamResults);
  const settings = useAppStore((s) => s.settings);

  const totalHours = completedDays.length * settings.dailyHours;
  const progressPercent = Math.round((completedDays.length / 120) * 100);
  const daysRemaining = 120 - completedDays.length;
  const estimatedCompletionDays = daysRemaining;

  const avgMockScore =
    mockExamResults.length > 0
      ? Math.round(
          mockExamResults.reduce((s, r) => s + (r.score / r.totalQuestions) * 100, 0) /
            mockExamResults.length
        )
      : 0;

  // Estimate skill levels based on completed days
  const getSkillLevel = (skill: string): number => {
    const dayCount = completedDays.length;
    const base = Math.min(100, Math.round((dayCount / 120) * 100));
    const topicBoost = mockExamResults.length > 0 ? avgMockScore / 10 : 0;
    // Add some variance per skill
    const hash = skill.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const variance = ((hash % 20) - 10);
    return Math.max(0, Math.min(100, base + topicBoost + variance));
  };

  const radarData = skillDimensions.map((skill) => ({
    skill,
    level: getSkillLevel(skill),
    fullMark: 100,
  }));

  const stats = [
    { label: 'Total Hours', value: `${totalHours}h`, icon: Clock, color: 'text-blue-500' },
    { label: 'Progress', value: `${progressPercent}%`, icon: Target, color: 'text-emerald-500' },
    { label: 'Mock Avg', value: avgMockScore > 0 ? `${avgMockScore}%` : '--', icon: TrendingUp, color: 'text-amber-500' },
    { label: 'Days Left', value: daysRemaining, icon: Calendar, color: 'text-violet-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning journey
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressChart />

        <Card data-testid="skill-radar">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Skill Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="Skill Level"
                    dataKey="level"
                    stroke="#DEA584"
                    fill="#DEA584"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <HeatMap />

      {estimatedCompletionDays > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#DEA584]" />
              <div>
                <p className="text-sm font-medium">Completion Forecast</p>
                <p className="text-xs text-muted-foreground">
                  At your current pace, you&apos;ll complete the roadmap in approximately{' '}
                  <span className="font-medium text-foreground">{estimatedCompletionDays} days</span>.
                  Keep going!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
