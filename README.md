# Domain at Call

Web-Tool, das im Browser prüft, ob Domainnamen frei sind (DNS-over-HTTPS + RDAP).
Ohne Konto, ohne Tracking, ohne Build-Schritt: reines HTML/CSS/JS, gehostet über GitHub Pages unter
**https://domainatcall.com**.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | das Tool (Startseite), Texte in DE/EN/RU |
| `hilfe.html`, `nutzungsbedingungen.html` | Hilfe und Nutzungsbedingungen |
| `datenschutz.html`, `impressum.html` | Rechtliche Seiten |
| `style.css`, `site.js` | gemeinsames Design, Sprachumschaltung (`?lang=de\|en\|ru`, Browsersprache DE/RU, sonst Englisch), Menü |
| `CNAME` | Custom Domain für GitHub Pages (`domainatcall.com`) |
| `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` | Pages-/SEO-Grundlagen |

Lokal ansehen: `python3 -m http.server 8000` und `http://localhost:8000` öffnen.

## Veröffentlichen (GitHub Pages)

1. Neues Repository auf GitHub anlegen (z. B. `domainatcall.com`, public), dann:
   ```
   git remote add origin https://github.com/<benutzer>/domainatcall.com.git
   git push -u origin main
   ```
2. Repository → **Settings → Pages**: Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Unter „Custom domain“ `domainatcall.com` eintragen und speichern. Erst danach beim Domain-Anbieter die DNS-Einträge setzen
   (sonst könnte jemand anderes die Domain bei GitHub beanspruchen). Empfehlenswert: vorher die Domain unter
   Profil → Settings → Pages → „Add a domain“ verifizieren.
4. DNS beim Domain-Anbieter:

   | Typ | Name | Wert |
   |---|---|---|
   | A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | `www` | `<benutzer>.github.io` |

   Keine Wildcard-Einträge (`*.domainatcall.com`) anlegen. DNS-Änderungen können bis zu 24 Stunden dauern.
5. Wenn das Zertifikat bereitsteht: **Enforce HTTPS** aktivieren.

## Nach dem Umzug: dk-ai.de

Das Tool liegt bisher unter `dk-ai.de/domain-checker/`. Damit alte Links nicht ins Leere laufen, kann dort die Datei
`domain-checker/index.html` durch eine Weiterleitung ersetzt werden (und `hilfe.html` sowie `nutzungsbedingungen.html`
in diesem Ordner entfallen oder ebenfalls weiterleiten):

```html
<!doctype html><meta charset="utf-8">
<title>Domain at Call</title>
<link rel="canonical" href="https://domainatcall.com/">
<meta http-equiv="refresh" content="0;url=https://domainatcall.com/">
<script>location.replace("https://domainatcall.com/"+location.search)</script>
<a href="https://domainatcall.com/">Domain at Call</a>
```

Außerdem in `dk-ai.de` die Navigation von `domain-checker/index.html` auf `https://domainatcall.com/` umstellen
(`impressum.html`, `datenschutz.html`) und den Abschnitt „Web-Tool“ in der dortigen Datenschutzerklärung anpassen.

## Hinweise

- Einstellungen und Merkliste liegen im `localStorage` unter der neuen Domain (Schlüssel `dc`). Nutzereinstellungen von
  `dk-ai.de` werden nicht übernommen, weil der Browser sie je Domain trennt.
- Kontakt-E-Mail in Impressum, Datenschutz, Hilfe und Nutzungsbedingungen ist weiterhin `info@dk-ai.de`.
- Logo und Icons sind die von DK-AI; für eine eigene Marke `logo-*.svg`, `favicon*` und `icon-*.png` austauschen.
