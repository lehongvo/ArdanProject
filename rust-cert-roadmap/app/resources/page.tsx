'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  BookOpen,
  GraduationCap,
  Code2,
  Blocks,
  Users,
  MessageSquare,
} from 'lucide-react';

const categories = [
  {
    title: 'Rust Learning',
    icon: BookOpen,
    color: 'text-blue-500',
    links: [
      { name: 'The Rust Programming Language (Book)', url: 'https://doc.rust-lang.org/book/', tag: 'Essential' },
      { name: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/', tag: 'Interactive' },
      { name: 'Rustlings Exercises', url: 'https://github.com/rust-lang/rustlings', tag: 'Practice' },
      { name: 'Exercism Rust Track', url: 'https://exercism.org/tracks/rust', tag: 'Practice' },
      { name: 'Ultimate Rust Crash Course (Udemy)', url: 'https://www.udemy.com/course/ultimate-rust-crash-course/', tag: 'Video' },
      { name: 'Ultimate Rust 2: Intermediate (Udemy)', url: 'https://www.udemy.com/course/ultimate-rust-2/', tag: 'Video' },
    ],
  },
  {
    title: 'Ardan Labs',
    icon: GraduationCap,
    color: 'text-amber-500',
    links: [
      { name: 'Ardan Labs Rust Certification', url: 'https://www.ardanlabs.com/certification/rust/', tag: 'Certification' },
      { name: 'Ardan Labs Training', url: 'https://www.ardanlabs.com/training/', tag: 'Training' },
      { name: 'Ardan Labs Blog', url: 'https://www.ardanlabs.com/blog/', tag: 'Articles' },
    ],
  },
  {
    title: 'Practice & Challenges',
    icon: Code2,
    color: 'text-emerald-500',
    links: [
      { name: 'Advent of Code', url: 'https://adventofcode.com/', tag: 'Challenges' },
      { name: 'LeetCode (Rust)', url: 'https://leetcode.com/', tag: 'DSA' },
      { name: 'Codewars (Rust)', url: 'https://www.codewars.com/?language=rust', tag: 'Practice' },
      { name: 'Rust Playground', url: 'https://play.rust-lang.org/', tag: 'Tool' },
      { name: 'Rust Quiz', url: 'https://dtolnay.github.io/rust-quiz/', tag: 'Quiz' },
    ],
  },
  {
    title: 'Blockchain & Rust',
    icon: Blocks,
    color: 'text-violet-500',
    links: [
      { name: 'Solana Development', url: 'https://solana.com/developers', tag: 'Solana' },
      { name: 'Polkadot / Substrate', url: 'https://substrate.io/', tag: 'Substrate' },
      { name: 'NEAR Protocol', url: 'https://near.org/', tag: 'NEAR' },
      { name: 'Anchor Framework', url: 'https://www.anchor-lang.com/', tag: 'Solana' },
    ],
  },
  {
    title: 'Community',
    icon: Users,
    color: 'text-pink-500',
    links: [
      { name: 'Rust Users Forum', url: 'https://users.rust-lang.org/', tag: 'Forum' },
      { name: 'r/rust (Reddit)', url: 'https://www.reddit.com/r/rust/', tag: 'Reddit' },
      { name: 'This Week in Rust', url: 'https://this-week-in-rust.org/', tag: 'Newsletter' },
      { name: 'Rust Discord', url: 'https://discord.gg/rust-lang', tag: 'Chat' },
    ],
  },
  {
    title: 'Interview Prep',
    icon: MessageSquare,
    color: 'text-red-500',
    links: [
      { name: 'Rust Interview Questions', url: 'https://github.com/nickkos1/rust-interview-questions', tag: 'Questions' },
      { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', tag: 'Design' },
      { name: 'Neetcode', url: 'https://neetcode.io/', tag: 'DSA' },
      { name: 'Pramp (Mock Interviews)', url: 'https://www.pramp.com/', tag: 'Practice' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="text-muted-foreground mt-1">
          Curated links for your Rust learning journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.title}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm group-hover:text-[#DEA584] transition-colors">
                      {link.name}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {link.tag}
                    </Badge>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
