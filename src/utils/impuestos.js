// Los precios de la tienda se muestran con IVA incluido (como en el comercio chileno).
// Aquí se desglosa el total en neto + IVA 19% para mostrarlo en el carrito y el checkout.
export const IVA = 0.19;

export function calcularTotales(items) {
  const total = items.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  const neto = Math.round(total / (1 + IVA));
  const iva = total - neto;
  return { neto, iva, total };
}
