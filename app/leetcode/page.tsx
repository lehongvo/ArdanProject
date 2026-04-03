'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { useProgressStore, getLeetcodeStats } from '@/lib/progress-store';
import { LEETCODE_PROBLEMS } from '@/lib/leetcode-data';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'] as const;
const TAGS = ['All', 'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Tree', 'Graph', 'Binary Search', 'Linked List', 'Stack', 'Queue', 'Backtracking', 'Heap', 'Two Pointers', 'Sliding Window', 'Bit Manipulation'];
const DIFF_COLOR: Record<string, string> = { Easy: 'text-green-400', Medium: 'text-yellow-400', Hard: 'text-red-400' };

export default function LeetCodePage() {
  const { leetcodeProblems, toggleLeetcode } = useProgressStore();
  const stats = getLeetcodeStats(leetcodeProblems);
  const [difficulty, setDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [tag, setTag] = useState('All');
  const [showDone, setShowDone] = useState<'all' | 'done' | 'undone'>('all');

  // today's target
  const todayDone = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return Object.values(leetcodeProblems).filter((p) => p.doneAt?.startsWith(today)).length;
  }, [leetcodeProblems]);

  const filtered = useMemo(() => LEETCODE_PROBLEMS.filter((p) => {
    if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
    if (tag !== 'All' && !p.tags.includes(tag)) return false;
    const done = leetcodeProblems[p.id]?.done ?? false;
    if (showDone === 'done' && !done) return false;
    if (showDone === 'undone' && done) return false;
    return true;
  }), [difficulty, tag, showDone, leetcodeProblems]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white">LeetCode Tracker 💡</h1>
        <p className="text-sm text-[#888]">1000 bài · 33 bài/ngày · Giải bằng Rust</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-yellow-400">{stats.done}</p>
          <p className="text-xs text-[#888] mt-0.5">Đã xong</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-white">{1000 - stats.done}</p>
          <p className="text-xs text-[#888] mt-0.5">Còn lại</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-green-400">{todayDone}/33</p>
          <p className="text-xs text-[#888] mt-0.5">Hôm nay</p>
        </div>
      </div>

      {/* Progress */}
      <div className="card p-4">
        <div className="flex justify-between text-xs text-[#888] mb-2">
          <span>Tiến độ tổng thể</span><span>{stats.percent}%</span>
        </div>
        <div className="h-3 rounded-full bg-[#222]">
          <div className="h-3 rounded-full bg-yellow-400 transition-all" style={{ width: `${stats.percent}%` }} />
        </div>
        <div className="flex justify-between text-xs text-[#888] mt-2">
          <span>Mục tiêu hôm nay: 33 bài</span>
          <span className={todayDone >= 33 ? 'text-green-400' : 'text-[#888]'}>
            {todayDone >= 33 ? '✓ Hoàn thành!' : `${33 - todayDone} bài nữa`}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          {DIFFICULTIES.map((d) => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${difficulty === d ? 'bg-[#F97316] text-white' : 'bg-[#111] text-[#888] hover:text-white border border-[#222]'}`}>
              {d}
            </button>
          ))}
          <div className="w-px bg-[#222]" />
          {(['all', 'done', 'undone'] as const).map((v) => (
            <button key={v} onClick={() => setShowDone(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${showDone === v ? 'bg-[#8B5CF6] text-white' : 'bg-[#111] text-[#888] hover:text-white border border-[#222]'}`}>
              {v === 'all' ? 'Tất cả' : v === 'done' ? '✓ Xong' : '○ Chưa'}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {TAGS.slice(0, 10).map((t) => (
            <button key={t} onClick={() => setTag(t)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors ${tag === t ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : 'bg-[#111] text-[#888] hover:text-white border border-[#222]'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Problem list */}
      <p className="text-xs text-[#888]">{filtered.length} bài</p>
      <div className="space-y-1">
        {filtered.slice(0, 200).map((problem) => {
          const done = leetcodeProblems[problem.id]?.done ?? false;
          return (
            <div key={problem.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${done ? 'border-green-500/20 bg-green-500/5' : 'border-[#1a1a1a] hover:border-[#333] bg-[#111]'}`}>
              <button onClick={() => toggleLeetcode(problem.id)} className="shrink-0">
                {done ? <CheckCircle2 size={15} className="text-green-400" /> : <Circle size={15} className="text-[#555]" />}
              </button>
              <span className="text-xs text-[#888] w-10 shrink-0">#{problem.id}</span>
              <span className={`text-sm font-medium flex-1 truncate ${done ? 'line-through text-[#555]' : 'text-white'}`}>{problem.title}</span>
              <div className="flex items-center gap-2 shrink-0">
                {problem.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#888] hidden sm:block">{t}</span>
                ))}
                <span className={`text-xs font-medium w-14 text-right ${DIFF_COLOR[problem.difficulty]}`}>{problem.difficulty}</span>
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-yellow-400 transition-colors">
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
        {filtered.length > 200 && (
          <p className="text-center text-xs text-[#888] py-4">Hiển thị 200/{filtered.length} — dùng filter để thu hẹp</p>
        )}
      </div>
    </div>
  );
}
