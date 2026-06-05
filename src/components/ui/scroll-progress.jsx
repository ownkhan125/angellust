'use client'

import { motion, useScroll, useSpring } from 'motion/react'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-clay)] to-[var(--color-teal-soft)]"
    />
  )
}

export default ScrollProgress
