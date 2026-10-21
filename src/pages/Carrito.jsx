import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
} from "../data/carrito.js";

export default function Carrito() {
  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  useEffect(() => {
    function actualizarCarrito() {
      setCarrito(obtenerCarrito());
    }

    window.addEventListener("carritoActualizado", actualizarCarrito);
    return () =>
      window.removeEventListener("carritoActualizado", actualizarCarrito);
  }, []);

  const formatoPrecio = (precio) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  return (
    <main className="max-w-6xl mx-auto px-5 py-12 min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Tu carrito</h1>

      {carrito.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#BCA8E0] mb-6">Tu carrito está vacío.</p>
          <Link to="/productos" className="inline-block bg-[#C6F432] text-[#1A0B2E] font-bold px-6 py-3 rounded-xl">Explorar productos</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {carrito.map((producto) => (
              <article key={producto.id} className="flex flex-col sm:flex-row gap-5 items-center bg-[#24123F] border border-[#43237A] rounded-2xl p-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-28 h-28 object-contain rounded-xl"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-bold text-lg">{producto.nombre}</h2>
                  <p className="text-[#BCA8E0]"> {formatoPrecio(producto.precio)} por unidad</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad - 1)
                    }
                    className="border border-[#43237A] rounded-lg w-9 h-9"
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center"> {producto.cantidad}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    disabled={producto.cantidad >= producto.stock}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad + 1)
                    }
                    className="border border-[#43237A] rounded-lg w-9 h-9 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold">{formatoPrecio(producto.precio * producto.cantidad)}</p>

                <button
                  type="button"
                  onClick={() => eliminarDelCarrito(producto.id)}
                  className="text-red-400 underline"
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="mt-8 ml-auto max-w-sm bg-[#24123F] border border-[#43237A] rounded-2xl p-6">
            <div className="flex justify-between gap-4 mb-6">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold text-[#C6F432]">{formatoPrecio(total)}</span>
            </div>
            <Link to="/checkout" className="block w-full bg-[#C6F432] text-[#1A0B2E] font-bold py-3 rounded-xl text-center hover:scale-[1.02] transition">Continuar compra</Link>
          </div>
        </>
      )}
    </main>
  );
}
