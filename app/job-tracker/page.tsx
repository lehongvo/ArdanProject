'use client';

import { useState } from 'react';
import { Plus, ExternalLink, Briefcase, Target } from 'lucide-react';
import { KanbanBoard } from '@/components/job-tracker/KanbanBoard';
import { AddJobModal } from '@/components/job-tracker/AddJobModal';
import { useProgressStore } from '@/lib/progress-store';
import type { JobApplication } from '@/types';

const JOB_BOARDS = [
  { name: 'web3.career', url: 'https://web3.career/rust-jobs', color: '#F97316' },
  { name: 'Wellfound', url: 'https://wellfound.com/jobs?q=rust', color: '#6366f1' },
  { name: 'Remote3', url: 'https://remote3.co/blockchain-jobs', color: '#10b981' },
  { name: 'LinkedIn', url: 'https://linkedin.com/jobs/search/?keywords=rust+blockchain', color: '#0077b5' },
  { name: 'Alchemy Jobs', url: 'https://jobs.alchemy.com/', color: '#8B5CF6' },
];

const CV_CHECKLIST = [
  'Thêm Ardan Labs Rust Certification',
  '10 Solana projects trên GitHub',
  'ZK proof project (Circom/Groth16)',
  'Rust crate published trên crates.io',
  'Benchmark: X% faster than Go alternative',
  'LinkedIn headline: "Rust/Solana Engineer | ZK"',
  'Open source contributions to Solana ecosystem',
];

export default function JobTrackerPage() {
  const { jobApplications, addJob, updateJob, removeJob } = useProgressStore();
  const [showModal, setShowModal] = useState(false);

  const stats = {
    total: jobApplications.length,
    applied: jobApplications.filter((j) => j.status === 'applied').length,
    interview: jobApplications.filter((j) => j.status === 'interview').length,
    offer: jobApplications.filter((j) => j.status === 'offer').length,
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Job Tracker 💼</h1>
          <p className="text-sm text-[#888]">Web3 · Blockchain · Rust · Remote — theo dõi ứng tuyển</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          data-testid="add-job-btn"
          className="flex items-center gap-2 bg-[#F97316] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#ea6c0a] transition-colors"
        >
          <Plus size={14} />
          Thêm Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tổng', value: stats.total, color: 'text-white' },
          { label: 'Applied', value: stats.applied, color: 'text-blue-400' },
          { label: 'Interview', value: stats.interview, color: 'text-yellow-400' },
          { label: 'Offer', value: stats.offer, color: 'text-green-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4 text-center">
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-[#888] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Job board quick links */}
      <div className="card p-4">
        <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">
          Job Boards
        </p>
        <div className="flex flex-wrap gap-2">
          {JOB_BOARDS.map(({ name, url, color }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:scale-105"
              style={{ borderColor: color + '44', color: color, background: color + '11' }}
            >
              <ExternalLink size={10} />
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* Kanban */}
      {jobApplications.length > 0 ? (
        <KanbanBoard
          jobs={jobApplications}
          onUpdate={(id, status) => updateJob(id, status as JobApplication['status'])}
          onRemove={removeJob}
        />
      ) : (
        <div className="card p-10 text-center">
          <Briefcase size={32} className="text-[#333] mx-auto mb-3" />
          <p className="text-[#888] text-sm">Chưa có job nào. Thêm job đầu tiên!</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-[#F97316] text-white text-sm font-medium hover:bg-[#ea6c0a] transition-colors"
          >
            Thêm Job
          </button>
        </div>
      )}

      {/* CV Checklist */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target size={16} className="text-[#F97316]" />
          <h3 className="text-sm font-semibold text-white">CV Checklist</h3>
        </div>
        <div className="space-y-2">
          {CV_CHECKLIST.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-[#ccc]">
              <div className="w-4 h-4 rounded border border-[#333] shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddJobModal onClose={() => setShowModal(false)} onAdd={addJob} />
      )}
    </div>
  );
}
