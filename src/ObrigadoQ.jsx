import { useEffect, useRef } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { publicPath } from "./utils/publicPath.js";

const G = "#0a4d2c";
const GA = "#22c55e";
const GM = "#1a7a45";
const REDIRECT_MS = 5000;
const WHATSAPP_URL =
  "https://wa.me/557999037332?text=Ol%C3%A1!%20Quero%20saber%20se%20tenho%20direito%20ao%20cr%C3%A9dito%20consignado%20INSS.";
const IMG_THANKS = publicPath("images/vn_promotora_vida_section_tanks.webp");

export default function ObrigadoQ() {
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    redirectTimerRef.current = window.setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, REDIRECT_MS);
    return () => {
      if (redirectTimerRef.current != null) {
        window.clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, []);

  const cancelAutoRedirect = () => {
    if (redirectTimerRef.current != null) {
      window.clearTimeout(redirectTimerRef.current);
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

    .obrigado-q-section {
      background: #f0fdf4;
      padding: 38px 18px 0;
    }
    .obrigado-q-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .obrigado-q-left h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(28px, 5vw, 40px);
      font-weight: 900;
      color: ${G};
      line-height: 1.15;
      margin-bottom: 14px;
    }
    .obrigado-q-left .obrigado-sub {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(16px, 2.2vw, 20px);
      font-weight: 800;
      color: ${G};
      line-height: 1.45;
      margin-bottom: 20px;
    }
    .obrigado-q-left .obrigado-text {
      font-size: clamp(15px, 1.6vw, 17px);
      font-weight: 600;
      color: #374151;
      line-height: 1.75;
      white-space: pre-line;
      margin-bottom: 20px;
    }
    .wa-icon-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: ${GA};
      color: #fff;
      text-decoration: none;
      margin-bottom: 16px;
    }
    .wa-button {
      display: inline-block;
      min-width: 200px;
      padding: 14px 26px;
      background: ${GA};
      color: #fff;
      border-radius: 999px;
      text-decoration: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: .4px;
      text-align: center;
      margin-bottom: 12px;
    }
    .wa-helper {
      font-size: 13px;
      color: #6b7280;
      font-weight: 700;
    }
    .obrigado-q-progress-block {
      width: 100%;
      max-width: 320px;
      margin-top: 4px;
    }
    .obrigado-q-progress-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 800;
      color: ${G};
      letter-spacing: 0.35px;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    .obrigado-q-progress-track {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(10, 77, 44, 0.1);
    }
    .obrigado-q-progress-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, ${GM} 0%, ${GA} 100%);
      border-radius: 999px;
      transform-origin: left center;
      animation: obrigadoQProgressDeplete ${REDIRECT_MS}ms linear forwards;
    }
    @keyframes obrigadoQProgressDeplete {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
    .obrigado-q-img-wrap {
      margin: 0;
      margin-bottom: 0;
      padding: 0;
      padding-bottom: 0;
      line-height: 0;
      width: calc(100% + 36px);
      max-width: none;
      margin-left: -18px;
      margin-right: -18px;
      align-self: center;
    }
    .obrigado-q-img-wrap img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      object-position: bottom center;
      margin: 0;
      margin-bottom: 0;
      padding: 0;
      padding-bottom: 0;
    }

    @media (min-width: 960px) {
      .mobile-only  { display: none  !important; }
      .desktop-only { display: block !important; }

      nav { padding: 10px 0 !important; }
      .nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 60px; justify-content: flex-start !important; }

      .footer-outer { padding: 52px 60px 32px !important; }
      .footer-inner { max-width: 1100px; margin: 0 auto; }
      .footer-grid  { display: grid !important; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 36px; }

      .obrigado-q-section {
        padding: 72px 0 0 !important;
      }
      .obrigado-q-inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px 56px;
        align-items: start;
        padding: 0 60px 0;
      }
      .obrigado-q-left {
        padding-top: 8px;
        padding-bottom: 48px;
      }
      .obrigado-q-img-wrap {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        align-self: end;
      }
    }
  `;

  const copy = `Seu WhatsApp abrirá em breve.
Envie a primeira mensagem para iniciarmos.
Nosso tempo médio de resposta é de até 2 minutos.`;

  return (
    <>
      <style>{css}</style>
      <Header />
      <section className="obrigado-q-section">
        <div className="obrigado-q-inner">
          <div className="obrigado-q-left">
            <h1>Obrigado!</h1>
            <p className="obrigado-sub">A partir de agora você será atendido por um especialista dedicado.</p>
            <p className="obrigado-text">{copy}</p>

            <a
              className="wa-icon-link"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp"
              onClick={cancelAutoRedirect}
            >
              <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 8.003 0C3.58 0 0 3.58 0 8c0 1.414.37 2.796 1.073 4.014L0 16l4.093-1.073A7.963 7.963 0 0 0 8.003 16h.003c4.422 0 8.003-3.58 8.003-8a7.95 7.95 0 0 0-2.408-5.674ZM8.006 14.5h-.002a6.5 6.5 0 0 1-3.307-.902l-.237-.142-2.43.638.648-2.37-.154-.244A6.48 6.48 0 0 1 1.5 8c0-3.584 2.918-6.5 6.503-6.5 1.738 0 3.37.676 4.602 1.903A6.457 6.457 0 0 1 14.5 8c0 3.584-2.916 6.5-6.494 6.5Zm3.565-4.865c-.195-.098-1.155-.57-1.334-.635-.18-.066-.311-.098-.442.098-.13.195-.507.635-.622.766-.114.13-.228.147-.423.049-.195-.098-.824-.303-1.57-.967-.58-.517-.972-1.154-1.086-1.349-.114-.195-.012-.3.086-.398.087-.086.195-.228.293-.342.098-.114.13-.195.195-.326.066-.13.033-.244-.016-.342-.049-.098-.442-1.063-.606-1.457-.16-.384-.323-.332-.442-.338-.114-.006-.244-.007-.375-.007a.72.72 0 0 0-.522.244c-.18.195-.687.671-.687 1.636 0 .964.703 1.896.801 2.027.098.13 1.385 2.114 3.356 2.963.469.203.834.325 1.12.416.47.149.897.128 1.235.077.377-.056 1.155-.472 1.318-.929.163-.456.163-.848.114-.929-.049-.081-.179-.13-.374-.228Z" />
              </svg>
            </a>

            <div>
              <a
                className="wa-button"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={cancelAutoRedirect}
              >
                CLIQUE AQUI
              </a>
            </div>
            <div className="obrigado-q-progress-block" aria-live="polite">
              <p className="obrigado-q-progress-label">Redirecionamento em 5 segundos</p>
              <div className="obrigado-q-progress-track">
                <div className="obrigado-q-progress-fill" />
              </div>
            </div>
            <p className="wa-helper">Redirecionando automaticamente em 5 segundos...</p>
          </div>
          <div className="obrigado-q-img-wrap">
            <img src={IMG_THANKS} alt="Obrigado — VN Promotora" />
          </div>
        </div>
      </section>
      <Footer tagline="Especialistas em Crédito Consignado INSS e Crédito ao Trabalhador CLT" />
    </>
  );
}
