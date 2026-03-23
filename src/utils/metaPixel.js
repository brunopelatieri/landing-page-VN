const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "933858032944864";
const META_CAPI_ENDPOINT =
  import.meta.env.VITE_META_CAPI_ENDPOINT || "/api/meta-conversion.php";

function readCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export async function trackMetaLead(payload = {}) {
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }

  try {
    await fetch(META_CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pixelId: META_PIXEL_ID,
        event_name: "Lead",
        event_id: eventId,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
        page_url: typeof window !== "undefined" ? window.location.href : null,
        ...payload,
      }),
    });
  } catch (_) {
    // Do not break lead flow if CAPI is unavailable.
  }
}

