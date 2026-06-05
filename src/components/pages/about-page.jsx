'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import { IMG } from '@/lib/images'

const principles = [
  {
    n: '01',
    title: 'Show up first',
    body: 'Decisions follow conversations. We bring policy back to the meeting rooms where it actually lands.',
  },
  {
    n: '02',
    title: 'Read the room',
    body: 'The district is bigger than one industry, one party, or one corner of the map. We work the whole map.',
  },
  {
    n: '03',
    title: 'Write it down',
    body: 'Every promise is published. Every vote is explained. Every change of mind is on the record.',
  },
  {
    n: '04',
    title: 'Stay in it',
    body: "Service is the long version of showing up. We're here for the work that doesn't get filmed.",
  },
]

const timeline = [
  { y: '1993', e: 'Born and raised in District 1.' },
  { y: '2011', e: 'Graduated from Pacific Coast High; first job at the family hardware store.' },
  { y: '2015', e: 'Earned a degree in public policy from Western State University.' },
  { y: '2017', e: 'Joined the Coastal Community Services board.' },
  { y: '2019', e: 'Founded a small-business mentorship network now serving 300+ owners.' },
  { y: '2022', e: 'Appointed Director of Community Services for District 1.' },
  { y: '2025', e: 'Announced candidacy for Congress.' },
]

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow="The Candidate"
        number="01 /"
        title="Service is the"
        italicTail="long version of showing up."
        description="AngelLust has spent over three decades serving District 1 — first as a small-business owner, then as a community-services director, and now as a candidate for Congress."
      />

      <Bio />
      <Timeline />
      <Principles principles={principles} />
      <AboutCTA />
    </>
  )
}

function Bio() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <SectionReveal eyebrow="Biography" number="02 /" className="py-20 sm:py-28">
      <Container size="wide">
        <div ref={ref} className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            style={{ y: portraitY }}
            className="order-2 will-change-transform lg:order-1 lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)]">
              <Image
                src={IMG.candidatePortrait}
                alt="Portrait of AngelLust"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="font-display text-3xl text-[var(--color-cream)]">AngelLust</p>
                <p className="mt-2 font-mono text-[12px] tracking-[0.28em] text-[var(--color-cream-dim)] uppercase">
                  Candidate · District 1
                </p>
              </div>
              <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-[var(--color-gold)]" />
              <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-[var(--color-gold)]" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[var(--color-gold)]" />
              <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:pt-6">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.02em]">
              <SplitText
                as="span"
                text="A neighbor first."
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="A candidate second."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.2}
              />
            </h2>
            <div className="mt-9 max-w-xl space-y-5 text-[16px] leading-relaxed text-[var(--color-cream-dim)] sm:text-[17px]">
              <p>
                AngelLust grew up in a third-generation District 1 family. Their grandparents worked
                the docks; their parents ran a hardware store that stayed open through three
                downturns. They learned early that politics is what happens in the room when no
                one's filming.
              </p>
              <p>
                For more than a decade, AngelLust ran a community-services office that processed
                thousands of small-grant applications, hosted hundreds of town halls, and built a
                reputation for returning every phone call.
              </p>
              <p>
                They're running for Congress because the same coalition that built this district —
                small businesses, working families, veterans, educators, tradespeople — has been
                waiting for representation that takes the work seriously.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton as={Link} href="/priorities" variant="ghost" className="text-[13px]">
                Read the platform
              </MagneticButton>
              <MagneticButton as={Link} href="/endorsements" variant="dark" className="text-[13px]">
                See endorsements
              </MagneticButton>
            </div>
          </div>
        </div>
      </Container>
    </SectionReveal>
  )
}

function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <SectionReveal
      eyebrow="Timeline"
      number="03 /"
      className="bg-[var(--color-ink-2)] py-20 sm:py-28"
      borders="both"
    >
      <Container size="wide">
        <div className="mb-10 grid grid-cols-1 items-end gap-10 sm:mb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              <SplitText
                as="span"
                text="A line you can"
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="trace."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.2}
              />
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)] lg:col-span-4 lg:border-l lg:border-[var(--color-line)] lg:pl-6">
            Thirty years of service in District 1, on the record.
          </p>
        </div>
        <ol
          ref={ref}
          className="relative space-y-7 border-l border-[var(--color-line)] pl-6 sm:space-y-9 sm:pl-10"
        >
          {timeline.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="absolute top-2 -left-[34px] h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] ring-4 ring-[var(--color-ink-2)] sm:-left-[51px]" />
              <p className="tabular font-mono text-[11px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
                {t.y}
              </p>
              <p className="font-display mt-2 max-w-2xl text-xl leading-snug text-[var(--color-cream)] sm:text-2xl">
                {t.e}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </SectionReveal>
  )
}

function Principles({ principles }) {
  return (
    <SectionReveal eyebrow="Principles" number="04 /" className="py-20 sm:py-28">
      <Container size="wide">
        <div className="mb-12 grid grid-cols-1 items-end gap-10 sm:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              <SplitText
                as="span"
                text="Four principles."
                mode="words"
                className="block"
                stagger={0.05}
              />
              <SplitText
                as="span"
                text="No shortcuts."
                mode="words"
                className="block text-[var(--color-gold)] italic"
                stagger={0.05}
                delay={0.15}
              />
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
          {principles.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--color-ink-2)] p-7 sm:p-9"
            >
              <p className="tabular font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase">
                {p.n}
              </p>
              <h3 className="font-display mt-6 text-2xl text-[var(--color-cream)] sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </SectionReveal>
  )
}

function AboutCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Want to meet the candidate?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Find an upcoming town hall, sign up to volunteer, or send a message — every reply
              comes from someone on the campaign, not a bot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/events" variant="primary" className="text-[13px]">
              See events
            </MagneticButton>
            <MagneticButton as={Link} href="/contact" variant="ghost" className="text-[13px]">
              Contact
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

Principles.propTypes = {
  principles: PropTypes.arrayOf(
    PropTypes.shape({
      n: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default AboutPage
