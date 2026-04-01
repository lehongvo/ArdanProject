import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rust Certification Roadmap - 120 Day Plan',
  description:
    'A structured 120-day learning plan to pass the Ardan Labs Rust Certification and land a remote Rust developer job.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <Sidebar />
          <div className="md:pl-64 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
