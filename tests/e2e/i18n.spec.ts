import { test, expect } from '@playwright/test';
import { waitReady, openSampleZip } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/unzip/', lang: 'en' },
    { path: '/unzip/ja/', lang: 'ja' },
  ]) {
    test(`extracts on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await openSampleZip(page);
      await expect(page.getByTestId('entry-count')).toContainText('5');
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/unzip/', 'en'],
      ['/unzip/ja/', 'ja'],
      ['/unzip/zh/', 'zh-Hans'],
      ['/unzip/de/', 'de'],
      ['/unzip/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});
