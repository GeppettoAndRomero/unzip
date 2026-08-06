import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe und Wendungen, die deutsche ZIP-Entpacker tatsächlich verwenden.
// Keine Werbefloskeln (einfach / schnell / kinderleicht / perfekt) — Datenschutz
// wird strukturell begründet, nicht versprochen (BRAND-OPERATING-MODEL /
// I18N-SEO-GUIDELINE). Register: informelles „du“, wie bei kostenlosen Browser-Tools üblich.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'ZIP im Browser entpacken — Dateien extrahieren & herunterladen | runlocally',
    description:
      'Entpacke eine .zip im Browser: alle Dateien und Ordner auflisten, dann einzeln oder alle auf einmal herunterladen. Nichts wird hochgeladen. Open Source, offline nutzbar.',
    ogTitle: 'ZIP im Browser entpacken',
    ogDescription:
      'Öffne eine .zip, sieh jede Datei und jeden Ordner darin und lade eine einzelne Datei — oder alle — herunter. Auf deinem Gerät gelesen, nichts hochgeladen.',
  },

  hero: {
    h1: 'ZIP entpacken',
    tagline:
      'Entpacke eine .zip im Browser — liste die Dateien auf und lade herunter, was du brauchst. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Eine ZIP entpacken, ohne etwas zu installieren',
    paras: [
      'Dieses Tool öffnet ein .zip-Archiv und listet alles darin auf — die Dateien, die Ordner und ihre Größen — und lässt dich dann jede Datei einzeln oder alle zusammen herunterladen. Das Archiv wird auf deinem Gerät gelesen und entpackt; es gibt keinen Upload und keine App zu installieren.',
      'Zuerst wird das Verzeichnis am Ende des Archivs (die Central Directory) gelesen, sodass die Dateiliste erscheint, ohne dass etwas entpackt wird. Beim Herunterladen wird nur der jeweilige Eintrag dekomprimiert, sodass es leicht bleibt, aus einem großen Archiv eine einzelne Datei zu ziehen. Verschachtelte Ordner werden vollständig angezeigt, und passwortgeschützte Einträge werden als gesperrt markiert — die überlässt es einem eigenen unlock-zip-Tool, statt sie hier nur halb zu behandeln.',
      'So siehst du den Inhalt eines Archivs, ohne es komplett zu entpacken: alles läuft online direkt im Browser, ganz ohne WinZip oder ein anderes Programm zu installieren.',
    ],
  },

  privacy: {
    h2: 'Warum dein Archiv auf deinem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Das Archiv wird vollständig in deinem Browser geöffnet und entpackt.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage, die deine Daten mitschickt.',
      'Der Quellcode ist offen und für alle einsehbar (MIT).',
      'Es funktioniert offline — was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne den Netzwerk-Tab deines Browsers, während du eine Datei extrahierst — keine Anfrage trägt dein Archiv fort.',
    sourceLinkText: 'Quellcode lesen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Eine .zip öffnen',
        p: 'Klicke, um eine .zip-Datei auszuwählen, oder ziehe sie irgendwo auf die Seite. Das Archiv wird auf deinem Gerät gelesen; es wird nicht hochgeladen.',
      },
      {
        h3: 'Die Liste lesen',
        p: 'Jede Datei und jeder Ordner wird mit ihrer Größe angezeigt. Verschachtelte Ordner erscheinen vollständig; verschlüsselte Einträge sind als gesperrt markiert.',
      },
      {
        h3: 'Herunterladen, was du brauchst',
        p: 'Lade eine einzelne Datei herunter oder nutze „Alle herunterladen“, um jede Datei im Archiv zu speichern. Jede Datei wird erst beim Herunterladen dekomprimiert.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird mein Archiv irgendwohin hochgeladen?',
      a: 'Nein. Das Archiv wird vollständig in deinem Browser geöffnet und entpackt. Es gibt keine Serverkomponente, also hat deine Datei keinen Weg vom Gerät weg. Der Quellcode ist offen, und du kannst das im Netzwerk-Tab deines Browsers bestätigen.',
    },
    {
      q: 'Worin unterscheidet es sich von einem ZIP-Viewer?',
      a: 'Ein Viewer listet nur auf, was in einem Archiv steckt. Dieses Tool listet den Inhalt auf und entpackt ihn außerdem: Du kannst jede Datei einzeln herunterladen oder alles auf einmal. Wenn du nur hineinschauen willst, ohne zu entpacken, tut das das zip-viewer-Tool.',
    },
    {
      q: 'Funktioniert „Alle herunterladen“ in jedem Browser?',
      a: 'Es speichert jede Datei als eigenen Download. Manche Browser fragen einmal um Erlaubnis, mehrere Dateien herunterzuladen; erlaube es, und der Rest folgt. Die Dateien behalten ihre Namen, und der Browser hängt eine Nummer an, falls zwei denselben Namen hätten.',
    },
    {
      q: 'Kann es passwortgeschützte oder verschlüsselte ZIPs öffnen?',
      a: 'Es listet die Einträge in einem verschlüsselten Archiv auf, weil das Verzeichnis selbst meist nicht verschlüsselt ist, und markiert diese Einträge als gesperrt. Es entschlüsselt sie nicht — das Extrahieren passwortgeschützter Inhalte übernimmt ein eigenes unlock-zip-Tool.',
    },
    {
      q: 'Gibt es eine Dateigrößen-Grenze?',
      a: 'Es gibt keine feste Grenze. Die Liste liest nur das Verzeichnis des Archivs, und jede Datei wird erst beim Herunterladen dekomprimiert, sodass der Speicherbedarf sich nach der extrahierten Datei richtet, nicht nach dem ganzen Archiv. Die praktische Obergrenze hängt vom Speicher deines Geräts ab.',
    },
    {
      q: 'Warum sind manche Dateinamen unleserlich?',
      a: 'Dateinamen, die ohne UTF-8-Flag gespeichert wurden — häufig in Archiven von älteren Systemen mit Codepages wie Shift_JIS — können als Zeichensalat erscheinen. Dieses Tool zeigt das ehrlich an, statt zu raten. Wenn du lesbare Namen brauchst, ist das Schwester-Tool zip-filename-fix dafür gebaut.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch ist es zwischengespeichert, sodass das Entpacken ohne Netzverbindung funktioniert. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },

  related: {
    h2: 'Ähnliche Tools',
    blogLinkText: 'Technische Hintergründe lesen',
  },
};
