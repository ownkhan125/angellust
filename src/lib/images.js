/**
 * Curated, seeded placeholder image catalog.
 * Picsum.photos returns stable, professional-grade editorial photography
 * for any given seed — perfect for prototype + showcase work.
 */
const pic = (seed, w = 1600, h = 1000, blur = 0) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${blur ? `?blur=${blur}` : ''}`

export const IMG = {
  heroBackdrop: pic('angellust-hero-backdrop-pdx', 2200, 1400),
  candidatePortrait: pic('angellust-portrait-candidate', 1200, 1500),
  candidateField: pic('angellust-portrait-field-04', 1600, 1100),

  // Endorsements
  endorseAlvarez: pic('angellust-endorse-alvarez-x1', 600, 600),
  endorseHollis: pic('angellust-endorse-hollis-x3', 600, 600),
  endorseNakamura: pic('angellust-endorse-nakamura-x4', 600, 600),
  endorseRiver: pic('angellust-endorse-river-x9', 600, 600),
  endorseSinclair: pic('angellust-endorse-sinclair-x12', 600, 600),

  // Events / venues
  eventBeaverton: pic('angellust-event-beaverton-civic', 1200, 800),
  eventStHelens: pic('angellust-event-sthelens-river', 1200, 800),
  eventForestGrove: pic('angellust-event-fg-commons', 1200, 800),
  eventTillamook: pic('angellust-event-pacific-pier', 1200, 800),

  // Priorities feature
  prioritiesFeature: pic('angellust-platform-feature-coast', 1600, 1000),

  // Join section
  joinBackdrop: pic('angellust-join-rally-backdrop', 2000, 1200),
}
