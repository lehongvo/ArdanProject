'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/progress-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { JobApplication } from '@/types';

export default function AddJobModal() {
  const [open, setOpen] = useState(false);
  const addJobApplication = useAppStore((s) => s.addJobApplication);

  const [form, setForm] = useState({
    company: '',
    position: '',
    salary: '',
    url: '',
    notes: '',
    platform: 'other' as JobApplication['platform'],
    status: 'bookmarked' as JobApplication['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.position) return;

    addJobApplication({
      id: crypto.randomUUID(),
      company: form.company,
      position: form.position,
      salary: form.salary || undefined,
      url: form.url,
      notes: form.notes,
      platform: form.platform,
      status: form.status,
      appliedDate: form.status !== 'bookmarked' ? new Date().toISOString().split('T')[0] : undefined,
    });

    setForm({ company: '', position: '', salary: '', url: '', notes: '', platform: 'other', status: 'bookmarked' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button className="bg-[#DEA584] hover:bg-[#c8916f] text-black" data-testid="add-job-btn" />}
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Job
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Company *</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="Company name"
                data-testid="job-company"
              />
            </div>
            <div>
              <Label className="text-xs">Position *</Label>
              <Input
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                placeholder="Rust Developer"
                data-testid="job-position"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Salary</Label>
              <Input
                value={form.salary}
                onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
                placeholder="$120k-150k"
              />
            </div>
            <div>
              <Label className="text-xs">Platform</Label>
              <Select
                value={form.platform}
                onValueChange={(v) => setForm((f) => ({ ...f, platform: v as JobApplication['platform'] }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="web3.career">web3.career</SelectItem>
                  <SelectItem value="wellfound">Wellfound</SelectItem>
                  <SelectItem value="remote3">Remote3</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs">URL</Label>
            <Input
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label className="text-xs">Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any notes..."
              className="min-h-[60px]"
            />
          </div>
          <Button type="submit" className="w-full" data-testid="submit-job">
            Add Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
