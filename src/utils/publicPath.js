/**
 * URL para ficheiros em `public/` — no build são copiados para a raiz de `dist/`.
 * Usa `import.meta.env.BASE_URL` para funcionar com `base` configurado no Vite.
 *
 * @param {string} path - Caminho relativo à raiz do public, ex.: "images/logo.webp"
 * @returns {string}
 */
export function publicPath(path) {
  const p = String(path).replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${p}`;
}
