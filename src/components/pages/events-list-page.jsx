'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import { cn } from '@/lib/utils'

const filters = ['All', 'Town Hall', 'Meet & Greet', 'Community', 'Listening Session', 'Tour']

function EventsListPage({ events }) {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? events : events.filter((e) => e.tag === filter)

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
        eyebrow="On the Trail"
        number="04 /"
        title="Come meet"
        italicTail="the campaign."
        description="Town halls, listening sessions, and community events across District 1 — drop into any of them."
      />

      <SectionReveal eyebrow="Upcoming" number="01 /" className="py-16 sm:py-20">
        <Container size="wide">
          {/* Filter row */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-[12px] tracking-[0.22em] uppercase transition-colors',
                  f === filter
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)]'
                    : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]'
                )}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
              {filtered.length} event{filtered.length === 1 ? '' : 's'}
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {filtered.map((e, i) => (
              <EventCard key={e.slug} event={e} index={i} />
            ))}
          </ul>
        </Container>
      </SectionReveal>

      <EventsCTA />
    </>
  )
}

function EventCard({ event, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.05 * (index % 4), ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] transition-colors hover:border-[var(--color-gold)]/40"
    >
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={event.img}
            alt={event.place}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-2)] via-transparent to-transparent" />
          <div className="absolute top-5 left-5">
            <span className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-[var(--color-ink)] uppercase">
              {event.tag}
            </span>
          </div>
          <div className="absolute right-5 bottom-5 text-right">
            <p className="font-display text-2xl text-white drop-shadow sm:text-3xl">{event.date}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.24em] text-white/85 uppercase">
              {event.time}
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <h3 className="font-display text-xl text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)] sm:text-2xl">
            {event.title}
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-cream-dim)]">
            {event.place} <span className="text-[var(--color-muted)]">·</span> {event.city}
          </p>
          <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-[var(--color-cream-dim)]">
            {event.description}
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[12px] tracking-[0.24em] text-[var(--color-gold)] uppercase transition-all group-hover:gap-3">
            View details <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

function EventsCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Want us at your event?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Send a note — every invitation is reviewed within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/contact" variant="primary" className="text-[13px]">
              Invite the campaign
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

EventsListPage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default EventsListPage
