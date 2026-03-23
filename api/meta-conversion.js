import crypto from "node:crypto";

const GRAPH_VERSION = "v20.0";

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, error: "META_CAPI_TOKEN is not configured" });
  }

  const body = req.body || {};
  const pixelId = body.pixelId || process.env.META_PIXEL_ID || "933858032944864";

  const em = normalizeEmail(body.email);
  const ph = normalizeDigits(body.celular || body.telefone);
  const fn = normalizeName(body.nome?.split?.(" ")?.[0]);
  const ln = normalizeName(body.nome?.split?.(" ")?.slice(1).join(" "));
  const external = normalizeDigits(body.cpf || body.celular);

  const user_data = {
    client_user_agent: req.headers["user-agent"] || undefined,
    fbp: body.fbp || undefined,
    fbc: body.fbc || undefined,
    em: em ? [sha256(em)] : undefined,
    ph: ph ? [sha256(ph)] : undefined,
    fn: fn ? [sha256(fn)] : undefined,
    ln: ln ? [sha256(ln)] : undefined,
    external_id: external ? [sha256(external)] : undefined,
  };

  const payload = {
    data: [
      {
        event_name: body.event_name || "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id || undefined,
        action_source: "website",
        event_source_url: body.page_url || undefined,
        user_data,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ ok: false, error: json });
    }

    return res.status(200).json({ ok: true, data: json });
  } catch (error) {
    return res.status(500).json({ ok: false, error: String(error) });
  }
}

