"use client";
import { motion } from "framer-motion";
import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  fadeLeft,
  fadeRight,
  floatLoop,
} from "@/lib/motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundLines } from "@/components/ui/background-lines";
import { SparklesCore } from "@/components/ui/sparkles";


const Hero = () => {
  // Removed unused animated word effects to streamline bundle & resolve lint warnings

  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden pt-20 md:pt-28 pb-12 md:pb-24"
    >
      {/* Layer 1: gradient backdrop for subtle base tone */ }
      {/* Removed gradients for solid theme */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="var(--primary)"
          />
      </div>
      <BackgroundLines className="absolute inset-0 z-0 w-full h-full">

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-14 md:gap-20 md:grid-cols-2">
          <motion.div variants={fadeRight} initial="hidden" animate="show">
            <div className="relative rounded-3xl border border-border/40 bg-card p-8 md:p-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide text-primary/90 shadow-sm backdrop-blur-sm">
                <span className="size-2 rounded-full bg-primary animate-pulse" />{" "}
                Open to opportunities
              </span>
              <motion.h1
                variants={fadeLeft}
                initial="hidden"
                animate="show"
                className="mb-6 text-3xl sm:text-4xl font-bold leading-tight md:text-6xl tracking-tight"
              >
                Hi, I&apos;m{" "}
                <span className="text-primary">Kartikey Katyal</span>
              </motion.h1>
              <TextGenerateEffect
                words="Full Stack Developer focused on building performant, accessible & delightful web experiences using modern TypeScript / React stacks."
                className="mb-8 max-w-xl text-sm sm:text-base text-muted-foreground md:text-xl leading-relaxed"
              />
              <div className="mb-10 flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Node.js",
                  "Framer Motion",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact">
                    <Button className="rounded-full px-8">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Me
                    </Button>
                </Link>
                <Link
                  href="https://github.com/KARTIKEY-KATYAL"
                  target="_blank"
                  aria-label="Github profile"
                >
                    <Button variant="outline" className="rounded-full px-8">
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          <div className="relative flex flex-col items-center gap-10">
            <motion.div
              variants={floatLoop}
              initial="hidden"
              animate="show"
              className="relative"
            >
              <div className="group relative">
                {/* Removed gradient blobs */}
                <Image
                  src="/hero.svg"
                  alt="Developer Illustration with abstract shapes"
                  width={520}
                  height={520}
                  priority
                  className="relative drop-shadow-2xl will-change-transform motion-safe:group-hover:scale-[1.018] transition-transform duration-700"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </BackgroundLines>
    </section>
  );
};

export default Hero;
