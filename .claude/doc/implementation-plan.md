# Blockchain/ZK/Rust/Solana Roadmap — Implementation Plan

## Project Context
- Working directory: `/Users/user/Desktop/ArdanProject/`
- Next.js 16.2.2 + React 19 + Tailwind 4 (already scaffolded)
- Build in the project root (not a subfolder)
- Dark mode default: `#0A0A0A` bg, `#111111` cards
- Bilingual: Vietnamese headings + English subtitles

---

## Milestones

### Milestone 1: Setup (Steps 0–2)
| Step | Task | Complexity | Notes |
|------|------|-----------|-------|
| 0 | Read Next.js 16.2.2 docs / check breaking changes | S | Check node_modules/next for changelog |
| 1 | Install dependencies (zustand, recharts, lucide-react, @dnd-kit, canvas-confetti) | S | npm install from project root |
| 2 | Install shadcn/ui components | M | tailwind 4 requires CSS variable setup, use `npx shadcn@latest init` |

**Dependencies:** Must complete before any code.

---

### Milestone 2: Data Layer (Steps 3–8)
| Step | Task | Complexity | Notes |
|------|------|-----------|-------|
| 3 | `types/index.ts` — all TypeScript interfaces | M | Foundation for all other files |
| 4 | `lib/roadmap-data.ts` — 10 phases with weekly breakdown | L | Full data for phases 1-3; pattern for 4-10 |
| 5 | `lib/leetcode-data.ts` — 1000 problems | L | Generate programmatically by category |
| 6 | `lib/solana-projects.ts` — 10 project specs | S | Well-defined specs with success criteria |
| 7 | `lib/exam-questions.ts` — 50+ questions per cert type | L | Rust + ZK original questions |
| 8 | `lib/progress-store.ts` — Zustand store + persist | M | All actions, localStorage key `blockchain-roadmap-store` |

**Dependencies:** Step 3 must complete before 4–8. Steps 4–8 are independent of each other.

---

### Milestone 3: Layout Shell (Step 9)
| Step | Task | Complexity | Notes |
|------|------|-----------|-------|
| 9a | `app/layout.tsx` — root layout with sidebar | M | Sidebar 240px, mobile bottom nav |
| 9b | `components/layout/Sidebar.tsx` | M | Nav links to all 9 pages, phase indicator |
| 9c | `components/layout/Header.tsx` | S | Mobile header with hamburger, streak badge |
| 9d | `components/layout/MobileNav.tsx` | S | Bottom nav for mobile |

**Dependencies:** Must complete before any page work.

---

### Milestone 4: Core Pages (Steps 10–13)
| Step | Task | Complexity | Notes |
|------|------|-----------|-------|
| 10 | Dashboard `app/page.tsx` | L | TodayCard, StreakCounter, PhaseProgress, QuickStats, LeetCodeDaily |
| 11 | Roadmap `app/roadmap/page.tsx` | M | 2×5 phase grid + 52-week timeline |
| 12 | Phase Detail `app/phase/[id]/page.tsx` | L | Weekly accordion, task checklist, confetti |
| 13 | LeetCode `app/leetcode/page.tsx` | L | 1000-problem grid, filters, daily target |

**Dependencies:** Data layer (Milestone 2) and Layout (Milestone 3) must be complete.

---

### Milestone 5: Secondary Pages (Steps 14–19)
| Step | Task | Complexity | Notes |
|------|------|-----------|-------|
| 14 | Projects `app/projects/page.tsx` | M | 10 Solana project cards, status selector |
| 15 | Mock Exam `app/mock-exam/page.tsx` | L | Timer, Q/A cards, result summary |
| 16 | Job Tracker `app/job-tracker/page.tsx` | L | Kanban board with DnD |
| 17 | Progress `app/progress/page.tsx` | M | LineChart, SkillRadar, HeatMap |
| 18 | Resources `app/resources/page.tsx` | S | Curated links by phase |
| 19 | README.md | S | Setup instructions |

**Dependencies:** Core pages (Milestone 4) pattern established before secondary pages.

---

## Critical Path
```
Step 0 → Step 1 → Step 2 → Step 3 → Steps 4-8 (parallel) → Step 9 → Steps 10-13 → Steps 14-19
```

---

## Next.js 16 / React 19 Key Notes
- `'use client'` required for ANY component using hooks, useState, useEffect, browser APIs
- Server Components are the default — data files (lib/) are server-safe
- Dynamic routes: `app/phase/[id]/page.tsx` — use `params` as Promise in Next.js 15+
- No `useRouter` from `next/router` — use `next/navigation`
- `next/font` still works, Geist already configured in layout.tsx
- Tailwind 4: uses CSS `@import "tailwindcss"` (already in globals.css), no tailwind.config.js needed
- shadcn/ui: use `npx shadcn@latest` (not `shadcn-ui`) for Next.js 15+ compatibility

---

## shadcn/ui Components Needed
- button, card, badge, input, label, textarea, checkbox, dialog, select, tabs, progress, separator, scroll-area, tooltip, accordion

---

## File Structure to Create
```
/Users/user/Desktop/ArdanProject/
├── types/
│   └── index.ts
├── lib/
│   ├── roadmap-data.ts
│   ├── leetcode-data.ts
│   ├── solana-projects.ts
│   ├── exam-questions.ts
│   ├── progress-store.ts
│   └── utils.ts
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   ├── dashboard/
│   │   ├── TodayCard.tsx
│   │   ├── StreakCounter.tsx
│   │   ├── PhaseProgress.tsx
│   │   └── QuickStats.tsx
│   ├── phase/
│   │   ├── PhaseHeader.tsx
│   │   ├── WeekGrid.tsx
│   │   ├── TaskBlock.tsx
│   │   └── ResourceLinks.tsx
│   ├── progress/
│   │   ├── ProgressChart.tsx
│   │   ├── HeatMap.tsx
│   │   └── SkillRadar.tsx
│   ├── mock-exam/
│   │   ├── QuestionCard.tsx
│   │   ├── Timer.tsx
│   │   └── ResultSummary.tsx
│   ├── leetcode/
│   │   ├── ProblemGrid.tsx
│   │   ├── DailyTarget.tsx
│   │   └── TagFilter.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectStatus.tsx
│   └── job-tracker/
│       ├── KanbanBoard.tsx
│       ├── JobCard.tsx
│       └── AddJobModal.tsx
├── app/
│   ├── layout.tsx          (rewrite)
│   ├── page.tsx            (rewrite — dashboard)
│   ├── globals.css         (extend)
│   ├── roadmap/page.tsx
│   ├── phase/[id]/page.tsx
│   ├── week/[id]/page.tsx
│   ├── progress/page.tsx
│   ├── mock-exam/page.tsx
│   ├── leetcode/page.tsx
│   ├── projects/page.tsx
│   ├── job-tracker/page.tsx
│   └── resources/page.tsx
└── README.md
```
