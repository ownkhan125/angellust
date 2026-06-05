'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import { cn } from '@/lib/utils'

const issues = [
  {
    n: '01',
    title: 'Economic Growth',
    desc: 'Lower the barrier for small businesses, modernize infrastructure, and bring durable jobs back to District 1.',
    accent: 'gold',
  },
  {
    n: '02',
    title: 'Education & Choice',
    desc: 'Strong public schools, freedom for teachers to teach, and real vocational pathways for every student.',
    accent: 'clay',
  },
  {
    n: '03',
    title: 'Healthcare & Veterans',
    desc: "Cut prescription costs, expand rural access, and honor our veterans with the care they've earned.",
    accent: 'teal',
  },
  {
    n: '04',
    title: 'Land Stewardship',
    desc: 'Active forest management — fewer fires, healthier ecosystems, and respect for the people who work the land.',
    accent: 'gold',
  },
  {
    n: '05',
    title: 'Housing',
    desc: 'Expand supply, streamline permits, and open financing pathways so families can plant roots here.',
    accent: 'clay',
  },
  {
    n: '06',
    title: 'Maritime & Ports',
    desc: 'Protect the multi-billion-dollar maritime corridor — and the shipping and port jobs it carries.',
    accent: 'teal',
  },
  {
    n: '07',
    title: 'Public Safety',
    desc: 'Fund law enforcement, support officer training, and build real accountability that keeps every community safer.',
    accent: 'gold',
  },
]

const accentClasses = {
  gold: 'from-[var(--color-gold)]/12 to-transparent border-[var(--color-gold)]/30',
  clay: 'from-[var(--color-clay)]/12 to-transparent border-[var(--color-clay)]/30',
  teal: 'from-[var(--color-teal-soft)]/12 to-transparent border-[var(--color-teal-soft)]/30',
}
const accentDot = {
  gold: 'bg-[var(--color-gold)]',
  clay: 'bg-[var(--color-clay)]',
  teal: 'bg-[var(--color-teal-soft)]',
}

function Priorities() {
  return (
    <SectionReveal
      id="priorities"
      eyebrow="The Platform"
      number="02 /"
      className="bg-[var(--color-ink-2)] py-24 sm:py-32 lg:py-40"
      borders="both"
    >
      <Container size="wide">
        <div className="mb-16 grid grid-cols-1 items-end gap-y-10 sm:mb-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
              <SplitText
                as="span"
                text="Seven priorities."
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="One promise: results."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.2}
              />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)] lg:col-span-4 lg:border-l lg:border-[var(--color-line)] lg:pl-6"
          >
            Practical policy, written for the place we actually live. No slogans. No spectacle.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((it, i) => (
            <IssueCard key={it.n} item={it} index={i} />
          ))}
          <li className="flex flex-col justify-center bg-[var(--color-ink-2)] p-7 sm:p-9">
            <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
              Want more detail?
            </p>
            <Link
              href="/priorities"
              className="group font-display text-2xl leading-tight text-[var(--color-cream)] sm:text-3xl"
            >
              <span className="underline decoration-[var(--color-gold)] decoration-2 underline-offset-[6px] transition-colors group-hover:text-[var(--color-gold)]">
                Read the full platform
              </span>
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </SectionReveal>
  )
}

function IssueCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[var(--color-ink-2)] transition-colors duration-500 hover:bg-[var(--color-surface-2)]"
    >
      <Link
        href={`/priorities#issue-${item.n}`}
        className="group relative block h-full overflow-hidden p-7 sm:p-9"
      >
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 border-l-2 border-l-transparent bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100',
            accentClasses[item.accent]
          )}
        />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="tabular font-mono text-[11px] tracking-[0.32em] text-[var(--color-muted)] uppercase">
              {item.n}
            </span>
            <span className={cn('h-1.5 w-1.5 rounded-full', accentDot[item.accent])} />
          </div>
          <h3 className="font-display mt-8 text-2xl leading-tight text-[var(--color-cream)] transition-transform duration-500 group-hover:translate-x-1 sm:text-[28px]">
            {item.title}
          </h3>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
            {item.desc}
          </p>
          <span className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.28em] text-[var(--color-muted)] uppercase transition-colors group-hover:text-[var(--color-gold)]">
            Read more
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.li>
  )
}

IssueCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default Priorities
