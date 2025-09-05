import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { Mail, Github, Linkedin, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Links | ' + siteConfig.name,
  description: 'Quick contact & social links for ' + siteConfig.name,
};

const links = [
  { label: 'GitHub', href: siteConfig.github, icon: <Github className="w-4 h-4" /> },
  { label: 'LinkedIn', href: siteConfig.linkedin, icon: <Linkedin className="w-4 h-4" /> },
  { label: 'X / Twitter', href: `https://x.com/${siteConfig.twitter?.replace('@','')}` , icon: <Share2 className="w-4 h-4" /> },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-24 px-4 bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />
      <div className="w-full max-w-md mx-auto rounded-2xl border border-border/40 bg-background/70 backdrop-blur-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Connect with <span className="text-primary">{siteConfig.name.split(' ')[0]}</span></h1>
        <p className="text-muted-foreground text-sm mb-6">Scan → tap → done. Message or follow using any platform below.</p>
        <div className="space-y-3 mb-8">
          {links.map(l => (
            <Button asChild key={l.label} variant="outline" className="w-full justify-between group">
              <Link href={l.href} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-2">{l.icon}{l.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ))}
        </div>
        <div className="grid gap-3">
          <Button asChild className="w-full gap-2">
            <a href={`mailto:${siteConfig.email}`}><Mail className="w-4 h-4" /> Email Me</a>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href={siteConfig.url + '#contact'}>Go to full site</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
