import { Link, useLocation } from "react-router-dom";

export default function CompraFallida() {
  const { state } = useLocation();
  const motivo = state?.motivo ?? "No se pudo realizar el pago.";

  return (
    <main className="min-h-[80vh] px-4 py-12 text-center">
      <section className="mx-auto max-w-xl rounded-2xl border border-red-400/30 bg-[#241342] p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-400 text-3xl font-black text-[#1A0B2E]">✕</div>
        <h1 className="mb-3 text-3xl font-black text-red-400">Compra fallida</h1>
        <p className="mb-2 text-[#BCA8E0]">No se pudo realizar el pago.</p>
        <p role="alert" className="mb-6 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{motivo}</p>
        <p className="mb-6 text-sm text-[#BCA8E0]">No se realizó ningún cobro y tus productos siguen en el carrito.</p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/checkout" className="rounded-xl bg-[#C6F432] px-6 py-3 font-bold text-[#1A0B2E] hover:scale-105 transition">
            Intentar nuevamente
          </Link>
          <Link to="/carrito" className="rounded-xl border border-purple-700 px-6 py-3 font-bold hover:border-lime-400 transition">
            Volver al carrito
          </Link>
        </div>
      </section>
    </main>
  );
}
