'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/progress-store';
import { Star, BookOpenCheck } from 'lucide-react';
import type { DayPlan } from '@/types';

export default function ChecklistBlock({ day }: { day: DayPlan }) {
  const dayNotes = useAppStore((s) => s.dayNotes);
  const dayRatings = useAppStore((s) => s.dayRatings);
  const setDayNote = useAppStore((s) => s.setDayNote);
  const setDayRating = useAppStore((s) => s.setDayRating);
  const note = dayNotes[day.id] || '';
  const rating = dayRatings[day.id];

  return (
    <div className="space-y-4">
      {day.dailyChallenge && (
        <Card className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="text-lg">🏆</span> Daily Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-medium">{day.dailyChallenge.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{day.dailyChallenge.description}</p>
            <Badge variant="outline" className="mt-2 text-xs">
              ~{day.dailyChallenge.estimatedTime}m
            </Badge>
          </CardContent>
        </Card>
      )}

      {day.reviewTopics.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4" /> Review Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {day.reviewTopics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Day Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Write your notes, reflections, or questions from today's study..."
            value={note}
            onChange={(e) => setDayNote(day.id, e.target.value)}
            className="min-h-[100px] text-sm"
            data-testid="day-notes"
          />
          <div>
            <p className="text-xs text-muted-foreground mb-2">Rate this day:</p>
            <div className="flex gap-1" data-testid="day-rating">
              {([1, 2, 3, 4, 5] as const).map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setDayRating(day.id, star)}
                >
                  <Star
                    className={`w-5 h-5 ${
                      rating && rating >= star
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
