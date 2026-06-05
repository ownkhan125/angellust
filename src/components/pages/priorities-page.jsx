'use client'

import PropTypes from 'prop-types'
import { motion } from 'motion/react'
import Link from 'next/link'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'

const issues = [
  {
    n: '01',
    accent: 'gold',
    title: 'Economic Growth',
    lead: 'Lower the barrier for small businesses, modernize infrastructure, and bring durable jobs back to District 1.',
    pillars: [
      'Cut the licensing process for new businesses from months to weeks.',
      'Direct federal infrastructure spend to roads, bridges, and broadband that the district actually uses.',
      'Pair tax incentives with measurable hiring commitments — not blank checks.',
    ],
  },
  {
    n: '02',
    accent: 'clay',
    title: 'Education & Choice',
    lead: 'Strong public schools, freedom for teachers to teach, and real vocational pathways for every student.',
    pillars: [
      'Increase classroom-direct funding and reduce administrative overhead.',
      'Expand vocational and apprenticeship programs in trades, maritime, and care work.',
      'Protect parental access to curriculum without politicizing the classroom.',
    ],
  },
  {
    n: '03',
    accent: 'teal',
    title: 'Healthcare & Veterans',
    lead: "Cut prescription costs, expand rural access, and honor our veterans with the care they've earned.",
    pillars: [
      'Negotiate prescription costs at the federal level and pass the savings through.',
      "Fund mobile and rural clinics that reach the towns hospitals don't.",
      'Eliminate the VA paperwork that keeps veterans from the care they qualify for.',
    ],
  },
  {
    n: '04',
    accent: 'gold',
    title: 'Land Stewardship',
    lead: 'Active forest management — fewer fires, healthier ecosystems, and respect for the people who work the land.',
    pillars: [
      'Coordinate fire prevention across federal, state, and tribal land managers.',
      'Fund forestry thinning, prescribed burns, and watershed protection.',
      'Support working farmers and ranchers with policy that reflects their reality.',
    ],
  },
  {
    n: '05',
    accent: 'clay',
    title: 'Housing',
    lead: 'Expand supply, streamline permits, and open financing pathways so families can plant roots here.',
    pillars: [
      'Direct funding to mid-density housing in towns with the worst supply pressure.',
      'Cut federal red tape on permitting timelines.',
      'Expand first-time-buyer financing for working and middle-income households.',
    ],
  },
  {
    n: '06',
    accent: 'teal',
    title: 'Maritime & Ports',
    lead: 'Protect the multi-billion-dollar maritime corridor — and the shipping and port jobs it carries.',
    pillars: [
      'Modernize port infrastructure with dedicated federal investment.',
      'Defend domestic shipping rules that keep jobs in the corridor.',
      'Coordinate dredging, navigation, and freight policy across federal agencies.',
    ],
  },
  {
    n: '07',
    accent: 'gold',
    title: 'Public Safety',
    lead: 'Fund law enforcement, support officer training, and build real accountability that keeps every community safer.',
    pillars: [
      'Direct funding toward officer training, mental-health response, and recruitment.',
      'Support transparency standards that build public trust.',
      'Resource rural sheriffs and volunteer departments with the equipment they need.',
    ],
  },
]

const dotByAccent = {
  gold: 'bg-[var(--color-gold)]',
  clay: 'bg-[var(--color-clay)]',
  teal: 'bg-[var(--color-teal-soft)]',
}

function PrioritiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Priorities' }]}
        eyebrow="The Platform"
        number="02 /"
        title="Seven priorities."
        italicTail="One promise: results."
        description="Practical policy, written for the place we actually live. No slogans. No spectacle."
      />

      {issues.map((it, i) => (
        <IssueBlock key={it.n} item={it} index={i} />
      ))}

      <PrioritiesCTA />
    </>
  )
}

function IssueBlock({ item, index }) {
  const alt = index % 2 === 1
  return (
    <SectionReveal
      id={`issue-${item.n}`}
      eyebrow={`Priority ${item.n}`}
      number={`0${parseInt(item.n) + 2} /`}
      className={`py-20 sm:py-24 ${alt ? 'bg-[var(--color-ink-2)]' : ''}`}
      borders={alt ? 'both' : 'top'}
    >
      <Container size="wide">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <span className={`h-1.5 w-1.5 rounded-full ${dotByAccent[item.accent]}`} />
              <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                Priority {item.n}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
              <SplitText as="span" text={item.title} mode="words" stagger={0.05} />
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--color-cream-dim)] sm:text-[17px]">
              {item.lead}
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {item.pillars.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink)] p-5 transition-colors hover:border-[var(--color-gold)]/40 sm:p-6"
              >
                <span className="tabular mt-1.5 shrink-0 font-mono text-[11px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
                  0{i + 1}
                </span>
                <p className="font-display text-lg leading-snug text-[var(--color-cream)] sm:text-xl">
                  {p}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </SectionReveal>
  )
}

function PrioritiesCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Like what you see?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              The platform is the easy part. Building the coalition to pass it takes neighbors like
              you. Volunteer, donate, or stop by an event.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/volunteer" variant="primary" className="text-[13px]">
              Volunteer
            </MagneticButton>
            <MagneticButton as={Link} href="/donate" variant="clay" className="text-[13px]">
              Donate
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

IssueBlock.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default PrioritiesPage
