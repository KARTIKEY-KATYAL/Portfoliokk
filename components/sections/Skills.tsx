"use client"
import React from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { technologies } from '@/constants'
import { Card } from '../ui/card'
import Image from 'next/image'
import { BackgroundBeams } from '@/components/ui/background-beams';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const Skills = () => {
  // Removed unused people demo array; technologies constant drives UI
  
  const shouldReduce = useReducedMotion();
  // Ref specifically targets the list element for scroll-based transforms
  const ref = React.useRef<HTMLUListElement | null>(null);
  // Helper to safely use offset without polluting file with `any`.
  // TS types for useScroll may not yet include `offset`; suppress locally.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [shouldReduce ? 0 : -40, shouldReduce ? 0 : 40]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

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
      <motion.ul
        ref={ref}
        style={{ y: parallax }}
        className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.25 }}
        variants={listVariants}
        aria-label='Technology stack'
        role='list'
      >
        {technologies.map((tech, index) => (
          <motion.li
            key={tech.name + index}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18, stiffness: 180 } }
            }}
            role='listitem'
          >
            <Card
              className='group relative p-4 flex flex-col items-center justify-center border-border/10 bg-card/70 backdrop-blur-xl transition-all hover:shadow-[0_0_0_1px_hsl(var(--primary))] hover:bg-card/90 focus-within:shadow-[0_0_0_1px_hsl(var(--primary))] rounded-xl will-change-transform'
              tabIndex={0}
              aria-label={tech.name}
            >
              <span className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none'/>
              <Image
                src={tech.logo}
                alt={tech.name}
                width={56}
                height={56}
                loading='lazy'
                className='mb-2 drop-shadow-sm group-hover:drop-shadow filter-saturate-150 transition-transform duration-500 group-hover:scale-110'
              />
              <span className='text-xs md:text-sm font-medium text-center'>{tech.name}</span>
            </Card>
          </motion.li>
        ))}
  </motion.ul>
  </div>
    </section>
  )
}

export default Skills