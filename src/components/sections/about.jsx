'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import { IMG } from '@/lib/images'

const bio = [
  'AngelLust has spent over three decades serving District 1 — first as a small-business owner, then as a community-services director, and now as a candidate for Congress.',
  'The campaign is built on a simple principle: bring practical, results-driven solutions to the table — and leave the ideological noise at the door.',
]

function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const tagRotate = useTransform(scrollYProgress, [0, 1], [-3, 3])
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <SectionReveal
      id="about"
      eyebrow="The Candidate"
      number="01 /"
      className="py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <div ref={ref} className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait card */}
          <motion.div style={{ y: portraitY }} className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)]">
              <Image
                src={IMG.candidatePortrait}
                alt="Portrait of AngelLust, candidate for Congress"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-teal)]/30 via-transparent to-[var(--color-clay)]/20 mix-blend-overlay" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.span
                  style={{ rotate: tagRotate }}
                  className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.28em] text-[var(--color-ink)] uppercase"
                >
                  ★ Candidate
                </motion.span>
                <p className="font-display text-3xl leading-tight text-[var(--color-cream)] sm:text-4xl">
                  AngelLust
                </p>
                <p className="mt-2 font-mono text-[12px] tracking-[0.28em] text-[var(--color-cream-dim)] uppercase">
                  for Congress · District 1
                </p>
                <div className="mt-6 h-px w-12 bg-[var(--color-gold)]" />
                <p className="mt-4 max-w-xs text-sm text-[var(--color-cream-dim)]">
                  Community-rooted. Practically focused. Open door, every day.
                </p>
              </div>
              {/* Frame markers */}
              <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-[var(--color-gold)]" />
              <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-[var(--color-gold)]" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[var(--color-gold)]" />
              <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--color-gold)]" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:pt-6">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
              <SplitText
                as="span"
                text="A neighbor"
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="who heals"
                mode="words"
                className="block"
                stagger={0.05}
                delay={0.15}
              />
              <SplitText
                as="span"
                text="communities."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.3}
              />
            </h2>

            <div className="mt-10 max-w-xl space-y-5">
              {bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[16px] leading-relaxed text-[var(--color-cream-dim)] sm:text-[17px]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton as={Link} href="/priorities" variant="ghost" className="text-[13px]">
                Read the Platform
              </MagneticButton>
              <MagneticButton as={Link} href="/endorsements" variant="dark" className="text-[13px]">
                See Endorsements
              </MagneticButton>
            </motion.div>

            {/* Signature row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--color-line)] pt-8 font-mono text-[12px] tracking-[0.24em] text-[var(--color-muted)] uppercase"
            >
              <span className="font-display text-2xl tracking-normal text-[var(--color-cream)] normal-case italic">
                — AngelLust
              </span>
              <span>Veteran-Family · Community Director · Lifelong Resident</span>
            </motion.div>
          </div>
        </div>
      </Container>
    </SectionReveal>
  )
}

export default About
