# Handoff: Monetarisierung von Domain at Call

Stand: 16. November 2026

## Entscheidung

Start mit **Option 1: Registrar-Affiliate** am „Kaufen“-Button. Alles andere ist unten als Backlog festgehalten.
Leitlinie: Das Tool bleibt ohne Konto, ohne Tracking, ohne Cookies und ohne Werbebanner. Provision nur über Links, die erst nach Klick geöffnet werden.

## Status Option 1 (umgesetzt, noch nicht live)

Code ist fertig und getestet, es fehlen nur die **Partner-IDs**.

### Was noch zu tun ist (Reihenfolge einhalten)

1. Bei den Registraren als Partner anmelden. Gängige Netzwerke: Impact, CJ, Awin; Porkbun und andere haben teils eigene Programme. Aktuelle Konditionen und Zulassung für Tool-/Vergleichsseiten dort prüfen.
2. In `index.html` das Objekt `AFF` füllen (Zeile bei `REGS`):
   ```js
   const AFF={namecheap:"https://namecheap.pxf.io/XXXX?u=",porkbun:"",godaddy:""};
   ```
   - **String** = Tracking-Link-Präfix, das auf den Parameter endet, der die Ziel-URL aufnimmt (Impact: `u=`, CJ: `url=`, Awin: `ued=`). Die Ziel-URL wird automatisch URL-kodiert angehängt.
   - **Funktion** `(zielUrl, domain) => fertigeUrl` für Programme, die ein eigenes Format wollen (z. B. einfacher `?ref=`-Parameter).
   - **Leer** = direkter Link ohne Provision, dann erscheint auch kein Werbehinweis.
3. Lokal prüfen (`python3 -m http.server 8000`): Registrar wählen, Domain prüfen, ✅ → „Bei … kaufen (Partnerlink, Werbung)“ muss über das Netzwerk auf die Registrar-Suche führen und die Domain vorbefüllt haben.
4. **Erst danach pushen.** Die rechtlichen Seiten (`hilfe.html`, `datenschutz.html`, `nutzungsbedingungen.html`) sagen bereits „Partnerlinks / Provision“. Ohne IDs wären sie falsch. Die Hinweise im Tool selbst (Menü, Registrar-Hinweis, Merkliste) erscheinen dagegen nur, wenn für den gewählten Registrar eine ID gesetzt ist.
5. Die Programmbedingungen des jeweiligen Netzwerks lesen (z. B. Pflicht zur Kennzeichnung, Verbot von Eigenkäufen über den eigenen Link, Verbot von Brand-Keyword-Werbung).

### Was geändert wurde

- `index.html`: `AFF`, `affOn()`, `buyUrl()`; Kaufen-Menü und Merkliste mit Kennzeichnung („Partnerlink, Werbung“ bzw. `*`), `regNote` und `favNote` mit Werbehinweis (DE/EN/RU); `window.open` mit `noreferrer`, wenn ein Partnerlink aktiv ist. „keine Werbung“ ersetzt durch „keine Werbebanner“ (`leadFree`, `priv`, `coffeeA`).
- `hilfe.html`, `datenschutz.html`, `nutzungsbedingungen.html`: Aussage „keine Partnerlinks / keine Provision“ ersetzt (DE/EN/RU). Datenschutz erwähnt jetzt das Partnernetzwerk als Empfänger von Klick, Domain und IP, das auf seinem Server Cookies setzen kann. „Stand“ auf 16. November 2026.

### Offene Prüfpunkte

- **Postfach `info@domainatcall.com` einrichten** (MX-Einträge oder Weiterleitung beim Domain-Anbieter, nicht bei GitHub Pages). Die Seiten verweisen bereits darauf; ohne Postfach gehen Anfragen und Impressum-Kontakt ins Leere. Bei MX-Einträgen die A-/AAAA-Einträge für GitHub Pages nicht ändern.
- Datenschutztext vor dem Livegang gegen die tatsächlich genutzten Netzwerke abgleichen (Namen ggf. konkret nennen, Link zu deren Datenschutzerklärung).
- Impressum: USt-IdNr. ist „beantragt“. Einnahmen steuerlich anmelden (Gewerbe/Finanzamt); mit Steuerberater klären.
- Kein Rechtsrat; die Texte sind ein sachlicher Entwurf.

## Backlog (nicht begonnen)

| # | Idee | Aufwand | Hinweis |
|---|---|---|---|
| 2 | **Spenden ausbauen** | klein | Stripe-Link (`stripe.com/@dkai`) und „Coffee“-Hinweis existieren schon (`#coffee` erscheint nach Lauf mit freien Treffern). Evtl. Hinweis erst nach mehreren Läufen zeigen. |
| 3 | **Pro-Version / Abo** | groß | Domain-Watch (E-Mail, sobald eine Domain frei wird), Bulk-Listen, CSV-Export, Merkliste-Sync. Braucht Backend und Konto (nur für Pro). Startpunkt: vorhandener Cloudflare Worker `black-wind-2956.korotkiy-dev.workers.dev` (RDAP-Proxy) plus Stripe. Datenschutz und Nutzungsbedingungen müssten erweitert werden. |
| 4 | **Cross-Selling** | klein–mittel | Hosting, E-Mail, Website-Baukasten, SSL per Affiliate auf Hilfe-/Inhaltsseiten, klar gekennzeichnet. |
| 5 | **Traffic aufbauen** (Voraussetzung für alles) | mittel | Unterseiten je Endung („.de-Domain prüfen“, „.ai-Domain prüfen“) und je Anwendungsfall („Domain-Ideen für …“), `sitemap.xml` erweitern, Verlinkung aus Foren/Communities, Beitrag auf dk-ai.de. |
| 6 | **Display-Werbung (AdSense o. ä.)** | klein | Eher nicht empfohlen: braucht Consent-Banner (TDDDG § 25), widerspricht dem Datenschutz-Konzept, geringer Ertrag bei einer Ein-Seiten-Tool-Seite. |

## Messen

Die Seite hat bewusst keine Statistik. Ergebnis kommt aus dem Partner-Dashboard (Klicks, Käufe, Provision). Erst nach einigen Wochen entscheiden, ob Punkt 3 oder 5 als Nächstes dran ist.
