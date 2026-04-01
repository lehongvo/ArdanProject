'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/progress-store';
import { roadmapData } from '@/lib/roadmap-data';
import DayHeader from '@/components/day/DayHeader';
import LessonBlock from '@/components/day/LessonBlock';
import ChecklistBlock from '@/components/day/ChecklistBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function DayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dayId = parseInt(id, 10);
  const router = useRouter();

  const getDayStatus = useAppStore((s) => s.getDayStatus);
  const completeDay = useAppStore((s) => s.completeDay);
  const lessonProgress = useAppStore((s) => s.lessonProgress);

  const day = roadmapData.find((d) => d.id === dayId);
  if (!day) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Day not found.</p>
        <Link href="/roadmap" className="text-[#DEA584] hover:underline mt-2">
          Back to Roadmap
        </Link>
      </div>
    );
  }

  const status = getDayStatus(dayId);

  if (status === 'locked') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Lock className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Complete Day {dayId - 1} to unlock this day.</p>
        <Link href={`/day/${dayId - 1}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Day {dayId - 1}
          </Button>
        </Link>
      </div>
    );
  }

  const completedLessons = day.lessons.filter(
    (l) => lessonProgress[`${dayId}-${l.id}`]
  ).length;
  const progressPercent =
    day.lessons.length > 0 ? Math.round((completedLessons / day.lessons.length) * 100) : 0;

  const isCompleted = status === 'completed';

  const handleComplete = () => {
    completeDay(dayId);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DEA584', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
    });
    setTimeout(() => {
      if (dayId < 120) {
        router.push(`/day/${dayId + 1}`);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/roadmap"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roadmap
      </Link>

      <DayHeader day={day} />

      {!isCompleted && day.lessons.length > 0 && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedLessons}/{day.lessons.length} lessons ({progressPercent}%)
              </span>
            </div>
            <Progress value={progressPercent} className="h-2 [&>div]:bg-[#DEA584]" />
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="pt-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <p className="text-sm font-medium text-emerald-500">
              Day completed! Great work!
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Lessons</h2>
        {day.lessons.length > 0 ? (
          day.lessons.map((lesson) => (
            <LessonBlock key={lesson.id} lesson={lesson} dayId={dayId} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Detailed lesson content coming soon for this day.
          </p>
        )}
      </div>

      <ChecklistBlock day={day} />

      <div className="flex items-center justify-between pt-4 border-t border-border">
        {dayId > 1 ? (
          <Link href={`/day/${dayId - 1}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Day {dayId - 1}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {!isCompleted ? (
          <Button
            onClick={handleComplete}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            data-testid="complete-day-btn"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete Day {dayId}
          </Button>
        ) : dayId < 120 ? (
          <Link href={`/day/${dayId + 1}`}>
            <Button size="sm">
              Day {dayId + 1}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
