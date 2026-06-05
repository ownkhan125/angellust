'use client'

import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EVENTS } from '@/lib/data'

// Surface the first 4 events on the homepage; the full list lives at /events
const events = EVENTS.slice(0, 4).map((e) => ({
  ...e,
  day: e.fullDate.split(',')[0].slice(0, 3),
}))

function Events() {
  const [active, setActive] = useState(null)

  return (
    <>
      <SectionReveal
        id="events"
        eyebrow="On the Trail"
        number="04 /"
        className="bg-[var(--color-ink-2)] py-24 sm:py-32 lg:py-40"
        borders="both"
      >
        <Container size="wide">
          <div className="mb-16 grid grid-cols-1 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
                <SplitText
                  as="span"
                  text="Come meet"
                  mode="words"
                  className="block"
                  stagger={0.05}
                />
                <SplitText
                  as="span"
                  text="the campaign."
                  mode="words"
                  className="block text-[var(--color-gold)] italic"
                  stagger={0.05}
                  delay={0.15}
                />
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:border-l lg:border-[var(--color-line)] lg:pl-6"
            >
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
                Upcoming town halls, listening sessions, and community events across District 1.
              </p>
              <MagneticButton as={Link} href="/events" variant="ghost" className="mt-6 text-[13px]">
                View Full Calendar
              </MagneticButton>
            </motion.div>
          </div>

          <ul className="divide-y divide-[var(--color-line)] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink)]">
            {events.map((e, i) => (
              <EventRow key={i} event={e} index={i} onRsvp={() => setActive(e)} />
            ))}
          </ul>
        </Container>
      </SectionReveal>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="RSVP · Reserve your seat"
        size="lg"
      >
        {active && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)]">
                <Image
                  src={active.img}
                  alt={active.place}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-[var(--color-ink)] uppercase">
                    {active.tag}
                  </span>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <p className="font-display text-xl text-[var(--color-cream)]">{active.title}</p>
                <p className="text-[13px] text-[var(--color-cream-dim)]">
                  {active.date} · {active.day} · {active.time}
                </p>
                <p className="text-[13px] text-[var(--color-muted)]">
                  {active.place} · {active.city}
                </p>
              </div>
            </div>
            <div className="sm:col-span-7">
              <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                About this event
              </p>
              <p className="text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
                {active.description}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setActive(null)
                }}
                className="mt-7 space-y-3"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="First name"
                    className="rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                  />
                  <input
                    required
                    placeholder="Last name"
                    className="rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                />
                <input
                  placeholder="ZIP code (optional)"
                  className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
                >
                  Reserve my seat
                </button>
                <p className="text-center font-mono text-[11px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                  We never share your information.
                </p>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function EventRow({ event, index, onRsvp }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative grid grid-cols-12 items-center gap-3 px-5 py-5 transition-colors duration-500 hover:bg-[var(--color-surface-2)] sm:gap-6 sm:px-7 sm:py-6"
    >
      {/* Venue image */}
      <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-line)] sm:col-span-2">
        <Image
          src={event.img}
          alt={event.place}
          fill
          sizes="(min-width: 640px) 160px, 100px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-2 left-2 hidden sm:block">
          <p className="font-display text-sm leading-none text-white drop-shadow">{event.date}</p>
        </div>
      </div>

      {/* Date block (mobile) + meta */}
      <div className="col-span-9 min-w-0 sm:col-span-7">
        <div className="mb-1.5 flex items-center gap-3">
          <span className="font-display text-lg leading-none text-[var(--color-gold)] sm:hidden">
            {event.date}
          </span>
          <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
            {event.day} · {event.time}
          </span>
          <span className="hidden rounded-full border border-[var(--color-line-strong)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.28em] text-[var(--color-cream-dim)] uppercase md:inline-block">
            {event.tag}
          </span>
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="font-display inline-block truncate text-xl leading-tight text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)] sm:text-2xl"
        >
          {event.title}
        </Link>
        <p className="mt-1 truncate text-[13px] text-[var(--color-cream-dim)]">
          {event.place} <span className="text-[var(--color-muted)]">·</span> {event.city}
        </p>
      </div>

      {/* RSVP */}
      <div className="col-span-12 mt-2 flex items-center justify-end gap-4 sm:col-span-3 sm:mt-0">
        <button
          onClick={onRsvp}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-4 py-2 font-mono text-[12px] tracking-[0.24em] text-[var(--color-cream)] uppercase transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
        >
          RSVP <span>→</span>
        </button>
      </div>

      {/* Hover accent line */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--color-gold)] transition-transform duration-500 group-hover:scale-y-100"
      />
    </motion.li>
  )
}

EventRow.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRsvp: PropTypes.func.isRequired,
}

export default Events
