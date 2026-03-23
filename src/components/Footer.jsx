import { publicPath } from "../utils/publicPath.js";

const GA = "#22c55e";

const UNITS_MOBILE = [
  { city: "📍 Itabaianinha – SE (Matriz)", addr: "Praça Flaviano Peixoto, 19 – Centro" },
  { city: "📍 Estância – SE", addr: "Praça Orlando Silva Gomes, 408A – Centro" },
  { city: "📍 Aracaju – SE", addr: "Rua Própria, 92 – Centro" },
];

const LOCATIONS_DESKTOP = [
  { city: "📍 Itabaianinha – SE", badge: "MATRIZ", lines: ["Praça Flaviano Peixoto, 19", "Centro"] },
  { city: "📍 Estância – SE", badge: null, lines: ["Praça Orlando Silva Gomes, 408A", "Centro"] },
  { city: "📍 Aracaju – SE", badge: null, lines: ["Rua Própria, 92", "Centro"] },
];

const DEFAULT_TAGLINE =
  "Especialistas em Crédito Consignado INSS e Crédito ao Trabalhador CLT";

export default function Footer({ tagline = DEFAULT_TAGLINE }) {
  return (
    <footer
      className="footer-outer"
      style={{ background: "#051f10", padding: "32px 18px 26px", color: "rgba(255,255,255,.78)" }}
    >
      <div className="mobile-only">
        <img
          src={publicPath("images/vn_promotora_vida_nova_logo_white_footer.webp")}
          alt="VN Promotora"
          style={{ height: 56, marginBottom: 20 }}
        />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 900, color: GA, marginBottom: 4, letterSpacing: 0.5 }}>
          VN PROMOTORA
        </p>
        <p style={{ fontSize: 13, marginBottom: 6 }}>CNPJ: 23.529.979/0001-95</p>
        <p style={{ fontSize: 14, marginBottom: 20, fontWeight: 600 }}>📅 Seg–Sex: 08h–18h</p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
          Nossas Unidades
        </p>
        {UNITS_MOBILE.map(({ city, addr }) => (
          <div key={city} style={{ marginBottom: 14 }}>
            <p style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{city}</p>
            <p style={{ fontSize: 13, marginTop: 2 }}>{addr}</p>
          </div>
        ))}
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "rgba(255,255,255,.36)",
            marginTop: 24,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,.1)",
            lineHeight: 1.75,
          }}
        >
          © 2025 VN PROMOTORA – TODOS OS DIREITOS RESERVADOS
          <br />
          {tagline}
        </p>
      </div>

      <div className="footer-inner desktop-only" style={{ display: "none" }}>
        <div className="footer-grid" style={{ display: "none" }}>
          <div>
            <img
              src={publicPath("images/vn_promotora_vida_nova_logo_white_footer.webp")}
              alt="VN Promotora"
              style={{ height: 56, marginBottom: 16 }}
            />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 900, color: GA, marginBottom: 4, letterSpacing: 0.5 }}>
              VN PROMOTORA
            </p>
            <p style={{ fontSize: 13, marginBottom: 6 }}>CNPJ: 23.529.979/0001-95</p>
            <p style={{ fontSize: 14, marginTop: 10, fontWeight: 600 }}>📅 Seg–Sex: 08h–18h</p>
          </div>
          {LOCATIONS_DESKTOP.map(({ city, badge, lines }) => (
            <div key={city}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.5 }}>
                {city}
                {badge && (
                  <>
                    <br />
                    <span style={{ color: GA, fontSize: 12 }}>{badge}</span>
                  </>
                )}
              </p>
              {lines.map((line) => (
                <p key={line} style={{ fontSize: 13, marginBottom: 4 }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,.36)",
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,.1)",
            lineHeight: 1.75,
          }}
        >
          © 2025 VN PROMOTORA – TODOS OS DIREITOS RESERVADOS. {tagline}
        </p>
      </div>
    </footer>
  );
}
