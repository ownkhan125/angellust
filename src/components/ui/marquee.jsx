'use client'

import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

// Pure-CSS infinite scroll. Duplicates content for a seamless loop.
const Marquee = ({ children, className, reverse = false, speed = 40 }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max gap-12 will-change-transform"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-ink)] to-transparent" />
    </div>
  )
}

Marquee.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  reverse: PropTypes.bool,
  speed: PropTypes.number,
}

export default Marquee
