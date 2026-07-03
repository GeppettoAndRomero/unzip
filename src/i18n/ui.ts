/**
 * Interactive-island strings, per locale. Separate from page-level content
 * (`en.ts` / `ja.ts` …): this is the text the Preact islands render.
 *
 * IMPORTANT: islands receive `locale` as a PROP (present during SSR) and never
 * read it from `document`. SSR and client render the same string, so there is no
 * hydration mismatch.
 *
 * Interpolated strings carry `{name}` / `{count}` templates; the island does
 * `.replace('{name}', x)`.
 */
export const ui = {
  en: {
    // UnzipTool — open / dropzone
    uploadHeading: 'Open a .zip',
    uploadSubtitle: 'Choose a .zip archive. It is read on your device.',
    dropClick: 'Click to choose a .zip',
    dropOr: 'or drop it anywhere on the page',
    dropSupported: 'ZIP archives',
    reading: 'Reading…',

    // UnzipTool — listing / actions
    entriesLabel: 'entries',
    entriesAria: 'Archive contents',
    download: 'Download',
    downloadAll: 'Download all',
    extracting: 'Extracting…',
    clearAll: 'Clear',
    lockedLabel: 'Locked',
    garbledNote: 'Some names are not stored as UTF-8 and may be garbled.',
    fixNamesLink: 'Fix filenames',
    encryptedNote:
      'This archive has password-protected entries, which cannot be extracted here.',
    unlockLink: 'Unlock a ZIP',

    // UnzipTool — error states
    errWrongType: '{name} is not a .zip file. Choose a .zip archive.',
    errInvalidZip:
      '{name} could not be read as a ZIP archive. The file may be incomplete or corrupted.',
    errEmpty: '{name} contains no entries — there is nothing to extract.',

    // GlobalDropZone
    dzProcessing: 'Opening {count} file(s)…',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a .zip to open it',
    dzDropSub: 'ZIP archives can be opened and extracted',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    required: 'Required',
    close: 'Close',
  },
  ja: {
    // UnzipTool — open / dropzone
    uploadHeading: 'ZIP を開く',
    uploadSubtitle: '.zip ファイルを選んでください。ファイルは端末内で読み込まれます。',
    dropClick: 'クリックして .zip を選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: 'ZIP アーカイブ',
    reading: '読み込み中…',

    // UnzipTool — listing / actions
    entriesLabel: '件',
    entriesAria: 'アーカイブの内容',
    download: 'ダウンロード',
    downloadAll: 'すべてダウンロード',
    extracting: '展開中…',
    clearAll: 'クリア',
    lockedLabel: 'ロック中',
    garbledNote: '一部の名前が UTF-8 で保存されておらず、文字化けの可能性があります。',
    fixNamesLink: 'ファイル名を修正',
    encryptedNote: 'このアーカイブにはパスワード付きの項目があり、ここでは展開できません。',
    unlockLink: 'ZIP のロックを解除',

    // UnzipTool — error states
    errWrongType: '{name} は .zip ファイルではありません。.zip アーカイブを選んでください。',
    errInvalidZip:
      '{name} を ZIP アーカイブとして読み込めませんでした。ファイルが不完全か破損している可能性があります。',
    errEmpty: '{name} には項目がありません。展開するものがありません。',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを開いています…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで .zip を開く',
    dzDropSub: 'ZIP アーカイブを開いて展開できます',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    required: '必須',
    close: '閉じる',
  },
  zh: {
    // UnzipTool — open / dropzone
    uploadHeading: '打开 ZIP',
    uploadSubtitle: '选择一个 .zip 压缩包。文件在你的设备上读取。',
    dropClick: '点击选择 .zip',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: 'ZIP 压缩包',
    reading: '正在读取…',

    // UnzipTool — listing / actions
    entriesLabel: '项',
    entriesAria: '压缩包内容',
    download: '下载',
    downloadAll: '全部下载',
    extracting: '正在解压…',
    clearAll: '清除',
    lockedLabel: '已加密',
    garbledNote: '部分名称未以 UTF-8 保存，可能显示为乱码。',
    fixNamesLink: '修复文件名',
    encryptedNote: '此压缩包包含受密码保护的条目，无法在此解压。',
    unlockLink: '解锁 ZIP',

    // UnzipTool — error states
    errWrongType: '{name} 不是 .zip 文件。请选择一个 .zip 压缩包。',
    errInvalidZip: '无法将 {name} 作为 ZIP 压缩包读取。文件可能不完整或已损坏。',
    errEmpty: '{name} 不包含任何条目，没有可解压的内容。',

    // GlobalDropZone
    dzProcessing: '正在打开 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖入 .zip 即可打开',
    dzDropSub: '可以打开并解压 ZIP 压缩包',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    required: '必填',
    close: '关闭',
  },
  de: {
    // UnzipTool — open / dropzone
    uploadHeading: 'ZIP öffnen',
    uploadSubtitle: 'Wähle eine .zip-Datei. Sie wird auf deinem Gerät gelesen.',
    dropClick: 'Zum Auswählen einer .zip klicken',
    dropOr: 'oder Datei irgendwo auf die Seite ziehen',
    dropSupported: 'ZIP-Archive',
    reading: 'Wird gelesen…',

    // UnzipTool — listing / actions
    entriesLabel: 'Einträge',
    entriesAria: 'Archivinhalt',
    download: 'Herunterladen',
    downloadAll: 'Alle herunterladen',
    extracting: 'Wird entpackt…',
    clearAll: 'Leeren',
    lockedLabel: 'Gesperrt',
    garbledNote:
      'Einige Namen sind nicht als UTF-8 gespeichert und könnten unleserlich sein.',
    fixNamesLink: 'Dateinamen reparieren',
    encryptedNote:
      'Dieses Archiv enthält passwortgeschützte Einträge, die hier nicht entpackt werden können.',
    unlockLink: 'ZIP entsperren',

    // UnzipTool — error states
    errWrongType: '{name} ist keine .zip-Datei. Wähle ein .zip-Archiv.',
    errInvalidZip:
      '{name} konnte nicht als ZIP-Archiv gelesen werden. Die Datei ist möglicherweise unvollständig oder beschädigt.',
    errEmpty: '{name} enthält keine Einträge – es gibt nichts zu entpacken.',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden geöffnet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: 'Lege eine .zip zum Öffnen ab',
    dzDropSub: 'ZIP-Archive können geöffnet und entpackt werden',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    required: 'Erforderlich',
    close: 'Schließen',
  },
  es: {
    // UnzipTool — open / dropzone
    uploadHeading: 'Abrir un .zip',
    uploadSubtitle: 'Elige un archivo .zip. Se lee en tu dispositivo.',
    dropClick: 'Haz clic para elegir un .zip',
    dropOr: 'o suéltalo en cualquier parte de la página',
    dropSupported: 'Archivos ZIP',
    reading: 'Leyendo…',

    // UnzipTool — listing / actions
    entriesLabel: 'elementos',
    entriesAria: 'Contenido del archivo',
    download: 'Descargar',
    downloadAll: 'Descargar todo',
    extracting: 'Extrayendo…',
    clearAll: 'Limpiar',
    lockedLabel: 'Bloqueado',
    garbledNote: 'Algunos nombres no están guardados como UTF-8 y podrían verse mal.',
    fixNamesLink: 'Corregir nombres',
    encryptedNote:
      'Este archivo contiene elementos protegidos con contraseña que no se pueden extraer aquí.',
    unlockLink: 'Desbloquear un ZIP',

    // UnzipTool — error states
    errWrongType: '{name} no es un archivo .zip. Elige un archivo .zip.',
    errInvalidZip:
      'No se pudo leer {name} como archivo ZIP. Puede estar incompleto o dañado.',
    errEmpty: '{name} no contiene elementos: no hay nada que extraer.',

    // GlobalDropZone
    dzProcessing: 'Abriendo {count} archivo(s)…',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta un .zip para abrirlo',
    dzDropSub: 'Se pueden abrir y extraer archivos ZIP',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    required: 'Obligatorio',
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
