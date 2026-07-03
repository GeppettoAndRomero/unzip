import { type Page } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

/** The bundled sample archive (4 files across nested folders + 1 directory entry). */
export const SAMPLE_ZIP_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/zip/sample.zip', import.meta.url)),
).toString('base64');

/** Wait until the island has hydrated and is ready to receive files. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** Feed a base64-encoded file through the same drop-zone path the UI uses. */
export async function dropFile(
  page: Page,
  opts: { b64: string; name: string; type: string },
) {
  await page.evaluate(({ b64, name, type }) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const file = new File([bytes], name, { type });
    window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
  }, opts);
}

/** Open the bundled sample .zip and wait until the entry list is on screen. */
export async function openSampleZip(page: Page) {
  await dropFile(page, { b64: SAMPLE_ZIP_B64, name: 'sample.zip', type: 'application/zip' });
  await page.getByTestId('entry-list').waitFor();
}
