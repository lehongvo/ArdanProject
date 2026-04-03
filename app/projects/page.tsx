'use client';

import { useState } from 'react';
import { GitBranch, Globe, ChevronDown } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { SOLANA_PROJECTS } from '@/lib/solana-projects';
import type { SolanaProject } from '@/types';

const DIFF_COLOR = { beginner: 'text-green-400 bg-green-400/10', intermediate: 'text-yellow-400 bg-yellow-400/10', advanced: 'text-red-400 bg-red-400/10' };
const STATUS_OPTS: SolanaProject['status'][] = ['not-started', 'in-progress', 'completed', 'deployed'];
const STATUS_LABEL: Record<string, string> = { 'not-started': 'Chưa bắt đầu', 'in-progress': 'Đang làm', completed: 'Hoàn thành', deployed: '🚀 Deploy' };
const STATUS_COLOR: Record<string, string> = { 'not-started': 'text-[#888]', 'in-progress': 'text-yellow-400', completed: 'text-green-400', deployed: 'text-purple-400' };

export default function ProjectsPage() {
  const { solanaProjects, updateProject } = useProgressStore();
  const [open, setOpen] = useState<number | null>(null);

  const completed = Object.values(solanaProjects).filter((p) => p.status === 'completed' || p.status === 'deployed').length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white">10 Dự Án Solana 🚀</h1>
        <p className="text-sm text-[#888]">Build 10 real projects — DEX, DAO, Lending, ZK và nhiều hơn</p>
      </div>

      {/* Progress */}
      <div className="card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white font-medium">{completed}/10 Projects</span>
          <span className="text-[#888]">{Math.round(completed / 10 * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#222]">
          <div className="h-2 rounded-full bg-[#8B5CF6] transition-all" style={{ width: `${completed / 10 * 100}%` }} />
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-3">
        {SOLANA_PROJECTS.map((project) => {
          const saved = solanaProjects[project.id] ?? {};
          const status: SolanaProject['status'] = saved.status ?? 'not-started';
          const isOpen = open === project.id;

          return (
            <div key={project.id} className="card overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center text-sm font-bold shrink-0">
                      {project.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white">{project.name}</h3>
                      <p className="text-xs text-[#888] mt-0.5 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${DIFF_COLOR[project.difficulty]}`}>
                          {project.difficulty}
                        </span>
                        <span className="text-[10px] text-[#888]">~{project.estimatedDays} ngày</span>
                        {project.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#888]">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={status}
                      onChange={(e) => updateProject(project.id, { status: e.target.value as SolanaProject['status'] })}
                      className={`text-xs bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 outline-none ${STATUS_COLOR[status]}`}
                    >
                      {STATUS_OPTS.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                    <button onClick={() => setOpen(isOpen ? null : project.id)} className="text-[#888] hover:text-white transition-colors p-1">
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-[#222] p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-[#888] mb-2">Mục tiêu</p>
                    <ul className="space-y-1">
                      {project.objectives.map((o) => (
                        <li key={o} className="text-xs text-[#ccc] flex items-start gap-2">
                          <span className="text-[#8B5CF6] shrink-0">›</span>{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#888] block mb-1">GitHub URL</label>
                      <div className="flex items-center gap-2">
                        <GitBranch size={12} className="text-[#888] shrink-0" />
                        <input
                          type="url"
                          placeholder="https://github.com/..."
                          defaultValue={saved.githubUrl ?? ''}
                          onBlur={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                          className="flex-1 bg-[#0d0d0d] border border-[#333] rounded px-2 py-1 text-xs text-white outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#888] block mb-1">Deploy URL</label>
                      <div className="flex items-center gap-2">
                        <Globe size={12} className="text-[#888] shrink-0" />
                        <input
                          type="url"
                          placeholder="https://..."
                          defaultValue={saved.deployedUrl ?? ''}
                          onBlur={(e) => updateProject(project.id, { deployedUrl: e.target.value })}
                          className="flex-1 bg-[#0d0d0d] border border-[#333] rounded px-2 py-1 text-xs text-white outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Ghi chú..."
                    defaultValue={saved.notes ?? ''}
                    onBlur={(e) => updateProject(project.id, { notes: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#333] rounded-lg px-3 py-2 text-xs text-white resize-none outline-none focus:border-[#8B5CF6] placeholder:text-[#555]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
