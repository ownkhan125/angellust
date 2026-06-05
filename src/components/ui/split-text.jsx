'use client'

import { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

// Per-word / per-char reveal with stagger. `chars` is the most cinematic
// option for headlines; `words` is gentler for body copy.
const SplitText = ({
  text,
  as = 'h1',
  mode = 'chars',
  className,
  charClassName,
  delay = 0,
  duration = 0.9,
  stagger = 0.02,
  start = { opacity: 0, y: '100%' },
  end = { opacity: 1, y: '0%' },
  once = true,
  amount = 0.5,
}) => {
  const Tag = motion[as] ?? motion.h1
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })

  const tokens = useMemo(
    () => (mode === 'words' ? text.split(' ') : text.split('')),
    [text, mode]
  )

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const child = {
    hidden: start,
    visible: {
      ...end,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Inline-block siblings collapse the trailing whitespace inside each
  // wrapper, so we explicitly add a margin between word wrappers instead
  // of relying on a space character.
  const wordGap = '0.25em'

  return (
    <Tag
      ref={ref}
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {tokens.map((tok, i) => {
        const isLast = i === tokens.length - 1
        const style = mode === 'words' && !isLast ? { marginRight: wordGap } : undefined
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={style}
          >
            <motion.span variants={child} className={cn('split-char inline-block', charClassName)}>
              {tok === ' ' ? ' ' : tok}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.string,
  mode: PropTypes.oneOf(['chars', 'words']),
  className: PropTypes.string,
  charClassName: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  start: PropTypes.object,
  end: PropTypes.object,
  once: PropTypes.bool,
  amount: PropTypes.number,
}

export default SplitText
