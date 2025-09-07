"use client";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Vortex } from "@/components/ui/vortex";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { fadeLeft, fadeRight, fastFade } from "@/lib/motion";

const Hero = () => {
  // Removed unused animated word effects to streamline bundle & resolve lint warnings

  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 md:pt-28 pb-16 md:pb-24"
    >
            {/* Layer 1: gradient backdrop for subtle base tone */}
            <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_60%)]" />

            {/* Layer 2: Background Beams replacement for Boxes */}
            <div className="pointer-events-none absolute inset-0 -z-20 opacity-50 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]">
                <BackgroundBeams />
            </div>

            {/* Layer 3: Vortex animated particles (lazy activated) */}
      {inView && (
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block" ref={ref}>
          <Vortex
            particleCount={260}
            rangeY={120}
            baseRadius={0.45}
            rangeRadius={1.0}
            baseSpeed={0.12}
            rangeSpeed={0.8}
            backgroundColor="transparent"
            containerClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        </div>
      )}

            {/* Layer 4 removed (Sparkles). Keeping design performant & unified with Boxes background. */}

            <div className='container relative z-10 mx-auto px-4'>
                <div className='grid grid-cols-1 items-center gap-12 md:gap-20 md:grid-cols-2'>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
            >
                            <BackgroundGradient className="relative rounded-3xl border border-border/40 bg-background/70 p-8 md:p-10 backdrop-blur-xl">
                                <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide text-primary/90 shadow-sm backdrop-blur-sm">
                                    <span className="size-2 rounded-full bg-primary animate-pulse" /> Open to opportunities
                                </span>
                                <motion.h1
                                  variants={fadeLeft}
                                  initial="hidden"
                                  animate="show"
                                  className="mb-6 text-3xl sm:text-4xl font-bold leading-tight md:text-6xl"
                                >
                                  Hi, I&apos;m <span className="text-primary">Kartikey Katyal</span>
                                </motion.h1>
                                <motion.p
                                  variants={fastFade}
                                  initial="hidden"
                                  animate="show"
                                  className="mb-8 max-w-xl text-sm sm:text-base text-muted-foreground md:text-xl"
                                >
                                  Full Stack Developer focused on building performant, accessible & delightful web experiences using modern TypeScript / React stacks.
                                </motion.p>
                                <div className="mb-10 flex flex-wrap gap-3">
                                    {[
                                      "Next.js",
                                      "TypeScript",
                                      "Tailwind",
                                      "Node.js",
                                      "Framer Motion",
                                    ].map(tech => (
                                      <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                                        {tech}
                                      </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="gap-2" asChild>
                                        <a href="#contact">
                                            <Mail className="h-4 w-4" />
                                            Contact Me
                                        </a>
                                    </Button>
                                    <Link href="https://github.com/KARTIKEY-KATYAL" target="_blank" aria-label="Github profile">
                                        <Button className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            <Github className="h-4 w-4" />
                                            Github
                                        </Button>
                                    </Link>
                                </div>
                                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                            </BackgroundGradient>
            </motion.div>

            <div className="relative flex justify-center">
              <motion.div variants={fadeLeft} initial="hidden" animate="show">
                <div className="group relative">
                  <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-purple-500/20 to-transparent blur-3xl transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/10 mix-blend-overlay" />
                  <Image
                    src="/hero.svg"
                    alt="Developer Illustration"
                    width={520}
                    height={520}
                    priority
                    className="relative drop-shadow-2xl will-change-transform motion-safe:group-hover:scale-[1.015] transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
        </div>
            </div>
    </section>
  )
}

export default Hero