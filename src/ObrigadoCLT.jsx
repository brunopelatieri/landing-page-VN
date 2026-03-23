import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const G = "#0a4d2c";

const IMG_THANKS = "dist/images/vn_promotora_vida_section_tanks.webp";

export default function ObrigadoCLT() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { font-family: 'Nunito', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; }
    button { font-family: inherit; }
    img    { max-width: 100%; display: block; }

    .mobile-only  { display: block; }
    .desktop-only { display: none;  }

    .obrigado-clt-section {
      background: #f0fdf4;
      padding: 38px 18px 0;
    }
    .obrigado-clt-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .obrigado-clt-left h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(28px, 5vw, 40px);
      font-weight: 900;
      color: ${G};
      line-height: 1.15;
      margin-bottom: 14px;
    }
    .obrigado-clt-left .obrigado-sub {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(16px, 2.2vw, 20px);
      font-weight: 800;
      color: ${G};
      line-height: 1.45;
      margin-bottom: 20px;
    }
    .obrigado-clt-left .obrigado-text {
      font-size: clamp(15px, 1.6vw, 17px);
      font-weight: 600;
      color: #374151;
      line-height: 1.75;
      white-space: pre-line;
    }
    .obrigado-clt-img-wrap {
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
    .obrigado-clt-img-wrap img {
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

      .obrigado-clt-section {
        padding: 72px 0 0 !important;
      }
      .obrigado-clt-inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px 56px;
        align-items: start;
        padding: 0 60px 0;
      }
      .obrigado-clt-left {
        padding-top: 8px;
        padding-bottom: 48px;
      }
      .obrigado-clt-img-wrap {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        align-self: end;
      }
    }
  `;

  const copy = `Fique atento no seu WhatsApp.

Estamos analisando suas informações
Nosso tempo médio de resposta é de até 10 minutos`;

  return (
    <>
      <style>{css}</style>
      <Header />
      <section className="obrigado-clt-section">
        <div className="obrigado-clt-inner">
          <div className="obrigado-clt-left">
            <h1>Obrigado!</h1>
            <p className="obrigado-sub">A partir de agora você será atendido por um especialista dedicado.</p>
            <p className="obrigado-text">{copy}</p>
          </div>
          <div className="obrigado-clt-img-wrap">
            <img src={IMG_THANKS} alt="Obrigado — VN Promotora" />
          </div>
        </div>
      </section>
      <Footer tagline="Especialistas em Crédito Consignado INSS e CLT e Pré-Digitação para Aumento Salarial 2026" />
    </>
  );
}
