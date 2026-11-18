// Lista y detalle de órdenes (Administrador y Vendedor, solo lectura).
// ⚠ Los nombres de campo de PedidoResponse / DetallePedidoResponse se leen de forma tolerante
//   (pick). Cuando confirmes los nombres exactos en Swagger, puedes simplificarlo.
import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { clp, errorMsg } from "../utils/roles";

const pick = (obj, ...claves) => {
  for (const k of claves) if (obj?.[k] !== undefined && obj[k] !== null) return obj[k];
  return undefined;
};
const texto = (v) => (v && typeof v === "object" ? v.username ?? v.nombre ?? "—" : v ?? "—");
const fecha = (p) => {
  const f = pick(p, "fecha", "fechaCreacion", "fechaPedido");
  return f ? new Date(f).toLocaleString("es-CL") : "—";
};

export default function PanelOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [seleccion, setSeleccion] = useState(null); // { pedido, detalles }

  useEffect(() => {
    orderService
      .listar() // GET /api/pedidos
      .then(setOrdenes)
      .catch((err) => setError(errorMsg(err, "No se pudieron cargar las órdenes.")))
      .finally(() => setCargando(false));
  }, []);

  async function verDetalle(id) {
    setError("");
    try {
      // GET /api/pedidos/{id} y GET /api/pedidos/{id}/detalles
      const [pedido, detalles] = await Promise.all([orderService.obtener(id), orderService.detalles(id)]);
      setSeleccion({ pedido, detalles });
    } catch (err) {
      setError(errorMsg(err, "No se pudo cargar el detalle de la orden."));
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold">Órdenes</h1>
      <p className="mb-6 text-[#BCA8E0]">Consulta de órdenes (solo lectura).</p>

      {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-300">{error}</p>}
      {cargando && <p className="text-[#BCA8E0]">Cargando...</p>}

      {!cargando && (
        <div className="overflow-x-auto rounded-2xl border border-[#43237A] bg-[#24123F]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#43237A] text-[#C6F432]">
              <tr>
                <th className="p-3">N°</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Total</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id} className="border-b border-[#43237A]/50 last:border-0">
                  <td className="p-3 font-bold">#{o.id}</td>
                  <td className="p-3">{fecha(o)}</td>
                  <td className="p-3">{texto(pick(o, "username", "usuario", "cliente", "nombreCliente"))}</td>
                  <td className="p-3">{pick(o, "total", "montoTotal") !== undefined ? clp(pick(o, "total", "montoTotal")) : "—"}</td>
                  <td className="p-3">{texto(pick(o, "estado"))}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => verDetalle(o.id)} className="text-[#C6F432] underline">Ver detalle</button>
                  </td>
                </tr>
              ))}
              {ordenes.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-[#BCA8E0]">No hay órdenes registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {seleccion && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4" onClick={() => setSeleccion(null)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-2xl rounded-2xl border border-[#43237A] bg-[#24123F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-1 text-2xl font-bold">Orden #{seleccion.pedido.id}</h2>
            <p className="mb-4 text-sm text-[#BCA8E0]">
              {fecha(seleccion.pedido)} · {texto(pick(seleccion.pedido, "username", "usuario", "cliente", "nombreCliente"))} · {texto(pick(seleccion.pedido, "estado"))}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#43237A] text-[#C6F432]">
                  <tr><th className="p-2">Producto</th><th className="p-2">Cant.</th><th className="p-2">Precio</th><th className="p-2 text-right">Subtotal</th></tr>
                </thead>
                <tbody>
                  {seleccion.detalles.map((d, i) => {
                    const precio = pick(d, "precioUnitario", "precio") ?? 0;
                    const sub = pick(d, "subtotal") ?? precio * (d.cantidad ?? 0);
                    return (
                      <tr key={d.id ?? i} className="border-b border-[#43237A]/50 last:border-0">
                        <td className="p-2">{texto(pick(d, "productoNombre", "nombreProducto", "nombre") ?? d.producto?.nombre)}</td>
                        <td className="p-2">{d.cantidad}</td>
                        <td className="p-2">{clp(precio)}</td>
                        <td className="p-2 text-right">{clp(sub)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {pick(seleccion.pedido, "total", "montoTotal") !== undefined && (
              <p className="mt-4 text-right text-lg font-bold">
                Total: <span className="text-[#C6F432]">{clp(pick(seleccion.pedido, "total", "montoTotal"))}</span>
              </p>
            )}
            <button onClick={() => setSeleccion(null)} className="mt-6 w-full rounded-xl border border-[#43237A] py-3 font-bold hover:border-[#C6F432]">Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}
