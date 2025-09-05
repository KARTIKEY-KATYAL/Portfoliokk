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

const Hero = () => {
  return (
        <section
            id="hero"
            aria-label="Intro section"
            className="relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 md:pt-28 pb-24"
        >
            {/* Layer 1: gradient backdrop for subtle base tone */}
            <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_60%)]" />

            {/* Layer 2: Background Beams replacement for Boxes */}
            <div className="pointer-events-none absolute inset-0 -z-20 opacity-50 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]">
                <BackgroundBeams />
            </div>

            {/* Layer 3: Vortex animated particles */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <Vortex
                    particleCount={420}
                    rangeY={160}
                    baseRadius={0.4}
                    rangeRadius={1.2}
                    baseSpeed={0.15}
                    rangeSpeed={1.1}
                    backgroundColor="transparent"
                    containerClassName="h-full w-full"
                />
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
            </div>

            {/* Layer 4 removed (Sparkles). Keeping design performant & unified with Boxes background. */}

            <div className='container relative z-10 mx-auto px-4'>
                <div className='grid grid-cols-1 items-center gap-20 md:grid-cols-2'>
            <motion.div
            initial={{opacity:0 , x:-20}}
            animate={{opacity:1 , x:0}}
            transition={{duration:0.5}}
            >
                            <BackgroundGradient className="relative rounded-3xl border border-border/40 bg-background/70 p-8 md:p-10 backdrop-blur-xl">
                                <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide text-primary/90 shadow-sm backdrop-blur-sm">
                                    <span className="size-2 rounded-full bg-primary animate-pulse" /> Open to opportunities
                                </span>
                                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                                    Hi, I&apos;m <span className="text-primary">Kartikey Katyal</span>
                                </h1>
                                <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-xl">
                                    Full Stack Developer focused on building performant, accessible & delightful web experiences using modern TypeScript / React stacks.
                                </p>
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
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="group relative">
                  <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-purple-500/20 to-transparent blur-3xl transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/10 mix-blend-overlay" />
                  <Image
                    src="/hero.svg"
                    alt="Developer Illustration"
                    width={520}
                    height={520}
                    priority
                    className="relative drop-shadow-2xl will-change-transform"
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