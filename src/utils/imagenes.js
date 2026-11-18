// Las imágenes pueden venir como URL completa (https://...) o como ruta de la carpeta /public (./Monitor.webp)
export function imgSrc(url) {
  if (!url) return `${import.meta.env.BASE_URL}default.webp`;
  if (/^(https?:|data:|blob:)/.test(url)) return url;
  return `${import.meta.env.BASE_URL}${url.replace(/^\.?\//, "")}`;
}
