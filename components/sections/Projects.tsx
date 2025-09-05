"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Check, ExternalLink, Github } from "lucide-react";
import { Badge } from "../ui/badge";
import { Section, SectionHeader, fadeSlide } from "@/components/layout/section";

const Projects = () => {
  // Removed unused testimonials carousel for lean bundle

  const shouldReduce = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24, scale: shouldReduce ? 1 : 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <Section id="projects">
      <SectionHeader
        title="Featured Projects"
        highlight="Projects"
        description="Explore selected work highlighting scalable architecture, polished UI, and performance-focused engineering."
      />
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            whileHover={{ y: shouldReduce ? 0 : -6 }}
            whileTap={{ scale: shouldReduce ? 1 : 0.98 }}
          >
            <div className="rounded-2xl p-[2px] will-change-transform bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
            <Card className="group overflow-hidden rounded-2xl border-border/10 bg-card/80 backdrop-blur-xl hover:shadow-[0_0_0_1px_hsl(var(--primary))] transition-all duration-300 relative">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                  <Button asChild variant={"secondary"} size={"sm"}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>

                  <Button asChild variant={"secondary"} size={"sm"}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors relative">
                  <span className="absolute -inset-x-2 -top-2 h-[120%] origin-left scale-x-0 bg-gradient-to-r from-primary/10 to-transparent blur-sm transition-transform duration-500 group-hover:scale-x-100" />
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {
                            project.technologies.map((tech)=>(
                                <Badge key={tech} variant={"secondary"} className="bg-secondary/50">
                                      {tech}  
                                </Badge>
                            ))
                        }
                    </div>
          <ul className="space-y-2">
                        {
              project.features.map((feature)=>(
                <li key={feature} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-green-500"/>
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>
                </div>
              </div>
    </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
