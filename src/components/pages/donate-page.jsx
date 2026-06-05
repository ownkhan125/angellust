'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'
import { cn } from '@/lib/utils'

const TIERS = [
  { amount: 25, label: 'Yard sign + sticker' },
  { amount: 50, label: 'Funds an hour of canvassing' },
  { amount: 100, label: 'Fuels a town hall' },
  { amount: 250, label: 'Sponsors a phone bank night' },
  { amount: 500, label: 'Funds a week of field staff' },
  { amount: 1000, label: 'Powers a full district event' },
]

const FREQ = [
  { v: 'once', l: 'One time' },
  { v: 'monthly', l: 'Monthly' },
]

function DonatePage() {
  const [amount, setAmount] = useState(50)
  const [custom, setCustom] = useState('')
  const [freq, setFreq] = useState('once')
  const [done, setDone] = useState(false)

  const finalAmount = custom ? parseInt(custom, 10) || 0 : amount

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Donate' }]}
        eyebrow="Join the Movement"
        number="07 /"
        title="Grassroots funded."
        italicTail="No PAC money."
        description="We don't take corporate PAC money. Every dollar comes from neighbors — and every dollar goes back into the work of meeting them."
      />

      <SectionReveal eyebrow="Pick a tier" number="01 /" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Tiers + amount */}
            <div className="lg:col-span-7">
              <div className="mb-7 flex items-center gap-2">
                {FREQ.map((f) => (
                  <button
                    key={f.v}
                    onClick={() => setFreq(f.v)}
                    className={cn(
                      'rounded-full border px-5 py-2.5 font-mono text-[12px] tracking-[0.24em] uppercase transition-colors',
                      freq === f.v
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)]'
                        : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]'
                    )}
                  >
                    {f.l}
                  </button>
                ))}
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TIERS.map((t) => {
                  const active = !custom && amount === t.amount
                  return (
                    <li key={t.amount}>
                      <button
                        onClick={() => {
                          setAmount(t.amount)
                          setCustom('')
                        }}
                        className={cn(
                          'group w-full rounded-2xl border p-5 text-left transition-all duration-300',
                          active
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/[0.06]'
                            : 'border-[var(--color-line)] bg-[var(--color-ink-2)] hover:border-[var(--color-gold)]/40'
                        )}
                      >
                        <p
                          className={cn(
                            'font-display tabular text-3xl transition-colors',
                            active ? 'text-[var(--color-gold)]' : 'text-[var(--color-cream)]'
                          )}
                        >
                          ${t.amount}
                        </p>
                        <p className="mt-2 text-[12px] leading-snug text-[var(--color-cream-dim)]">
                          {t.label}
                        </p>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Custom amount */}
              <div className="mt-5">
                <label className="mb-2 block font-mono text-[11px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                  Or enter your own amount
                </label>
                <div className="flex max-w-xs overflow-hidden rounded-2xl border border-[var(--color-line-strong)] transition-colors focus-within:border-[var(--color-gold)]">
                  <span className="font-display flex items-center px-4 text-xl text-[var(--color-cream-dim)]">
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={3300}
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Custom"
                    className="font-display flex-1 bg-transparent py-3 text-xl text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
                  />
                </div>
                <p className="mt-3 font-mono text-[11px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                  Federal max: $3,300 per individual per election.
                </p>
              </div>
            </div>

            {/* Donor info */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-7 sm:p-9">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="py-8 text-center"
                  >
                    <p className="font-display text-3xl text-[var(--color-gold)]">Thank you.</p>
                    <p className="mx-auto mt-3 max-w-sm text-[15px] text-[var(--color-cream-dim)]">
                      Your ${finalAmount}{' '}
                      {freq === 'monthly' ? 'monthly contribution' : 'contribution'} is what makes
                      this campaign possible.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setDone(true)
                    }}
                    className="space-y-4"
                  >
                    <div className="mb-2 flex items-baseline justify-between">
                      <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                        Your contribution
                      </p>
                      <p className="font-display tabular text-2xl text-[var(--color-gold)]">
                        ${finalAmount.toLocaleString()}
                        {freq === 'monthly' ? '/mo' : ''}
                      </p>
                    </div>
                    <Field name="firstName" label="First name" required />
                    <Field name="lastName" label="Last name" required />
                    <Field name="email" type="email" label="Email" required />
                    <Field name="zip" label="ZIP code" required />
                    <Field name="employer" label="Employer" required />
                    <Field name="occupation" label="Occupation" required />
                    <button
                      type="submit"
                      disabled={finalAmount < 1}
                      className="mt-3 w-full rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)] disabled:opacity-40"
                    >
                      Donate ${finalAmount.toLocaleString()}
                      {freq === 'monthly' ? '/mo' : ''}
                    </button>
                    <p className="text-center font-mono text-[10px] leading-relaxed tracking-[0.22em] text-[var(--color-muted)] uppercase">
                      Paid for by AngelLust for Congress. Contributions are not tax-deductible.
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
        className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-cream)] transition-colors outline-none focus:border-[var(--color-gold)]"
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

export default DonatePage
