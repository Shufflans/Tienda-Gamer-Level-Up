import { Link } from "react-router-dom";
import { productos } from "../data/productos.js";

export default function Productos() {
  const formatoPrecio = (precio) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">
      <p className="text-[#C6F432] font-bold tracking-widest mb-3">
        EXPLORA NUESTRO CATÁLOGO
      </p>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Productos gamer
      </h1>

      <p className="text-[#BCA8E0] mb-10">
        Encuentra tus próximos accesorios favoritos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <article
            key={producto.id}
            className="bg-[#24123F] border border-[#43237A] rounded-2xl overflow-hidden hover:border-[#C6F432] transition group"
          >
            <Link to={`/productos/${producto.id}`}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>

            <div className="p-5">
              <span className="text-xs text-[#C6F432] uppercase tracking-wider">
                {producto.categoria}
              </span>

              <h2 className="text-xl font-bold mt-2 mb-3">
                {producto.nombre}
              </h2>

              <p className="text-2xl font-bold mb-4">
                {formatoPrecio(producto.precio)}
              </p>

              <p className="text-sm text-[#BCA8E0] mb-4">
                {producto.stock > 0
                  ? `${producto.stock} unidades disponibles`
                  : "Agotado"}
              </p>

              <Link
                to={`/productos/${producto.id}`}
                className="block text-center bg-[#C6F432] text-[#1A0B2E] font-bold py-3 rounded-xl hover:brightness-110 transition"
              >
                Ver detalles
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

