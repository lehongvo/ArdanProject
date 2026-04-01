'use client';

import { useAppStore } from '@/lib/progress-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ProgressChart() {
  const completedDays = useAppStore((s) => s.completedDays);

  const sorted = [...completedDays].sort((a, b) => a - b);
  const data = sorted.map((dayId, index) => ({
    day: `Day ${dayId}`,
    completed: index + 1,
    target: Math.round((dayId / 120) * 120),
  }));

  if (data.length === 0) {
    data.push({ day: 'Day 0', completed: 0, target: 0 });
  }

  return (
    <Card data-testid="progress-chart">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Completion Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#DEA584"
                strokeWidth={2}
                dot={{ fill: '#DEA584', r: 3 }}
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
