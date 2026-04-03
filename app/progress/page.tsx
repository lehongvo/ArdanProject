'use client';

import { useMemo } from 'react';
import { useProgressStore, getLeetcodeStats, getMockAverage } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';

const SKILLS = ['Rust', 'Solana', 'ZK', 'Algorithms', 'Systems', 'Cryptography', 'DeFi', 'Security'];

export default function ProgressPage() {
  const { completedPhases, completedTasks, leetcodeProblems, mockExamResults, studyStreak } = useProgressStore();
  const lc = getLeetcodeStats(leetcodeProblems);
  const mockAvg = getMockAverage(mockExamResults);

  const phaseData = useMemo(() => PHASES.map((phase) => {
    const total = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
    const done = completedTasks.filter((id) => id.startsWith(`p${phase.id}w`)).length;
    return { name: phase.shortName, pct: total > 0 ? Math.round(done / total * 100) : 0, color: phase.color };
  }), [completedTasks]);

  const skillData = useMemo(() => {
    const p1Done = completedPhases.includes(1) || completedPhases.includes(2) ? 80 : completedPhases.includes(1) ? 60 : 10;
    const solDone = completedPhases.includes(5) ? 60 : completedPhases.includes(6) ? 90 : 10;
    return SKILLS.map((skill) => ({
      skill,
      value: {
        Rust: p1Done, Solana: solDone, ZK: completedPhases.includes(9) ? 80 : 5,
        Algorithms: Math.round(lc.percent * 0.8), Systems: completedPhases.includes(8) ? 70 : 10,
        Cryptography: completedPhases.includes(9) ? 60 : 5, DeFi: completedPhases.includes(6) ? 70 : 10,
        Security: completedPhases.includes(6) ? 50 : 5,
      }[skill] ?? 5,
    }));
  }, [completedPhases, lc.percent]);

  const lineData = useMemo(() => {
    return Array.from({ length: Math.max(mockExamResults.length, 1) }, (_, i) => {
      const r = mockExamResults[mockExamResults.length - 1 - i];
      return r ? { exam: `#${mockExamResults.length - i}`, score: Math.round(r.score / r.totalQuestions * 100) } : null;
    }).filter(Boolean).reverse();
  }, [mockExamResults]);

  const totalHours = completedTasks.length * 1; // ~1h per task

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white">Tiến Độ 📊</h1>
        <p className="text-sm text-[#888]">Tổng quan quá trình học tập của bạn</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Phases xong', value: completedPhases.length, suffix: '/10', color: 'text-orange-400' },
          { label: 'Tasks hoàn thành', value: completedTasks.length, suffix: '', color: 'text-green-400' },
          { label: 'LeetCode', value: lc.done, suffix: '/1000', color: 'text-yellow-400' },
          { label: 'Mock avg', value: mockAvg, suffix: '%', color: 'text-purple-400' },
        ].map(({ label, value, suffix, color }) => (
          <div key={label} className="card p-4 text-center">
            <p className={`text-2xl font-black ${color}`}>{value}<span className="text-sm font-normal text-[#888]">{suffix}</span></p>
            <p className="text-xs text-[#888] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Phase progress bars */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Tiến Độ Từng Phase</h2>
        <div className="space-y-3">
          {phaseData.map((p, i) => (
            <div key={p.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#ccc]">Phase {i + 1} · {p.name}</span>
                <span className="text-[#888]">{p.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#222]">
                <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skill Radar */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Skill Radar</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#222" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#888', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Mock exam scores */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Mock Exam Scores</h2>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData}>
                <XAxis dataKey="exam" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#F97316" strokeWidth={2} dot={{ fill: '#F97316', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center">
              <p className="text-sm text-[#888]">Làm mock exam để xem biểu đồ điểm số</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-xl font-black text-white">{totalHours}h</p>
          <p className="text-xs text-[#888]">Giờ học ước tính</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xl font-black text-orange-400">{studyStreak}</p>
          <p className="text-xs text-[#888]">Ngày streak</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xl font-black text-[#888]">
            {completedPhases.length < 10 ? `~${(10 - completedPhases.length) * 4} tháng` : 'Xong!'}
          </p>
          <p className="text-xs text-[#888]">Còn lại</p>
        </div>
      </div>
    </div>
  );
}
