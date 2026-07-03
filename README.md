# unzip

Extract a .zip in your browser: list every file and folder inside, then download any
file individually or all of them at once. Archives are read and unpacked on your device
and never uploaded. Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

The archive is read with [@zip.js/zip.js](https://github.com/gildas-lormeau/zip.js). The
central directory (the small index at the end of every ZIP) is read first to list entries
without decompressing anything, and each file is decompressed to a Blob on demand when you
download it. The whole pipeline runs client-side — there is no server component, so your
files have no path off your device.

Password-protected entries are listed and marked as locked but are not decrypted here; a
separate unlock-zip tool handles those.

## Features

- List every file, folder and size inside a .zip (including nested folders)
- Download any file individually, or download all files at once
- Encrypted entries are shown locked (decryption is out of scope)
- Non-UTF-8 filenames are flagged rather than silently mangled
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. ZIP reading/extraction uses @zip.js/zip.js (BSD-3).

## Browser support

Works in current Chrome, Edge, Firefox and Safari. Reading and extraction run in the
browser via @zip.js/zip.js, so no native archive support is required. "Download all" saves
each file as a separate download; some browsers ask once to allow multiple downloads.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
