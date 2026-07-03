import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { waitReady, dropFile, openSampleZip } from './_helpers';

/**
 * Records every request that leaves the local origin. The no-upload covenant:
 * opening and extracting an archive must trigger ZERO cross-origin requests.
 */
function trackExternal(page: Page): string[] {
  const external: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (
      !url.startsWith('http://localhost:4321') &&
      !url.startsWith('data:') &&
      !url.startsWith('blob:')
    ) {
      external.push(url);
    }
  });
  return external;
}

test.describe('unzip', () => {
  test('lists every entry (files + nested folders + directory) with no upload', async ({
    page,
  }) => {
    const external = trackExternal(page);
    await page.goto('/unzip/');
    await waitReady(page);
    await openSampleZip(page);

    // 5 entries: readme.txt, docs/notes.txt, docs/sub/deep.txt, メモ.txt, images/
    await expect(page.getByTestId('entry-count')).toContainText('5');

    const list = page.getByTestId('entry-list');
    await expect(list).toContainText('readme.txt');
    await expect(list).toContainText('docs/notes.txt');
    await expect(list).toContainText('docs/sub/deep.txt');
    await expect(list).toContainText('メモ.txt'); // UTF-8 name intact
    await expect(list).toContainText('images/'); // directory entry shown

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('downloads a single file with the correct contents', async ({ page }) => {
    await page.goto('/unzip/');
    await waitReady(page);
    await openSampleZip(page);

    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 });
    await page.getByRole('button', { name: 'Download readme.txt' }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('readme.txt');
    const path = await download.path();
    expect(path).toBeTruthy();
    expect(readFileSync(path as string).toString()).toBe('hello from unzip\n');
  });

  test('"download all" saves every file in the archive', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'chromium',
      'multi-download behaviour is engine-specific; one engine is enough',
    );
    await page.goto('/unzip/');
    await waitReady(page);
    await openSampleZip(page);

    const downloads: Promise<unknown>[] = [];
    const names: string[] = [];
    page.on('download', (d) => {
      names.push(d.suggestedFilename());
      downloads.push(d.path());
    });

    await page.getByTestId('download-all').click();
    // 4 files (the directory entry is skipped).
    await expect.poll(() => names.length, { timeout: 15_000 }).toBe(4);
    await Promise.all(downloads);
    expect(names.sort()).toEqual(['deep.txt', 'notes.txt', 'readme.txt', 'メモ.txt'].sort());
  });

  test('shows a localized error for a non-zip file', async ({ page }) => {
    await page.goto('/unzip/');
    await waitReady(page);
    await dropFile(page, { b64: btoa('not a zip'), name: 'photo.png', type: 'image/png' });

    const err = page.getByTestId('error');
    await expect(err).toBeVisible();
    await expect(err).toContainText('photo.png');
    await expect(page.getByTestId('entry-list')).toHaveCount(0);
  });

  test('shows an error for a .zip that is not a real archive', async ({ page }) => {
    await page.goto('/unzip/');
    await waitReady(page);
    await dropFile(page, { b64: btoa('this is not really a zip'), name: 'broken.zip', type: 'application/zip' });

    const err = page.getByTestId('error');
    await expect(err).toBeVisible();
    await expect(err).toContainText('broken.zip');
    await expect(page.getByTestId('entry-list')).toHaveCount(0);
  });

  test('the loaded listing has no serious or critical axe violations', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'axe runs on one engine');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/unzip/');
    await waitReady(page);
    await openSampleZip(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const blocking = violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(blocking.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
  });
});
