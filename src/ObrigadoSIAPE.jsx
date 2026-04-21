import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { publicPath } from "./utils/publicPath.js";

const G = "#0a4d2c";
const GA = "#22c55e";

const IMG_THANKS = publicPath("images/vn_promotora_vida_section_tanks.webp");

export default function ObrigadoSIAPE() {
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
    .siape-support {
      font-size: 15px;
      font-weight: 600;
      color: #6b7280;
      line-height: 1.5;
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
          <div className="siape-thanks-icon" aria-hidden>
            ✅
          </div>
          <h1>Solicitação recebida com sucesso!</h1>
          <p className="siape-lead">
            Obrigado! Nossa equipe especializada em Crédito Consignado SIAPE já recebeu sua solicitação e entrará em contato em breve com as melhores condições disponíveis para você.
          </p>
          <div className="siape-thanks-box">
            <h2>📋 O que acontece agora?</h2>
            <ul>
              <li>Nosso especialista analisará seu perfil</li>
              <li>Você receberá uma proposta personalizada</li>
              <li>Todo o processo é gratuito e sem compromisso</li>
            </ul>
          </div>
          <p className="siape-support">
            Atendimento especializado em Crédito Consignado para Servidores Federais SIAPE
          </p>
          <div className="siape-img-wrap">
            <img src={IMG_THANKS} alt="Obrigado — VN Promotora" />
          </div>
        </div>
      </section>
      <Footer tagline="Especialistas em Crédito Consignado INSS, CLT e SIAPE — VN Promotora" />
    </>
  );
}
