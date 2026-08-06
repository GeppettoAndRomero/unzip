import type { ToolContent } from './types';

// unzip. English source content.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Unzip a ZIP file in your browser — extract & download | runlocally',
    description:
      'Extract a .zip in your browser: list every file and folder, then download any of them or all at once. Nothing is uploaded. Open source, works offline.',
    ogTitle: 'Unzip a ZIP file in your browser',
    ogDescription:
      'Open a .zip, see every file and folder inside, and download any file — or all of them. Read on your device, nothing uploaded.',
  },

  hero: {
    h1: 'Unzip',
    tagline:
      'Extract a .zip in your browser — list its files and download any of them. Nothing is uploaded.',
  },

  intro: {
    h2: 'Extract a ZIP without installing anything',
    paras: [
      'This tool opens a .zip archive and lists everything inside it — the files, the folders and their sizes — then lets you download any file on its own, or all of them together. The archive is read and unpacked on your device; there is no upload and no app to install.',
      'It reads the archive\'s central directory first, so the file list appears without decompressing anything. When you download a file, only that entry is decompressed, so opening a large archive to pull out one file stays light. Nested folders are shown in full, and password-protected entries are marked as locked — those are left for a dedicated unlock-zip tool rather than half-handled here.',
    ],
  },

  privacy: {
    h2: 'Why your archive stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The archive is opened and extracted entirely in your browser.',
      'The page is served as static files and makes no request that carries your data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while extracting a file — no request carries your archive.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Open a .zip',
        p: 'Click to choose a .zip file, or drop it anywhere on the page. The archive is read on your device; it is not uploaded.',
      },
      {
        h3: 'Read the listing',
        p: 'Every file and folder is shown with its size. Nested folders appear in full; encrypted entries are marked as locked.',
      },
      {
        h3: 'Download what you need',
        p: 'Download any single file, or use "Download all" to save every file in the archive. Each file is decompressed only when you download it.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my archive uploaded anywhere?',
      a: 'No. The archive is opened and extracted entirely in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'How is this different from a ZIP viewer?',
      a: 'A viewer only lists what is inside an archive. This tool lists the contents and also extracts them: you can download any file individually, or download everything at once. If you only want to look inside without unpacking, the zip-viewer tool does that.',
    },
    {
      q: 'Does "Download all" work in every browser?',
      a: 'It saves each file as a separate download. Some browsers ask once for permission to download multiple files; allow it and the rest follow. Files keep their names, and the browser adds a suffix if two would land with the same name.',
    },
    {
      q: 'Can it open password-protected or encrypted ZIPs?',
      a: 'It lists the entries inside an encrypted archive, because the index itself is usually not encrypted, and marks those entries as locked. It does not decrypt them — extracting password-protected content is handled by a separate unlock-zip tool.',
    },
    {
      q: 'Is there a file size limit?',
      a: 'There is no fixed limit. The listing reads only the archive\'s index, and each file is decompressed only when you download it, so memory use scales with the file you extract rather than the whole archive. The practical ceiling depends on your device\'s memory.',
    },
    {
      q: 'Why are some filenames garbled?',
      a: 'Filenames stored without the UTF-8 flag — common in archives made on legacy systems using code pages such as Shift_JIS — can appear as mojibake. This tool surfaces that honestly rather than guessing. If you need readable names, a sibling tool, zip-filename-fix, is built for that.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so extracting works without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
