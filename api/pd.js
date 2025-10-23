// GET /api/pd?path=/deals&params=status=won&limit=50
export default async function handler(req, res) {
  try {
    const { PD_COMPANY, PD_API_TOKEN } = process.env;
    if (!PD_COMPANY || !PD_API_TOKEN) {
      return res.status(500).json({ error: "Missing env vars" });
    }
    const path = (req.query.path || "/deals").toString();
    const params = (req.query.params || "").toString();
    const base = `https://${PD_COMPANY}.pipedrive.com/api/v1`;
    const sep = params ? "?" : "";
    const url = `${base}${path}${sep}${params}${params ? "&" : "?"}api_token=${encodeURIComponent(PD_API_TOKEN)}`;
    const r = await fetch(url);
    const text = await r.text();
    res.status(r.status).setHeader("content-type", r.headers.get("content-type") || "application/json").send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

