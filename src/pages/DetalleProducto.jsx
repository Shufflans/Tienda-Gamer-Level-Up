import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../data/productos.js";

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = obtenerProducto(id);

  if (!producto) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Producto no encontrado
        </h1>

        <Link
          to="/productos"
          className="text-[#C6F432] underline"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <main className="max-w-6xl mx-auto px-5 py-12">
      <Link
        to="/productos"
        className="text-[#C6F432] hover:underline"
      >
        ← Volver a productos
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 items-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full rounded-2xl border border-[#43237A]"
        />

        <div>
          <span className="text-[#C6F432] uppercase tracking-widest text-sm">
            {producto.categoria}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-5">
            {producto.nombre}
          </h1>

          <p className="text-3xl font-bold mb-6">{precio}</p>

          <p className="text-[#BCA8E0] leading-relaxed mb-6">
            {producto.descripcion}
          </p>

          <p className="mb-7">
            Disponibilidad:{" "}
            <span className={producto.stock > 0 ? "text-[#C6F432]" : "text-red-400"}>
              {producto.stock > 0
                ? `${producto.stock} unidades`
                : "Agotado"}
            </span>
          </p>

          <button
            type="button"
            disabled={producto.stock === 0}
            onClick={() =>
              alert("El carrito de compras se implementará en la siguiente etapa.")
            }
            className="bg-[#C6F432] text-[#1A0B2E] font-bold px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Agregar al carrito
          </button>
        </div>
      </section>
    </main>
  );
}
