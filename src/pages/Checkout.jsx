import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerCarrito, vaciarCarrito } from "../data/carrito";

const formatoPrecio = (precio) =>
  precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export default function Checkout() {
  const navigate = useNavigate();
  const [carrito] = useState(() => obtenerCarrito());
  const [resultado, setResultado] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    comuna: "",
    pago: "aprobado",
  });

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  const cambiarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const procesarCompra = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {navigate("/carrito");return; }
    if (formulario.pago === "rechazado") { setResultado("rechazado");return;}

    const pedido = {
      numero: `LUG-${Date.now().toString().slice(-8)}`,
      cliente: {
        nombre: formulario.nombre,
        email: formulario.email,
        telefono: formulario.telefono,
        direccion: formulario.direccion,
        comuna: formulario.comuna,
      },
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
      estado: "Pagado (simulación)",
    };

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos") || "[]");

    localStorage.setItem(
      "pedidos",
      JSON.stringify([...pedidosGuardados, pedido])
    );

    vaciarCarrito();
    setResultado("aprobado");
  };

  if (resultado === "aprobado") {
    const pedido = JSON.parse(localStorage.getItem("pedidos") || "[]").at(-1);

    return (
      <main className="min-h-[80vh] px-4 py-12 text-center">
        <section className="mx-auto max-w-xl rounded-2xl border border-lime-400/30 bg-[#241342] p-8">
          <div className="mb-4 text-6xl text-lime-400">listo</div>
          <h1 className="mb-3 text-3xl font-black text-lime-400">Compra exitosa</h1>
          <p className="mb-4 text-[#BCA8E0]">Tu pedido se registró correctamente</p>
          <p className="mb-2 font-bold">Pedido: {pedido?.numero}</p>
          <p className="mb-6 text-xl font-bold">Total: {formatoPrecio(total)}</p>
          <Link to="/productos" className="inline-block rounded-xl bg-[#C6F432] px-6 py-3 font-bold text-[#1A0B2E] hover:scale-105 transition">Seguir comprando</Link>
        </section>
      </main>
    );
  }

  if (resultado === "rechazado") {
    return (
      <main className="min-h-[80vh] px-4 py-12 text-center">
        <section className="mx-auto max-w-xl rounded-2xl border border-red-400/30 bg-[#241342] p-8">
          <div className="mb-4 text-6xl text-red-400">error</div>
          <h1 className="mb-3 text-3xl font-black text-red-400">Pago rechazado</h1>
          <p className="mb-6 text-[#BCA8E0]"> El pago fue rechazado, tus productos siguen en el carrito.</p>
          <button onClick={() => setResultado(null)} className="rounded-xl bg-[#C6F432] px-6 py-3 font-bold text-[#1A0B2E]">Intentar nuevamente</button>
        </section>
      </main>
    );
  }

  if (carrito.length === 0) {
    return (
      <main className="min-h-[70vh] px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-black text-lime-400">Tu carrito está vacío</h1>
        <Link to="/productos" className="inline-block rounded-xl bg-[#C6F432] px-6 py-3 font-bold text-[#1A0B2E]">Ver productos</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-black text-lime-400 md:text-4xl">Finalizar compra</h1>
        <p className="mb-8 text-[#BCA8E0]">Completa tus datos para registrar tu pedido.</p>
        <form onSubmit={procesarCompra} className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Datos del cliente */}
          <section className="rounded-2xl border border-purple-800 bg-[#241342] p-6">
            <h2 className="mb-6 text-xl font-bold"> Datos de entrega</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="mb-2 block text-sm">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={cambiarCampo}
                  required
                  autoComplete="name"
                  maxLength={100}
                  className="w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formulario.email}
                  onChange={cambiarCampo}
                  required
                  autoComplete="email"
                  maxLength={150}
                  className="w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400"
                  placeholder="correo@ejemplo.cl"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formulario.telefono}
                  onChange={cambiarCampo}
                  required
                  autoComplete="tel"
                  maxLength={20}
                  className="w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="direccion" className="mb-2 block text-sm">Dirección</label>
                <input
                  id="direccion"
                  name="direccion"
                  value={formulario.direccion}
                  onChange={cambiarCampo}
                  required
                  autoComplete="street-address"
                  maxLength={200}
                  className="w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400"
                  placeholder="Calle y número"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="comuna" className="mb-2 block text-sm">Comuna</label>
                <input
                  id="comuna"
                  name="comuna"
                  value={formulario.comuna}
                  onChange={cambiarCampo}
                  required
                  autoComplete="address-level2"
                  maxLength={100}
                  className="w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400"
                  placeholder="Tu comuna"
                />
              </div>
            </div>

                <h2 className="mb-4 mt-8 text-xl font-bold">Método de pago</h2>

                <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-purple-700 p-4 has-[:checked]:border-lime-400">
                    <input
                    type="radio"
                    name="pago"
                    value="transferencia"
                    checked={formulario.pago === "transferencia"}
                    onChange={cambiarCampo}
                    className="mt-1 accent-lime-400"
                    />
                    <span>
                    <span className="block font-bold">Transferencia bancaria</span>
                    </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-purple-700 p-4 has-[:checked]:border-lime-400">
                    <input
                    type="radio"
                    name="pago"
                    value="tarjeta"
                    checked={formulario.pago === "tarjeta"}
                    onChange={cambiarCampo}
                    className="mt-1 accent-lime-400"
                    />
                    <span>
                    <span className="block font-bold">Tarjeta de débito/crédito</span>
                    </span>
                </label>
                </div>
          </section>

          {/* Resumen del pedido */}
          <aside className="h-fit rounded-2xl border border-purple-800 bg-[#241342] p-6">
            <h2 className="mb-5 text-xl font-bold">Resumen del pedido</h2>

            <div className="mb-5 space-y-4">
              {carrito.map((producto) => (
                <div key={producto.id} className="flex justify-between gap-4 border-b border-purple-800 pb-4">
                  <div>
                    <p className="font-bold">{producto.nombre}</p>
                    <p className="text-sm text-[#BCA8E0]">Cantidad: {producto.cantidad}</p>
                  </div>
                  <p className="shrink-0 font-bold"> {formatoPrecio(producto.precio * producto.cantidad)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between gap-4 border-t border-purple-700 pt-4 text-lg font-black">
              <span>Total</span>
              <span className="text-lime-400">{formatoPrecio(total)}</span>
            </div>

            <button type="submit" className="mt-6 w-full rounded-xl bg-[#C6F432] px-5 py-4 font-black text-[#1A0B2E] transition hover:scale-[1.02]"> Confirmar compra</button>
            <Link to="/carrito" className="mt-4 block text-center text-sm text-[#BCA8E0] hover:text-lime-400"> Volver al carrito</Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
