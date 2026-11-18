import http from "../api/http";

export const orderService = {
  // POST /api/pedidos
  // ⚠ VERIFICAR con el schema PedidoRequest / DetallePedidoRequest de Swagger:
  //   aquí se asume { detalles: [{ productoId, cantidad }] }. Los datos de entrega se envían
  //   como campos extra (si el backend no los tiene, Spring los ignora).
  crear: ({ items, entrega }) =>
    http
      .post("/pedidos", {
        detalles: items.map((i) => ({ productoId: i.id, cantidad: i.cantidad })),
        ...entrega,
      })
      .then((r) => r.data),

  listar: () => http.get("/pedidos").then((r) => r.data),
  obtener: (id) => http.get(`/pedidos/${id}`).then((r) => r.data),
  detalles: (id) => http.get(`/pedidos/${id}/detalles`).then((r) => r.data),
};
