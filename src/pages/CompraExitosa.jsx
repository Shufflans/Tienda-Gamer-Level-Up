import { Link, Navigate, useLocation } from "react-router-dom";
import { IVA } from "../utils/impuestos";
import { clp } from "../utils/roles";

export default function CompraExitosa() {
  const { state } = useLocation();

  // Si se abre la página sin haber comprado (o se recarga), no hay datos que mostrar
  if (!state) return <Navigate to="/productos" replace />;

  const { numero, items = [], neto, iva, total, entrega = {}, metodo } = state;

  return (
    <main className="min-h-[80vh] px-4 py-12">
      <section className="mx-auto max-w-2xl rounded-2xl border border-lime-400/30 bg-[#241342] p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 text-3xl font-black text-[#1A0B2E]">✓</div>
          <h1 className="mb-2 text-3xl font-black text-lime-400">¡Compra exitosa!</h1>
          <p className="mb-1 text-[#BCA8E0]">Tu pedido se registró correctamente.</p>
          {numero !== undefined && <p className="font-bold">Pedido N° {numero}</p>}
        </div>

        <div className="mt-8 space-y-3 border-t border-purple-800 pt-6">
          {items.map((p) => (
            <div key={p.id} className="flex justify-between gap-4">
              <span>{p.nombre} <span className="text-[#BCA8E0]">× {p.cantidad}</span></span>
              <span className="font-bold">{clp(p.precio * p.cantidad)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t border-purple-800 pt-4 text-sm text-[#BCA8E0]">
          <div className="flex justify-between"><span>Subtotal (neto)</span><span>{clp(neto)}</span></div>
          <div className="flex justify-between"><span>IVA ({Math.round(IVA * 100)}%)</span><span>{clp(iva)}</span></div>
          <div className="flex justify-between text-lg font-black text-white"><span>Total pagado</span><span className="text-lime-400">{clp(total)}</span></div>
        </div>

        <div className="mt-6 rounded-xl bg-[#180b2d] p-4 text-sm text-[#BCA8E0]">
          <p className="mb-1 font-bold text-white">Entrega</p>
          <p>{entrega.nombreCliente}</p>
          <p>{entrega.direccionEnvio}, {entrega.comuna}</p>
          <p>{entrega.email} · {entrega.telefono}</p>
          <p className="mt-2">Método de pago: {metodo === "tarjeta" ? "Tarjeta" : "Transferencia bancaria"}</p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/productos" className="inline-block rounded-xl bg-[#C6F432] px-6 py-3 font-bold text-[#1A0B2E] hover:scale-105 transition">
            Seguir comprando
          </Link>
        </div>
      </section>
    </main>
  );
}
