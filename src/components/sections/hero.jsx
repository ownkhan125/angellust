'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import Container from '@/components/ui/container'
import SplitText from '@/components/ui/split-text'
import Typewriter from '@/components/ui/typewriter'
import MagneticButton from '@/components/ui/magnetic-button'
import { IMG } from '@/lib/images'

const PHRASES = ['spectacle.', 'slogans.', 'delay.', 'noise.', 'talking points.']

const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Single cheap parallax on the backdrop image only — no per-frame
  // repaints on the content tree.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-44"
    >
      {/* Backdrop photo (only parallax target) */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src={IMG.heroBackdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.55]"
        />
      </motion.div>
      {/* Static overlays — promoted to their own layer */}
      <div aria-hidden className="absolute inset-0 -z-10 [transform:translateZ(0)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/55 via-[var(--color-ink)]/25 to-[var(--color-ink)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/85 via-[var(--color-ink)]/35 to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(120%_85%_at_50%_55%,transparent_0%,transparent_45%,rgba(11,12,16,0.55)_100%)]" />
        {/* Faint grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:80px_80px] opacity-[0.05]" />
      </div>

      <Container size="wide">
        <div className="relative">
          {/* Top meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase sm:mb-14"
          >
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-gold)]" />
            <span>Campaign · District 1 · Primary 2026</span>
            <span className="ml-2 h-px max-w-[120px] flex-1 bg-[var(--color-line)]" />
          </motion.div>

          {/* Headline grid */}
          <div className="grid grid-cols-1 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-9 xl:col-span-8">
              <h1 className="font-display text-[clamp(2.5rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
                <SplitText
                  as="span"
                  text="Service over"
                  mode="words"
                  className="block"
                  stagger={0.06}
                  delay={0.4}
                />
                <span className="relative mt-1 block sm:mt-2">
                  <Typewriter
                    phrases={PHRASES}
                    className="text-[var(--color-gold)] italic"
                    typingSpeed={85}
                    deletingSpeed={42}
                    holdAfterType={1700}
                    startDelay={1500}
                  />
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              className="lg:col-span-3 lg:border-l lg:border-[var(--color-line)] lg:pl-6 xl:col-span-4"
            >
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)] sm:text-base">
                AngelLust is running to bring practical, results-driven leadership to District 1 —
                rooted in community, accountable to neighbors, and built for the work ahead.
              </p>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="mt-14 flex flex-col items-start gap-5 sm:mt-20 sm:flex-row sm:items-center sm:gap-6"
          >
            <MagneticButton
              href="/donate"
              as={Link}
              variant="primary"
              className="px-7 py-4 text-[14px]"
            >
              Donate Now
              <Arrow />
            </MagneticButton>
            <MagneticButton
              href="/priorities"
              as={Link}
              variant="ghost"
              className="px-7 py-4 text-[14px]"
            >
              View Platform
            </MagneticButton>
          </motion.div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:mt-28 lg:grid-cols-4"
          >
            {[
              { k: '100+', v: 'Years of family roots' },
              { k: '30+', v: 'Years serving the community' },
              { k: 'CD-1', v: 'Congressional district' },
              { k: 'Nov 2026', v: 'General Election' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + i * 0.08 }}
                className="bg-[var(--color-ink-2)]/85 p-5 backdrop-blur-sm sm:p-7"
              >
                <p className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
                  {item.k}
                </p>
                <p className="mt-2 font-mono text-[12px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                  {item.v}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3 7h8m-3-3l3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Hero
