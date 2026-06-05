'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('[RouteError]:', error)
  }, [error])

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase">
          Something went wrong
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
          We ran into a snag.
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
          The page failed to render. The campaign team has been notified.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-cream)]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    digest: PropTypes.string,
  }).isRequired,
  reset: PropTypes.func.isRequired,
}

export default Error
