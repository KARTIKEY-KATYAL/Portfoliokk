"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeStagger } from "@/lib/motion";
import { projects } from "@/constants";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Check, ExternalLink, Github } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { Badge } from "../ui/badge";
import { Section, SectionHeader } from "@/components/layout/section";

const Projects = () => {
  // Removed unused testimonials carousel for lean bundle

  const shouldReduce = useReducedMotion();
  const containerVariants = fadeStagger(0.07, 0.12);
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 22, scale: shouldReduce ? 1 : 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 26 } }
  };

  return (
  <Section id="projects" className="[content-visibility:auto] [contain-intrinsic-size:900px]">
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
            <CardContainer className="inter-var">
              <CardBody className="bg-card relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {project.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={project.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={project.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20 gap-4">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={project.liveUrl}
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-primary hover:text-primary/80"
                  >
                    Try now →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={project.githubUrl}
                    target="__blank"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
                  >
                    Source Code
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
