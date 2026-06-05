'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import Marquee from '@/components/ui/marquee'
import TestimonialDeck from '@/components/ui/testimonial-deck'
import Modal from '@/components/ui/modal'
import { IMG } from '@/lib/images'
import { QUOTES as quotes, ORGS as orgs } from '@/lib/data'

function Endorsements() {
  const [active, setActive] = useState(null)

  return (
    <>
      <SectionReveal
        id="endorsements"
        eyebrow="What People Say"
        number="03 /"
        className="py-24 sm:py-28 lg:py-36"
      >
        <Container size="wide">
          {/* Header */}
          <div className="mb-14 grid grid-cols-1 items-end gap-y-8 sm:mb-16 lg:mb-20 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
                <SplitText
                  as="span"
                  text="Endorsed by the"
                  mode="words"
                  className="block"
                  stagger={0.05}
                />
                <SplitText
                  as="span"
                  text="people who do the work."
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
              Neighbors, business owners, first responders, and coalitions across District 1.
            </motion.p>
          </div>

          {/* Slider + feature panel grid */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Feature panel (left) */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] sm:min-h-[440px]">
                <Image
                  src={IMG.candidateField}
                  alt="AngelLust meeting with community members"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9">
                  <p className="mb-3 font-mono text-[10px] tracking-[0.32em] text-[var(--color-gold)] uppercase sm:mb-4">
                    On the trail · District 1
                  </p>
                  <p className="font-display text-xl leading-tight text-[var(--color-cream)] sm:text-2xl lg:text-[28px]">
                    “The endorsements that matter aren't the loudest ones — they're the ones that
                    came after the second meeting.”
                  </p>
                  <div className="mt-5 flex items-center gap-3 sm:mt-6">
                    <span className="h-px w-10 bg-[var(--color-gold)]" />
                    <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--color-cream-dim)] uppercase sm:text-[12px]">
                      — AngelLust
                    </span>
                  </div>
                </div>
                <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-[var(--color-gold)]" />
                <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-[var(--color-gold)]" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[var(--color-gold)]" />
                <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--color-gold)]" />
              </div>
            </div>

            {/* Slider (right) */}
            <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-7">
              <TestimonialDeck
                items={quotes}
                renderCard={(q) => (
                  <article className="relative flex h-full flex-col rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface-2)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75)]">
                    <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
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

                      <p className="font-display text-[20px] leading-snug text-[var(--color-cream)] sm:text-[24px] lg:text-[28px]">
                        {q.quote}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-7 sm:gap-5 sm:pt-9">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--color-line-strong)]">
                          <Image
                            src={q.img}
                            alt={q.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
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
                            setActive(q)
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

              <p className="mt-5 text-center font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase sm:text-left">
                Drag · swipe · or use the controls
              </p>
            </div>
          </div>

          {/* Coalition marquee */}
          <div className="mt-16 border-t border-[var(--color-line)] pt-10 sm:mt-20 sm:pt-12">
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
          </div>
        </Container>
      </SectionReveal>

      {/* Quick View modal */}
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

export default Endorsements
