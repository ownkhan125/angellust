'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import Container from '@/components/ui/container'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import { IMG } from '@/lib/images'

const tiers = [
  { amount: 25, label: 'Yard sign + sticker' },
  { amount: 50, label: 'Funds an hour of canvassing' },
  { amount: 100, label: 'Fuels a town hall' },
  { amount: 250, label: 'Maximum grassroots tier' },
]

function Join() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const wordX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="donate"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-[var(--color-line)] py-28 sm:py-36 lg:py-44"
    >
      {/* Background photo */}
      <div aria-hidden className="absolute inset-0 -z-20 opacity-[0.14]">
        <Image src={IMG.joinBackdrop} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/60 to-[var(--color-ink)]" />
      </div>

      {/* Background orbs */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-[40rem] w-[40rem] rounded-full bg-[var(--color-clay)]/[0.12] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[var(--color-gold)]/[0.10] blur-[120px]" />
      </motion.div>

      {/* Giant word backdrop */}
      <motion.div
        aria-hidden
        style={{ x: wordX }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center select-none"
      >
        <span className="font-display text-[22vw] leading-none whitespace-nowrap text-[var(--color-cream)]/[0.04] italic">
          Movement
        </span>
      </motion.div>

      <Container size="wide">
        <div
          id="volunteer"
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Headline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              className="mb-8 h-px w-28 origin-left bg-[var(--color-gold)]"
            />
            <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase">
              Join the Movement
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em]">
              <SplitText
                as="span"
                text="District 1"
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="can't afford"
                mode="words"
                className="block"
                stagger={0.05}
                delay={0.2}
              />
              <SplitText
                as="span"
                text="to wait."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.4}
              />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-lg text-[16px] leading-relaxed text-[var(--color-cream-dim)] sm:text-[17px]"
            >
              We don't take corporate PAC money. Every dollar comes from neighbors — and every
              dollar goes back into the work of meeting them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton
                as={Link}
                href="/donate"
                variant="primary"
                className="px-7 py-4 text-[14px]"
              >
                Donate Now
                <Arrow />
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/volunteer"
                variant="clay"
                className="px-7 py-4 text-[14px]"
              >
                Volunteer
              </MagneticButton>
            </motion.div>
          </div>

          {/* Tier card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)]/80 p-7 backdrop-blur-sm sm:p-9">
              <div className="mb-7 flex items-center justify-between">
                <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                  Grassroots tiers
                </p>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
                  ★ No Corporate PAC
                </span>
              </div>
              <ul className="space-y-2.5">
                {tiers.map((t, i) => (
                  <motion.li
                    key={t.amount}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/donate?amount=${t.amount}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-line)] px-5 py-4 transition-all duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/[0.04]"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display tabular text-2xl text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)]">
                          ${t.amount}
                        </span>
                        <span className="text-[13px] text-[var(--color-cream-dim)]">{t.label}</span>
                      </div>
                      <span className="text-[var(--color-muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-gold)]">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 border-t border-[var(--color-line)] pt-6">
                <p className="text-center font-mono text-[12px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                  Or enter your own amount on the next page
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Arrow() {
  return (
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
}

export default Join
