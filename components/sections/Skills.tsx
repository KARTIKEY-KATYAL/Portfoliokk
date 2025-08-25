"use client"
import React from 'react'
import {motion} from "framer-motion"
import { technologies } from '@/constants'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Boxes } from '@/components/ui/background-boxes' // kept for potential future use
import { BackgroundBeams } from '@/components/ui/background-beams'
import { BackgroundGradient } from '@/components/ui/background-gradient'

const Skills = () => {
  
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