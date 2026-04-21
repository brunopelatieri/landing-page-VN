import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { trackMetaLead } from "../utils/metaPixel.js";

const WEBHOOK_URL =
  "https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form";

const G = "#0a4d2c";
const GA = "#22c55e";

const CATEGORIAS = [
  "Servidor Público Federal",
  "Servidor Público Estadual",
  "Servidor Público Municipal",
  "Servidor Público Temporário (Contratado)",
  "Beneficiário INSS / LOAS",
  "Beneficiário Bolsa Família",
  "Não possuo vínculo público ou benefício assistencial",
];

const FAIXAS_ETARIAS = [
  "Até 50 anos",
  "De 51 a 60 anos",
  "De 61 a 65 anos",
  "De 66 a 72 anos",
  "73 anos ou mais",
];

const HISTORICOS = [
  "Há menos de 5 meses",
  "Entre 6 e 11 meses",
  "Há mais de 1 ano (Já paguei mais de 12 parcelas)",
];

const SITUACOES = [
  "Tenho margem livre e quero contratar agora",
  "Tenho empréstimos antigos (mais de 1 ano) e quero renovar",
  "Usei minha margem toda esse ano, mas quero novas oportunidades",
  "Preciso de um cartão de crédito consignado",
  "Estou sem margem, mas preciso de dinheiro",
];

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
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i], 10) * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9], 10)) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i], 10) * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10], 10);
}

function phoneDigitsOk(value) {
  const d = (value || "").replace(/\D/g, "");
  if (!d.startsWith("55")) return d.length >= 10;
  const national = d.slice(2);
  return national.length >= 10;
}

