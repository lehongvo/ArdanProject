'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillData {
  skill: string;
  level: number;
  fullMark: number;
}

interface SkillRadarProps {
  data: SkillData[];
}

export function SkillRadar({ data }: SkillRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#1a1a1a" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: '#888', fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: 8,
            color: '#fff',
            fontSize: 12,
          }}
        />
        <Radar
          name="Level"
          dataKey="level"
          stroke="#8B5CF6"
          fill="#8B5CF6"
          fillOpacity={0.2}
          dot={{ fill: '#8B5CF6', r: 3 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
