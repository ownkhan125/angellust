'use client'

import { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * TestimonialDeck — fixed-slot testimonial swiper.
 *
 * Layout architecture:
 *   - Every testimonial occupies the same CSS-grid cell
 *     (grid-row: 1 / grid-column: 1). The cell auto-sizes to the tallest
 *     item ONCE and never changes again — so the slot has a stable,
 *     known height and width across the entire interaction.
 *   - Only the active card has opacity 1; others fade out via opacity
 *     transitions. None of them ever leave the slot, so nothing else
 *     in the page reflows.
 *   - The ghost stack sits behind the slot as `absolute inset-0` —
 *     since the slot never resizes, the ghosts never resize either.
 *
 * Drag:
 *   - Pure horizontal translation on a single wrapper, no rotate, no
 *     opacity gradient. `dragElastic` provides the spring-back when
 *     released without a threshold.
 *   - The index only commits on `onDragEnd` so the visible card never
 *     swaps mid-gesture.
 */
const TestimonialDeck = ({
  items,
  renderCard,
  className,
  swipeThreshold = 70,
  autoPlay = true,
  autoPlayInterval = 7000,
  ghostLayers = 2,
}) => {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const x = useMotionValue(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  )
  const goTo = useCallback((i) => setIndex(i), [])

  useEffect(() => {
    if (!autoPlay || hovered || dragging) return undefined
    const id = setInterval(next, autoPlayInterval)
    return () => clearInterval(id)
  }, [autoPlay, autoPlayInterval, hovered, dragging, next])

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
  }

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKey}
      tabIndex={0}
      role="region"
      aria-label="Testimonials"
    >
      {/* Static decorative ghost stack — never moves, never resizes */}
      {Array.from({ length: ghostLayers }, (_, i) => {
        const depth = i + 1
        return (
          <div
            key={`ghost-${depth}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface-2)]"
            style={{
              transform: `translate3d(0, ${depth * 14}px, 0) scale(${1 - depth * 0.04})`,
              transformOrigin: 'top center',
              opacity: 1 - depth * 0.32,
              zIndex: 1,
            }}
          />
        )
      })}

      {/* Draggable wrapper — translates horizontally only */}
      <motion.div
        className="relative grid cursor-grab will-change-transform select-none"
        style={{
          x,
          zIndex: 2,
          touchAction: 'pan-y',
          transform: 'translateZ(0)',
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 360, bounceDamping: 34 }}
        whileTap={{ cursor: 'grabbing' }}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          setDragging(false)
          const fast = Math.abs(info.velocity.x) > 450
          if (info.offset.x < -swipeThreshold || (fast && info.velocity.x < 0)) next()
          else if (info.offset.x > swipeThreshold || (fast && info.velocity.x > 0)) prev()
        }}
      >
        {items.map((item, i) => {
          const isActive = i === index
          return (
            <motion.div
              key={item.id || i}
              // All testimonials occupy the same grid cell → grid auto-sizes
              // to the largest once and is stable forever after.
              style={{ gridRow: 1, gridColumn: 1 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={!isActive}
              className={cn('min-w-0', isActive ? 'pointer-events-auto' : 'pointer-events-none')}
            >
              {renderCard(item)}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Controls */}
      <div className="relative z-10 mt-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                i === index
                  ? 'w-10 bg-[var(--color-gold)]'
                  : 'w-1.5 bg-[var(--color-line-strong)] hover:bg-[var(--color-cream-dim)]'
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-cream)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 3l-4 4 4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

TestimonialDeck.propTypes = {
  items: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  className: PropTypes.string,
  swipeThreshold: PropTypes.number,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  ghostLayers: PropTypes.number,
}

export default TestimonialDeck
