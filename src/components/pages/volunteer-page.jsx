'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'motion/react'
import Link from 'next/link'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import { cn } from '@/lib/utils'

const interests = [
  'Knock doors',
  'Phone banking',
  'Host a coffee',
  'Tabling at events',
  'Yard sign delivery',
  'Data entry',
  'Communications',
  'Translation',
]

const availability = ['Weekday evenings', 'Weekday days', 'Weekends', 'Whenever needed']

function VolunteerPage() {
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const [avail, setAvail] = useState('')

  const toggle = (i) => {
    setSelected((s) => {
      const next = new Set(s)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer' }]}
        eyebrow="Take Action"
        number="05 /"
        title="Help us reach"
        italicTail="every door."
        description="Field organizing wins races. Every hour you give, every shift you take, every neighbor you call — it adds up to a representative who actually showed up."
      />

      <SectionReveal eyebrow="Sign up" number="01 /" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="font-display mb-6 text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
                <SplitText
                  as="span"
                  text="Tell us a little"
                  mode="words"
                  className="block"
                  stagger={0.05}
                />
                <SplitText
                  as="span"
                  text="about you."
                  mode="words"
                  className="block text-[var(--color-gold)] italic"
                  stagger={0.05}
                  delay={0.15}
                />
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
                A real person reads every submission. You'll hear back within two business days with
                the next-step closest to where you live.
              </p>
              <div className="mt-10 space-y-5">
                {[
                  { k: '1,200+', v: 'Active volunteers in District 1' },
                  { k: '48 hrs', v: 'Average response time' },
                  { k: 'No quota', v: 'Give as much or as little time as you can' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-5 border-b border-[var(--color-line)] pb-4"
                  >
                    <span className="font-display tabular text-2xl text-[var(--color-gold)]">
                      {s.k}
                    </span>
                    <span className="text-[14px] text-[var(--color-cream-dim)]">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-7 sm:p-9 lg:p-10">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="py-10 text-center"
                  >
                    <p className="font-display text-3xl text-[var(--color-gold)] sm:text-4xl">
                      Welcome to the team.
                    </p>
                    <p className="mx-auto mt-4 max-w-md text-[15px] text-[var(--color-cream-dim)]">
                      We'll be in touch within two business days with a shift that fits your
                      availability and ZIP.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <MagneticButton
                        as={Link}
                        href="/events"
                        variant="ghost"
                        className="text-[13px]"
                      >
                        See upcoming events
                      </MagneticButton>
                      <MagneticButton
                        as={Link}
                        href="/donate"
                        variant="primary"
                        className="text-[13px]"
                      >
                        Donate too
                      </MagneticButton>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setDone(true)
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field name="firstName" label="First name" required />
                      <Field name="lastName" label="Last name" required />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field name="email" type="email" label="Email" required />
                      <Field name="phone" type="tel" label="Phone (optional)" />
                    </div>
                    <Field name="zip" label="ZIP code" required />

                    <div>
                      <label className="mb-3 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                        How can you help? (select any)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => toggle(i)}
                            className={cn(
                              'rounded-full border px-3.5 py-2 text-[12px] transition-colors',
                              selected.has(i)
                                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                                : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]'
                            )}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                        When are you available?
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {availability.map((a) => (
                          <button
                            type="button"
                            key={a}
                            onClick={() => setAvail(a)}
                            className={cn(
                              'rounded-xl border px-4 py-3 text-left text-[13px] transition-colors',
                              avail === a
                                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/[0.06] text-[var(--color-cream)]'
                                : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)]'
                            )}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase"
                      >
                        Anything else?
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                        placeholder="Skills, languages, schedule notes…"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
                    >
                      Sign me up
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
    </>
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
        className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
      />
    </div>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
}

export default VolunteerPage
