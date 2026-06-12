'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import SplitText from '@/components/ui/split-text'
import MagneticButton from '@/components/ui/magnetic-button'
import CreativePreview from '@/components/ui/creative-preview'
import { cn } from '@/lib/utils'

function SocialMediaPostDetailPage({ post, prev, next, index, total, related }) {
  const [fullView, setFullView] = useState(false)

  useEffect(() => {
    if (!fullView) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setFullView(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [fullView])

  return (
    <>
      <DetailHero post={post} index={index} total={total} onOpenFull={() => setFullView(true)} />
      <PrevNext prev={prev} next={next} />
      <RelatedPosts items={related} />
      <DetailCTA />

      <AnimatePresence>
        {fullView && <FullViewModal post={post} onClose={() => setFullView(false)} />}
      </AnimatePresence>
    </>
  )
}

function DetailHero({ post, index, total, onOpenFull }) {
  const accentClasses = {
    gold: 'border-[var(--color-gold)]/45 text-[var(--color-gold)]',
    clay: 'border-[var(--color-clay)]/55 text-[var(--color-clay)]',
    teal: 'border-[var(--color-teal-soft)]/50 text-[var(--color-teal-soft)]',
    cream: 'border-[var(--color-cream)]/40 text-[var(--color-cream)]',
  }[post.accent || 'gold']

  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] [background-size:80px_80px] opacity-[0.05]"
      />
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase"
        >
          <Link href="/" className="transition-colors hover:text-[var(--color-cream)]">
            Home
          </Link>
          <span className="text-[var(--color-line-strong)]">/</span>
          <Link
            href="/social-media-posts"
            className="transition-colors hover:text-[var(--color-cream)]"
          >
            Social Posts
          </Link>
          <span className="text-[var(--color-line-strong)]">/</span>
          <span className="truncate text-[var(--color-cream-dim)]">{post.title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="mb-7 h-px w-28 origin-left bg-[var(--color-gold)]"
        />

        <div className="grid grid-cols-1 items-start gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          {/* Preview column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'mx-auto w-full',
                post.format.id === 'story' ? 'max-w-[420px]' : 'max-w-[640px]'
              )}
            >
              <div className="relative rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-4 shadow-[0_30px_80px_-30px_rgba(232,181,71,0.25)] sm:p-5">
                <CreativePreview
                  path={post.path}
                  width={post.format.width}
                  height={post.format.height}
                  title={post.title}
                  loading="eager"
                  rounded={false}
                  className="rounded-2xl border border-[var(--color-line)]"
                />
              </div>

              <button
                type="button"
                onClick={onOpenFull}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] px-5 py-3 font-mono text-[11px] tracking-[0.28em] text-[var(--color-cream-dim)] uppercase transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                <ExpandIcon />
                Open full view
              </button>
            </motion.div>
          </div>

          {/* Meta column */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-[var(--color-gold)] uppercase"
            >
              <span className="tabular">№ {post.number}</span>
              <span>·</span>
              <span>{post.format.label}</span>
            </motion.p>

            <h1 className="font-display text-[clamp(2rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-cream)]">
              <SplitText
                as="span"
                text={post.title}
                mode="words"
                stagger={0.05}
                delay={0.3}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-cream-dim)] sm:text-base"
            >
              {post.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]/85 p-6 backdrop-blur"
            >
              <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                Specifications
              </p>
              <dl className="grid grid-cols-2 gap-y-4 text-[13px]">
                <Spec label="Category">
                  <span className={cn('rounded-full border px-2.5 py-1', accentClasses)}>
                    {post.category}
                  </span>
                </Spec>
                <Spec label="Format">{post.format.label}</Spec>
                <Spec label="Aspect ratio">{post.format.ratio}</Spec>
                <Spec label="Resolution">
                  <span className="tabular">
                    {post.format.width} × {post.format.height}
                  </span>
                </Spec>
                <Spec label="File">
                  <span className="truncate font-mono text-[12px] text-[var(--color-cream-dim)]">
                    {post.file}
                  </span>
                </Spec>
                <Spec label="Position">
                  <span className="tabular">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </Spec>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={post.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
                >
                  Open raw HTML
                  <ExternalIcon />
                </a>
                <Link
                  href="/social-media-posts"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[13px] text-[var(--color-cream-dim)] transition-colors hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]"
                >
                  ← Back to library
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Spec({ label, children }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-[var(--color-cream)]">{children}</dd>
    </div>
  )
}

