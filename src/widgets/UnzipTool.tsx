/**
 * UnzipTool — the tool's only non-frozen widget.
 *
 * Opens a .zip chosen from the picker or dropped anywhere on the page (via the
 * frozen GlobalDropZone's `filesDropped` CustomEvent<File[]>), lists its entries
 * (names, sizes, folder structure) and lets the user download any file — or all
 * of them. Everything runs in the browser with @zip.js/zip.js: the central
 * directory is read for the listing, and each file is decompressed to a Blob on
 * demand. No server, no upload.
 *
 * Encrypted entries are shown locked and are not decrypted here (a future
 * unlock-zip tool handles password-protected archives).
 *
 * The island receives `locale` as a prop (present during SSR) and reads all
 * strings from the i18n table, so SSR and client render identically.
 */

import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ui } from '@/i18n/ui';
import { validateFile } from '@/utils/fileValidation';
import {
  listZip,
  extractEntry,
  extractAll,
  downloadBlob,
  baseName,
  isGarbled,
  type ZipEntry,
} from '@/utils/zipEngine';

type ErrorCode = 'wrongType' | 'invalidZip' | 'empty';

interface ReadyState {
  fileName: string;
  entries: ZipEntry[];
}

function humanSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

interface UnzipToolProps {
  locale?: string;
}

