"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Skeleton components (kept client-side so we can still animate them if desired)
function SectionSkeleton({ title, cards = false, form = false }: { title: string; cards?: boolean; form?: boolean }) {
  return (
    <section className="container mx-auto px-4 py-16 animate-in fade-in">
      <div className="mb-10 text-center">
        <div className="h-8 w-56 mx-auto rounded bg-muted/40" aria-hidden />
        <span className="sr-only">Loading {title}</span>
      </div>
      {cards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur p-6 space-y-4 overflow-hidden">
              <div className="absolute inset-0 shimmer pointer-events-none" />
              <div className="h-40 w-full rounded bg-muted/30" />
              <div className="h-5 w-2/3 rounded bg-muted/30" />
              <div className="h-4 w-full rounded bg-muted/20" />
              <div className="h-4 w-5/6 rounded bg-muted/20" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 rounded bg-muted/25" />
                <div className="h-6 w-12 rounded bg-muted/25" />
                <div className="h-6 w-20 rounded bg-muted/25" />
              </div>
            </div>
          ))}
        </div>
      )}
      {form && (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="h-10 rounded bg-muted/30" />
          <div className="h-10 rounded bg-muted/30" />
          <div className="h-40 rounded bg-muted/20" />
          <div className="h-10 w-40 rounded bg-muted/30" />
        </div>
      )}
    </section>
  );
}

function StatsSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-border/40 bg-card/70 backdrop-blur relative overflow-hidden">
      <div className="absolute inset-0 shimmer" />
      <div className="h-6 w-56 bg-muted/30 rounded mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-muted/20" />
        ))}
      </div>
      <div className="h-24 rounded bg-muted/10" />
    </div>
  );
}

// Dynamic client-only imports (disable SSR to keep initial server payload lean)
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: false, loading: () => <SectionSkeleton title="Skills" /> });
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false, loading: () => <SectionSkeleton title="Experience" /> });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false, loading: () => <SectionSkeleton title="Projects" cards /> });
const GithubStats = dynamic(() => import("@/components/github-stats"), { ssr: false, loading: () => <StatsSkeleton /> });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false, loading: () => <SectionSkeleton title="Contact" form /> });

export function HomeSectionsClient() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton title="Skills" />}> <Skills /> </Suspense>
      <Suspense fallback={<SectionSkeleton title="Experience" />}> <Experience /> </Suspense>
      <Suspense fallback={<SectionSkeleton title="Projects" cards />}> <Projects /> </Suspense>
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Github <span className="text-primary"> Activity</span>
        </h2>
        <Suspense fallback={<StatsSkeleton />}> <GithubStats username="KARTIKEY-KATYAL" /> </Suspense>
      </section>
      <Suspense fallback={<SectionSkeleton title="Contact" form />}> <Contact /> </Suspense>
    </>
  );
}
