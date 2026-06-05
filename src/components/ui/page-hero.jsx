'use client'

import PropTypes from 'prop-types'
import Link from 'next/link'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SplitText from '@/components/ui/split-text'
import { cn } from '@/lib/utils'

// Compact hero header used by every sub-page so the design language
// carries through without re-creating the home hero.
const PageHero = ({
  eyebrow,
  number,
  title,
  italicTail,
  description,
  breadcrumbs,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24',
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] [background-size:80px_80px] opacity-[0.06]"
      />
      <Container size="wide">
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase"
          >
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                {b.href ? (
                  <Link href={b.href} className="transition-colors hover:text-[var(--color-cream)]">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-[var(--color-cream-dim)]">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span className="text-[var(--color-line-strong)]">/</span>
                )}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="mb-7 h-px w-28 origin-left bg-[var(--color-gold)]"
        />

        {(eyebrow || number) && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase"
          >
            {number && <span className="tabular">{number}</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </motion.p>
        )}

        <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-[var(--color-cream)]">
          <SplitText
            as="span"
            text={title}
            mode="words"
            className="block"
            stagger={0.05}
            delay={0.3}
          />
          {italicTail && (
            <SplitText
              as="span"
              text={italicTail}
              mode="words"
              className="block text-[var(--color-gold)] italic"
              stagger={0.05}
              delay={0.45}
            />
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[var(--color-cream-dim)] sm:text-base"
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  )
}

PageHero.propTypes = {
  eyebrow: PropTypes.string,
  number: PropTypes.string,
  title: PropTypes.string.isRequired,
  italicTail: PropTypes.string,
  description: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  className: PropTypes.string,
}

export default PageHero