export function UnzipTool({ locale = 'en' }: UnzipToolProps) {
  const t = (ui as any)[locale] ?? ui.en;

  const [ready, setReady] = useState<ReadyState | null>(null);
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [errorName, setErrorName] = useState('');
  const [busy, setBusy] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  // The opened archive, kept so extraction can re-read it without a re-upload.
  const fileRef = useRef<File | null>(null);

  const finish = useCallback(() => {
    window.dispatchEvent(new CustomEvent('filesProcessed'));
  }, []);

  const openZip = useCallback(async (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      fileRef.current = null;
      setReady(null);
      setErrorName(file.name);
      setErrorCode('wrongType');
      return;
    }
    setBusy(true);
    setErrorCode(null);
    setReady(null);
    try {
      const entries = await listZip(file);
      if (entries.length === 0) {
        fileRef.current = null;
        setErrorName(file.name);
        setErrorCode('empty');
        return;
      }
      fileRef.current = file;
      setReady({ fileName: file.name, entries });
    } catch {
      fileRef.current = null;
      setErrorName(file.name);
      setErrorCode('invalidZip');
    } finally {
      setBusy(false);
    }
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      // An extractor works on one archive; take the first if several are dropped.
      const zip =
        files.find((f) => f.name.toLowerCase().endsWith('.zip')) ?? files[0];
      if (zip) await openZip(zip);
      finish();
    },
    [openZip, finish],
  );

  // Signal E2E readiness after mount.
  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  // Files dropped/pasted anywhere on the page (GlobalDropZone).
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<File[]>).detail;
      void handleFiles(detail ?? []);
    };
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const onPick = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    void handleFiles(files);
    input.value = '';
  };

  const downloadOne = useCallback(async (entry: ZipEntry) => {
    const file = fileRef.current;
    if (!file || entry.directory || entry.encrypted) return;
    const blob = await extractEntry(file, entry.name);
    downloadBlob(blob, baseName(entry.name));
  }, []);

  const downloadAll = useCallback(async () => {
    const file = fileRef.current;
    if (!file || downloadingAll) return;
    setDownloadingAll(true);
    try {
      const extracted = await extractAll(file);
      for (const { name, blob } of extracted) {
        downloadBlob(blob, baseName(name));
        // Space out the downloads so browsers honour each one.
        await new Promise((r) => setTimeout(r, 150));
      }
    } finally {
      setDownloadingAll(false);
    }
  }, [downloadingAll]);

  const clear = useCallback(() => {
    fileRef.current = null;
    setReady(null);
    setErrorCode(null);
  }, []);

  const errorText = (code: ErrorCode): string => {
    switch (code) {
      case 'wrongType':
        return t.errWrongType.replace('{name}', errorName);
      case 'invalidZip':
        return t.errInvalidZip.replace('{name}', errorName);
      case 'empty':
        return t.errEmpty.replace('{name}', errorName);
    }
  };

  const fileEntries = ready?.entries.filter((e) => !e.directory) ?? [];
  const extractableCount = fileEntries.filter((e) => !e.encrypted).length;
  const hasEncrypted = fileEntries.some((e) => e.encrypted);
  const hasGarbled = ready?.entries.some(isGarbled) ?? false;

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById('zip-file-input')?.click()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-1)',
            width: '100%',
            minHeight: '180px',
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg)',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <span style="font-size: 3rem; line-height: 1; margin-bottom: var(--space-2);" aria-hidden="true">
            📂
          </span>
          <span style="font-size: var(--fs-3); font-weight: 600; color: var(--color-text);">
            {t.dropClick}
          </span>
          <span style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</span>
          <span style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropSupported}</span>
        </button>
        <input
          id="zip-file-input"
          type="file"
          accept=".zip,application/zip"
          onChange={onPick}
          style="display: none;"
        />

        {busy && (
          <p style="margin-top: var(--space-3); color: var(--color-subtle);">{t.reading}</p>
        )}
      </AppCard>

      {errorCode && (
        <div
          role="alert"
          data-testid="error"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'color-mix(in srgb, var(--color-danger) 8%, var(--color-bg))',
            border: '1px solid var(--color-danger)',
            borderLeft: '4px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text)',
            fontSize: 'var(--fs-2)',
          }}
        >
          <span aria-hidden="true" style="color: var(--color-danger); font-size: var(--fs-3); line-height: 1.3;">
            ⚠
          </span>
          <span data-testid="error-message">{errorText(errorCode)}</span>
        </div>
      )}

      {ready && (
        <AppCard className="mt-6">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-4);">
            <strong data-testid="file-name" title={ready.fileName} style="overflow-wrap: anywhere;">
              {ready.fileName}
            </strong>
            <span style="font-size: var(--fs-2); color: var(--color-subtle);" class="num" data-testid="entry-count">
              {ready.entries.length} {t.entriesLabel}
            </span>
          </div>

          {hasGarbled && (
            <p style="font-size: var(--fs-1); color: var(--color-warning); margin: 0 0 var(--space-3) 0;">
              {t.garbledNote}{' '}
              <a href="https://runlocally.app/zip-filename-fix/" rel="noopener">
                {t.fixNamesLink}
              </a>
            </p>
          )}

          {hasEncrypted && (
            <p style="font-size: var(--fs-1); color: var(--color-warning); margin: 0 0 var(--space-3) 0;" data-testid="encrypted-note">
              {t.encryptedNote}{' '}
              <a href="https://runlocally.app/unlock-zip/" rel="noopener">
                {t.unlockLink}
              </a>
            </p>
          )}

          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); justify-content: flex-end; margin-bottom: var(--space-3);">
            {extractableCount > 0 && (
              <AppButton
                variant="primary"
                onClick={() => void downloadAll()}
                disabled={downloadingAll}
                ariaLabel={t.downloadAll}
              >
                <span data-testid="download-all">
                  {downloadingAll ? t.extracting : t.downloadAll}
                </span>
              </AppButton>
            )}
            <AppButton variant="secondary" onClick={clear}>
              {t.clearAll}
            </AppButton>
          </div>

          <ul
            data-testid="entry-list"
            aria-label={t.entriesAria}
            style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px;"
          >
            {ready.entries.map((e, i) => (
              <li
                key={i}
                data-row
                style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: var(--fs-2);"
              >
                <span
                  title={e.name}
                  style="flex: 1; min-width: 0; overflow-wrap: anywhere; word-break: break-word;"
                >
                  {e.directory ? '📁 ' : ''}
                  {e.encrypted ? '🔒 ' : ''}
                  {isGarbled(e) ? '⚠ ' : ''}
                  {e.name}
                </span>
                <span style="flex-shrink: 0; color: var(--color-subtle);" class="num">
                  {e.directory ? '' : humanSize(e.size)}
                </span>
                <span style="flex-shrink: 0; min-width: 6rem; text-align: right;">
                  {!e.directory && !e.encrypted && (
                    <AppButton
                      variant="ghost"
                      onClick={() => void downloadOne(e)}
                      ariaLabel={`${t.download} ${baseName(e.name)}`}
                    >
                      {t.download}
                    </AppButton>
                  )}
                  {e.encrypted && (
                    <span style="font-size: var(--fs-1); color: var(--color-subtle);">
                      {t.lockedLabel}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </AppCard>
      )}
    </div>
  );
}
