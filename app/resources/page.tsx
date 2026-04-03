import { ExternalLink } from 'lucide-react';

const RESOURCES = [
  {
    phase: 'Phase 1–2 · Rust', color: '#F97316', icon: '🦀',
    items: [
      { label: 'Learn to Code with Rust (Udemy)', url: 'https://www.udemy.com/course/learn-to-code-with-rust/', type: 'Course' },
      { label: 'Rust Programming Master Class (Udemy)', url: 'https://www.udemy.com/course/rust-programming-master-class/', type: 'Course' },
      { label: 'The Rust Book (official)', url: 'https://doc.rust-lang.org/book/', type: 'Book' },
      { label: 'Rustlings — exercises', url: 'https://github.com/rust-lang/rustlings', type: 'Practice' },
      { label: 'Exercism Rust Track', url: 'https://exercism.org/tracks/rust', type: 'Practice' },
      { label: 'Rust Playground', url: 'https://play.rust-lang.org/', type: 'Tool' },
    ],
  },
  {
    phase: 'Phase 3 · Ardan Labs Cert', color: '#EF4444', icon: '🎓',
    items: [
      { label: 'Ardan Labs Rust Training Bundle', url: 'https://www.ardanlabs.com/training/rust/', type: 'Course' },
      { label: 'Ardan Labs Certification', url: 'https://www.ardanlabs.com/certification/', type: 'Cert' },
      { label: 'Rust Reference', url: 'https://doc.rust-lang.org/reference/', type: 'Docs' },
      { label: 'Rust Nomicon (unsafe)', url: 'https://doc.rust-lang.org/nomicon/', type: 'Book' },
    ],
  },
  {
    phase: 'Phase 4 · LeetCode', color: '#EAB308', icon: '💡',
    items: [
      { label: 'LeetCode', url: 'https://leetcode.com', type: 'Practice' },
      { label: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', type: 'Guide' },
      { label: 'Blind 75 List', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', type: 'List' },
      { label: 'LeetCode Rust solutions', url: 'https://github.com/aylei/leetcode-rust', type: 'Reference' },
    ],
  },
  {
    phase: 'Phase 5–7 · Solana & Anchor', color: '#8B5CF6', icon: '◎',
    items: [
      { label: 'Solana Docs', url: 'https://docs.solana.com', type: 'Docs' },
      { label: 'Anchor Lang Book', url: 'https://www.anchor-lang.com/', type: 'Docs' },
      { label: 'Solana Cookbook', url: 'https://solanacookbook.com', type: 'Guide' },
      { label: 'Solana Labs GitHub', url: 'https://github.com/solana-labs', type: 'Code' },
      { label: 'OtterSec Tutorials', url: 'https://osec.io/blog', type: 'Security' },
      { label: 'Helius Labs Blog', url: 'https://www.helius.dev/blog', type: 'Blog' },
    ],
  },
  {
    phase: 'Phase 8 · Blockchain in Rust', color: '#06B6D4', icon: '⛓️',
    items: [
      { label: 'libp2p Documentation', url: 'https://docs.rs/libp2p', type: 'Docs' },
      { label: 'Tokio Tutorial', url: 'https://tokio.rs/tokio/tutorial', type: 'Guide' },
      { label: 'Substrate (reference impl)', url: 'https://substrate.dev', type: 'Reference' },
      { label: 'Tendermint in Rust', url: 'https://github.com/informalsystems/tendermint-rs', type: 'Code' },
    ],
  },
  {
    phase: 'Phase 9 · ZK Proofs', color: '#10B981', icon: '🔐',
    items: [
      { label: 'ZK Learning (Berkeley MOOC)', url: 'https://zk-learning.org', type: 'Course' },
      { label: 'RareSkills ZK Book', url: 'https://www.rareskills.io/zk-book', type: 'Book' },
      { label: '0xPARC Learning Resources', url: 'https://learn.0xparc.org', type: 'Course' },
      { label: 'Circom Documentation', url: 'https://docs.circom.io', type: 'Docs' },
      { label: 'SnarkJS', url: 'https://github.com/iden3/snarkjs', type: 'Tool' },
      { label: 'Noir by Aztec', url: 'https://noir-lang.org', type: 'Tool' },
      { label: 'Halo2 Book', url: 'https://zcash.github.io/halo2/', type: 'Docs' },
    ],
  },
  {
    phase: 'Phase 10 · Certs & Job Hunt', color: '#EC4899', icon: '💼',
    items: [
      { label: 'Rust Foundation Certification', url: 'https://foundation.rust-lang.org/grants/rust-foundation-certification/', type: 'Cert' },
      { label: 'web3.career — Remote Web3 Jobs', url: 'https://web3.career', type: 'Jobs' },
      { label: 'Wellfound (AngelList)', url: 'https://wellfound.com', type: 'Jobs' },
      { label: 'Remote3 — Web3 Remote Jobs', url: 'https://remote3.co', type: 'Jobs' },
      { label: 'Crypto Jobs List', url: 'https://cryptojobslist.com', type: 'Jobs' },
      { label: 'RareSkills — ZK Bootcamp Cert', url: 'https://www.rareskills.io/zk-bootcamp', type: 'Cert' },
    ],
  },
];

const TYPE_COLOR: Record<string, string> = {
  Course: 'bg-blue-500/10 text-blue-400',
  Book: 'bg-purple-500/10 text-purple-400',
  Practice: 'bg-yellow-500/10 text-yellow-400',
  Tool: 'bg-green-500/10 text-green-400',
  Cert: 'bg-red-500/10 text-red-400',
  Docs: 'bg-[#222] text-[#888]',
  Guide: 'bg-orange-500/10 text-orange-400',
  Jobs: 'bg-pink-500/10 text-pink-400',
  Security: 'bg-red-500/10 text-red-400',
  Blog: 'bg-[#222] text-[#888]',
  Code: 'bg-[#222] text-[#888]',
  Reference: 'bg-[#222] text-[#888]',
  List: 'bg-[#222] text-[#888]',
};

export default function ResourcesPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white">Tài Liệu Học 📚</h1>
        <p className="text-sm text-[#888]">Curated resources cho từng giai đoạn của lộ trình</p>
      </div>

      <div className="space-y-4">
        {RESOURCES.map((section) => (
          <div key={section.phase} className="card overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-[#222]">
              <span className="text-lg">{section.icon}</span>
              <h2 className="text-sm font-bold text-white">{section.phase}</h2>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {section.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${TYPE_COLOR[item.type] ?? 'bg-[#222] text-[#888]'}`}>
                      {item.type}
                    </span>
                    <span className="text-sm text-[#ccc] group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#555] group-hover:text-white transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
