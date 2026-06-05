const { chromium } = require('playwright')
const TARGET_URL = 'http://localhost:3030'

const routes = [
  '/',
  '/about',
  '/priorities',
  '/endorsements',
  '/events',
  '/events/downtown-town-hall',
  '/volunteer',
  '/contact',
  '/donate',
]

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  const errors = { console: [], pageError: [] }
  page.on('console', (m) => {
    if (m.type() === 'error') errors.console.push(m.text())
  })
  page.on('pageerror', (e) => errors.pageError.push(e.message))

  console.log('\n📄 Route health (after migration)')
  for (const r of routes) {
    const resp = await page.goto(TARGET_URL + r, { waitUntil: 'domcontentloaded' })
    const status = resp?.status() ?? '?'
    const h1 = (await page.locator('h1').first().innerText().catch(() => '?')).replace(/\n/g, ' ').slice(0, 60)
    console.log(`  ${status} ${r.padEnd(32)} ${h1}`)
  }

  console.log('\n🧪 Slider stability (post-migration)')
  await page.goto(TARGET_URL + '/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.evaluate(() => document.querySelector('#endorsements')?.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await page.waitForTimeout(900)

  const card0 = await page.locator('#endorsements article').first().boundingBox()
  const av0 = await page.locator('#endorsements article .rounded-full[class*="border"]').first().boundingBox()
  console.log(`  initial card: ${Math.round(card0.width)}x${Math.round(card0.height)}, avatar: ${Math.round(av0.width)}x${Math.round(av0.height)}`)

  for (let i = 0; i < 3; i++) {
    await page.locator('#endorsements button[aria-label="Next testimonial"]').click()
    await page.waitForTimeout(550)
  }
  const cardN = await page.locator('#endorsements article').first().boundingBox()
  const avN = await page.locator('#endorsements article .rounded-full[class*="border"]').first().boundingBox()
  console.log(`  after 3 next: card: ${Math.round(cardN.width)}x${Math.round(cardN.height)}, avatar: ${Math.round(avN.width)}x${Math.round(avN.height)}`)
  console.log(`  stable: ${cardN.width === card0.width && cardN.height === card0.height ? '✅' : '❌'}`)

  console.log('\n🔗 Link audit')
  await page.goto(TARGET_URL + '/', { waitUntil: 'networkidle' })
  const linkSummary = await page.$$eval('a[href]', (els) => {
    const hrefs = els.map((e) => e.getAttribute('href')).filter(Boolean)
    return {
      total: hrefs.length,
      unique: Array.from(new Set(hrefs)),
      hashOnly: hrefs.filter((h) => h.startsWith('#')),
    }
  })
  console.log(`  total links: ${linkSummary.total}, unique: ${linkSummary.unique.length}, anchor-only: ${linkSummary.hashOnly.length}`)

  console.log('\n🚦 Modal smoke test')
  await page.goto(TARGET_URL + '/endorsements', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  try {
    await page.locator('button:has-text("Read full endorsement")').first().click()
    await page.waitForTimeout(700)
    const open = await page.locator('[role="dialog"]').count()
    console.log(`  modal open: ${open > 0 ? '✅' : '❌'}`)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(400)
    const closed = (await page.locator('[role="dialog"]').count()) === 0
    console.log(`  esc closes: ${closed ? '✅' : '❌'}`)
  } catch (e) { console.log(`  ❌ modal: ${e.message.slice(0, 60)}`) }

  console.log('\n📐 Responsive snapshots')
  const vps = [
    { name: 'desktop', w: 1440, h: 900 },
    { name: 't1024', w: 1024, h: 768 },
    { name: 't820', w: 820, h: 1180 },
    { name: 't768', w: 768, h: 1024 },
    { name: 'm414', w: 414, h: 896 },
    { name: 'm375', w: 375, h: 812 },
  ]
  for (const v of vps) {
    await page.setViewportSize({ width: v.w, height: v.h })
    await page.goto(TARGET_URL + '/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    await page.screenshot({ path: `C:/tmp/migrate-home-${v.name}.png`, fullPage: false })
  }
  console.log('  saved 6 screenshots')

  console.log('\n========== ERRORS ==========')
  console.log(`console: ${errors.console.length}`)
  errors.console.slice(0, 5).forEach((e) => console.log(`  ${e.slice(0, 180)}`))
  console.log(`page:    ${errors.pageError.length}`)
  errors.pageError.slice(0, 5).forEach((e) => console.log(`  ${e.slice(0, 180)}`))

  await browser.close()
})().catch((e) => {
  console.error('💥', e)
  process.exit(1)
})
