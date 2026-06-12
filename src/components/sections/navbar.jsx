'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import MagneticButton from '@/components/ui/magnetic-button'
import { cn } from '@/lib/utils'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Priorities', href: '/priorities' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Events', href: '/events' },
  { label: 'Posts', href: '/social-media-posts' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-[var(--color-line)] bg-[rgba(11,12,16,0.78)] py-3 backdrop-blur-xl'
            : 'bg-transparent py-5'
        )}
      >
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-ink-2)]">
                <span className="font-display -mt-0.5 text-[15px] leading-none text-[var(--color-gold)]">
                  A
                </span>
                <span className="absolute -inset-0.5 rounded-full bg-[var(--color-gold)]/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] tracking-tight">AngelLust</span>
                <span className="mt-0.5 font-mono text-[9px] tracking-[0.32em] text-[var(--color-muted)] uppercase">
                  for Congress
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative inline-flex items-center px-3.5 py-2 text-[13px] font-medium text-[var(--color-cream-dim)] transition-colors hover:text-[var(--color-cream)]"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-500 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <MagneticButton
                as={Link}
                href="/donate"
                variant="primary"
                className="hidden px-5 py-2.5 text-[13px] sm:inline-flex"
                strength={0.25}
              >
                Donate
                <ArrowIcon />
              </MagneticButton>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-strong)] transition-colors hover:border-[var(--color-gold)] lg:hidden"
              >
                <BurgerIcon />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[var(--color-line)] bg-[var(--color-ink-2)] p-7"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-8">
                <span className="font-display text-lg">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-strong)] hover:bg-white/5"
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 pt-8">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group font-display flex items-center justify-between border-b border-[var(--color-line)] py-5 text-2xl text-[var(--color-cream)]"
                    >
                      <span>{l.label}</span>
                      <span className="text-[var(--color-gold)] opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-6">
                <MagneticButton
                  as={Link}
                  href="/donate"
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Donate Now
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7h8m-3-3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function BurgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default Navbar
