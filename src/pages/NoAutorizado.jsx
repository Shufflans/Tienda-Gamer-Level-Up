import { Link } from "react-router-dom";

export default function NoAutorizado() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center p-5">
      <section className="w-full max-w-md bg-[#24123F] border border-[#43237A] rounded-2xl p-9 text-center shadow-xl">
        <p className="text-6xl font-bold text-[#D81B7E] mb-3">403</p>
        <h1 className="text-2xl font-bold mb-2">Acceso no autorizado</h1>
        <p className="text-[#BCA8E0] mb-6">No tienes permisos para ver esta página.</p>
        <Link
          to="/productos"
          className="inline-block bg-[#C6F432] text-[#1A0B2E] font-bold px-5 py-3 rounded-xl hover:brightness-110 transition"
        >
          Volver a la tienda
        </Link>
      </section>
    </main>
  );
}
