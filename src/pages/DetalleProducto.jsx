import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productService } from "../services/productService";
import { agregarAlCarrito } from "../data/carrito.js";
import { imgSrc } from "../utils/imagenes";
import { clp } from "../utils/roles";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [estado, setEstado] = useState("cargando"); // cargando | ok | noEncontrado | error
  const [mensaje, setMensaje] = useState("");

  // GET /api/productos/{id}
  useEffect(() => {
    setEstado("cargando");
    productService
      .obtener(id)
      .then((p) => {
        setProducto(p);
        setEstado("ok");
      })
      .catch((err) => setEstado(err.response?.status === 404 ? "noEncontrado" : "error"));
  }, [id]);

  if (estado === "cargando") {
    return <main className="min-h-[70vh] flex items-center justify-center text-[#BCA8E0]">Cargando producto...</main>;
  }

  if (estado !== "ok" || !producto) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {estado === "noEncontrado" ? "Producto no encontrado" : "No se pudo cargar el producto"}
        </h1>
        <Link to="/productos" className="text-[#C6F432] underline">Volver al catálogo</Link>
      </main>
    );
  }

  function manejarAgregar() {
    const resultado = agregarAlCarrito(producto);
    setMensaje(resultado.mensaje);
  }

  return (
    <main className="max-w-6xl mx-auto px-5 py-12">
      <Link to="/productos" className="text-[#C6F432] hover:underline">← Volver a productos</Link>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 items-center">
        <div className="overflow-hidden rounded-2xl border border-[#43237A] group cursor-zoom-in">
          <img
            src={imgSrc(producto.imagenUrl)}
            alt={producto.nombre}
            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-150"
          />
        </div>

        <div>
          {producto.categoria && (
            <span className="text-[#C6F432] uppercase tracking-widest text-sm">{producto.categoria}</span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-5">{producto.nombre}</h1>
          <p className="text-3xl font-bold mb-6">{clp(producto.precio)}</p>
          <p className="text-[#BCA8E0] leading-relaxed mb-6">{producto.descripcion}</p>

          <p className="mb-7">
            Disponibilidad:{" "}
            <span className={producto.stock > 0 ? "text-[#C6F432]" : "text-red-400"}>
              {producto.stock > 0 ? `${producto.stock} unidades` : "Agotado"}
            </span>
          </p>

          <button
            type="button"
            disabled={producto.stock === 0}
            onClick={manejarAgregar}
            className="bg-[#C6F432] text-[#1A0B2E] font-bold px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Agregar al carrito
          </button>

          {mensaje && <p role="status" className="mt-4 text-[#C6F432]">{mensaje}</p>}

          <div className="mt-5">
            <Link to="/carrito" className="text-[#C6F432] underline">Ir al carrito</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
