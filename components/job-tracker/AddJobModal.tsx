'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { JobApplication } from '@/types';

interface AddJobModalProps {
  onClose: () => void;
  onAdd: (job: JobApplication) => void;
}

const PLATFORMS: JobApplication['platform'][] = ['web3.career', 'wellfound', 'remote3', 'linkedin', 'other'];
const STATUSES: JobApplication['status'][] = ['bookmarked', 'applied', 'interview', 'offer', 'rejected'];

export function AddJobModal({ onClose, onAdd }: AddJobModalProps) {
  const [form, setForm] = useState({
    company: '',
    position: '',
    salary: '',
    url: '',
    platform: 'web3.career' as JobApplication['platform'],
    status: 'bookmarked' as JobApplication['status'],
    notes: '',
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.position) return;

    onAdd({
      id: crypto.randomUUID(),
      company: form.company,
      position: form.position,
      salary: form.salary || undefined,
      url: form.url,
      platform: form.platform,
      status: form.status,
      notes: form.notes,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      appliedDate: form.status !== 'bookmarked' ? new Date().toISOString().split('T')[0] : undefined,
    });
    onClose();
  };

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div>
      <label className="text-xs text-[#888] block mb-1">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#555] outline-none focus:border-[#F97316]/60"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222]">
          <h2 className="text-base font-bold text-white">Thêm Việc Làm</h2>
          <button onClick={onClose} className="text-[#888] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {field('Công ty *', 'company', 'text', 'Alchemy, Solana Labs...')}
          {field('Vị trí *', 'position', 'text', 'Rust Engineer, Blockchain Dev...')}

          <div className="grid grid-cols-2 gap-3">
            {field('Mức lương', 'salary', 'text', '$120k–$180k')}
            {field('URL', 'url', 'url', 'https://...')}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#888] block mb-1">Platform</label>
              <select
                value={form.platform}
                onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value as JobApplication['platform'] }))}
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#F97316]/60"
              >
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#888] block mb-1">Trạng thái</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as JobApplication['status'] }))}
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#F97316]/60"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {field('Tags (phân cách bằng dấu phẩy)', 'tags', 'text', 'Rust, Solana, Remote...')}

          <div>
            <label className="text-xs text-[#888] block mb-1">Ghi chú</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              rows={2}
              placeholder="Thông tin thêm..."
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#555] outline-none focus:border-[#F97316]/60 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm font-medium hover:text-white hover:border-[#444] transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              data-testid="add-job-submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F97316] text-white text-sm font-bold hover:bg-[#ea6c0a] transition-colors"
            >
              <Plus size={14} />
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
