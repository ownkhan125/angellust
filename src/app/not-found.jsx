import Link from 'next/link'

const NotFound = () => (
  <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
    <div className="max-w-xl text-center">
      <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase">
        404 · Not Found
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
        That page isn&apos;t on the trail.
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-cream-dim)]">
        The link may be stale or the page may have moved.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
        >
          Back to home
        </Link>
        <Link
          href="/events"
          className="rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-cream)]"
        >
          See events
        </Link>
      </div>
    </div>
  </section>
)

export default NotFound
