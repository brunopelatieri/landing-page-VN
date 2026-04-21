/**
 * VN Promotora — Landing Page Responsiva
 * Mobile: < 960px  |  Desktop: ≥ 960px
 *
 * Imagens — caminhos exatos conforme estrutura do projeto:
 *   Logo topo    → public/images/vn_promotora_vida_nova_logo._top.webp
 *   Carrossel    → public/images/carousel_01.webp … carousel_05.webp
 *   Seção edu    → public/images/vn_promotora_vida_first.webp
 *   Como funciona→ public/images/vn_promotora_vida_section_last.webp
 *   Logo rodapé  → public/images/vn_promotora_vida_nova_logo_white_footer.webp
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { publicPath } from "./utils/publicPath.js";
import { trackMetaLead } from "./utils/metaPixel.js";

/* ─── CONSTANTS ─── */
const WEBHOOK_URL =
  "https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form";

const CAROUSEL_IMAGES = [
  publicPath("images/carousel_01.webp"),
  publicPath("images/carousel_02.webp"),
  publicPath("images/carousel_03.webp"),
  publicPath("images/carousel_04.webp"),
];

const BENEFITS = [
  "INSS aposentado",
  "Pensionista",
  "Temporário",
  "Aposentado por Invalidez (Espécie 32)",
  "Aposentado por Invalidez (Menos de 55 anos)",
  "LOAS/BPC (beneficiário ou representante)",
  "Auxílio Doença / Benefício Temporário",
  "Bolsa Família",
  "Crédito pessoal",
  "Não tenho Benefício",
];
const AGES = [
  "Até 60 anos",
  "De 61 a 65 anos",
  "De 66 a 70 anos",
  "De 71 a 76 anos",
  "77 anos ou mais",
];
const LOAN_HISTORY = [
  "Há menos de 5 meses",
  "Entre 6 e 11 meses",
  "Há mais de 1 ano (Já paguei mais de 12 parcelas)",
];
const SITUATIONS = [
  "Tenho margem livre e quero contratar agora",
  "Tenho empréstimos antigos (mais de 1 ano) e quero renovar",
  "Usei minha margem toda esse ano, mas quero novas oportunidades",
  "Preciso de um cartão de crédito consignado",
  "Estou sem margem, mas preciso de dinheiro",
];

const G  = "#0a4d2c";
const GA = "#22c55e";
const GM = "#1a7a45";

/* ─── UTILS ─── */
function maskPhone(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (v.length > 6)  return v.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, "($1) $2-$3");
  if (v.length > 2)  return v.replace(/^(\d{2})(\d+)/, "($1) $2");
  return v;
}

function maskCPF(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9) return v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  if (v.length > 6) return v.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  if (v.length > 3) return v.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
  return v;
}

function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}

