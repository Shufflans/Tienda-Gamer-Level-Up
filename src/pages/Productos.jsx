import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { productService } from "../services/productService";
import { imgSrc } from "../utils/imagenes";
import { clp, errorMsg } from "../utils/roles";

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("predeterminado");

  // GET /api/productos/activos
  useEffect(() => {
    productService
      .listarActivos()
      .then(setProductos)
      .catch((err) => setError(errorMsg(err, "No se pudieron cargar los productos.")))
      .finally(() => setCargando(false));
  }, []);

  // El buscador de la barra superior cambia ?q=...; mantenemos el input sincronizado
  const q = searchParams.get("q") || "";
  useEffect(() => setBusqueda(q), [q]);

  // El backend aún no tiene categorías: el filtro solo aparece si los productos traen "categoria"
  const hayCategorias = productos.some((p) => p.categoria);
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria).filter(Boolean))];

  const productosFiltrados = productos
    .filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());
      const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => {
      if (orden === "menor") return a.precio - b.precio;
      if (orden === "mayor") return b.precio - a.precio;
      return 0;
    });

  function manejarBusqueda(e) {
    e.preventDefault();
    setSearchParams(busqueda.trim() ? { q: busqueda.trim() } : {});
  }

  const campo = "bg-[#24123F] border border-[#43237A] rounded-xl p-3 text-[#F5EEFF] outline-none";

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">
      <p className="text-[#C6F432] font-bold tracking-widest mb-3">EXPLORA NUESTRO CATÁLOGO</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Productos gamer</h1>
      <p className="text-[#BCA8E0] mb-8">Encuentra tus próximos accesorios favoritos.</p>

      {/* Búsqueda y filtros */}
      <div className={`grid grid-cols-1 ${hayCategorias ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4 mb-10`}>
        <form onSubmit={manejarBusqueda} className="flex items-center gap-2 bg-[#24123F] border border-[#43237A] rounded-xl p-3">
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="bg-transparent outline-none w-full text-[#F5EEFF]"
          />
          <button type="submit" aria-label="Buscar" className="text-[#C6F432] p-1">
            <FaSearch />
          </button>
        </form>

        {hayCategorias && (
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} aria-label="Filtrar por categoría" className={campo}>
            {categorias.map((c) => (
              <option key={c} value={c}>{c === "Todas" ? "Todas las categorías" : c}</option>
            ))}
          </select>
        )}

        <select value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar por precio" className={campo}>
          <option value="predeterminado">Orden predeterminado</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>

      {cargando && <p className="text-[#BCA8E0]">Cargando productos...</p>}
      {error && <p role="alert" className="rounded-xl bg-red-500/10 border border-red-400/40 text-red-300 p-4">{error}</p>}

      {!cargando && !error && (
        <>
          <p className="text-sm text-[#BCA8E0] mb-5">{productosFiltrados.length} productos encontrados</p>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosFiltrados.map((p) => (
                <article key={p.id} className="bg-[#24123F] border border-[#43237A] rounded-2xl overflow-hidden hover:border-[#C6F432] flex flex-col transition group justify-between">
                  <Link to={`/productos/${p.id}`} className="overflow-hidden">
                    <img
                      src={imgSrc(p.imagenUrl)}
                      alt={p.nombre}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  </Link>

                  <div className="p-5">
                    {p.categoria && <span className="text-xs text-[#C6F432] uppercase tracking-wider">{p.categoria}</span>}
                    <h2 className="text-xl font-bold mt-2 mb-3">{p.nombre}</h2>
                    <p className="text-2xl font-bold mb-4">{clp(p.precio)}</p>
                    <p className="text-sm text-[#BCA8E0] mb-4">
                      {p.stock > 0 ? `${p.stock} unidades disponibles` : "Agotado"}
                    </p>
                    <Link to={`/productos/${p.id}`} className="block text-center bg-[#C6F432] text-[#1A0B2E] font-bold py-3 rounded-xl hover:brightness-110 transition">
                      Ver detalles
                    </Link>
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
        </>
      )}
    </main>
  );
}
