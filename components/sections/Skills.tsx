"use client"
import React from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { technologies } from '@/constants'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/layout/section';

const Skills = () => {
  const shouldReduce = useReducedMotion();
  const ref = React.useRef<HTMLUListElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [shouldReduce ? 0 : -40, shouldReduce ? 0 : 40]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: 0.06 } }
  };

  return (
  <Section id='skills' className='[content-visibility:auto] [contain-intrinsic-size:600px]'>
      <SectionHeader
        title='Skills & Technologies'
        highlight='Skills'
        description='A toolkit spanning frontend, backend, databases, and infrastructure—carefully chosen for reliability, performance, and developer velocity.'
      />
      <motion.ul
        ref={ref}
        style={{ y: parallax }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 md:gap-8'
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
              hidden: { opacity: 0, y: 14, scale: shouldReduce ? 1 : 0.96 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 240 } }
            }}
            role='listitem'
          >
            <Card
              className='group relative p-4 flex flex-col items-center justify-center border-border/10 bg-card/70 backdrop-blur-xl transition-all hover:shadow-[0_0_0_1px_hsl(var(--primary))] hover:bg-card/90 focus-within:shadow-[0_0_0_1px_hsl(var(--primary))] rounded-xl will-change-transform overflow-hidden'
              tabIndex={0}
              aria-label={tech.name}
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={56}
                height={56}
                loading='lazy'
                className='mb-2 h-12 w-12 md:h-14 md:w-14 drop-shadow-sm group-hover:drop-shadow filter-saturate-150 transition-transform duration-500 group-hover:scale-110 will-change-transform'
              />
              <span className='text-xs md:text-sm font-medium text-center'>{tech.name}</span>
            </Card>
          </motion.li>
        ))}
  </motion.ul>
    </Section>
  )
}

export default Skills