"use client"
import React from 'react'
import {motion} from "framer-motion"
import { technologies } from '@/constants'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Boxes } from '@/components/ui/background-boxes' // kept for potential future use
import { BackgroundBeams } from '@/components/ui/background-beams'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

const Skills = () => {
  const people = [
    {
      id: 1,
      name: "React",
      designation: "Frontend Library",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      id: 2,
      name: "Next.js",
      designation: "React Framework",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      id: 3,
      name: "TypeScript",
      designation: "Programming Language",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      id: 4,
      name: "Node.js",
      designation: "Runtime Environment",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      id: 5,
      name: "PostgreSQL",
      designation: "Database",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      id: 6,
      name: "Docker",
      designation: "Containerization",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
  ];
  
  return (
    <section id='skills' className='relative w-full overflow-hidden py-20'>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className='container mx-auto px-4'>
      <div className='mb-12 max-w-2xl mx-auto'>
        <BackgroundGradient className='rounded-3xl p-8 bg-background/70 backdrop-blur-xl border border-border/40'>
          <h2 className='text-3xl md:text-4xl font-bold text-center'><span className='text-primary'>Skills</span> & Technologies</h2>
          <p className='mt-4 text-center text-muted-foreground text-sm md:text-base'>A toolkit spanning frontend, backend, databases, and infrastructure—carefully chosen for reliability, performance, and developer velocity.</p>
        </BackgroundGradient>
      </div>
      
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>

      <BentoGrid className="max-w-4xl mx-auto mb-12">
        {technologies.slice(0, 6).map((tech, i) => (
          <BentoGridItem
            key={i}
            title={tech.name}
            description={`Expertise in ${tech.name} for modern web development`}
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="drop-shadow"
                />
              </div>
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>

      <motion.div
      initial={{opacity:0 , y:20}}
      animate={{opacity:1 , y:0}}
      transition={{duration:0.5}}
      className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'
      >
        {
          technologies.map((tech , index)=>(
            <Card
              key={index}
              className='group relative p-4 flex flex-col items-center justify-center border-border/10 bg-card/80 backdrop-blur-xl transition-all hover:shadow-[0_0_0_1px_hsl(var(--primary))] hover:bg-card/90'
            >
              <span className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none'/>
              <Image
                src={tech.logo}
                alt={tech.name}
                width={48}
                height={48}
                className='mb-2 drop-shadow'
              />
              <span className='text-sm font-medium'>{tech.name}</span>
            </Card>
          ))
        }
  </motion.div>
  </div>
    </section>
  )
}

export default Skills