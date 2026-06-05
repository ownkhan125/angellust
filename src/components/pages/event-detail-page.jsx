'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'

function EventDetailPage({ event, related }) {
  return (
    <>
      <EventHero event={event} />
      <Overview event={event} />
      <ScheduleAndForm event={event} />
      <RelatedEvents items={related} />
      <DetailCTA />
    </>
  )
}

function EventHero({ event }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={event.img}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/70 via-[var(--color-ink)]/40 to-[var(--color-ink)]" />
      </div>
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase"
        >
          <Link href="/" className="transition-colors hover:text-[var(--color-cream)]">
            Home
          </Link>
          <span className="text-[var(--color-line-strong)]">/</span>
          <Link href="/events" className="transition-colors hover:text-[var(--color-cream)]">
            Events
          </Link>
          <span className="text-[var(--color-line-strong)]">/</span>
          <span className="truncate text-[var(--color-cream-dim)]">{event.title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="mb-7 h-px w-28 origin-left bg-[var(--color-gold)]"
        />

        <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8">
            <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase">
              <span className="tabular">{event.date}</span> · {event.tag}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
              <SplitText as="span" text={event.title} mode="words" stagger={0.05} delay={0.3} />
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-cream-dim)] sm:text-base">
              {event.description}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]/85 p-6 backdrop-blur lg:col-span-4"
          >
            <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
              When & where
            </p>
            <p className="font-display text-xl text-[var(--color-cream)]">{event.fullDate}</p>
            <p className="mt-1 text-[13px] text-[var(--color-cream-dim)]">
              {event.time}
              {event.endTime ? ` – ${event.endTime}` : ''}
            </p>
            <div className="my-5 h-px w-12 bg-[var(--color-gold)]" />
            <p className="font-display text-lg text-[var(--color-cream)]">{event.place}</p>
            <p className="mt-1 text-[13px] text-[var(--color-cream-dim)]">{event.address}</p>
            <div className="mt-6 flex items-center justify-between font-mono text-[11px] tracking-[0.24em] uppercase">
              <span className="text-[var(--color-muted)]">Capacity</span>
              <span className="tabular text-[var(--color-cream)]">
                {event.rsvped} / {event.capacity}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-line)]">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (event.rsvped / event.capacity) * 100)}%` }}
                transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block h-full bg-[var(--color-gold)]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Overview({ event }) {
  return (
    <SectionReveal eyebrow="Overview" number="01 /" className="py-16 sm:py-20">
      <Container size="wide">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-[var(--color-line)] sm:aspect-[16/7]">
          <Image src={event.img} alt={event.place} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
            <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
              Featured image
            </p>
            <p className="font-display mt-2 text-2xl text-[var(--color-cream)] sm:text-3xl">
              {event.place}
            </p>
          </div>
        </div>
      </Container>
    </SectionReveal>
  )
}

function ScheduleAndForm({ event }) {
  const [done, setDone] = useState(false)

  return (
    <SectionReveal
      eyebrow="Schedule & RSVP"
      number="02 /"
      className="bg-[var(--color-ink-2)] py-16 sm:py-20"
      borders="both"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Schedule */}
          <div className="lg:col-span-6">
            <h2 className="font-display mb-8 text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
              <SplitText as="span" text="What to expect" mode="words" stagger={0.05} />
            </h2>
            <ol className="relative space-y-6 border-l border-[var(--color-line)] pl-6 sm:pl-8">
              {event.schedule.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="absolute top-1.5 -left-[34px] h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] ring-4 ring-[var(--color-ink-2)] sm:-left-[42px]" />
                  <p className="tabular font-mono text-[11px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
                    {s.t}
                  </p>
                  <p className="font-display mt-1.5 text-lg leading-snug text-[var(--color-cream)] sm:text-xl">
                    {s.h}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* RSVP form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink)] p-7 sm:p-9">
              <p className="mb-2 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                RSVP
              </p>
              <h3 className="font-display mb-6 text-2xl text-[var(--color-cream)] sm:text-3xl">
                Reserve your seat
              </h3>

              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] p-6"
                >
                  <p className="font-display text-xl text-[var(--color-gold)]">
                    You're on the list.
                  </p>
                  <p className="mt-2 text-[14px] text-[var(--color-cream-dim)]">
                    A confirmation email is on its way. We'll send a reminder the morning of the
                    event.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-[var(--color-cream-dim)] uppercase transition-colors hover:text-[var(--color-gold)]"
                  >
                    RSVP another seat <span aria-hidden>→</span>
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setDone(true)
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field name="firstName" label="First name" required />
                    <Field name="lastName" label="Last name" required />
                  </div>
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Phone (optional)" type="tel" />
                  <Field name="zip" label="ZIP code" />
                  <div>
                    <label className="mb-2 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                      Seats
                    </label>
                    <select
                      name="seats"
                      defaultValue="1"
                      className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none focus:border-[var(--color-gold)]"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} seat{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
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
              )}
            </div>
          </div>
        </div>
      </Container>
    </SectionReveal>
  )
}

function Field({ name, label, type = 'text', required = false }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
      />
    </div>
  )
}

function RelatedEvents({ items }) {
  if (!items?.length) return null
  return (
    <SectionReveal eyebrow="More events" number="03 /" className="py-20 sm:py-24">
      <Container size="wide">
        <h2 className="font-display mb-10 text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
          <SplitText as="span" text="Other stops on the trail" mode="words" stagger={0.05} />
        </h2>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((e, i) => (
            <motion.li
              key={e.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/events/${e.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] transition-colors hover:border-[var(--color-gold)]/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={e.img}
                    alt={e.place}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-[var(--color-ink)] uppercase">
                      {e.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="tabular font-mono text-[11px] tracking-[0.24em] text-[var(--color-gold)] uppercase">
                    {e.date}
                  </p>
                  <p className="font-display mt-2 text-lg leading-tight text-[var(--color-cream)] sm:text-xl">
                    {e.title}
                  </p>
                  <p className="mt-1.5 text-[13px] text-[var(--color-cream-dim)]">{e.city}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </SectionReveal>
  )
}

function DetailCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Can't make this one?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Get added to the campaign list and we'll let you know when we're in your town next.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/events" variant="ghost" className="text-[13px]">
              All events
            </MagneticButton>
            <MagneticButton as={Link} href="/volunteer" variant="primary" className="text-[13px]">
              Join the list
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

const eventShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  fullDate: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  endTime: PropTypes.string,
  title: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schedule: PropTypes.arrayOf(
    PropTypes.shape({ t: PropTypes.string.isRequired, h: PropTypes.string.isRequired })
  ),
  capacity: PropTypes.number,
  rsvped: PropTypes.number,
})

EventDetailPage.propTypes = {
  event: eventShape.isRequired,
  related: PropTypes.arrayOf(eventShape).isRequired,
}

EventHero.propTypes = { event: eventShape.isRequired }
Overview.propTypes = { event: eventShape.isRequired }
ScheduleAndForm.propTypes = { event: eventShape.isRequired }
RelatedEvents.propTypes = { items: PropTypes.arrayOf(eventShape).isRequired }

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
}

export default EventDetailPage
