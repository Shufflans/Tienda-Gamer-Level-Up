import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerCarrito, vaciarCarrito } from "../data/carrito";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import { pagoService } from "../services/pagoService";
import { calcularTotales, IVA } from "../utils/impuestos";
import { clp, errorMsg } from "../utils/roles";

const input =
  "w-full rounded-lg border border-purple-700 bg-[#180b2d] p-3 outline-none focus:border-lime-400";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [carrito] = useState(() => obtenerCarrito());
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: user?.username?.includes("@") ? user.username : "",
    telefono: "",
    direccion: "",
    comuna: "",
    pago: "tarjeta",
    tarjeta: "",
  });

  const { neto, iva, total } = calcularTotales(carrito);

  const cambiarCampo = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  async function procesarCompra(e) {
    e.preventDefault();
    setError("");

    if (carrito.length === 0) {
      navigate("/carrito");
      return;
    }
    if (!/^[+\d][\d\s-]{7,}$/.test(formulario.telefono.trim())) {
      setError("Ingresa un teléfono válido.");
      return;
    }

    setProcesando(true);

    // 1) Pago (simulado: ver services/pagoService.js)
    const pago = await pagoService.procesar({ metodo: formulario.pago, numeroTarjeta: formulario.tarjeta });
    if (!pago.aprobado) {
      navigate("/compra-fallida", { state: { motivo: pago.motivo } });
      return;
    }

    // 2) Registrar el pedido en el backend: POST /api/pedidos
    const entrega = {
      nombreCliente: formulario.nombre.trim(),
      email: formulario.email.trim(),
      telefono: formulario.telefono.trim(),
      direccionEnvio: formulario.direccion.trim(),
      comuna: formulario.comuna.trim(),
    };
    try {
      const pedido = await orderService.crear({ items: carrito, entrega });
      vaciarCarrito();
      navigate("/compra-exitosa", {
        replace: true,
        state: { numero: pedido?.id, items: carrito, neto, iva, total, entrega, metodo: formulario.pago },
      });
    } catch (err) {
      navigate("/compra-fallida", {
        state: { motivo: errorMsg(err, "No se pudo registrar el pedido. Intenta nuevamente.") },
      });
    }
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
        <p className="mb-8 text-[#BCA8E0]">Completa tus datos y dirección de entrega para registrar tu pedido.</p>

        <form onSubmit={procesarCompra} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Datos del cliente */}
          <section className="rounded-2xl border border-purple-800 bg-[#241342] p-6">
            <h2 className="mb-6 text-xl font-bold">Datos de entrega</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="mb-2 block text-sm">Nombre completo</label>
                <input id="nombre" name="nombre" value={formulario.nombre} onChange={cambiarCampo} required autoComplete="name" maxLength={100} className={input} placeholder="Tu nombre" />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm">Correo electrónico</label>
                <input id="email" name="email" type="email" value={formulario.email} onChange={cambiarCampo} required autoComplete="email" maxLength={150} className={input} placeholder="correo@ejemplo.cl" />
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm">Teléfono</label>
                <input id="telefono" name="telefono" type="tel" value={formulario.telefono} onChange={cambiarCampo} required autoComplete="tel" maxLength={20} className={input} placeholder="+56 9 1234 5678" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="direccion" className="mb-2 block text-sm">Dirección</label>
                <input id="direccion" name="direccion" value={formulario.direccion} onChange={cambiarCampo} required autoComplete="street-address" maxLength={200} className={input} placeholder="Calle y número" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="comuna" className="mb-2 block text-sm">Comuna</label>
                <input id="comuna" name="comuna" value={formulario.comuna} onChange={cambiarCampo} required autoComplete="address-level2" maxLength={100} className={input} placeholder="Tu comuna" />
              </div>
            </div>

            <h2 className="mb-4 mt-8 text-xl font-bold">Método de pago</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { valor: "transferencia", texto: "Transferencia bancaria" },
                { valor: "tarjeta", texto: "Tarjeta de débito/crédito" },
              ].map((m) => (
                <label key={m.valor} className="flex cursor-pointer items-start gap-3 rounded-xl border border-purple-700 p-4 has-[:checked]:border-lime-400">
                  <input type="radio" name="pago" value={m.valor} checked={formulario.pago === m.valor} onChange={cambiarCampo} className="mt-1 accent-lime-400" />
                  <span className="block font-bold">{m.texto}</span>
                </label>
              ))}
            </div>

            {formulario.pago === "tarjeta" && (
              <div className="mt-5">
                <label htmlFor="tarjeta" className="mb-2 block text-sm">Número de tarjeta</label>
                <input
                  id="tarjeta"
                  name="tarjeta"
                  inputMode="numeric"
                  value={formulario.tarjeta}
                  onChange={cambiarCampo}
                  required
                  maxLength={19}
                  autoComplete="off"
                  className={input}
                  placeholder="4111 1111 1111 1111"
                />
                <p className="mt-2 text-xs text-[#BCA8E0]">
                  Pago simulado: no se guarda ni se envía ningún dato de la tarjeta. Una tarjeta terminada en 0000 es rechazada.
                </p>
              </div>
            )}

            {error && <p role="alert" className="mt-5 text-sm text-red-400">{error}</p>}
          </section>

          {/* Resumen del pedido con impuestos */}
          <aside className="h-fit rounded-2xl border border-purple-800 bg-[#241342] p-6">
            <h2 className="mb-5 text-xl font-bold">Resumen del pedido</h2>

            <div className="mb-5 space-y-4">
              {carrito.map((p) => (
                <div key={p.id} className="flex justify-between gap-4 border-b border-purple-800 pb-4">
                  <div>
                    <p className="font-bold">{p.nombre}</p>
                    <p className="text-sm text-[#BCA8E0]">Cantidad: {p.cantidad}</p>
                  </div>
                  <p className="shrink-0 font-bold">{clp(p.precio * p.cantidad)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-[#BCA8E0]">
              <div className="flex justify-between gap-4"><span>Subtotal (neto)</span><span>{clp(neto)}</span></div>
              <div className="flex justify-between gap-4"><span>IVA ({Math.round(IVA * 100)}%)</span><span>{clp(iva)}</span></div>
            </div>

            <div className="mt-4 flex justify-between gap-4 border-t border-purple-700 pt-4 text-lg font-black">
              <span>Total</span>
              <span className="text-lime-400">{clp(total)}</span>
            </div>

            <button
              type="submit"
              disabled={procesando}
              className="mt-6 w-full rounded-xl bg-[#C6F432] px-5 py-4 font-black text-[#1A0B2E] transition hover:scale-[1.02] disabled:opacity-60"
            >
              {procesando ? "Procesando pago..." : "Confirmar compra"}
            </button>
            <Link to="/carrito" className="mt-4 block text-center text-sm text-[#BCA8E0] hover:text-lime-400">Volver al carrito</Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