/* ─── CAROUSEL ─── */
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
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "contain", objectPosition: "bottom center",
            opacity: i === slide ? 1 : 0,
            transition: "opacity 0.85s ease",
            zIndex: i === slide ? 1 : 0,
          }}
        />
      ))}
      {/* Dots */}
      <div style={{
        position: "absolute", bottom: 12, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10,
      }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Ir para slide ${i + 1}`}
            style={{
              width: 9, height: 9, borderRadius: "50%", border: "none",
              cursor: "pointer", padding: 0,
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

/* ─── MULTI-STEP FORM ─── */
function MultiStepForm() {
  const navigate = useNavigate();
  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState({ nome: "", email: "", celular: "", cpf: "" });
  const [sel, setSel]             = useState({ beneficio: "", idade: "", historico: "", situacao: "" });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);

  const setF = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };
  const setS = (k, v) => { setSel((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validateStep1 = () => {
    const e = {};
    if (!form.nome.trim() || form.nome.trim().split(" ").length < 2) e.nome = "Digite seu nome completo";
    if (!form.email.includes("@") || !form.email.includes(".")) e.email = "E-mail inválido";
    if (form.celular.replace(/\D/g, "").length < 10) e.celular = "Celular inválido";
    if (!validateCPF(form.cpf)) e.cpf = "CPF inválido";
    return e;
  };

  const goNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
    setTimeout(() =>
      document.getElementById("form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const submit = async () => {
    const e = {};
    if (!sel.beneficio) e.beneficio = "Selecione uma opção";
    if (!sel.idade)     e.idade     = "Selecione sua faixa etária";
    if (!sel.historico) e.historico = "Selecione uma opção";
    if (!sel.situacao)  e.situacao  = "Selecione sua situação atual";
    if (Object.keys(e).length) { setErrors(e); return; }

    const qualifiedBenefits = new Set([
      "INSS aposentado",
      "Pensionista",
      "Aposentado por Invalidez (Espécie 32)",
      "Aposentado por Invalidez (Menos de 55 anos)",
    ]);
    const qualifiedAges = new Set([
      "Até 60 anos",
      "De 61 a 65 anos",
      "De 66 a 70 anos",
      "De 71 a 76 anos",
    ]);
    const qualifiedLoanHistory = new Set([
      "Entre 6 e 11 meses",
      "Há mais de 1 ano (Já paguei mais de 12 parcelas)",
    ]);
    const qualifiedSituations = new Set([
      "Tenho margem livre e quero contratar agora",
      "Tenho empréstimos antigos (mais de 1 ano) e quero renovar",
      "Preciso de um cartão de crédito consignado",
    ]);

    const isQualified =
      qualifiedBenefits.has(sel.beneficio) &&
      qualifiedAges.has(sel.idade) &&
      qualifiedLoanHistory.has(sel.historico) &&
      qualifiedSituations.has(sel.situacao);

    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "formINSS", ...form, ...sel }),
        mode: "no-cors",
      });
      await trackMetaLead({
        nome: form.nome,
        email: form.email,
        celular: form.celular,
        cpf: form.cpf,
        formName: "formINSS",
        qualified: isQualified,
      });
    } catch (_) {}
    setLoading(false);
    navigate(isQualified ? "/obrigado-q" : "/obrigado");
  };

  const inputSt = (hasErr) => ({
    width: "100%", padding: 15,
    border: `2.5px solid ${hasErr ? "#dc2626" : "#d1d5db"}`,
    borderRadius: 13, fontSize: 17,
    fontFamily: "'Nunito', sans-serif",
    outline: "none", color: "#111",
    WebkitAppearance: "none", transition: "border .18s",
  });

  /* Radio group */
  const RadioGroup = ({ label, optKey, options }) => (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, color: G, marginBottom: 11, lineHeight: 1.4 }}>
        {label} *
      </p>
      {options.map((opt) => {
        const active = sel[optKey] === opt;
        return (
          <button
            key={opt} type="button"
            onClick={() => setS(optKey, opt)}
            style={{
              display: "flex", alignItems: "center", gap: 13,
              width: "100%", padding: "15px 13px",
              border: `2.5px solid ${active ? GA : "#d1d5db"}`,
              borderRadius: 13,
              background: active ? "rgba(34,197,94,.09)" : "#fff",
              textAlign: "left", cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              fontSize: 16, fontWeight: active ? 800 : 600,
              color: active ? G : "#374151",
              marginBottom: 9,
              boxShadow: active ? "0 2px 14px rgba(34,197,94,.22)" : "none",
              WebkitAppearance: "none", lineHeight: 1.4, transition: "all .18s",
            }}
          >
            <span style={{ fontSize: 21, color: active ? GA : "#d1d5db", flexShrink: 0, lineHeight: 1 }}>
              {active ? "●" : "○"}
            </span>
            <span>{opt}</span>
          </button>
        );
      })}
      {errors[optKey] && (
        <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4, fontWeight: 700 }}>⚠ {errors[optKey]}</p>
      )}
    </div>
  );

  /* Progress step */
  const ProgStep = ({ n }) => {
    const isActive = step === n;
    const isDone   = step > n;
    return (
      <div
        onClick={() => isDone && setStep(n)}
        style={{
          flex: 1, padding: "13px 8px", textAlign: "center",
          borderBottom: `3px solid ${isDone ? GM : isActive ? GA : "transparent"}`,
          background: isActive ? "#fff" : "#f9fafb",
          cursor: isDone ? "pointer" : "default", transition: "all .25s",
        }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: isDone ? GM : isActive ? GA : "#e5e7eb",
          color: isDone || isActive ? "#fff" : "#9ca3af",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13,
          margin: "0 auto 5px",
        }}>
          {isDone ? "✓" : n}
        </div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: .5,
          color: isDone ? GM : isActive ? G : "#9ca3af",
        }}>
          {n === 1 ? "CADASTRO" : "BENEFÍCIO"}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,.32)" }}>
      {/* Progress bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        <ProgStep n={1} />
        <ProgStep n={2} />
      </div>

      {/* Form body */}
      <div style={{ padding: "22px 18px 28px" }}>
        <input type="hidden" name="formName" defaultValue="formINSS" />
        {step === 1 ? (
          <div>
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>Nome Completo *</label>
              <input style={inputSt(!!errors.nome)} type="text" placeholder="Seu Nome Completo"
                value={form.nome} onChange={(e) => setF("nome", e.target.value)} />
              {errors.nome && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.nome}</p>}
            </div>
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>E-mail *</label>
              <input style={inputSt(!!errors.email)} type="email" placeholder="Seu Melhor E-mail"
                value={form.email} onChange={(e) => setF("email", e.target.value)} />
              {errors.email && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.email}</p>}
            </div>
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>Celular / WhatsApp *</label>
              <input
                style={inputSt(!!errors.celular)}
                type="tel" placeholder="(00) 00000-0000" inputMode="numeric"
                value={form.celular} onChange={(e) => setF("celular", maskPhone(e.target.value))}
              />
              {errors.celular && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.celular}</p>}
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>CPF *</label>
              <input
                style={inputSt(!!errors.cpf)}
                type="text" placeholder="000.000.000-00" inputMode="numeric" autoComplete="off"
                value={form.cpf} onChange={(e) => setF("cpf", maskCPF(e.target.value))}
              />
              {errors.cpf && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.cpf}</p>}
            </div>
            <button onClick={goNext} style={{
              width: "100%", padding: 17, background: GA, color: "#fff", border: "none",
              borderRadius: 50, fontFamily: "'Montserrat', sans-serif", fontSize: 16,
              fontWeight: 900, cursor: "pointer", textTransform: "uppercase", letterSpacing: .5,
            }}>Próximo →</button>
          </div>

        ) : (
          <div>
            <RadioGroup label="Qual benefício você possui?"             optKey="beneficio" options={BENEFITS} />
            <RadioGroup label="Qual sua idade hoje?"                     optKey="idade"     options={AGES} />
            <RadioGroup label="Quando foi a última vez que você contratou ou renovou um empréstimo consignado?" optKey="historico" options={LOAN_HISTORY} />
            <RadioGroup label="Qual a sua situação hoje?"                optKey="situacao"  options={SITUATIONS} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              <button onClick={submit} disabled={loading} style={{
                width: "100%", padding: 17, background: GA, color: "#fff", border: "none",
                borderRadius: 50, fontFamily: "'Montserrat', sans-serif", fontSize: 16,
                fontWeight: 900, cursor: loading ? "not-allowed" : "pointer",
                textTransform: "uppercase", letterSpacing: .5, opacity: loading ? .6 : 1,
              }}>
                {loading ? "Enviando…" : "Concluir"}
              </button>
              <button onClick={() => setStep(1)} style={{
                width: "100%", background: "#6b7280", color: "#fff", border: "none", borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 900,
                cursor: "pointer", padding: 17,
              }}>← Voltar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function VNPromotora() {

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { font-family: 'Nunito', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; }
    button { font-family: inherit; }
    img    { max-width: 100%; display: block; }

    .mobile-only  { display: block; }
    .desktop-only { display: none;  }

    /* HERO — mobile: carrossel no rodapé da section */
    @media (max-width: 959px) {
      .hero-section {
        display: flex;
        flex-direction: column;
      }
      .hero-section > .hero-grid {
        flex: 1 1 auto;
      }
    }

    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0   rgba(34,197,94,.45); }
      50%      { box-shadow: 0 0 0 14px rgba(34,197,94,0);  }
    }
    .pulse { animation: pulse 2s infinite; }

    /* HOW — imagem no rodapé, sem margem/padding no bloco da foto; exibição inteira (sem crop) */
    .how-section-img-wrap {
      margin: 0;
      padding: 0;
      line-height: 0;
    }
    .how-section-img-wrap img {
      width: 100%;
      height: auto;
      max-height: none;
      display: block;
      object-fit: contain;
      object-position: bottom center;
    }
    @media (max-width: 959px) {
      .how-section {
        display: flex;
        flex-direction: column;
        padding: 38px 18px 0 !important;
      }
      .how-section-mobile-body {
        padding-bottom: 26px;
      }
      .how-section-img-wrap {
        width: calc(100% + 36px);
        max-width: none;
        margin-left: -18px;
        margin-right: -18px;
        align-self: center;
      }
    }

    /* ══════════════════════════════════════
       DESKTOP  ≥ 960 px
    ══════════════════════════════════════ */
    @media (min-width: 960px) {
      .mobile-only  { display: none  !important; }
      .desktop-only { display: block !important; }

      /* NAV */
      nav { padding: 10px 0 !important; }
      .nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 60px; justify-content: flex-start !important; }

      /* HERO */
      .hero-grid { display: grid !important; grid-template-columns: 1fr 1fr; min-height: 560px; }
      .hero-left { min-height: 560px !important; padding: 64px 60px 60px 64px !important; justify-content: center; }
      .hero-left h1 { font-size: 42px !important; }
      .hero-left p  { font-size: 17px !important; }
      .hero-right-col {
        display: flex !important;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 560px;
      }

      /* ALERT */
      .alert-desktop { max-width: 1100px; margin: 0 auto; padding: 44px 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; }

      /* WHY */
      .why-section { padding: 64px 0 !important; }
      .why-inner   { max-width: 1100px; margin: 0 auto; padding: 0 0px; }
      .why-inner.desktop-only   { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
      .why-grid    { display: grid !important; grid-template-columns: 1fr 1fr; gap: 14px; }

      /* FORM */
      .form-section-outer { padding-bottom: 64px !important; }
      .form-title-wrap    { max-width: 1100px; margin: 0 auto; padding: 44px 60px 28px; text-align: left !important; }
      .form-layout        { max-width: 1100px; margin: 0 auto; padding: 0 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 44px; align-items: start; }

      /* EDU */
      .edu-section  { padding: 84px 0 !important; }
      .edu-inner    { max-width: 1100px; margin: 0 auto; padding: 0 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
      .edu-img-side { min-height: 440px; border-radius: 22px; overflow: hidden; }
      .edu-img-side img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }

      /* HOW */
      .how-section  { padding: 84px 0 0 !important; }
      .how-inner    { max-width: 1100px; margin: 0 auto; padding: 0 60px 0;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
      .how-img-side {
        position: relative;
        top: auto;
        align-self: end;
        margin: 0;
        padding: 0;
        overflow: visible;
        border-radius: 0;
        line-height: 0;
      }
      .how-img-side img {
        width: 100%;
        height: auto;
        max-height: none;
        display: block;
        object-fit: contain;
        object-position: bottom center;
      }

      /* BRAND */
      .brand-section { padding: 72px 60px !important; }
      .brand-inner   { max-width: 1100px; margin: 0 auto;
        display: grid !important; grid-template-columns: 1fr auto; gap: 40px;
        align-items: center; text-align: left !important; }
      .brand-cta { min-width: 300px; }

      /* FOOTER */
      .footer-outer { padding: 52px 60px 32px !important; }
      .footer-inner { max-width: 1100px; margin: 0 auto; }
      .footer-grid  { display: grid !important; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 36px; }
    }
  `;

  const btnGreen = {
    display: "block", width: "100%", padding: 17,
    background: GA, color: "#fff", border: "none", borderRadius: 50,
    fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 900,
    textAlign: "center", textDecoration: "none", cursor: "pointer",
    textTransform: "uppercase", letterSpacing: .5,
  };
  const btnDark = { ...btnGreen, background: G };

  const WHY_ITEMS = [
    { icon: "📊", text: "Se você tem margem consignável disponível" },
    { icon: "💰", text: "Qual valor você pode solicitar" },
    { icon: "🗺️", text: "Como funciona o processo passo a passo" },
    { icon: "📱", text: "Como nosso atendimento vai te orientar no WhatsApp" },
  ];

  const EDU_ITEMS = [
    { title: "Por que este crédito pode ser ideal para você?",    text: "Se você ainda não conhece bem o crédito consignado ou nunca contratou antes, esse é o momento de entender como ele pode ajudar a organizar suas finanças com juros menores que outros empréstimos pessoais." },
    { title: "Crédito Consignado INSS – simples e acessível",     text: "É um tipo de empréstimo em que as parcelas são descontadas direto do benefício do INSS. Sem preocupação com datas de pagamento — é automático e seguro." },
    { title: "Segurança e experiência de verdade",                 text: "A VN Promotora atua há mais de 20 anos no mercado de crédito consignado para beneficiários do INSS, com foco em transparência, segurança e atendimento humanizado." },
  ];

  const HOW_ITEMS = [
    "Você preenche o formulário com seus dados",
    "Um atendimento automatizado no WhatsApp te orienta na próxima etapa",
    "Verificamos sua margem consignável disponível no INSS",
    "Se estiver elegível, te ajudamos a simular e preparar sua contratação",
    "Você recebe orientações claras e sem complicação até a liberação do crédito",
  ];

  return (
    <>
      <style>{css}</style>

      <Header />

      {/* ════════ HERO ════════ */}
      <section className="hero-section" style={{ background: G, overflow: "hidden" }}>
        <div className="why-inner hero-grid" style={{ position: "relative" }}>

          {/* Left: headline + CTA */}
          <div
            className="hero-left"
            style={{
              background: "linear-gradient(135deg, rgba(10,77,44,.96) 0%, rgba(10,77,44,.72) 100%)",
              display: "flex", flexDirection: "column", justifyContent: "flex-start",
              padding: "32px 22px 28px", position: "relative", zIndex: 2,
            }}
          >
            <h1 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(23px, 3.5vw, 42px)",
              fontWeight: 900, color: "#fff", lineHeight: 1.2,
              marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,.4)",
            }}>
              Crédito Consignado INSS<br />
              <span style={{ color: GA }}>Fácil e Seguro.</span>
            </h1>
            <p style={{
              fontSize: "clamp(14px, 1.4vw, 17px)",
              color: "rgba(255,255,255,.92)", lineHeight: 1.65,
              marginBottom: 26, fontWeight: 600,
            }}>
              Descubra como contratar empréstimo consignado pelo INSS mesmo sem experiência.<br />
              Menos burocracia + acompanhamento no WhatsApp.
            </p>
            <a href="#form-anchor" className="pulse" style={{
              ...btnGreen, width: "auto", alignSelf: "flex-start", padding: "15px 32px",
            }}>
              Quero Meu Crédito Agora
            </a>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              {["✅ +20 Anos", "🔒 100% Seguro", "📱 Via WhatsApp"].map((b) => (
                <span key={b} style={{
                  background: "rgba(34,197,94,.18)", color: GA,
                  fontSize: 12, fontWeight: 800, padding: "5px 14px",
                  borderRadius: 50, fontFamily: "'Montserrat', sans-serif",
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right: carousel — desktop only */}
          <div className="hero-right-col" style={{ display: "none", width: "100%", minHeight: 560 }}>
            <Carousel height={560} />
          </div>
        </div>

        {/* Carousel below headline — mobile only */}
        <div className="mobile-only" style={{ position: "relative", width: "100%", height: 270 }}>
          <Carousel height={270} />
        </div>
      </section>

      {/* ════════ ALERT ════════ */}
      <section style={{ background: "#dc2626" }}>
        {/* Mobile */}
        <div className="mobile-only" style={{ padding: "26px 18px" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
            ⚠️ AVISO IMPORTANTE
          </div>
          {[
            <span key="1">Benefícios <strong>LOAS (BPC) NÃO permitem empréstimo consignado</strong>. Qualquer oferta nesse sentido é irregular.</span>,
            <span key="2">O Governo Federal exige que a solicitação seja realizada <strong>exclusivamente pelo próprio beneficiário</strong>.</span>,
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 11, lineHeight: 1.55 }}>
              <span style={{ flexShrink: 0 }}>🔴</span><span>{text}</span>
            </div>
          ))}
          <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 12, padding: 14, marginTop: 14, fontSize: 14, color: "#fff", fontWeight: 700, lineHeight: 1.6 }}>
            ❌ Se você recebe <strong>LOAS/BPC</strong>, por favor, <strong>não preencha o formulário abaixo</strong>. Nossa equipe está à disposição para orientar sobre procedimentos corretos.
          </div>
        </div>

        {/* Desktop */}
        <div className="alert-desktop desktop-only" style={{ display: "none" }}>
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
              ⚠️ AVISO IMPORTANTE
            </div>
            {[
              <span key="1">Benefícios <strong>LOAS (BPC) NÃO permitem empréstimo consignado</strong>. Qualquer oferta nesse sentido é irregular.</span>,
              <span key="2">O Governo Federal exige que a solicitação seja realizada <strong>exclusivamente pelo próprio beneficiário</strong>.</span>,
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.55 }}>
                <span style={{ flexShrink: 0 }}>🔴</span><span>{text}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 14, padding: 18, fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1.6, marginBottom: 14 }}>
              ❌ Se você recebe <strong>LOAS/BPC</strong>, por favor, <strong>não preencha o formulário</strong>. Nossa equipe não pode atender esse tipo de benefício.
            </div>
            <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 14, padding: 16, fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1.6 }}>
              ✅ Formulário exclusivo para beneficiários <strong>INSS</strong>: aposentados, pensionistas e beneficiários por invalidez.
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHY FORM ════════ */}
      <section className="why-section" style={{ background: G, padding: "32px 18px" }}>
        {/* Mobile */}
        <div className="mobile-only">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900, color: GA, marginBottom: 18, lineHeight: 1.3 }}>
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 14, marginBottom: 20, fontWeight: 600, lineHeight: 1.6 }}>
            Não importa se você ainda nunca pegou crédito consignado — este formulário é o primeiro passo para saber:
          </p>
          {WHY_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 13, background: "rgba(255,255,255,.09)", borderRadius: 13, padding: 13, borderLeft: `4px solid ${GA}` }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{item.icon}</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="why-inner desktop-only" style={{ display: "none" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 900, color: GA, marginBottom: 10, lineHeight: 1.3 }}>
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 16, marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
            Não importa se você ainda nunca pegou crédito consignado — este formulário é o primeiro passo para saber:
          </p>
          <div className="why-grid" style={{ display: "none" }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,.09)", borderRadius: 13, padding: 14, borderLeft: `4px solid ${GA}` }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FORM ════════ */}
      <section className="form-section-outer" style={{ background: G, paddingBottom: 34 }} id="form-anchor">
        {/* Title */}
        <div className="form-title-wrap" style={{ padding: "22px 60px 18px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(19px, 2.5vw, 28px)", fontWeight: 900, color: "#fff" }}>
            Preencha o formulário abaixo
          </h2>
          <p className="desktop-only" style={{ color: "rgba(255,255,255,.78)", fontSize: 16, marginTop: 8, fontWeight: 600, display: "none" }}>
            Leva menos de 2 minutos. Nossa equipe entra em contato pelo WhatsApp.
          </p>
        </div>

        {/* Mobile: full-width form */}
        <div className="mobile-only" style={{ margin: "0 13px" }}>
          <MultiStepForm />
        </div>

        {/* Desktop: two-column */}
        <div className="form-layout desktop-only" style={{ display: "none" }}>
          {/* Left info */}
          <div>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900, color: GA, marginBottom: 20, lineHeight: 1.35 }}>
              Por que nossos clientes confiam na VN Promotora?
            </h3>
            {HOW_ITEMS.map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, padding: 15, background: "rgba(255,255,255,.08)", borderRadius: 14, borderLeft: `4px solid ${GA}` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.9)", lineHeight: 1.55, fontWeight: 600, paddingTop: 6 }}>{text}</p>
              </div>
            ))}
            <div style={{ marginTop: 24, background: "rgba(34,197,94,.12)", borderRadius: 16, padding: 20, border: "1.5px solid rgba(34,197,94,.3)" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 900, color: GA, marginBottom: 8 }}>🏆 +20 ANOS DE EXPERIÊNCIA</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.85)", lineHeight: 1.6, fontWeight: 600 }}>Transparência, segurança e atendimento humanizado para aposentados e pensionistas do INSS.</p>
            </div>
          </div>
          {/* Right: form */}
          <div><MultiStepForm /></div>
        </div>
      </section>

      {/* ════════ EDUCATIONAL ════════ */}
      <section className="edu-section" style={{ padding: "38px 18px", background: "#fff" }}>
        {/* Mobile */}
        <div className="mobile-only">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: G, marginBottom: 24, lineHeight: 1.3 }}>
            O que você precisa saber
          </h2>
          <img
            src={publicPath("images/vn_promotora_vida_first.webp")}
            alt="Atendimento VN Promotora"
            style={{ width: "100%", borderRadius: 18, objectFit: "contain", maxHeight: 230, marginBottom: 26 }}
          />
          {EDU_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 26 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: G, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontSize: 21, fontWeight: 900, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, color: G, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65 }}>{item.text}</p>
              </div>
            </div>
          ))}
          <a href="#form-anchor" style={btnDark}>💳 FAÇA SEU CRÉDITO AGORA</a>
        </div>

        {/* Desktop */}
        <div className="edu-inner desktop-only" style={{ display: "none" }}>
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 30, fontWeight: 900, color: G, marginBottom: 28, lineHeight: 1.3 }}>
              O que você precisa saber
            </h2>
            {EDU_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: G, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, color: G, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</div>
                  <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              </div>
            ))}
            <a href="#form-anchor" style={{ ...btnDark, maxWidth: 360 }}>💳 FAÇA SEU CRÉDITO AGORA</a>
          </div>
          {/* Image */}
          <div className="edu-img-side">
            <img
              src={publicPath("images/vn_promotora_vida_first.webp")}
              alt="Atendimento VN Promotora"
            />
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="how-section" style={{ background: "#f0fdf4" }}>
        {/* Mobile */}
        <div className="mobile-only how-section-mobile-body">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: G, marginBottom: 24, lineHeight: 1.3 }}>
            Como funciona o processo (passo a passo)
          </h2>
          {HOW_ITEMS.map((text, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 15, padding: "17px 15px", marginBottom: 11, display: "flex", alignItems: "flex-start", gap: 15, boxShadow: "0 2px 12px rgba(0,0,0,.07)", borderLeft: `5px solid ${GA}` }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 27, fontWeight: 900, color: GA, lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", lineHeight: 1.55, paddingTop: 4 }}>{text}</p>
            </div>
          ))}
          <div style={{ marginTop: 26 }}>
            <a href="#form-anchor" style={btnDark}>🔒 GARANTIR MINHA PRÉ-DIGITAÇÃO</a>
          </div>
        </div>
        <div className="mobile-only how-section-img-wrap">
          <img
            src={publicPath("images/vn_promotora_vida_section_last.webp")}
            alt="Como funciona a VN Promotora"
          />
        </div>

        {/* Desktop */}
        <div className="how-inner desktop-only" style={{ display: "none" }}>
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 30, fontWeight: 900, color: G, marginBottom: 12, lineHeight: 1.3 }}>
              Como funciona o processo
            </h2>
            <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
              Simples, guiado e sem complicação — do formulário até o crédito na sua conta.
            </p>
            {HOW_ITEMS.map((text, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 15, padding: "18px", marginBottom: 11, display: "flex", alignItems: "flex-start", gap: 15, boxShadow: "0 2px 12px rgba(0,0,0,.07)", borderLeft: `5px solid ${GA}` }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 30, fontWeight: 900, color: GA, lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#374151", lineHeight: 1.55, paddingTop: 4 }}>{text}</p>
              </div>
            ))}
            <div style={{ marginTop: 28, marginBottom: 28 }}>
              <a href="#form-anchor" style={{ ...btnDark, maxWidth: 360 }}>🔒 GARANTIR MINHA PRÉ-DIGITAÇÃO</a>
            </div>
          </div>
          {/* Sticky image */}
          <div className="how-img-side">
            <img
              src={publicPath("images/vn_promotora_vida_section_last.webp")}
              alt="Como funciona a VN Promotora"
            />
          </div>
        </div>
      </section>

      {/* ════════ BRAND REINFORCEMENT ════════ */}
      <section className="brand-section" style={{ background: G, padding: "38px 18px", textAlign: "center" }}>
        {/* Mobile */}
        <div className="mobile-only">
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 18px" }}>🏆</div>
          <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, lineHeight: 1.75, marginBottom: 26 }}>
            A VN Promotora atua há mais de <strong style={{ color: GA }}>20 anos</strong> oferecendo crédito consignado para aposentados e pensionistas do INSS, sempre com <strong style={{ color: GA }}>transparência</strong>, <strong style={{ color: GA }}>segurança</strong> e <strong style={{ color: GA }}>atendimento humanizado</strong>.
          </p>
          <a href="#form-anchor" className="pulse" style={btnGreen}>📋 QUERO MEU CRÉDITO AGORA</a>
        </div>
        {/* Desktop */}
        <div className="brand-inner desktop-only" style={{ display: "none" }}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.75 }}>
            A VN Promotora atua há mais de <strong style={{ color: GA }}>20 anos</strong> oferecendo crédito consignado para aposentados e pensionistas do INSS, sempre com <strong style={{ color: GA }}>transparência</strong>, <strong style={{ color: GA }}>segurança</strong> e <strong style={{ color: GA }}>atendimento humanizado</strong>.
          </p>
          <div className="brand-cta">
            <a href="#form-anchor" className="pulse" style={btnGreen}>📋 QUERO MEU CRÉDITO AGORA</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


