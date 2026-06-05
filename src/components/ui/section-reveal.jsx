'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

// Orchestrates the section build:
//   1) top/bottom border lines draw in from the left
//   2) eyebrow label fades up
//   3) children animate in via stagger
const SectionReveal = ({
  id,
  eyebrow,
  number,
  className,
  children,
  borders = 'top',
  delay = 0,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15, once: true })

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay },
    },
  }

  const headVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + 0.4 },
    },
  }

  const bodyVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.55,
      },
    },
  }

  const showTop = borders === 'top' || borders === 'both'
  const showBottom = borders === 'bottom' || borders === 'both'

  return (
    <section id={id} ref={ref} className={cn('relative', className)}>
      {showTop && (
        <motion.div
          aria-hidden
          className="section-line absolute top-0 right-0 left-0 h-px origin-left"
          variants={lineVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        />
      )}

      {(eyebrow || number) && (
        <motion.div
          variants={headVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto w-full max-w-[88rem] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12"
        >
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
            {number && <span className="tabular text-[var(--color-gold)]">{number}</span>}
            {eyebrow && <span>{eyebrow}</span>}
            <span className="ml-2 h-px flex-1 bg-[var(--color-line)]" />
          </div>
        </motion.div>
      )}

      <motion.div variants={bodyVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        {children}
      </motion.div>

      {showBottom && (
        <motion.div
          aria-hidden
          className="section-line absolute right-0 bottom-0 left-0 h-px origin-left"
          variants={lineVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        />
      )}
    </section>
  )
}

SectionReveal.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  number: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  borders: PropTypes.oneOf(['top', 'bottom', 'both', 'none']),
  delay: PropTypes.number,
}

export default SectionReveal
