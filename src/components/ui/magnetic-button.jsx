'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

const VARIANT_CLASSES = {
  primary:
    'bg-[var(--color-gold)] text-[var(--color-ink)] border border-[var(--color-gold)] hover:bg-[var(--color-gold-soft)]',
  clay: 'bg-[var(--color-clay)] text-[var(--color-cream)] border border-[var(--color-clay)] hover:bg-[var(--color-clay-deep)]',
  ghost:
    'bg-transparent text-[var(--color-cream)] border border-[var(--color-line-strong)] hover:border-[var(--color-cream)] hover:bg-white/[0.03]',
  dark: 'bg-[var(--color-ink-2)] text-[var(--color-cream)] border border-[var(--color-line-strong)] hover:bg-[var(--color-surface-2)]',
}

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  strength = 0.35,
  as,
  ...rest
}) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.6 })
  const innerX = useTransform(sx, (v) => v * 0.4)
  const innerY = useTransform(sy, (v) => v * 0.4)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = as || (href ? motion.a : motion.button)

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        'btn-glow relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform',
        VARIANT_CLASSES[variant],
        className
      )}
      {...rest}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </Comp>
  )
}

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'clay', 'ghost', 'dark']),
  className: PropTypes.string,
  strength: PropTypes.number,
  as: PropTypes.elementType,
}

export default MagneticButton
