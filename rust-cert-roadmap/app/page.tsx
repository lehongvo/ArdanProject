'use client';

import TodayCard from '@/components/dashboard/TodayCard';
import StreakCounter from '@/components/dashboard/StreakCounter';
import PhaseProgress from '@/components/dashboard/PhaseProgress';
import QuickStats from '@/components/dashboard/QuickStats';
import { useAppStore } from '@/lib/progress-store';
import { roadmapData, getPhaseInfo } from '@/lib/roadmap-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';

const phaseMessages: Record<string, string> = {
  foundation: "You're building a strong foundation. Every expert was once a beginner!",
  intermediate: "You're leveling up! The concepts are getting deeper and more powerful.",
  advanced: "Advanced territory! You're becoming a true Rustacean.",
  'exam-prep': "Final stretch to certification. You've got this!",
  'job-hunt': "Time to showcase your skills to the world!",
  'interview-prep': "Almost there. Prepare to land your dream Rust job!",
};

export default function DashboardPage() {
  const currentDay = useAppStore((s) => s.currentDay);
  const mockExamResults = useAppStore((s) => s.mockExamResults);

  const today = roadmapData.find((d) => d.id === currentDay);
  const upcomingDays = roadmapData.filter((d) => d.id > currentDay && d.id <= currentDay + 3);
  const recentExams = mockExamResults.slice(-3).reverse();
  const motivationalMessage = today ? phaseMessages[today.phase] : "You've completed the journey!";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">{motivationalMessage}</p>
      </div>

      <QuickStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <TodayCard />
        <div className="space-y-6">
          <StreakCounter />
          <PhaseProgress />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Upcoming Days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDays.length > 0 ? (
              upcomingDays.map((day) => {
                const info = getPhaseInfo(day.phase);
                return (
                  <div
                    key={day.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground w-8">
                        D{day.id}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{day.title}</p>
                        <Badge variant="outline" className="text-xs mt-0.5">
                          {info.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming days</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Mock Scores</CardTitle>
              <Link href="/mock-exam" className="text-xs text-[#DEA584] hover:underline flex items-center gap-1">
                Take exam <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExams.length > 0 ? (
              recentExams.map((exam) => {
                const percent = Math.round((exam.score / exam.totalQuestions) * 100);
                return (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Trophy
                        className={`w-4 h-4 ${exam.passed ? 'text-emerald-500' : 'text-muted-foreground'}`}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {exam.score}/{exam.totalQuestions} ({percent}%)
                        </p>
                        <p className="text-xs text-muted-foreground">{exam.date}</p>
                      </div>
                    </div>
                    <Badge variant={exam.passed ? 'default' : 'secondary'}>
                      {exam.passed ? 'PASS' : 'FAIL'}
                    </Badge>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                No mock exams taken yet. Start practicing!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
