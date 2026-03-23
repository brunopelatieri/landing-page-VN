import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav
      style={{
        background: "#FFF",
        padding: "10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 2px 16px rgba(0,0,0,.35)",
      }}
    >
      <div className="nav-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link
          to="/"
          aria-label="VN Promotora — ir para página inicial"
          style={{ display: "flex", lineHeight: 0, textDecoration: "none" }}
        >
          <img
            src="public/images/vn_promotora_vida_nova_logo._top.webp"
            alt="VN Promotora"
            style={{ height: 46 }}
          />
        </Link>
      </div>
    </nav>
  );
}
