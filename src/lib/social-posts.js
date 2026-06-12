// Curated catalog of every social-media creative under /public/campaign.
// Each entry's `file` matches an HTML creative on disk; the `slug` is the
// stable URL handle used by /social-media-posts/[slug].

const FEED_FORMAT = { id: 'feed', label: 'Feed Post', ratio: '1:1', width: 1080, height: 1080 }
const STORY_FORMAT = { id: 'story', label: 'Story', ratio: '9:16', width: 1080, height: 1920 }

const FEED = [
  {
    slug: 'feed-01-editorial-portrait',
    file: 'feed-01-editorial-portrait.html',
    number: '01',
    title: 'Editorial Portrait',
    category: 'Editorial',
    tagline: 'Magazine-style hero with a serif headline, lede paragraph, and gold-foiled corner marks.',
    accent: 'gold',
  },
  {
    slug: 'feed-02-bento-stats',
    file: 'feed-02-bento-stats.html',
    number: '02',
    title: 'Bento Stats',
    category: 'Data',
    tagline: 'Modular tile board distilling polling, turnout, and field metrics into a glanceable grid.',
    accent: 'teal',
  },
  {
    slug: 'feed-03-typographic-manifesto',
    file: 'feed-03-typographic-manifesto.html',
    number: '03',
    title: 'Typographic Manifesto',
    category: 'Statement',
    tagline: 'Oversized display type carrying the campaign principles in a single declarative pass.',
    accent: 'cream',
  },
  {
    slug: 'feed-04-cream-editorial',
    file: 'feed-04-cream-editorial.html',
    number: '04',
    title: 'Cream Editorial',
    category: 'Editorial',
    tagline: 'Warm cream paper take on the editorial cover — a softer counterpart to the dark series.',
    accent: 'cream',
  },
  {
    slug: 'feed-05-pull-quote',
    file: 'feed-05-pull-quote.html',
    number: '05',
    title: 'Pull Quote',
    category: 'Quote',
    tagline: 'Italic pull-quote layout for voter testimonials and press soundbites.',
    accent: 'gold',
  },
  {
    slug: 'feed-06-event-ticket',
    file: 'feed-06-event-ticket.html',
    number: '06',
    title: 'Event Ticket',
    category: 'Event',
    tagline: 'Stub-cut ticket frame for town halls, meet-and-greets, and listening sessions.',
    accent: 'clay',
  },
  {
    slug: 'feed-07-numbered-priorities',
    file: 'feed-07-numbered-priorities.html',
    number: '07',
    title: 'Numbered Priorities',
    category: 'Priorities',
    tagline: 'Stacked enumerated platform pillars rendered like a printed manifesto page.',
    accent: 'gold',
  },
  {
    slug: 'feed-08-endorsement-stack',
    file: 'feed-08-endorsement-stack.html',
    number: '08',
    title: 'Endorsement Stack',
    category: 'Endorsement',
    tagline: 'Vertical stack of endorser names and titles — fits long press lists at one square.',
    accent: 'teal',
  },
  {
    slug: 'feed-09-donation-orb',
    file: 'feed-09-donation-orb.html',
    number: '09',
    title: 'Donation Orb',
    category: 'Donate',
    tagline: 'Luminous central orb anchoring a single donation ask and a clear call to action.',
    accent: 'gold',
  },
  {
    slug: 'feed-10-letter',
    file: 'feed-10-letter.html',
    number: '10',
    title: 'Letter',
    category: 'Letter',
    tagline: 'Personal letter format — handwritten cadence and signature for direct address.',
    accent: 'cream',
  },
].map((p) => ({ ...p, format: FEED_FORMAT, path: `/campaign/feed/${p.file}` }))

const STORY = [
  {
    slug: 'story-01-cinematic-hero',
    file: 'story-01-cinematic-hero.html',
    number: '01',
    title: 'Cinematic Hero',
    category: 'Hero',
    tagline: 'Letterbox portrait hero — the establishing shot of the vertical story series.',
    accent: 'gold',
  },
  {
    slug: 'story-02-countdown',
    file: 'story-02-countdown.html',
    number: '02',
    title: 'Countdown',
    category: 'Event',
    tagline: 'Days-until-doors countdown with bold tabular digits and event metadata.',
    accent: 'clay',
  },
  {
    slug: 'story-03-portrait-quote',
    file: 'story-03-portrait-quote.html',
    number: '03',
    title: 'Portrait Quote',
    category: 'Quote',
    tagline: 'Single-quote portrait card — designed for high-contrast endorsements.',
    accent: 'cream',
  },
  {
    slug: 'story-04-glass-pillar',
    file: 'story-04-glass-pillar.html',
    number: '04',
    title: 'Glass Pillar',
    category: 'Statement',
    tagline: 'Frosted glass column over a luminous backdrop — a modern policy plinth.',
    accent: 'teal',
  },
  {
    slug: 'story-05-chapter-numbered',
    file: 'story-05-chapter-numbered.html',
    number: '05',
    title: 'Chapter Numbered',
    category: 'Editorial',
    tagline: 'Chaptered editorial story panel — for serialized campaign narratives.',
    accent: 'gold',
  },
  {
    slug: 'story-06-vertical-timeline',
    file: 'story-06-vertical-timeline.html',
    number: '06',
    title: 'Vertical Timeline',
    category: 'Timeline',
    tagline: 'Top-to-bottom timeline marking the campaign milestones and stops.',
    accent: 'gold',
  },
  {
    slug: 'story-07-archival-paper',
    file: 'story-07-archival-paper.html',
    number: '07',
    title: 'Archival Paper',
    category: 'Editorial',
    tagline: 'Aged-paper archival sheet — a tactile counterpoint to the studio palette.',
    accent: 'cream',
  },
  {
    slug: 'story-08-gold-block',
    file: 'story-08-gold-block.html',
    number: '08',
    title: 'Gold Block',
    category: 'Statement',
    tagline: 'Single saturated gold block — a brand-forward stamp for short proclamations.',
    accent: 'gold',
  },
  {
    slug: 'story-09-magazine-masthead',
    file: 'story-09-magazine-masthead.html',
    number: '09',
    title: 'Magazine Masthead',
    category: 'Editorial',
    tagline: 'Newsstand-grade masthead and dek layout — front-page energy at story scale.',
    accent: 'cream',
  },
  {
    slug: 'story-10-district-map',
    file: 'story-10-district-map.html',
    number: '10',
    title: 'District Map',
    category: 'Map',
    tagline: 'District 1 cartographic story showing reach across cities and county lines.',
    accent: 'teal',
  },
].map((p) => ({ ...p, format: STORY_FORMAT, path: `/campaign/story/${p.file}` }))

export const SOCIAL_POSTS = [...FEED, ...STORY]

export const SOCIAL_POST_FORMATS = [FEED_FORMAT, STORY_FORMAT]

export const SOCIAL_POST_CATEGORIES = Array.from(
  new Set(SOCIAL_POSTS.map((p) => p.category))
).sort()

export const getSocialPost = (slug) => SOCIAL_POSTS.find((p) => p.slug === slug)

export const getSocialPostNeighbours = (slug) => {
  const i = SOCIAL_POSTS.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null, index: -1 }
  const prev = SOCIAL_POSTS[(i - 1 + SOCIAL_POSTS.length) % SOCIAL_POSTS.length]
  const next = SOCIAL_POSTS[(i + 1) % SOCIAL_POSTS.length]
  return { prev, next, index: i }
}
