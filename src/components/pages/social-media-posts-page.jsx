'use client'

import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { motion } from 'motion/react'
import Container from '@/components/ui/container'
import SectionReveal from '@/components/ui/section-reveal'
import PageHero from '@/components/ui/page-hero'
import MagneticButton from '@/components/ui/magnetic-button'
import CreativePreview from '@/components/ui/creative-preview'
import { cn } from '@/lib/utils'

const FORMAT_FILTERS = [
  { id: 'all', label: 'All Posts' },
  { id: 'feed', label: 'Feed' },
  { id: 'story', label: 'Stories' },
]

function SocialMediaPostsPage({ posts, categories }) {
  const [formatFilter, setFormatFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      if (formatFilter !== 'all' && p.format.id !== formatFilter) return false
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.format.label.toLowerCase().includes(q)
      )
    })
  }, [posts, formatFilter, categoryFilter, query])

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Social Posts' }]}
        eyebrow="Content Library"
        number="07 /"
        title="Social media"
        italicTail="posts."
        description="A curated library of campaign-ready feed posts and vertical stories — every layout previewed at full fidelity, ready to share across channels."
      />

      <SectionReveal eyebrow="Browse" number="01 /" className="py-12 sm:py-16">
        <Container size="wide">
          <Toolbar
            formatFilter={formatFilter}
            setFormatFilter={setFormatFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
            query={query}
            setQuery={setQuery}
            count={visible.length}
            total={posts.length}
          />

          {visible.length === 0 ? (
            <EmptyState
              onReset={() => {
                setFormatFilter('all')
                setCategoryFilter('All')
                setQuery('')
              }}
            />
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {visible.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </ul>
          )}
        </Container>
      </SectionReveal>

      <PostsCTA />
    </>
  )
}

function Toolbar({
  formatFilter,
  setFormatFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  query,
  setQuery,
  count,
  total,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FORMAT_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormatFilter(f.id)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-[12px] tracking-[0.22em] uppercase transition-colors',
                f.id === formatFilter
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)]'
                  : 'border-[var(--color-line-strong)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="group flex w-full items-center gap-3 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] px-5 py-3 transition-colors focus-within:border-[var(--color-gold)] lg:w-80">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, categories, layouts…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-muted)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-cream)]"
            >
              <ClearIcon />
            </button>
          )}
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="-mx-1 flex max-w-full flex-wrap gap-1.5 overflow-x-auto px-1">
          <CategoryPill
            label="All"
            active={categoryFilter === 'All'}
            onClick={() => setCategoryFilter('All')}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c}
              label={c}
              active={categoryFilter === c}
              onClick={() => setCategoryFilter(c)}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
          <span className="tabular text-[var(--color-cream)]">{count}</span> / {total} post
          {total === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  )
}

function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[12px] tracking-wide whitespace-nowrap transition-colors',
        active
          ? 'border-[var(--color-cream)] bg-[var(--color-cream)]/[0.07] text-[var(--color-cream)]'
          : 'border-[var(--color-line)] text-[var(--color-cream-dim)] hover:border-[var(--color-cream-dim)] hover:text-[var(--color-cream)]'
      )}
    >
      {label}
    </button>
  )
}

function PostCard({ post, index }) {
  const accentClasses = {
    gold: 'border-[var(--color-gold)]/40 text-[var(--color-gold)]',
    clay: 'border-[var(--color-clay)]/45 text-[var(--color-clay)]',
    teal: 'border-[var(--color-teal-soft)]/45 text-[var(--color-teal-soft)]',
    cream: 'border-[var(--color-cream)]/35 text-[var(--color-cream)]',
  }[post.accent || 'gold']

  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.04 * (index % 6), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] transition-colors hover:border-[var(--color-gold)]/40"
    >
      <Link href={`/social-media-posts/${post.slug}`} className="block">
        <div className="relative p-4 sm:p-5">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink)]">
            <CreativePreview
              path={post.path}
              width={post.format.width}
              height={post.format.height}
              title={post.title}
              rounded={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink-2)]/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.26em] text-[var(--color-cream)] uppercase backdrop-blur">
                {post.format.label}
              </span>
              <span className="rounded-full bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.26em] text-[var(--color-muted)] uppercase backdrop-blur">
                {post.format.ratio}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-5 pt-2 pb-6 sm:px-6 sm:pb-7">
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.28em] uppercase">
            <span className={cn('rounded-full border px-2.5 py-1', accentClasses)}>
              {post.category}
            </span>
            <span className="tabular text-[var(--color-muted)]">№ {post.number}</span>
          </div>
          <h3 className="font-display text-xl leading-tight text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-gold)] sm:text-2xl">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-[13.5px] leading-relaxed text-[var(--color-cream-dim)]">
            {post.tagline}
          </p>
          <div className="mt-auto flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-[var(--color-gold)] uppercase transition-all group-hover:gap-3">
            Open post <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-ink-2)]/50 px-8 py-20 text-center">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        No matches
      </p>
      <p className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
        Nothing here — try a different filter.
      </p>
      <button
        onClick={onReset}
        className="mt-2 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.24em] text-[var(--color-gold)] uppercase hover:gap-3"
      >
        Reset filters <span aria-hidden>→</span>
      </button>
    </div>
  )
}

function PostsCTA() {
  return (
    <section className="border-t border-[var(--color-line)] py-20 sm:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
              Share the campaign — your way.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--color-cream-dim)]">
              Every layout is production-ready. Drop them into your feed, story, or volunteer kit and help carry the message.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton as={Link} href="/volunteer" variant="ghost" className="text-[13px]">
              Join the volunteer list
            </MagneticButton>
            <MagneticButton as={Link} href="/donate" variant="primary" className="text-[13px]">
              Donate
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const postShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
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

SocialMediaPostsPage.propTypes = {
  posts: PropTypes.arrayOf(postShape).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Toolbar.propTypes = {
  formatFilter: PropTypes.string.isRequired,
  setFormatFilter: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

CategoryPill.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

PostCard.propTypes = { post: postShape.isRequired, index: PropTypes.number.isRequired }
EmptyState.propTypes = { onReset: PropTypes.func.isRequired }

export default SocialMediaPostsPage
