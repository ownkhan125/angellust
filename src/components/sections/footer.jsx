'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/container'

const columns = [
  {
    title: 'Campaign',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Priorities', href: '/priorities' },
      { label: 'Endorsements', href: '/endorsements' },
    ],
  },
  {
    title: 'Take Action',
    links: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Events', href: '/events' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Newsletter', href: '/volunteer' },
    ],
  },
]

function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative border-t border-[var(--color-line)] bg-[var(--color-ink)] pt-20 pb-10"
    >
      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-md text-3xl tracking-tight sm:text-4xl"
            >
              A campaign built by the people who live here.
            </motion.h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--color-muted)]">
              Sign up for updates and find out where AngelLust will be next.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-[var(--color-line-strong)] transition-colors focus-within:border-[var(--color-gold)]"
            >
              <input
                type="email"
                required
                placeholder="you@district1.org"
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-[var(--color-muted)]"
              />
              <button
                type="submit"
                className="bg-[var(--color-gold)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-[15px] text-[var(--color-cream-dim)] transition-colors hover:text-[var(--color-gold)]"
                      >
                        {l.label}
                        <span className="-translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[var(--color-line)] pt-8 font-mono text-[12px] text-[var(--color-muted)] md:flex-row md:items-center">
          <p>© 2026 AngelLust for Congress. Paid for by AngelLust for Congress.</p>
          <p>PO Box 1776 · Beaverton, OR 97075</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
