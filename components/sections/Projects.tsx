"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Check, ExternalLink, Github } from "lucide-react";
import { Badge } from "../ui/badge";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <BackgroundGradient className="rounded-3xl p-10 bg-background/70 backdrop-blur-xl border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl leading-relaxed">
              Explore selected work highlighting scalable architecture, polished UI, and performance-focused engineering.
            </p>
          </BackgroundGradient>
        </motion.div>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BackgroundGradient className="rounded-2xl p-[2px]">
            <Card className="group overflow-hidden rounded-2xl border-border/10 bg-card/80 backdrop-blur-xl hover:shadow-[0_0_0_1px_hsl(var(--primary))] transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
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
                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-green-500"/>
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>
                </div>
              </div>
            </Card>
            </BackgroundGradient>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Projects;
