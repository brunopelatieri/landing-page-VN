/**
 * VN Promotora — Crédito Consignado SIAPE (Servidores Federais)
 * Rota: /credito-consignado-siape
 * Mobile: < 960px  |  Desktop: ≥ 960px
 */

import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MultiStepFormSIAPE from "./components/MultiStepFormSIAPE.jsx";
import { publicPath } from "./utils/publicPath.js";

const G = "#0a4d2c";
const GA = "#22c55e";
const GM = "#1a7a45";

const CAROUSEL_IMAGES = [
  publicPath("images/carousel_01.webp"),
  publicPath("images/carousel_02.webp"),
  publicPath("images/carousel_03.webp"),
  publicPath("images/carousel_04.webp"),
];

const VANTAGENS = [
  "✅ Taxa de juros até 3x menor que empréstimos comuns",
  "✅ Parcelas descontadas direto no contracheque — sem preocupação com vencimentos",
  "✅ Prazo de até 96 meses para pagar",
  "✅ Aprovação mesmo com nome sujo no Serasa",
  "✅ Contratação 100% online e pelo celular",
  "✅ Dinheiro na conta em até 1 dia útil",
  "✅ Portabilidade com troco disponível",
];

const COMO_FUNCIONA = [
  {
    titulo: "Envie seus dados",
    texto: "Responda algumas perguntas sobre seu perfil e situação atual",
  },
  {
    titulo: "Simulamos as melhores condições",
    texto: "Verificamos as melhores oportunidades nos maiores bancos do mercado e enviamos para você",
  },
  {
    titulo: "Envie a documentação",
    texto: "100% digital, pelo celular",
  },
  {
    titulo: "Assine o contrato digitalmente",
    texto: "Sem precisar ir ao banco",
  },
  {
    titulo: "Dinheiro na conta",
    texto: "Liberação em até alguns minutos via pix",
  },
  {
    titulo: "Desconto automático em folha",
    texto: "Sem preocupação com boletos ou datas de vencimento",
  },
];

const QUEM_PODE = [
  "✅ Servidores públicos federais civis ativos",
  "✅ Militares das Forças Armadas",
  "✅ Aposentados e pensionistas federais",
  "✅ Ocupantes de cargos e funções vinculadas ao SIAPE",
  "✅ Servidores com restrição no Serasa/SPC (nome sujo)",
];

const MODALIDADES = [
  {
    emoji: "🆕",
    titulo: "Novo Contrato",
    texto: "Exclusivo para quem tem margem livre ou até mesmo nunca pegou crédito consigo.",
  },
  {
    emoji: "💰",
    titulo: "Aumento Salarial 2026",
    texto: "No mês de abril de 2026 todos servidores SIAPES tiveram aumento salarial, fazendo com que todos agora tenha margem disponível para pegar credito.",
  },
  {
    emoji: "🔁",
    titulo: "Refinanciamento",
    texto: "Renegociação do saldo devedor com novas condições. Pode obter dinheiro extra mantendo ou reduzindo a parcela.",
  },
  {
    emoji: "🔀",
    titulo: "Portabilidade",
    texto: "Transferência do contrato para um banco com taxa mais baixa. É seu direito por lei — gratuita e sem burocracia.",
  },
  {
    emoji: "💸",
    titulo: "Portabilidade com Troco",
    texto: "Além de reduzir a taxa, você recebe a diferença em dinheiro na conta. Economize e ainda ganhe dinheiro extra.",
  },
];

const CONDICOES = [
  { label: "Taxa máxima:", valor: "2/3 dos créditos bancários pessoais" },
  { label: "Prazo máximo:", valor: "Até 96 meses (8 anos)" },
  { label: "Margem p/ empréstimo:", valor: "35% da remuneração líquida" },
  { label: "Margem p/ cartão:", valor: "5% da remuneração líquida" },
  { label: "Aprovação:", valor: "Em até 1 dia útil" },
  { label: "Consulta Serasa:", valor: "Não realizada" },
];

const WHY_ITEMS = [
  { icon: "📊", text: "Entenda como usar sua margem consignável SIAPE com segurança" },
  { icon: "💰", text: "Receba simulações e propostas com taxas competitivas" },
  { icon: "🔀", text: "Saiba se portabilidade ou refinanciamento faz sentido para você" },
  { icon: "📱", text: "Atendimento humano e 100% digital, no seu ritmo" },
];