export default function MultiStepFormSIAPE() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nome: "", email: "", celular: "", cpf: "" });
  const [sel, setSel] = useState({ categoria: "", faixaEtaria: "", historico: "", situacao: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const setS = (k, v) => {
    setSel((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.nome.trim() || form.nome.trim().split(/\s+/).length < 2) {
      e.nome = "Digite seu nome completo";
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      e.email = "E-mail inválido";
    }
    if (!phoneDigitsOk(form.celular)) {
      e.celular = "Celular inválido";
    }
    if (!validateCPF(form.cpf)) {
      e.cpf = "CPF inválido";
    }
    return e;
  };

  const goNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep(2);
    setTimeout(
      () => document.getElementById("form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  };

  const submit = async () => {
    const e = {};
    if (!sel.categoria) e.categoria = "Selecione uma opção";
    if (!sel.faixaEtaria) e.faixaEtaria = "Selecione uma opção";
    if (!sel.historico) e.historico = "Selecione uma opção";
    if (!sel.situacao) e.situacao = "Selecione uma opção";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const payload = {
      formName: "formSIAPE",
      nome: form.nome.trim(),
      email: form.email.trim(),
      celular: form.celular,
      cpf: form.cpf.replace(/\D/g, ""),
      categoria: sel.categoria,
      faixaEtaria: sel.faixaEtaria,
      historico: sel.historico,
      situacao: sel.situacao,
    };

    setLoading(true);
    fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    try {
      await trackMetaLead({
        nome: payload.nome,
        email: payload.email,
        celular: payload.celular,
        cpf: payload.cpf,
        formName: "formSIAPE",
      });
    } catch (_) {}
    setLoading(false);
    navigate("/obrigado-siape");
  };

  const inputSt = (hasErr) => ({
    width: "100%",
    padding: "16px 14px",
    border: `2.5px solid ${hasErr ? "#dc2626" : "#d1d5db"}`,
    borderRadius: 12,
    fontSize: 17,
    fontFamily: "'Nunito', sans-serif",
    outline: "none",
    color: "#111",
    WebkitAppearance: "none",
    transition: "border .18s",
    minHeight: 52,
  });

  const RadioGroup = ({ label, optKey, options }) => (
    <div style={{ marginBottom: 22 }}>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 16,
          fontWeight: 800,
          color: G,
          marginBottom: 12,
          lineHeight: 1.45,
        }}
      >
        {label} *
      </p>
      {options.map((opt) => {
        const active = sel[optKey] === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setS(optKey, opt)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
              minHeight: 56,
              padding: "14px 14px",
              border: `2.5px solid ${active ? GA : "#d1d5db"}`,
              borderRadius: 10,
              background: active ? "rgba(34,197,94,.09)" : "#fff",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              fontSize: 16,
              fontWeight: active ? 800 : 600,
              color: active ? G : "#374151",
              marginBottom: 10,
              boxShadow: active ? "0 2px 14px rgba(34,197,94,.22)" : "none",
              WebkitAppearance: "none",
              lineHeight: 1.45,
              transition: "all .18s",
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: active ? GA : "#d1d5db",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              {active ? "●" : "○"}
            </span>
            <span>{opt}</span>
          </button>
        );
      })}
      {errors[optKey] && (
        <p style={{ color: "#dc2626", fontSize: 15, marginTop: 6, fontWeight: 700 }}>⚠ {errors[optKey]}</p>
      )}
    </div>
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,.32)",
      }}
    >
      <div
        style={{
          padding: "18px 16px 16px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 15,
            fontWeight: 900,
            color: G,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Etapa {step} de 2
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: i < step ? GA : "#d1d5db",
                transition: "background .2s",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          <span style={{ color: step === 1 ? G : "#6b7280" }}>Seus dados</span>
          <span style={{ color: "#9ca3af" }}>→</span>
          <span style={{ color: step === 2 ? G : "#9ca3af" }}>
            Perfil
            {step === 2 ? " ✓" : ""}
          </span>
        </div>
      </div>

      <div style={{ padding: "22px 18px 28px" }}>
        {step === 1 ? (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontSize: 16, fontWeight: 800, color: G, marginBottom: 8 }}
              >
                Nome completo *
              </label>
              <input
                style={inputSt(!!errors.nome)}
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => setF("nome", e.target.value)}
              />
              {errors.nome && (
                <p style={{ color: "#dc2626", fontSize: 14, marginTop: 6, fontWeight: 700 }}>⚠ {errors.nome}</p>
              )}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontSize: 16, fontWeight: 800, color: G, marginBottom: 8 }}
              >
                E-mail *
              </label>
              <input
                style={inputSt(!!errors.email)}
                type="email"
                placeholder="seuemail@exemplo.com"
                value={form.email}
                onChange={(e) => setF("email", e.target.value)}
              />
              {errors.email && (
                <p style={{ color: "#dc2626", fontSize: 14, marginTop: 6, fontWeight: 700 }}>⚠ {errors.email}</p>
              )}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontSize: 16, fontWeight: 800, color: G, marginBottom: 8 }}
              >
                Celular *
              </label>
              <div
                className="siape-phone-wrap"
                style={{
                  border: errors.celular ? "2.5px solid #dc2626" : "2.5px solid #d1d5db",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <PhoneInput
                  country="br"
                  defaultCountry="br"
                  onlyCountries={["br"]}
                  value={form.celular}
                  onChange={(v) => setF("celular", v)}
                  inputProps={{ name: "celular", required: false, "aria-label": "Celular" }}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    minHeight: 52,
                    fontSize: 17,
                    fontFamily: "'Nunito', sans-serif",
                    border: "none",
                    borderRadius: 0,
                  }}
                  buttonStyle={{
                    border: "none",
                    borderRight: "1px solid #e5e7eb",
                    borderRadius: 0,
                    background: "#f3f4f6",
                  }}
                  dropdownStyle={{ zIndex: 50 }}
                />
              </div>
              {errors.celular && (
                <p style={{ color: "#dc2626", fontSize: 14, marginTop: 6, fontWeight: 700 }}>⚠ {errors.celular}</p>
              )}
            </div>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{ display: "block", fontSize: 16, fontWeight: 800, color: G, marginBottom: 8 }}
              >
                CPF *
              </label>
              <input
                style={inputSt(!!errors.cpf)}
                type="text"
                placeholder="000.000.000-00"
                inputMode="numeric"
                autoComplete="off"
                value={form.cpf}
                onChange={(e) => setF("cpf", maskCPF(e.target.value))}
              />
              {errors.cpf && (
                <p style={{ color: "#dc2626", fontSize: 14, marginTop: 6, fontWeight: 700 }}>⚠ {errors.cpf}</p>
              )}
            </div>
            <button
              type="button"
              onClick={goNext}
              style={{
                width: "100%",
                padding: 18,
                background: GA,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              Continuar →
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                fontFamily: "'Nunito', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                padding: "4px 0 16px",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              ← Voltar
            </button>
            <RadioGroup
              label="Qual categoria que melhor define sua ocupação ou vínculo atual?"
              optKey="categoria"
              options={CATEGORIAS}
            />
            <RadioGroup label="Qual sua idade hoje?" optKey="faixaEtaria" options={FAIXAS_ETARIAS} />
            <RadioGroup
              label="Quando foi a última vez que você contratou ou renovou um empréstimo consignado?"
              optKey="historico"
              options={HISTORICOS}
            />
            <RadioGroup label="Qual a sua situação hoje?" optKey="situacao" options={SITUACOES} />
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              style={{
                width: "100%",
                padding: 18,
                background: GA,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: 0.3,
                opacity: loading ? 0.65 : 1,
                marginTop: 6,
              }}
            >
              {loading ? "Enviando…" : "Enviar minha solicitação →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
