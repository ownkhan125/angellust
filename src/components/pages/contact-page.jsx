'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'

const reasons = [
  { v: 'general', l: 'General question' },
  { v: 'event', l: 'Invite us to an event' },
  { v: 'press', l: 'Press inquiry' },
  { v: 'endorsement', l: 'Endorsement / coalition' },
  { v: 'volunteer', l: 'Volunteer help' },
  { v: 'other', l: 'Something else' },
]

function ContactPage() {
  const [done, setDone] = useState(false)
  const [reason, setReason] = useState('general')

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Connect"
        number="06 /"
        title="Send us a"
        italicTail="real message."
        description="Every email and call is reviewed by a real person on the campaign — we read everything, even when we can't respond to all of it."
      />

      <SectionReveal eyebrow="Get in touch" number="01 /" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-7 sm:p-9 lg:p-10">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="py-10 text-center"
                  >
                    <p className="font-display text-3xl text-[var(--color-gold)]">
                      Message received.
                    </p>
                    <p className="mx-auto mt-4 max-w-md text-[15px] text-[var(--color-cream-dim)]">
                      We'll get back to you within two business days.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setDone(true)
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-3 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                        What's this about?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {reasons.map((r) => (
                          <button
                            type="button"
                            key={r.v}
                            onClick={() => setReason(r.v)}
                            className={`rounded-full border px-3.5 py-2 text-[12px] transition-colors ${
                              reason === r.v
                                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                                : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]'
                            }`}
                          >
                            {r.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field name="firstName" label="First name" required />
                      <Field name="lastName" label="Last name" required />
                    </div>
                    <Field name="email" type="email" label="Email" required />
                    <Field name="org" label="Organization (optional)" />

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        required
                        className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)]"
                        placeholder="Tell us what's on your mind…"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
                    >
                      Send message
                    </button>
                    <p className="text-center font-mono text-[11px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                      We never share your information.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <h2 className="font-display mb-7 text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
                <SplitText
                  as="span"
                  text="Or reach us"
                  mode="words"
                  className="block"
                  stagger={0.05}
                />
                <SplitText
                  as="span"
                  text="directly."
                  mode="words"
                  className="block text-[var(--color-gold)] italic"
                  stagger={0.05}
                  delay={0.15}
                />
              </h2>

              <ul className="space-y-5">
                <Info label="Phone" value="(503) 555-0142" sub="Mon – Fri · 9 AM to 6 PM PT" />
                <Info
                  label="Email"
                  value="hello@angellustforcongress.org"
                  sub="Replies within 2 business days"
                />
                <Info label="Mail" value="PO Box 1776" sub="Beaverton, OR 97075" />
                <Info
                  label="Press"
                  value="press@angellustforcongress.org"
                  sub="Same-day response for press inquiries"
                />
              </ul>
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

function Info({ label, value, sub }) {
  return (
    <li className="border-b border-[var(--color-line)] pb-5">
      <p className="mb-1.5 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        {label}
      </p>
      <p className="font-display text-xl text-[var(--color-cream)]">{value}</p>
      <p className="mt-1 font-mono text-[12px] tracking-[0.22em] text-[var(--color-gold)] uppercase">
        {sub}
      </p>
    </li>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
}

Info.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
}

export default ContactPage
