"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const faqs = [
  {
    q: "What technologies do you currently focus on?",
    a: "Primarily modern TypeScript stacks: Next.js (App Router), React Server Components, edge rendering patterns, Node.js APIs, PostgreSQL, and performance tooling (profiling, bundle analysis)."
  },
  {
    q: "Are you open for freelance or full‑time roles?",
    a: "Yes—open to impactful full‑time roles and select freelance engagements that require design-system thinking, performance tuning, or end‑to‑end feature delivery."
  },
  {
    q: "How do you approach performance?",
    a: "Set budgets early (LCP, CLS, TTI), measure with real user monitoring, reduce waterfalls via streaming & caching, and continuously prune bundle surface with dynamic & edge‑appropriate splits."
  },
  {
    q: "What is your testing strategy?",
    a: "Type safety + unit tests for pure logic, integration tests for API & data boundaries, and lightweight E2E smoke flows (Playwright) for critical user journeys."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <BackgroundGradient className="rounded-3xl p-8 bg-background/70 backdrop-blur-xl border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently <span className="text-primary">Asked</span></h2>
            <p className="text-muted-foreground text-sm md:text-base">Quick answers to common questions—tailored for collaborators & hiring teams.</p>
          </BackgroundGradient>
        </div>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl divide-y rounded-2xl border border-border/30 bg-card/70 backdrop-blur-xl">
          {faqs.map((f,i)=>(
            <AccordionItem key={f.q} value={`item-${i}`} className="px-4">
              <AccordionTrigger className="text-left text-base md:text-lg py-5 font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground pb-6 -mt-2 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
