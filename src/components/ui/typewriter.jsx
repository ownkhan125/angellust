'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// Cinematic looped typing effect:
//   type-in  →  hold  →  delete  →  small gap  →  next phrase
// Single setTimeout driver (no interval drift), human-feel cadence variance,
// and a breathing caret instead of a hard blink.
const Typewriter = ({
  phrases,
  typingSpeed = 75,
  deletingSpeed = 38,
  holdAfterType = 1500,
  holdAfterDelete = 300,
  className,
  caretClassName,
  reserveWidth = true,
  startDelay = 0,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [mode, setMode] = useState('typing')
  const [started, setStarted] = useState(startDelay === 0)
  const timer = useRef(null)

  useEffect(() => {
    if (startDelay <= 0) return undefined
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  const current = phrases[phraseIndex] ?? ''

  useEffect(() => {
    if (!started) return undefined
    const variance = (base) => base * (0.85 + Math.random() * 0.4)
    const schedule = (delay, fn) => {
      timer.current = setTimeout(fn, delay)
    }

    if (mode === 'typing') {
      if (charCount < current.length) {
        schedule(variance(typingSpeed), () => setCharCount((c) => c + 1))
      } else {
        schedule(holdAfterType, () => setMode('deleting'))
      }
    } else if (mode === 'deleting') {
      if (charCount > 0) {
        schedule(variance(deletingSpeed), () => setCharCount((c) => c - 1))
      } else {
        schedule(holdAfterDelete, () => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setMode('typing')
        })
      }
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [
    mode,
    charCount,
    current,
    typingSpeed,
    deletingSpeed,
    holdAfterType,
    holdAfterDelete,
    phrases.length,
    started,
  ])

  const visible = current.slice(0, charCount)
  // Reserve width with the longest phrase so layout never jumps.
  const longest = useMemo(
    () => phrases.reduce((a, b) => (a.length > b.length ? a : b), ''),
    [phrases]
  )

  return (
    <span className={cn('relative inline-flex max-w-full items-baseline', className)}>
      {reserveWidth && (
        <span aria-hidden className="invisible break-words">
          {longest}
        </span>
      )}
      <span
        aria-live="polite"
        className={cn(reserveWidth ? 'absolute inset-0' : '', 'break-words')}
      >
        {visible}
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          className={cn(
            'ml-[0.06em] inline-block w-[0.08em] translate-y-[0.08em] bg-current align-baseline',
            'h-[0.85em]',
            caretClassName
          )}
        />
      </span>
    </span>
  )
}

Typewriter.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingSpeed: PropTypes.number,
  deletingSpeed: PropTypes.number,
  holdAfterType: PropTypes.number,
  holdAfterDelete: PropTypes.number,
  className: PropTypes.string,
  caretClassName: PropTypes.string,
  reserveWidth: PropTypes.bool,
  startDelay: PropTypes.number,
}

export default Typewriter
