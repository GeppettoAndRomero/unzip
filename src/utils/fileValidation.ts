/**
 * File-type validation for the ZIP extractor.
 *
 * Accepts .zip archives. Validation returns a stable machine `code` (not a
 * message) so the UI can render the localized string for the current locale —
 * errors are surfaced through the island i18n table.
 */

/** Machine codes the UI maps to localized error strings. */
export type ValidationCode = 'wrongType';

export interface ValidationResult {
  valid: boolean;
  code?: ValidationCode;
}

export const ALLOWED_EXTENSIONS = ['.zip'] as const;

// MIME types browsers commonly report for ZIP files. The type is often empty or
// misreported, so the extension is authoritative; a non-empty MIME only needs to
// be one of these when the extension is missing.
const ALLOWED_MIME_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
  'application/x-zip',
  'multipart/x-zip',
];

/** Lower-cased extension including the dot, or '' when the name has none. */
export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : '';
}

export function validateFileExtension(fileName: string): ValidationResult {
  const ext = getExtension(fileName);
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext)
    ? { valid: true }
    : { valid: false, code: 'wrongType' };
}

/**
 * A file is accepted when its extension is .zip. When the extension is not .zip
 * we still accept it if the browser reported a ZIP MIME type (covers archives
 * saved with an odd or missing extension).
 */
export function validateFile(file: File): ValidationResult {
  if (validateFileExtension(file.name).valid) {
    return { valid: true };
  }
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return { valid: true };
  }
  return { valid: false, code: 'wrongType' };
}
