// Cloudflare Worker: CORS-Proxy für DENIC-RDAP (nur .de, nur Statuscode, kein Body)
// Aufruf: GET https://<worker>/domain/<name>.de  ->  200 (belegt) | 404 (frei) | 429 | 502
const ALLOWED_ORIGINS = ["https://domainatcall.com", "http://localhost:8000"];

export default {
  async fetch(req) {
    const origin = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Expose-Headers": "Retry-After",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS")
      return new Response(null, { status: 204, headers: { ...cors, "Access-Control-Allow-Methods": "GET, HEAD", "Access-Control-Max-Age": "86400" } });

    const m = new URL(req.url).pathname.match(/^\/domain\/([a-z0-9-]{1,63}\.de)$/i);
    if (!m) return new Response("bad request", { status: 400, headers: cors });

    let r;
    try {
      r = await fetch("https://rdap.denic.de/domain/" + m[1].toLowerCase(), {
        headers: { accept: "application/rdap+json" },
        cf: { cacheEverything: true, cacheTtlByStatus: { "200-299": 300, "404": 60, "429": 0, "500-599": 0 } },
      });
    } catch (e) {
      return new Response(null, { status: 502, headers: cors });
    }
    const h = new Headers(cors);
    const ra = r.headers.get("retry-after");
    if (ra) h.set("Retry-After", ra);
    const status = [200, 404, 429].includes(r.status) ? r.status : 502;
    return new Response(null, { status, headers: h });
  },
};
