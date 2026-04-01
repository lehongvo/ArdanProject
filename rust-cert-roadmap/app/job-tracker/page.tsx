'use client';

import { useAppStore } from '@/lib/progress-store';
import KanbanBoard from '@/components/job-tracker/KanbanBoard';
import AddJobModal from '@/components/job-tracker/AddJobModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Briefcase, Send, MessageSquare, Trophy } from 'lucide-react';

const jobBoards = [
  { name: 'web3.career', url: 'https://web3.career', desc: 'Web3 & Blockchain jobs' },
  { name: 'Wellfound', url: 'https://wellfound.com', desc: 'Startup jobs' },
  { name: 'Remote3', url: 'https://remote3.co', desc: 'Remote Web3 jobs' },
  { name: 'Rust Jobs', url: 'https://rustjobs.dev', desc: 'Rust-specific jobs' },
  { name: 'LinkedIn', url: 'https://linkedin.com/jobs', desc: 'Professional network' },
];

const cvChecklist = [
  'Add Ardan Labs Rust Certification to certifications section',
  'Update skills section with Rust, Cargo, async/await, concurrency',
  'Add Rust projects to portfolio section',
  'Update GitHub profile with pinned Rust repos',
  'Write a summary highlighting systems programming experience',
  'Tailor resume for each application',
];

export default function JobTrackerPage() {
  const jobApplications = useAppStore((s) => s.jobApplications);

  const statusCounts = {
    bookmarked: jobApplications.filter((j) => j.status === 'bookmarked').length,
    applied: jobApplications.filter((j) => j.status === 'applied').length,
    interview: jobApplications.filter((j) => j.status === 'interview').length,
    offer: jobApplications.filter((j) => j.status === 'offer').length,
    rejected: jobApplications.filter((j) => j.status === 'rejected').length,
  };

  const stats = [
    { label: 'Total', value: jobApplications.length, icon: Briefcase, color: 'text-foreground' },
    { label: 'Applied', value: statusCounts.applied, icon: Send, color: 'text-blue-500' },
    { label: 'Interviews', value: statusCounts.interview, icon: MessageSquare, color: 'text-amber-500' },
    { label: 'Offers', value: statusCounts.offer, icon: Trophy, color: 'text-emerald-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your Rust job applications
          </p>
        </div>
        <AddJobModal />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4 flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <KanbanBoard />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Job Boards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {jobBoards.map((board) => (
              <a
                key={board.name}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{board.name}</p>
                  <p className="text-xs text-muted-foreground">{board.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">CV Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cvChecklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Checkbox id={`cv-${i}`} className="mt-0.5" />
                <label htmlFor={`cv-${i}`} className="text-sm text-muted-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
