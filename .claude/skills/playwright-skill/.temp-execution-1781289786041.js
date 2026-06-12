const { chromium } = require('playwright');

const OUT = 'C:/Users/General/AppData/Local/Temp/pwtest';

async function shotAt(page, name, y) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`shot: ${name}.png`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  // Desktop detail (feed) — top, modal, prev/next
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/social-media-posts/feed-01-editorial-portrait', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(1500);
    await shotAt(page, 'detail-feed-top', 0);
    await page.getByRole('button', { name: /open full view/i }).click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/detail-feed-modal.png`, fullPage: false });
    console.log('shot: detail-feed-modal.png');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await shotAt(page, 'detail-feed-prevnext', 1100);
    await shotAt(page, 'detail-feed-related', 1700);
    await page.close();
  }

  // Desktop detail (story)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/social-media-posts/story-01-cinematic-hero', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(1500);
    await shotAt(page, 'detail-story-top', 0);
    await page.getByRole('button', { name: /open full view/i }).click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/detail-story-modal.png`, fullPage: false });
    console.log('shot: detail-story-modal.png');
    await page.close();
  }

  // Mobile detail
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:3000/social-media-posts/feed-01-editorial-portrait', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(1500);
    await shotAt(page, 'mobile-detail-top', 0);
    await page.close();
  }

  // Mobile gallery scroll
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:3000/social-media-posts', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await shotAt(page, 'mobile-gallery-top', 0);
    await shotAt(page, 'mobile-gallery-cards', 500);
    await page.close();
  }

  // Tablet gallery
  {
    const page = await browser.newPage({ viewport: { width: 820, height: 1180 } });
    await page.goto('http://localhost:3000/social-media-posts', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await shotAt(page, 'tablet-gallery-cards', 500);
    await page.close();
  }

  await browser.close();
})();
