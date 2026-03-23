import { createServer } from "node:http";
import { createHash } from "node:crypto";

const PORT = Number(process.env.PORT || 8080);
const META_PIXEL_ID = process.env.META_PIXEL_ID || "933858032944864";
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN || "";

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function sha256(v) {
  return createHash("sha256").update(v).digest("hex");
}

function normalizeDigits(v) {
  return String(v || "").replace(/\D/g, "");
}

function normalizeEmail(v) {
  return String(v || "").trim().toLowerCase();
}

function normalizeName(v) {
  return String(v || "").trim().toLowerCase();
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return json(res, 204, { ok: true });
  }

  if (req.url !== "/api/meta-conversion" || req.method !== "POST") {
    return json(res, 404, { ok: false, error: "Not found" });
  }

  if (!META_CAPI_TOKEN) {
    return json(res, 500, { ok: false, error: "META_CAPI_TOKEN is not configured" });
  }

  let raw = "";
  req.on("data", (chunk) => {
    raw += chunk;
  });

  req.on("end", async () => {
    let body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return json(res, 400, { ok: false, error: "Invalid JSON body" });
    }

    const pixelId = body.pixelId || META_PIXEL_ID;
    const em = normalizeEmail(body.email);
    const ph = normalizeDigits(body.celular || body.telefone);
    const nameParts = String(body.nome || "").trim().split(/\s+/).filter(Boolean);
    const fn = normalizeName(nameParts[0] || "");
    const ln = normalizeName(nameParts.slice(1).join(" "));
    const external = normalizeDigits(body.cpf || body.celular);

    const userData = {
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
          user_data: userData,
        },
      ],
    };

    try {
      const fbRes = await fetch(
        `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${META_CAPI_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const fbJson = await fbRes.json();
      if (!fbRes.ok) {
        return json(res, fbRes.status, { ok: false, error: fbJson });
      }
      return json(res, 200, { ok: true, data: fbJson });
    } catch (error) {
      return json(res, 500, { ok: false, error: String(error) });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Meta CAPI server running on port ${PORT}`);
});

