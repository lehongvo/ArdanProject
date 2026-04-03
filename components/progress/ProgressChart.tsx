'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface DataPoint {
  date: string;
  completed: number;
  target: number;
}

interface ProgressChartProps {
  data: DataPoint[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-[#555] text-sm">
        Chưa có dữ liệu — bắt đầu học để thấy biểu đồ
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#666', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#666', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: 8,
            color: '#fff',
            fontSize: 12,
          }}
          labelStyle={{ color: '#888' }}
        />
        <ReferenceLine y={80} stroke="#F97316" strokeDasharray="4 4" strokeOpacity={0.5} />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#333"
          strokeDasharray="4 4"
          dot={false}
          strokeWidth={1}
          name="Mục tiêu"
        />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ fill: '#8B5CF6', r: 3 }}
          activeDot={{ r: 5, fill: '#F97316' }}
          name="Hoàn thành"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