function PrevNext({ prev, next }) {
  return (
    <SectionReveal eyebrow="Continue" number="02 /" className="py-16 sm:py-20" borders="both">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <NavCard direction="prev" post={prev} />
          <NavCard direction="next" post={next} />
        </div>
      </Container>
    </SectionReveal>
  )
}

function NavCard({ direction, post }) {
  if (!post) return null
  const isPrev = direction === 'prev'
  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className={cn(
        'group flex flex-col gap-4 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 transition-colors hover:border-[var(--color-gold)]/50 sm:p-7',
        isPrev ? 'items-start' : 'items-end text-right'
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
        {isPrev && <span aria-hidden>←</span>}
        {isPrev ? 'Previous' : 'Next'}
        {!isPrev && <span aria-hidden>→</span>}
      </span>
      <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        {post.format.label} · {post.category}
      </p>
      <h3
        className={cn(
          'font-display text-2xl leading-tight text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)] sm:text-3xl',
          isPrev ? 'text-left' : 'text-right'
        )}
      >
        {post.title}
      </h3>
    </Link>
  )
}

function RelatedPosts({ items }) {
  if (!items?.length) return null
  return (
    <SectionReveal eyebrow="More posts" number="03 /" className="py-20 sm:py-24">
      <Container size="wide">
        <h2 className="font-display mb-10 text-[clamp(1.75rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
          <SplitText as="span" text="From the library" mode="words" stagger={0.05} />
        </h2>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/social-media-posts/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] transition-colors hover:border-[var(--color-gold)]/40"
              >
                <div className="p-4 sm:p-5">
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink)]">
                    <CreativePreview
                      path={p.path}
                      width={p.format.width}
                      height={p.format.height}
                      title={p.title}
                      rounded={false}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-5 pb-6 sm:px-6 sm:pb-7">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
                    <span>{p.format.label}</span>
                    <span className="tabular">№ {p.number}</span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)] sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-[var(--color-cream-dim)]">{p.category}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </SectionReveal>
  )
}

function DetailCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Want to amplify the campaign?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Sign up and we'll send a fresh post to your inbox the moment it goes live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton
              as={Link}
              href="/social-media-posts"
              variant="ghost"
              className="text-[13px]"
            >
              All posts
            </MagneticButton>
            <MagneticButton as={Link} href="/volunteer" variant="primary" className="text-[13px]">
              Join the list
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

function FullViewModal({ post, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] flex flex-col bg-[rgba(11,12,16,0.94)] backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${post.title} — full view`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-gold)] uppercase">
            № {post.number} · {post.format.label} · {post.format.ratio}
          </p>
          <p className="font-display mt-1 truncate text-lg text-[var(--color-cream)] sm:text-xl">
            {post.title}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close full view"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-cream)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'w-full',
            post.format.id === 'story'
              ? 'max-h-full max-w-[min(540px,calc((100vh-180px)*9/16))]'
              : 'max-h-full max-w-[min(960px,calc((100vh-180px)))]'
          )}
        >
          <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-3 shadow-[0_40px_120px_-40px_rgba(232,181,71,0.35)] sm:p-5">
            <CreativePreview
              path={post.path}
              width={post.format.width}
              height={post.format.height}
              title={`${post.title} full view`}
              loading="eager"
              interactive
              rounded={false}
              className="rounded-2xl border border-[var(--color-line)]"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--color-line)] px-5 py-3 sm:px-8">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
          ESC to close
        </p>
        <a
          href={post.path}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.24em] text-[var(--color-gold)] uppercase hover:text-[var(--color-gold-soft)]"
        >
          Open raw HTML →
        </a>
      </div>
    </motion.div>
  )
}

function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M2 5V2h3M8 2h3v3M11 8v3H8M5 11H2V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M5 2H2v8h8V7M7 2h3v3M10 2L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const postShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  accent: PropTypes.string,
  format: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ratio: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
})

SocialMediaPostDetailPage.propTypes = {
  post: postShape.isRequired,
  prev: postShape,
  next: postShape,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  related: PropTypes.arrayOf(postShape).isRequired,
}

DetailHero.propTypes = {
  post: postShape.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onOpenFull: PropTypes.func.isRequired,
}

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

PrevNext.propTypes = { prev: postShape, next: postShape }
NavCard.propTypes = { direction: PropTypes.oneOf(['prev', 'next']).isRequired, post: postShape }
RelatedPosts.propTypes = { items: PropTypes.arrayOf(postShape).isRequired }
FullViewModal.propTypes = { post: postShape.isRequired, onClose: PropTypes.func.isRequired }

export default SocialMediaPostDetailPage
