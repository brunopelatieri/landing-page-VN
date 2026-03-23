/**
 * VN Promotora — Página Crédito Consignado CLT
 * Rota: /credito-consignado-clt
 * Mobile: < 960px  |  Desktop: ≥ 960px
 *
 * Imagens — caminhos exatos:
 *   Carrossel    → public/images/clt/vnpromotora_especializada-credito-1.webp … -7.webp
 *   Seção edu    → public/images/clt/vnpromotora_especializada-credito-8.webp
 *   Como funciona→ public/images/clt/vnpromotora_especializada-credito-9.webp
 *   Logo topo    → public/images/vn_promotora_vida_nova_logo._top.webp
 *   Logo rodapé  → public/images/vn_promotora_vida_nova_logo_white_footer.webp
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { publicPath } from "./utils/publicPath.js";

/* ─── CONSTANTS ─── */
const WEBHOOK_URL =
  "https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form";

const CAROUSEL_IMAGES = [
  publicPath("images/clt/vnpromotora_especializada-credito-1.webp"),
  publicPath("images/clt/vnpromotora_especializada-credito-5.webp"),
  publicPath("images/clt/vnpromotora_especializada-credito-6.webp"),
  publicPath("images/clt/vnpromotora_especializada-credito-7.webp"),
];

const SITUACOES = [
  "Funcionário registrado com carteira assinada a 3 meses",
  "Funcionário registrado com carteira assinada a 6 meses",
  "Funcionário registrado com carteira assinada a 1 ano",
  "Funcionário registrado com carteira assinada a mais de 2 anos",
  "Sou funcionário PJ e quero pegar crédito",
  "Estou no seguro desemprego e quero pegar crédito",
  "Não trabalho e quero analisar linhas de crédito para mim",
];

const HISTORICO = [
  "Não, nunca",
  "Há menos de 5 meses.",
  "Entre 6 e 11 meses.",
  "Há mais de 1 ano (Já paguei mais de 12 parcelas).",
];

const SITUACAO_HOJE = [
  "Estou precisando de dinheiro e quero contratar o crédito CLT",
  "Quero analisar as taxas de juros e parcelas do crédito CLT",
  "Quero ver se consigo pegar o crédito",
  "Estou precisando de dinheiro urgente",
];

