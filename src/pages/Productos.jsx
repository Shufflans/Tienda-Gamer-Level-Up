import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productos } from "../data/productos.js";
import { FaSearch } from "react-icons/fa";

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState(
    searchParams.get("q") || ""
  );
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("predeterminado");

  const formatoPrecio = (precio) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  const productosFiltrados = productos
    .filter((producto) => {
      const coincideBusqueda = producto.nombre
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase());

      const coincideCategoria =
        categoria === "Todas" || producto.categoria === categoria;

      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => {
      if (orden === "menor") return a.precio - b.precio;
      if (orden === "mayor") return b.precio - a.precio;
      return 0;
    });

  function manejarBusqueda(e) {
    e.preventDefault();

    if (busqueda.trim()) {
      setSearchParams({ q: busqueda.trim() });
    } else {
      setSearchParams({});
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">
      <p className="text-[#C6F432] font-bold tracking-widest mb-3"> EXPLORA NUESTRO CATÁLOGO</p>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">Productos gamer</h1>

      <p className="text-[#BCA8E0] mb-8">Encuentra tus próximos accesorios favoritos.</p>

      {/* Búsqueda y filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <form
          onSubmit={manejarBusqueda}
          className="flex items-center gap-2 bg-[#24123F] border border-[#43237A] rounded-xl p-3 md:col-span-1"
        >
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="bg-transparent outline-none w-full text-[#F5EEFF]"
          />

          <button
            type="submit"
            aria-label="Buscar"
            className="text-[#C6F432] p-1"
          >
            <FaSearch />
          </button>
        </form>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          aria-label="Filtrar por categoría"
          className="bg-[#24123F] border border-[#43237A] rounded-xl p-3 text-[#F5EEFF] outline-none"
        >
          {categorias.map((nombreCategoria) => (
            <option key={nombreCategoria} value={nombreCategoria}>
              {nombreCategoria === "Todas"
                ? "Todas las categorías"
                : nombreCategoria}
            </option>
          ))}
        </select>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          aria-label="Ordenar por precio"
          className="bg-[#24123F] border border-[#43237A] rounded-xl p-3 text-[#F5EEFF] outline-none"
        >
          <option value="predeterminado">Orden predeterminado</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>

      <p className="text-sm text-[#BCA8E0] mb-5"> {productosFiltrados.length} productos encontrados</p>

      {/* Catálogo */}
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
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
                <span className="text-xs text-[#C6F432] uppercase tracking-wider">{producto.categoria}</span>

                <h2 className="text-xl font-bold mt-2 mb-3">{producto.nombre}</h2>

                <p className="text-2xl font-bold mb-4">{formatoPrecio(producto.precio)}</p>

                <p className="text-sm text-[#BCA8E0] mb-4">
                  {producto.stock > 0
                    ? `${producto.stock} unidades disponibles`
                    : "Agotado"}
                </p>

                <Link to={`/productos/${producto.id}`} className="block text-center bg-[#C6F432] text-[#1A0B2E] font-bold py-3 rounded-xl hover:brightness-110 transition">Ver detalles</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold mb-3">No encontramos productos</h2>
          <p className="text-[#BCA8E0] mb-6">Prueba con otro nombre o selecciona otra categoría.</p>
          <button
            type="button"
            onClick={() => {
              setBusqueda("");
              setCategoria("Todas");
              setOrden("predeterminado");
              setSearchParams({});
            }}
            className="bg-[#C6F432] text-[#1A0B2E] font-bold px-6 py-3 rounded-xl"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </main>
  );
}
