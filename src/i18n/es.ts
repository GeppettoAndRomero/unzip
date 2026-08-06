import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan los descompresores de
// ZIP en español, no traducción literal. Sin palabras publicitarias (fácil / rápido /
// perfecto…); la privacidad se explica de forma estructural, no como promesa. Español
// pan-regional (España y Latinoamérica), registro «tú». htmlLang 'es'. QA por revisor independiente.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Descomprimir un ZIP en el navegador — extraer y descargar | runlocally',
    description:
      'Extrae un .zip en tu navegador: lista todos los archivos y carpetas y descarga cualquiera de ellos o todos a la vez. No se sube nada. Código abierto, funciona sin conexión.',
    ogTitle: 'Descomprimir un ZIP en el navegador',
    ogDescription:
      'Abre un .zip, mira cada archivo y carpeta que contiene y descarga un archivo — o todos. Se lee en tu dispositivo, no se sube nada.',
  },

  hero: {
    h1: 'Descomprimir ZIP',
    tagline:
      'Extrae un .zip en tu navegador: lista sus archivos y descarga los que necesites. No se sube nada.',
  },

  intro: {
    h2: 'Extraer un ZIP sin instalar nada',
    paras: [
      'Esta herramienta abre un archivo .zip y lista todo lo que contiene —los archivos, las carpetas y sus tamaños— y luego te deja descargar cualquier archivo por separado, o todos juntos. El archivo se lee y se extrae en tu dispositivo; no hay subida ni ninguna app que instalar.',
      'Primero lee el índice que hay al final del archivo (el directorio central), así que la lista de archivos aparece sin descomprimir nada. Al descargar un archivo solo se descomprime esa entrada, de modo que abrir un archivo grande para sacar un solo elemento sigue siendo ligero. Las carpetas anidadas se muestran completas, y las entradas protegidas con contraseña se marcan como bloqueadas: esas se dejan a una herramienta unlock-zip específica en lugar de resolverlas a medias aquí.',
      'Así ves el contenido de un archivo sin descargar ni instalar ningún programa: todo ocurre online, en tu propio navegador.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo se queda en tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir:',
    points: [
      'El archivo se abre y se extrae por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición que lleve tus datos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras extraes un archivo: ninguna petición lleva tu archivo.',
    sourceLinkText: 'Leer el código.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Abre un .zip',
        p: 'Haz clic para elegir un archivo .zip, o suéltalo en cualquier parte de la página. El archivo se lee en tu dispositivo; no se sube.',
      },
      {
        h3: 'Lee la lista',
        p: 'Cada archivo y carpeta se muestra con su tamaño. Las carpetas anidadas aparecen completas; las entradas cifradas se marcan como bloqueadas.',
      },
      {
        h3: 'Descarga lo que necesites',
        p: 'Descarga cualquier archivo por separado, o usa «Descargar todo» para guardar todos los archivos del ZIP. Cada archivo se descomprime solo cuando lo descargas.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi archivo a algún sitio?',
      a: 'No. El archivo se abre y se extrae por completo en tu navegador. No hay componente de servidor, así que tu archivo no tiene forma de salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿En qué se diferencia de un visor de ZIP?',
      a: 'Un visor solo lista lo que hay dentro de un archivo. Esta herramienta lista el contenido y además lo extrae: puedes descargar cualquier archivo por separado, o todo a la vez. Si solo quieres mirar dentro sin extraer, la herramienta zip-viewer hace eso.',
    },
    {
      q: '¿«Descargar todo» funciona en todos los navegadores?',
      a: 'Guarda cada archivo como una descarga aparte. Algunos navegadores piden permiso una vez para descargar varios archivos; concédelo y el resto continúa. Los archivos conservan sus nombres, y el navegador añade un sufijo si dos coincidieran con el mismo nombre.',
    },
    {
      q: '¿Puede abrir ZIP protegidos con contraseña o cifrados?',
      a: 'Lista las entradas dentro de un archivo cifrado, porque el índice en sí no suele estar cifrado, y marca esas entradas como bloqueadas. No las descifra: extraer contenido protegido con contraseña lo hace una herramienta unlock-zip aparte.',
    },
    {
      q: '¿Hay un límite de tamaño?',
      a: 'No hay un límite fijo. La lista lee solo el índice del archivo, y cada archivo se descomprime solo cuando lo descargas, así que el uso de memoria depende del archivo que extraes y no del ZIP entero. El tope práctico depende de la memoria de tu dispositivo.',
    },
    {
      q: '¿Por qué algunos nombres de archivo salen ilegibles?',
      a: 'Los nombres guardados sin el indicador UTF-8 —habitual en archivos creados en sistemas antiguos que usan páginas de códigos como Shift_JIS— pueden aparecer como caracteres extraños. Esta herramienta lo muestra con honestidad en lugar de adivinar. Si necesitas nombres legibles, la herramienta hermana zip-filename-fix está hecha para eso.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda en caché, así que la extracción funciona sin conexión. También puedes instalarla en tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
