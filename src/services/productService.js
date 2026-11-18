import http from "../api/http";

export const productService = {
  listarActivos: () => http.get("/productos/activos").then((r) => r.data),
  listar: () => http.get("/productos").then((r) => r.data),
  obtener: (id) => http.get(`/productos/${id}`).then((r) => r.data),
  buscar: (nombre) => http.get("/productos/buscar", { params: { nombre } }).then((r) => r.data),
  crear: (producto) => http.post("/productos", producto).then((r) => r.data),
  actualizar: (id, producto) => http.put(`/productos/${id}`, producto).then((r) => r.data),
  eliminar: (id) => http.delete(`/productos/${id}`),
};