const FAQ_ITEMS = [
  {
    q: "Preciso ter o nome limpo para conseguir o empréstimo?",
    a: "Para o consignado CLT, a análise é feita com base no seu vínculo empregatício e margem consignável. Em muitos casos, restrições no CPF não impedem a contratação. Fale com nossa equipe para verificar sua situação.",
  },
  {
    q: "O que acontece se eu for demitido ou pedir demissão?",
    a: "Em caso de demissão, as parcelas restantes podem ser abatidas das verbas rescisórias. Cada caso tem suas particularidades — nossa equipe orienta você sobre as melhores opções.",
  },
  {
    q: "Minha empresa fica sabendo do motivo do empréstimo?",
    a: "Não. Sua empresa recebe apenas a instrução de desconto em folha, sem qualquer informação sobre a finalidade do crédito.",
  },
  {
    q: "Por que os juros são menores que os do banco ou cartão?",
    a: "O desconto direto em folha reduz drasticamente o risco de inadimplência, o que permite taxas muito mais baixas que crédito pessoal, cartão ou cheque especial.",
  },
  {
    q: "Posso antecipar as parcelas para pagar menos juros?",
    a: "Sim! A antecipação de parcelas é possível e pode reduzir o custo total do empréstimo. Nossa equipe orienta todo o processo pelo WhatsApp.",
  },
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
    const t = setInterval(
      () => setSlide((s) => (s + 1) % CAROUSEL_IMAGES.length),
      4500
    );
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
      <div style={{
        position: "absolute", bottom: 12, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10,
      }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
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

/* ─── FAQ ITEM ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "#fff", borderRadius: 15, marginBottom: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,.07)",
        border: open ? `2px solid ${GA}` : "2px solid transparent",
        overflow: "hidden", transition: "border .2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "17px 16px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", fontFamily: "'Nunito', sans-serif",
          fontSize: 15, fontWeight: 800, color: G, lineHeight: 1.45,
        }}
      >
        <span style={{ flex: 1 }}>{q}</span>
        <span style={{
          fontSize: 22, color: GA, flexShrink: 0, lineHeight: 1,
          transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .2s",
          fontWeight: 900,
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4b5563", lineHeight: 1.7, fontWeight: 600 }}>
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── MULTI-STEP FORM CLT ─── */
function MultiStepFormCLT() {
  const navigate = useNavigate();
  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState({ nome: "", email: "", celular: "", cpf: "" });
  const [sel, setSel]             = useState({ situacao: "", historico: "", situacaoHoje: "" });
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
      document.getElementById("form-anchor-clt")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const submit = async () => {
    const e = {};
    if (!sel.situacao)    e.situacao    = "Selecione uma opção";
    if (!sel.historico)   e.historico   = "Selecione uma opção";
    if (!sel.situacaoHoje) e.situacaoHoje = "Selecione sua situação atual";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "formCLT",
          ...form,
          tipo_pagina: "credito-consignado-clt",
          situacao_clt: sel.situacao,
          historico_consignado_clt: sel.historico,
          situacao_hoje: sel.situacaoHoje,
        }),
        mode: "no-cors",
      });
    } catch (_) {}
    setLoading(false);
    navigate("/obrigado-clt");
  };

  const inputSt = (hasErr) => ({
    width: "100%", padding: 15,
    border: `2.5px solid ${hasErr ? "#dc2626" : "#d1d5db"}`,
    borderRadius: 13, fontSize: 17,
    fontFamily: "'Nunito', sans-serif",
    outline: "none", color: "#111",
    WebkitAppearance: "none", transition: "border .18s",
  });

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
          {n === 1 ? "CADASTRO" : "PERFIL CLT"}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,.32)" }}>
      {/* Progress */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        <ProgStep n={1} />
        <ProgStep n={2} />
      </div>

      {/* Body */}
      <div style={{ padding: "22px 18px 28px" }}>
        <input type="hidden" name="formName" defaultValue="formCLT" />
        {step === 1 ? (
          <div>
            {/* Nome */}
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>Nome Completo *</label>
              <input style={inputSt(!!errors.nome)} type="text" placeholder="Seu Nome Completo"
                value={form.nome} onChange={(e) => setF("nome", e.target.value)} />
              {errors.nome && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.nome}</p>}
            </div>
            {/* E-mail */}
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>E-mail *</label>
              <input style={inputSt(!!errors.email)} type="email" placeholder="Seu Melhor E-mail"
                value={form.email} onChange={(e) => setF("email", e.target.value)} />
              {errors.email && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.email}</p>}
            </div>
            {/* Celular */}
            <div style={{ marginBottom: 19 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>Celular / WhatsApp *</label>
              <input
                style={inputSt(!!errors.celular)}
                type="tel" placeholder="(00) 00000-0000" inputMode="numeric"
                value={form.celular} onChange={(e) => setF("celular", maskPhone(e.target.value))}
              />
              {errors.celular && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 5, fontWeight: 700 }}>⚠ {errors.celular}</p>}
            </div>
            {/* CPF */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 15, fontWeight: 800, color: G, marginBottom: 7 }}>CPF *</label>
              <input
                style={inputSt(!!errors.cpf)}
                type="tel" placeholder="000.000.000-00" inputMode="numeric"
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
            <RadioGroup label="Descreva sua situação atual:" optKey="situacao"    options={SITUACOES} />
            <RadioGroup label="Você já pegou consignado CLT antes?" optKey="historico"  options={HISTORICO} />
            <RadioGroup label="Qual a sua situação hoje?"           optKey="situacaoHoje" options={SITUACAO_HOJE} />
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
export default function VNPromotoraCLT() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { font-family: 'Nunito', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; }
    button { font-family: inherit; }
    img    { max-width: 100%; display: block; }

    .mobile-only  { display: block; }
    .desktop-only { display: none;  }

    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0    rgba(34,197,94,.45); }
      50%      { box-shadow: 0 0 0 14px rgba(34,197,94,0);  }
    }
    .pulse { animation: pulse 2s infinite; }

    /* HOW (CLT) — imagem crédito-9 no rodapé; margem/padding inferiores 0 */
    .how-section-img-wrap {
      margin: 0;
      margin-bottom: 0;
      padding: 0;
      padding-bottom: 0;
      line-height: 0;
    }
    .how-section-img-wrap img {
      width: 100%;
      height: auto;
      max-height: none;
      display: block;
      object-fit: contain;
      object-position: bottom center;
      margin: 0;
      margin-bottom: 0;
      padding: 0;
      padding-bottom: 0;
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
        padding: 0 15px 0;
        padding-bottom: 0;
        align-self: center;
      }
    }

    /* ══════════════════════════════════
       DESKTOP ≥ 960px
    ══════════════════════════════════ */
    @media (min-width: 960px) {
      .mobile-only  { display: none  !important; }
      .desktop-only { display: block !important; }

      nav { padding: 10px 0 !important; }
      .nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 60px; justify-content: flex-start !important; }

      .hero-grid { display: grid !important; grid-template-columns: 1fr 1fr; min-height: 560px; }
      .hero-left { min-height: 560px !important; padding: 64px 60px 60px 64px !important; justify-content: center; }
      .hero-left h1 { font-size: 40px !important; }
      .hero-left p  { font-size: 17px !important; }
      .hero-right-col { display: flex !important; min-height: 560px; }

      .alert-desktop { max-width: 1100px; margin: 0 auto; padding: 44px 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; }

      .why-section { padding: 64px 0 !important; }
      .why-inner   { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
      .why-grid    { display: grid !important; grid-template-columns: 1fr 1fr; gap: 14px; }

      .form-section-outer { padding-bottom: 64px !important; }
      .form-title-wrap    { max-width: 1100px; margin: 0 auto; padding: 44px 60px 28px; text-align: left !important; }
      .form-layout        { max-width: 1100px; margin: 0 auto; padding: 0 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 44px; align-items: start; }

      .edu-section  { padding: 84px 0 !important; }
      .edu-inner    { max-width: 1100px; margin: 0 auto; padding: 0 60px;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
      .edu-img-side { min-height: 440px; border-radius: 22px; overflow: hidden; }
      .edu-img-side img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }

      .how-section  { padding: 84px 0 0 !important; }
      .how-inner    { max-width: 1100px; margin: 0 auto; padding: 0 60px 0;
        display: grid !important; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
      .how-img-side {
        position: relative;
        top: auto;
        align-self: end;
        margin: 0;
        margin-bottom: 0;
        padding: 0;
        padding-bottom: 0;
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
        margin: 0;
        margin-bottom: 0;
        padding: 0;
        padding-bottom: 0;
      }

      .brand-section { padding: 72px 60px !important; }
      .brand-inner   { max-width: 1100px; margin: 0 auto;
        display: grid !important; grid-template-columns: 1fr auto; gap: 40px;
        align-items: center; text-align: left !important; }
      .brand-cta { min-width: 300px; }

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

  const FORM_STEPS_INFO = [
    "Você preenche o formulário com seus dados em menos de 2 minutos",
    "Atendimento automático via WhatsApp te orienta na próxima etapa",
    "Verificamos sua margem consignável CLT disponível",
    "Simulamos as parcelas e preparamos sua contratação",
    "Orientação completa até a liberação do crédito na sua conta",
  ];

  return (
    <>
      <style>{css}</style>

      <Header />

      {/* ════════ HERO ════════ */}
      <section style={{ background: G, overflow: "hidden" }}>
        <div className="hero-grid" style={{ position: "relative" }}>
          {/* Left */}
          <div
            className="hero-left"
            style={{
              background: "linear-gradient(135deg, rgba(10,77,44,.96) 0%, rgba(10,77,44,.72) 100%)",
              display: "flex", flexDirection: "column", justifyContent: "flex-start",
              padding: "32px 22px 28px", position: "relative", zIndex: 2,
            }}
          >
            {/* CLT badge */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ background: GA, color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13, padding: "6px 16px", borderRadius: 50, letterSpacing: .5, textTransform: "uppercase" }}>
                💼 Crédito Consignado CLT
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(23px, 3.5vw, 40px)",
              fontWeight: 900, color: "#fff", lineHeight: 1.2,
              marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,.4)",
            }}>
              Empréstimo CLT sem Burocracia?
              <br />
              <span style={{ color: GA }}>É aqui!</span>
            </h1>
            <p style={{
              fontSize: "clamp(14px, 1.4vw, 17px)",
              color: "rgba(255,255,255,.92)", lineHeight: 1.65,
              marginBottom: 26, fontWeight: 600,
            }}>
              Aproveite as vantagens de ser CLT e contrate seu consignado de forma simples e segura.
              <br />Faça uma simulação gratuita.
            </p>
            <a href="#form-anchor-clt" className="pulse" style={{
              ...btnGreen, width: "auto", alignSelf: "flex-start", padding: "15px 32px",
            }}>
              Simular Gratuitamente
            </a>
            {/* Badges */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              {["✅ Sem burocracia", "💳 Desconto em folha", "📱 Via WhatsApp"].map((b) => (
                <span key={b} style={{
                  background: "rgba(34,197,94,.18)", color: GA,
                  fontSize: 12, fontWeight: 800, padding: "5px 14px",
                  borderRadius: 50, fontFamily: "'Montserrat', sans-serif",
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right carousel — desktop only */}
          <div className="hero-right-col" style={{ display: "none", width: "100%", minHeight: 560 }}>
            <Carousel height={560} />
          </div>
        </div>

        {/* Mobile carousel below headline */}
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
          <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.65, marginBottom: 14 }}>
            Para sua segurança e conformidade com as normas vigentes, informamos um ponto essencial:
          </p>
          {[
            <span key="1">Essa modalidade de crédito está disponível <strong>apenas para trabalhadores em regime CLT</strong> (carteira assinada).</span>,
            <span key="2">É necessário ter <strong>tempo de registro mínimo de pelo menos 5 meses</strong> de vínculo empregatício.</span>,
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 11, lineHeight: 1.55 }}>
              <span style={{ flexShrink: 0 }}>🔴</span><span>{text}</span>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="alert-desktop desktop-only" style={{ display: "none" }}>
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              ⚠️ AVISO IMPORTANTE
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.65, marginBottom: 18 }}>
              Para sua segurança e conformidade com as normas vigentes, informamos um ponto essencial:
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.55 }}>
              <span style={{ flexShrink: 0 }}>🔴</span>
              <span>Essa modalidade de crédito está disponível <strong>apenas para trabalhadores em regime CLT</strong> (carteira assinada).</span>
            </div>
          </div>
          <div>
            <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 14, padding: 18, fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1.6, marginBottom: 14 }}>
              🔴 É necessário ter <strong>tempo de registro mínimo de pelo menos 5 meses</strong> de vínculo empregatício ativo.
            </div>
            <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 14, padding: 16, fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1.6 }}>
              ✅ Formulário exclusivo para <strong>trabalhadores CLT</strong> com carteira assinada ativa.
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHY FORM ════════ */}
      <section className="why-section" style={{ background: G, padding: "32px 18px" }}>
        {/* Mobile */}
        <div className="mobile-only">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900, color: GA, marginBottom: 14, lineHeight: 1.3 }}>
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 14, marginBottom: 20, fontWeight: 600, lineHeight: 1.6 }}>
            Não importa se você ainda nunca pegou crédito consignado antes — este formulário é o primeiro passo para saber:
          </p>
          {WHY_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 13, background: "rgba(255,255,255,.09)", borderRadius: 13, padding: 13, borderLeft: `4px solid ${GA}` }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{item.icon}</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 14, marginTop: 18, fontWeight: 700, lineHeight: 1.6 }}>
            Preencha o formulário abaixo.
          </p>
        </div>

        {/* Desktop */}
        <div className="why-inner desktop-only" style={{ display: "none" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 900, color: GA, marginBottom: 10, lineHeight: 1.3 }}>
            Por que preencher o formulário?
          </h2>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 16, marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
            Não importa se você ainda nunca pegou crédito consignado antes — este formulário é o primeiro passo para saber:
          </p>
          <div className="why-grid" style={{ display: "none" }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,.09)", borderRadius: 13, padding: 14, borderLeft: `4px solid ${GA}` }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 16, marginTop: 24, fontWeight: 700 }}>
            Preencha o formulário abaixo.
          </p>
        </div>
      </section>

      {/* ════════ FORM ════════ */}
      <section className="form-section-outer" style={{ background: G, paddingBottom: 34 }} id="form-anchor-clt">
        <div className="form-title-wrap" style={{ padding: "22px 14px 18px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(19px, 2.5vw, 28px)", fontWeight: 900, color: "#fff" }}>
            Preencha o formulário abaixo
          </h2>
          <p className="desktop-only" style={{ color: "rgba(255,255,255,.78)", fontSize: 16, marginTop: 8, fontWeight: 600, display: "none" }}>
            Leva menos de 2 minutos. Nossa equipe entra em contato pelo WhatsApp.
          </p>
        </div>

        {/* Mobile */}
        <div className="mobile-only" style={{ margin: "0 13px" }}>
          <MultiStepFormCLT />
        </div>

        {/* Desktop two-column */}
        <div className="form-layout desktop-only" style={{ display: "none" }}>
          <div>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900, color: GA, marginBottom: 20, lineHeight: 1.35 }}>
              Como funciona o processo CLT?
            </h3>
            {FORM_STEPS_INFO.map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, padding: 15, background: "rgba(255,255,255,.08)", borderRadius: 14, borderLeft: `4px solid ${GA}` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.9)", lineHeight: 1.55, fontWeight: 600, paddingTop: 6 }}>{text}</p>
              </div>
            ))}
            <div style={{ marginTop: 24, background: "rgba(34,197,94,.12)", borderRadius: 16, padding: 20, border: "1.5px solid rgba(34,197,94,.3)" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 900, color: GA, marginBottom: 8 }}>💼 CRÉDITO CONSIGNADO CLT</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.85)", lineHeight: 1.6, fontWeight: 600 }}>
                Desconto direto na folha, taxas menores e sem burocracia. A VN Promotora cuida de tudo pelo WhatsApp.
              </p>
            </div>
          </div>
          <div><MultiStepFormCLT /></div>
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
            src={publicPath("images/clt/vnpromotora_especializada-credito-8.webp")}
            alt="Crédito CLT VN Promotora"
            style={{ width: "100%", borderRadius: 18, objectFit: "contain", maxHeight: 230, marginBottom: 26 }}
          />
          {[
            { n: 1, title: "Por que o crédito CLT é ideal para você?",      text: "Se você trabalha com carteira assinada e busca organizar suas finanças ou realizar um projeto, o consignado CLT é a escolha certa. Com ele, você acessa taxas muito menores do que as do cartão de crédito ou cheque especial, garantindo mais fôlego para o seu bolso." },
            { n: 2, title: "Crédito Consignado CLT — Simples e direto na folha", text: "É uma modalidade de empréstimo prática e sem burocracia: as parcelas são descontadas automaticamente do seu salário (folha de pagamento), eliminando a preocupação com boletos ou datas de vencimento." },
            { n: 3, title: "Segurança e experiência",                        text: "A VN Promotora utiliza sua expertise de mais de 20 anos no mercado financeiro para oferecer as melhores soluções para trabalhadores do setor privado, priorizando a transparência, a segurança dos dados e um atendimento humanizado." },
          ].map((item) => (
            <div key={item.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 26 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: G, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontSize: 21, fontWeight: 900, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, color: G, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65 }}>{item.text}</p>
              </div>
            </div>
          ))}
          <a href="#form-anchor-clt" style={btnDark}>💳 QUERO MEU CRÉDITO CLT</a>
        </div>

        {/* Desktop */}
        <div className="edu-inner desktop-only" style={{ display: "none" }}>
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 30, fontWeight: 900, color: G, marginBottom: 28, lineHeight: 1.3 }}>
              O que você precisa saber
            </h2>
            {[
              { n: 1, title: "Por que o crédito CLT é ideal para você?",      text: "Se você trabalha com carteira assinada e busca organizar suas finanças ou realizar um projeto, o consignado CLT é a escolha certa. Com ele, você acessa taxas muito menores do que as do cartão de crédito ou cheque especial, garantindo mais fôlego para o seu bolso." },
              { n: 2, title: "Crédito Consignado CLT — Simples e direto na folha", text: "É uma modalidade de empréstimo prática e sem burocracia: as parcelas são descontadas automaticamente do seu salário (folha de pagamento), eliminando a preocupação com boletos ou datas de vencimento." },
              { n: 3, title: "Segurança e experiência",                        text: "A VN Promotora utiliza sua expertise de mais de 20 anos no mercado financeiro para oferecer as melhores soluções para trabalhadores do setor privado, priorizando a transparência, a segurança dos dados e um atendimento humanizado." },
            ].map((item) => (
              <div key={item.n} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: G, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, color: G, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</div>
                  <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              </div>
            ))}
            <a href="#form-anchor-clt" style={{ ...btnDark, maxWidth: 380 }}>💳 QUERO MEU CRÉDITO CLT</a>
          </div>
          <div className="edu-img-side">
            <img src={publicPath("images/clt/vnpromotora_especializada-credito-8.webp")} alt="Crédito CLT VN Promotora" />
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS / FAQ ════════ */}
      <section className="how-section" style={{ background: "#f0fdf4" }}>
        {/* Mobile */}
        <div className="mobile-only how-section-mobile-body">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 900, color: G, marginBottom: 24, lineHeight: 1.3 }}>
            Como funciona o processo (passo a passo)
          </h2>
          {FAQ_ITEMS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          <div style={{ marginTop: 26 }}>
            <a href="#form-anchor-clt" style={btnDark}>🔒 GARANTIR MEU CRÉDITO</a>
          </div>
        </div>
        <div className="mobile-only how-section-img-wrap">
          <img
            src={publicPath("images/clt/vnpromotora_especializada-credito-9.webp")}
            alt="Como funciona CLT"
          />
        </div>

        {/* Desktop */}
        <div className="how-inner desktop-only" style={{ display: "none" }}>
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 30, fontWeight: 900, color: G, marginBottom: 12, lineHeight: 1.3 }}>
              Como funciona o processo
            </h2>
            <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
              Tire suas dúvidas mais frequentes sobre o consignado CLT.
            </p>
            {FAQ_ITEMS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
            <div style={{ marginTop: 28 }}>
              <a href="#form-anchor-clt" style={{ ...btnDark, maxWidth: 380 }}>🔒 GARANTIR MEU CRÉDITO</a>
            </div>
          </div>
          <div className="how-img-side">
            <img src={publicPath("images/clt/vnpromotora_especializada-credito-9.webp")} alt="Como funciona CLT" />
          </div>
        </div>
      </section>

      {/* ════════ BRAND ════════ */}
      <section className="brand-section" style={{ background: G, padding: "38px 18px", textAlign: "center" }}>
        {/* Mobile */}
        <div className="mobile-only">
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: GA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 18px" }}>🏆</div>
          <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, lineHeight: 1.75, marginBottom: 26 }}>
            A VN Promotora utiliza sua expertise de mais de <strong style={{ color: GA }}>20 anos</strong> no mercado financeiro para oferecer as melhores soluções para trabalhadores do setor privado, priorizando a <strong style={{ color: GA }}>transparência</strong>, a <strong style={{ color: GA }}>segurança</strong> e um <strong style={{ color: GA }}>atendimento humanizado</strong>.
          </p>
          <a href="#form-anchor-clt" className="pulse" style={btnGreen}>📋 QUERO MEU CRÉDITO CLT</a>
        </div>
        {/* Desktop */}
        <div className="brand-inner desktop-only" style={{ display: "none" }}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.75 }}>
            A VN Promotora utiliza sua expertise de mais de <strong style={{ color: GA }}>20 anos</strong> no mercado financeiro para oferecer as melhores soluções para trabalhadores do setor privado, priorizando a <strong style={{ color: GA }}>transparência</strong>, a <strong style={{ color: GA }}>segurança</strong> e um <strong style={{ color: GA }}>atendimento humanizado</strong>.
          </p>
          <div className="brand-cta">
            <a href="#form-anchor-clt" className="pulse" style={btnGreen}>📋 QUERO MEU CRÉDITO CLT</a>
          </div>
        </div>
      </section>

      <Footer tagline="Especialistas em Crédito Consignado INSS e CLT e Pré-Digitação para Aumento Salarial 2026" />
    </>
  );
}
