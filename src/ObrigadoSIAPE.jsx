import { useEffect, useRef } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { publicPath } from "./utils/publicPath.js";

const G = "#0a4d2c";
const GA = "#22c55e";
const GM = "#1a7a45";

const WHATSAPP_URL =
  "https://wa.me/5579999203817?text=Fiz%20meu%20cadastro%20e%20quero%20saber%20mais%20sobre%20cr%C3%A9dito%20consignado%20para%20Servidores%20SIAPE";

const REDIRECT_MS = 5000;

const IMG_THANKS = publicPath("images/vn_promotora_vida_section_tanks.webp");

export default function ObrigadoSIAPE() {
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    redirectTimerRef.current = window.setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, REDIRECT_MS);
    return () => {
      if (redirectTimerRef.current != null) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, []);

  const cancelAutoRedirect = () => {
    if (redirectTimerRef.current != null) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { font-family: 'Nunito', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; }
    button { font-family: inherit; }
    img    { max-width: 100%; display: block; }

    .mobile-only  { display: block; }
    .desktop-only { display: none;  }

    .siape-thanks-section {
      background: linear-gradient(180deg, #f0fdf4 0%, #fff 45%);
      padding: 42px 18px 0;
      min-height: 52vh;
    }
    .siape-thanks-inner {
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
      min-height: 100%;
    }
    .siape-thanks-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      line-height: 1;
    }
    .siape-thanks-inner h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(26px, 5vw, 36px);
      font-weight: 900;
      color: ${G};
      line-height: 1.2;
    }
    .siape-thanks-inner .siape-lead {
      font-size: clamp(16px, 2.2vw, 18px);
      font-weight: 600;
      color: #374151;
      line-height: 1.65;
      max-width: 560px;
    }
    .siape-thanks-box {
      width: 100%;
      text-align: left;
      background: #fff;
      border: 2px solid rgba(34, 197, 94, 0.35);
      border-radius: 16px;
      padding: 20px 20px 18px;
      box-shadow: 0 4px 24px rgba(10, 77, 44, 0.08);
    }
    .siape-thanks-box h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 17px;
      font-weight: 900;
      color: ${G};
      margin-bottom: 12px;
    }
    .siape-thanks-box ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .siape-thanks-box li {
      font-size: 16px;
      font-weight: 600;
      color: #374151;
      line-height: 1.55;
      margin-bottom: 10px;
      padding-left: 22px;
      position: relative;
    }
    .siape-thanks-box li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${GA};
      font-weight: 900;
    }
    .siape-thanks-box li strong {
      color: ${G};
      font-weight: 800;
    }
    .siape-progress-block {
      width: 100%;
      max-width: 420px;
      text-align: left;
    }
    .siape-progress-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 800;
      color: ${G};
      letter-spacing: 0.4px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .siape-progress-track {
      width: 100%;
      height: 10px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(10, 77, 44, 0.12);
    }
    .siape-progress-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, ${GM} 0%, ${GA} 100%);
      border-radius: 999px;
      transform-origin: left center;
      animation: siapeProgressDeplete ${REDIRECT_MS}ms linear forwards;
    }
    @keyframes siapeProgressDeplete {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
    .siape-cta-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 420px;
      padding: 17px 22px;
      background: ${GA};
      color: #fff !important;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 900;
      text-decoration: none;
      border-radius: 50px;
      letter-spacing: 0.4px;
      text-align: center;
      line-height: 1.35;
      box-shadow: 0 4px 18px rgba(34, 197, 94, 0.35);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .siape-cta-link:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(34, 197, 94, 0.45);
    }
    .siape-img-wrap {
      margin-top: auto;
      padding-top: 8px;
      width: calc(100% + 36px);
      max-width: none;
      margin-left: -18px;
      margin-right: -18px;
    }
    .siape-img-wrap img {
      width: 100%;
      height: auto;
      object-fit: contain;
      object-position: bottom center;
    }

    @media (min-width: 960px) {
      .mobile-only  { display: none  !important; }
      .desktop-only { display: block !important; }

      nav { padding: 10px 0 !important; }
      .nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 60px; justify-content: flex-start !important; }

      .footer-outer { padding: 52px 60px 32px !important; }
      .footer-inner { max-width: 1100px; margin: 0 auto; }
      .footer-grid  { display: grid !important; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 36px; }

      .siape-thanks-section { padding: 64px 60px 0; }
      .siape-img-wrap {
        width: 100%;
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <Header />
      <section className="siape-thanks-section">
        <div className="siape-thanks-inner">
          <h1>Obrigado! Sua solicitação foi recebida.</h1>
          <p className="siape-lead">
            Nossa equipe especializada em Crédito Consignado SIAPE já está processando seus dados. Aguarde um instante... Você será
            redirecionado automaticamente em 5 segundos para o nosso WhatsApp de atendimento exclusivo para Servidores Federais.
          </p>
          <div className="siape-thanks-box">
            <h2>Próximos passos</h2>
            <ul>
              <li>
                <strong>Análise Imediata:</strong> Nosso especialista iniciará a análise do seu perfil agora mesmo.
              </li>
              <li>
                <strong>Proposta no Zap:</strong> Você receberá as melhores condições diretamente na conversa.
              </li>
              <li>
                <strong>Segurança Total:</strong> Todo o processo é gratuito, seguro e sem compromisso.
              </li>
            </ul>
          </div>
          <div className="siape-progress-block" aria-live="polite">
            <p className="siape-progress-label">Redirecionando em 5 segundos</p>
            <div className="siape-progress-track">
              <div className="siape-progress-fill" />
            </div>
          </div>
          <a
            className="siape-cta-link"
            href={WHATSAPP_URL}
            onClick={cancelAutoRedirect}
          >
            QUERO SER ATENDIDO AGORA
          </a>
          <div className="siape-img-wrap">
            <img src={IMG_THANKS} alt="Obrigado — VN Promotora" />
          </div>
        </div>
      </section>
      <Footer tagline="Especialistas em Crédito Consignado INSS, CLT e SIAPE — VN Promotora" />
    </>
  );
}
