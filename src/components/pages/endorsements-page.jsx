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
import Marquee from '@/components/ui/marquee'
import TestimonialDeck from '@/components/ui/testimonial-deck'
import Modal from '@/components/ui/modal'
import MagneticButton from '@/components/ui/magnetic-button'
import { QUOTES, ORGS } from '@/lib/data'

function EndorsementsPage() {
  const [active, setActive] = useState(null)

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Endorsements' }]}
        eyebrow="What People Say"
        number="03 /"
        title="Endorsed by the"
        italicTail="people who do the work."
        description="Every name on this page belongs to a neighbor who put it there themselves — no transactions, no exchanges, no fine print."
      />

      <FeaturedDeck quotes={QUOTES} onOpen={setActive} />
      <FullList quotes={QUOTES} onOpen={setActive} />
      <Coalition orgs={ORGS} />
      <EndorseCTA />

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="Endorsement · Quick View"
        size="lg"
      >
        {active && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--color-line)]">
                <Image
                  src={active.img}
                  alt={active.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
              <p className="font-display mt-5 text-xl text-[var(--color-cream)]">{active.name}</p>
              <p className="mt-1.5 font-mono text-[12px] tracking-[0.24em] text-[var(--color-muted)] uppercase">
                {active.role}
              </p>
              <p className="mt-1 font-mono text-[12px] tracking-[0.24em] text-[var(--color-gold)] uppercase">
                {active.org}
              </p>
            </div>
            <div className="sm:col-span-8">
              <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                In their words
              </p>
              <p className="font-display text-2xl leading-snug text-[var(--color-cream)]">
                “{active.quote}”
              </p>
              <div className="my-6 h-px w-12 bg-[var(--color-gold)]" />
              <p className="text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
                {active.full}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function FeaturedDeck({ quotes, onOpen }) {
  return (
    <SectionReveal eyebrow="Featured" number="01 /" className="py-20 sm:py-24">
      <Container size="wide">
        <div className="mx-auto max-w-3xl">
          <TestimonialDeck
            items={quotes}
            renderCard={(q) => (
              <article className="relative flex h-full flex-col rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface-2)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75)]">
                <div className="flex flex-1 flex-col p-6 sm:p-9 lg:p-10">
                  <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--color-muted)] uppercase sm:text-[11px]">
                      Endorsement
                    </span>
                    <span className="text-xs tracking-[0.2em] text-[var(--color-gold)] sm:text-sm">
                      ★ ★ ★ ★ ★
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="font-display absolute -top-3 left-5 text-[5rem] leading-none text-[var(--color-gold)]/15 select-none sm:left-7 sm:text-[6rem]"
                  >
                    “
                  </span>
                  <p className="font-display text-[20px] leading-snug text-[var(--color-cream)] sm:text-[24px] lg:text-[30px]">
                    {q.quote}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-7 sm:gap-5 sm:pt-9">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--color-line-strong)]">
                      <Image src={q.img} alt={q.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] text-[var(--color-cream)] sm:text-base">
                        {q.name}
                      </p>
                      <p className="mt-1 truncate font-mono text-[11px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                        {q.role}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[11px] tracking-[0.22em] text-[var(--color-gold)] uppercase">
                        {q.org}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen(q)
                      }}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-4 py-2 font-mono text-[11px] tracking-[0.24em] text-[var(--color-cream-dim)] uppercase transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    >
                      Read <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </Container>
    </SectionReveal>
  )
}

function FullList({ quotes, onOpen }) {
  return (
    <SectionReveal
      eyebrow="Every endorsement"
      number="02 /"
      className="bg-[var(--color-ink-2)] py-20 sm:py-28"
      borders="both"
    >
      <Container size="wide">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
            <SplitText as="span" text="The full list." mode="words" stagger={0.05} />
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.li
              key={q.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink)] p-6 transition-colors hover:border-[var(--color-gold)]/40 sm:p-7"
            >
              <div className="mb-5 flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--color-line-strong)]">
                  <Image src={q.img} alt={q.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] text-[var(--color-cream)]">{q.name}</p>
                  <p className="mt-1 truncate font-mono text-[11px] tracking-[0.22em] text-[var(--color-muted)] uppercase">
                    {q.role}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[11px] tracking-[0.22em] text-[var(--color-gold)] uppercase">
                    {q.org}
                  </p>
                </div>
              </div>
              <p className="font-display text-[17px] leading-snug text-[var(--color-cream)] sm:text-[19px]">
                “{q.quote}”
              </p>
              <button
                onClick={() => onOpen(q)}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-[var(--color-cream-dim)] uppercase transition-colors hover:text-[var(--color-gold)]"
              >
                Read full endorsement <span aria-hidden>→</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </Container>
    </SectionReveal>
  )
}

function Coalition({ orgs }) {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
      <Container size="wide">
        <p className="mb-8 text-center font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
          Coalition partners
        </p>
        <Marquee speed={45}>
          {orgs.map((o, i) => (
            <span
              key={i}
              className="font-display flex items-center gap-12 text-xl whitespace-nowrap text-[var(--color-cream-dim)] sm:text-2xl lg:text-3xl"
            >
              {o}
              <span className="text-[var(--color-gold)]">✦</span>
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  )
}

function EndorseCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Want to add your name?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Endorsements come from neighbors, organizations, and coalitions across the district.
              We'll review your submission and follow up before it appears publicly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/contact" variant="primary" className="text-[13px]">
              Submit an endorsement
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

const quotesArrayType = PropTypes.arrayOf(PropTypes.object)

FeaturedDeck.propTypes = {
  quotes: quotesArrayType.isRequired,
  onOpen: PropTypes.func.isRequired,
}

FullList.propTypes = {
  quotes: quotesArrayType.isRequired,
  onOpen: PropTypes.func.isRequired,
}

Coalition.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default EndorsementsPage