function Carousel({ height }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % CAROUSEL_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: height || 280, overflow: "hidden" }}>
      {CAROUSEL_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            opacity: i === slide ? 1 : 0,
            transition: "opacity 0.85s ease",
            zIndex: i === slide ? 1 : 0,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 10,
        }}
      >
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Ir para slide ${i + 1}`}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === slide ? "#fff" : "rgba(255,255,255,.4)",
              transform: i === slide ? "scale(1.35)" : "scale(1)",
              transition: "all .25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function VNPromotoraSIAPE() {
  useEffect(() => {
    const seo = {
      title: "Crédito Consignado SIAPE para Servidor Federal | VN Promotora",
      description:
        "Empréstimo consignado SIAPE para servidores públicos federais, militares, aposentados e pensionistas. Taxa a partir de 1,80% a.m., até 96x, sem consulta ao Serasa e contratação 100% digital.",
      keywords:
        "crédito consignado SIAPE, empréstimo servidor federal, consignado servidor público federal, portabilidade SIAPE, refinanciamento SIAPE, crédito para militares, crédito para aposentados federais",
      canonicalPath: "/credito-consignado-siape",
    };

    const upsertMeta = (attr, key, content) => {
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const origin = window.location.origin;
    const canonicalUrl = `${origin}${seo.canonicalPath}`;

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { font-family: 'Nunito', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; font-size: 16px; }
    button { font-family: inherit; }
    img    { max-width: 100%; display: block; }

    .mobile-only  { display: block; }
    .desktop-only { display: none;  }

    @media (max-width: 959px) {
      .hero-section { display: flex; flex-direction: column; }
      .hero-section > .hero-grid { flex: 1 1 auto; }
    }

    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0   rgba(34,197,94,.45); }
      50%      { box-shadow: 0 0 0 14px rgba(34,197,94,0);  }
    }
    .pulse { animation: pulse 2s infinite; }

    .how-section-img-wrap { margin: 0; padding: 0; line-height: 0; }
    .how-section-img-wrap img {
      width: 100%; height: auto; display: block; object-fit: contain; object-position: bottom center;
    }
    @media (max-width: 959px) {
      .how-section { display: flex; flex-direction: column; padding: 38px 18px 0 !important; }
      .how-section-mobile-body { padding-bottom: 26px; }
      .how-section-img-wrap {
        width: calc(100% + 36px); max-width: none; margin-left: -18px; margin-right: -18px; align-self: center;
      }
    }

    @media (min-width: 960px) {
      .mobile-only  { display: none  !important; }
      .desktop-only { display: block !important; }

      nav { padding: 10px 0 !important; }
      .nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 60px; justify-content: flex-start !important; }

      .hero-grid { display: grid !important; grid-template-columns: 1fr 1fr; min-height: 560px; }
      .hero-left { min-height: 560px !important; padding: 64px 60px 60px 64px !important; justify-content: center; }
      .hero-left h1 { font-size: 40px !important; }
      .hero-left p  { font-size: 17px !important; }
      .hero-right-col {
        display: flex !important; flex-direction: column; justify-content: flex-end; min-height: 560px;
      }

      .why-section { padding: 64px 0 !important; }
      .why-inner   { max-width: 1100px; margin: 0 auto; padding: 0 0px; }
      .why-inner.desktop-only   { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
      .why-grid    { display: grid !important; grid-template-columns: 1fr 1fr; gap: 14px; }

      .form-section-outer { padding-bottom: 64px !important; }
      .form-title-wrap    { max-width: 1100px; margin: 0 auto; padding: 44px 60px 28px; text-align: left !important; }
      .form-layout        { max-width: 1100px; margin: 0 auto; padding: 0 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 44px; align-items: start; }

      .siape-blocks { max-width: 1100px; margin: 0 auto; padding: 0 60px; }

      .how-section  { padding: 84px 0 0 !important; }
      .how-inner    { max-width: 1100px; margin: 0 auto; padding: 0 60px 0;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
      .how-img-side {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-self: stretch;
        min-height: 0;
        margin: 0;
        padding: 0;
        overflow: visible;
        line-height: 0;
      }
      .how-img-side img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        object-position: bottom center;
      }

      .brand-section { padding: 72px 60px !important; }
      .brand-inner   { max-width: 1100px; margin: 0 auto;
        display: grid !important; grid-template-columns: 1fr auto; gap: 40px; align-items: center; text-align: left !important; }

      .footer-outer { padding: 52px 60px 32px !important; }
      .footer-inner { max-width: 1100px; margin: 0 auto; }
      .footer-grid  { display: grid !important; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 36px; }
    }
  `;

  const btnGreen = {
    display: "block",
    width: "100%",
    padding: 17,
    background: GA,
    color: "#fff",
    border: "none",
    borderRadius: 50,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 16,
    fontWeight: 900,
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    letterSpacing: 0.5,
  };
  const btnDark = { ...btnGreen, background: G };

  const cardBase = {
    background: "#fff",
    borderRadius: 15,
    padding: "18px 16px",
    boxShadow: "0 2px 12px rgba(0,0,0,.07)",
    borderLeft: `5px solid ${GA}`,
  };

  return (
    <>
      <style>{css}</style>
      <Header />

      <section className="hero-section" style={{ background: G, overflow: "hidden" }}>
        <div className="why-inner hero-grid" style={{ position: "relative" }}>
          <div
            className="hero-left"
            style={{
              background: "linear-gradient(135deg, rgba(10,77,44,.96) 0%, rgba(10,77,44,.72) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "32px 22px 28px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(22px, 3.5vw, 40px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.22,
                marginBottom: 16,
                textShadow: "0 2px 10px rgba(0,0,0,.4)",
              }}
            >
              Você é servidor público federal?
              <br />
              <span style={{ color: GA }}>Seu dinheiro pode estar disponível agora — sem burocracia e com a menor taxa do mercado.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 1.4vw, 17px)",
                color: "rgba(255,255,255,.92)",
                lineHeight: 1.65,
                marginBottom: 26,
                fontWeight: 600,
              }}
            >
              Empréstimo Consignado SIAPE com desconto direto no contracheque, parcelas fixas e aprovação em até 1 dia útil. Sem consulta ao Serasa.
            </p>
            <a href="#form-anchor" className="pulse" style={{ ...btnGreen, width: "auto", alignSelf: "flex-start", padding: "16px 28px" }}>
              Simular grátis agora →
            </a>
            <p
              style={{
                marginTop: 18,
                fontSize: 15,
                fontWeight: 700,
                color: "rgba(255,255,255,.88)",
              }}
            >
              Consulta gratuita • Sem compromisso • Sem consulta ao SPC/Serasa
            </p>
          </div>
          <div className="hero-right-col" style={{ display: "none", width: "100%", minHeight: 560 }}>
            <Carousel height={560} />
          </div>
        </div>
        <div className="mobile-only" style={{ position: "relative", width: "100%", height: 270 }}>
          <Carousel height={270} />
        </div>
      </section>

      <section
        className="form-section-outer"
        style={{ background: "rgb(240, 253, 244)", paddingTop: 28, paddingBottom: 28 }}
        id="form-anchor"
      >
        <div className="form-title-wrap" style={{ padding: "22px 60px 18px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(19px, 2.5vw, 28px)",
              fontWeight: 900,
              color: G,
            }}
          >
            Solicite sua simulação
          </h2>
          <p className="desktop-only" style={{ color: "#4b5563", fontSize: 17, marginTop: 10, fontWeight: 600, display: "none" }}>
            Leva menos de 2 minutos. Retornamos com as melhores condições para o seu perfil.
          </p>
        </div>
        <div className="mobile-only" style={{ margin: "0 13px" }}>
          <MultiStepFormSIAPE />
        </div>
        <div className="form-layout desktop-only" style={{ display: "none" }}>
          <div>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: GA,
                marginBottom: 16,
                lineHeight: 1.35,
              }}
            >
              Crédito consignado SIAPE com a VN Promotora
            </h3>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.65, fontWeight: 600, marginBottom: 14 }}>
              Preencha com atenção. Todos os campos são obrigatórios para que nossa equipe entre em contato com segurança.
            </p>
            <div
              style={{
                marginTop: 12,
                background: "#fff",
                borderRadius: 16,
                padding: 18,
                border: "1.5px solid rgba(34,197,94,.35)",
              }}
            >
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 900, color: GA, marginBottom: 8 }}>
                🔒 Seus dados estão protegidos
              </p>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.6, fontWeight: 600 }}>
                Usamos suas informações apenas para análise e contato comercial relacionado ao consignado SIAPE.
              </p>
            </div>
          </div>
          <div>
            <MultiStepFormSIAPE />
          </div>
        </div>
      </section>

      <section style={{ background: "#f0fdf4", padding: "38px 18px" }}>
        <div className="siape-blocks" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 900,
              color: G,
              marginBottom: 20,
              lineHeight: 1.25,
            }}
          >
            Vantagens do consignado SIAPE
          </h2>
          <div className="why-grid" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {VANTAGENS.map((t) => (
              <p
                key={t}
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#374151",
                  lineHeight: 1.55,
                  background: "#fff",
                  padding: "14px 16px",
                  borderRadius: 12,
                  borderLeft: `4px solid ${GA}`,
                }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section" style={{ background: "#fff", padding: "38px 18px 0" }}>
        <div className="mobile-only how-section-mobile-body">
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: G,
              marginBottom: 22,
              lineHeight: 1.3,
            }}
          >
            Como funciona
          </h2>
          {COMO_FUNCIONA.map((item, i) => (
            <div key={item.titulo} style={{ ...cardBase, marginBottom: 11 }}>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  color: GA,
                  marginBottom: 6,
                }}
              >
                {i + 1}. {item.titulo}
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#374151", lineHeight: 1.55 }}>{item.texto}</p>
            </div>
          ))}
          <div style={{ marginTop: 22 }}>
            <a href="#form-anchor" style={{ ...btnDark, marginBottom: 0 }}>
              Simular grátis agora →
            </a>
          </div>
        </div>
        <div className="how-inner desktop-only" style={{ display: "none" }}>
          <div>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 30,
                fontWeight: 900,
                color: G,
                marginBottom: 24,
                lineHeight: 1.3,
              }}
            >
              Como funciona
            </h2>
            {COMO_FUNCIONA.map((item, i) => (
              <div key={item.titulo} style={{ ...cardBase, marginBottom: 11 }}>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 15,
                    fontWeight: 900,
                    color: GA,
                    marginBottom: 6,
                  }}
                >
                  {i + 1}. {item.titulo}
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#374151", lineHeight: 1.55 }}>{item.texto}</p>
              </div>
            ))}
            <div style={{ marginTop: 26 }}>
              <a href="#form-anchor" style={{ ...btnDark, maxWidth: 360, marginBottom: 48 }}>
                Simular grátis agora →
              </a>
            </div>
          </div>
          <div className="how-img-side">
            <img src={publicPath("images/vn_promotora_vida_section_last.webp")} alt="Processo consignado SIAPE" />
          </div>
        </div>
        <div className="mobile-only how-section-img-wrap">
          <img src={publicPath("images/vn_promotora_vida_section_last.webp")} alt="" />
        </div>
      </section>

      <section style={{ background: G, padding: "38px 18px" }}>
        <div className="siape-blocks" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 900,
              color: GA,
              marginBottom: 16,
            }}
          >
            Quem pode contratar
          </h2>
          {QUEM_PODE.map((t) => (
            <p
              key={t}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.55,
                marginBottom: 10,
              }}
            >
              {t}
            </p>
          ))}
          <p
            style={{
              marginTop: 18,
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,.9)",
              lineHeight: 1.65,
            }}
          >
          </p>
        </div>
      </section>

      <section style={{ background: "#f9fafb", padding: "38px 18px" }}>
        <div className="siape-blocks" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 900,
              color: G,
              marginBottom: 20,
            }}
          >
            Modalidades disponíveis
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {MODALIDADES.map((m) => (
              <div
                key={m.titulo}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "20px 18px",
                  boxShadow: "0 2px 14px rgba(0,0,0,.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{m.emoji}</div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 17,
                    fontWeight: 900,
                    color: G,
                    marginBottom: 10,
                  }}
                >
                  {m.titulo}
                </div>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.6, fontWeight: 600 }}>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "38px 18px" }}>
        <div className="siape-blocks" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 900,
              color: G,
              marginBottom: 18,
            }}
          >
            Condições e taxas
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {CONDICOES.map((c) => (
              <div
                key={c.label}
                style={{
                  background: "#f0fdf4",
                  borderRadius: 14,
                  padding: "16px 16px",
                  border: `1px solid rgba(34,197,94,.25)`,
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 800, color: GM, marginBottom: 6 }}>{c.label}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: G }}>{c.valor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: G, padding: "38px 18px" }}>
        <div className="siape-blocks" style={{ maxWidth: 900, margin: "0 auto", padding: "0 0px" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(19px, 2.8vw, 26px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            Já tem consignado em outro banco? Você pode estar pagando caro demais.
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,.92)",
              lineHeight: 1.65,
              marginBottom: 18,
            }}
          >
            Com a Portabilidade SIAPE você transfere seu contrato para uma taxa menor e ainda pode receber um troco em dinheiro na conta. A transferência é gratuita — qualquer cobrança antecipada é proibida por lei. O banco de origem não pode criar dificuldades. É o seu direito.
          </p>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              borderRadius: 14,
              padding: 18,
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.65,
              border: "1px solid rgba(255,255,255,.2)",
            }}
          >
            Exemplo: em um contrato de R$ 15.000 com 84 parcelas a 2,05%/mês, ao fazer portabilidade para 1,65%/mês, a economia total pode superar R$ 3.300 — mais de 2 salários mínimos.
          </div>
          <div style={{ marginTop: 22 }}>
            <a href="#form-anchor" className="pulse" style={{ ...btnGreen, maxWidth: 400 }}>
              Simular grátis agora →
            </a>
          </div>
        </div>
      </section>

      <section className="why-section" style={{ background: G, padding: "32px 18px" }}>
        <div className="mobile-only">
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 20,
              fontWeight: 900,
              color: GA,
              marginBottom: 18,
              lineHeight: 1.3,
            }}
          >
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 16, marginBottom: 20, fontWeight: 600, lineHeight: 1.6 }}>
            Em poucos minutos você dá o primeiro passo para entender suas opções no consignado SIAPE:
          </p>
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 13,
                marginBottom: 13,
                background: "rgba(255,255,255,.09)",
                borderRadius: 13,
                padding: 14,
                borderLeft: `4px solid ${GA}`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: GA,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="why-inner desktop-only" style={{ display: "none" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 28,
              fontWeight: 900,
              color: GA,
              marginBottom: 10,
              lineHeight: 1.3,
            }}
          >
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 17, marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
            Em poucos minutos você dá o primeiro passo para entender suas opções no consignado SIAPE:
          </p>
          <div className="why-grid" style={{ display: "none" }}>
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  background: "rgba(255,255,255,.09)",
                  borderRadius: 13,
                  padding: 14,
                  borderLeft: `4px solid ${GA}`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: GA,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#f3f4f6", padding: "22px 18px 28px" }}>
        <p
          style={{
            maxWidth: 900,
            margin: "0 auto",
            fontSize: 13,
            lineHeight: 1.65,
            color: "#6b7280",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          As taxas, prazos e condições apresentados estão sujeitos à análise de crédito e podem variar conforme o convênio e a instituição financeira. A concessão de crédito depende de margem consignável disponível. As parcelas são descontadas diretamente em folha de pagamento. Consulte sempre as condições completas antes de contratar.
        </p>
      </section>

      <section className="brand-section" style={{ background: G, padding: "38px 18px", textAlign: "center" }}>
        <div className="mobile-only">
          <p style={{ color: "#fff", fontSize: 17, fontWeight: 700, lineHeight: 1.75, marginBottom: 22 }}>
            Atendimento focado em <strong style={{ color: GA }}>servidores públicos federais</strong>, com transparência nas taxas e suporte em todas as etapas — do primeiro contato à contratação.
          </p>
          <a href="#form-anchor" className="pulse" style={btnGreen}>
            Simular grátis agora →
          </a>
        </div>
        <div className="brand-inner desktop-only" style={{ display: "none" }}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.75 }}>
            Atendimento focado em <strong style={{ color: GA }}>servidores públicos federais</strong>, com transparência nas taxas e suporte em todas as etapas — do primeiro contato à contratação.
          </p>
          <div className="brand-cta">
            <a href="#form-anchor" className="pulse" style={btnGreen}>
              Simular grátis agora →
            </a>
          </div>
        </div>
      </section>

      <Footer tagline="Especialistas em Crédito Consignado INSS, CLT e SIAPE — VN Promotora" />
    </>
  );
}
