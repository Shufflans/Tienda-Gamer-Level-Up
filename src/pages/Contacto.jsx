import { useState } from "react";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const [estado, setEstado] = useState("");

  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
    setEstado("");
  }

  function manejarEnvio(e) {
    e.preventDefault();

    setEstado(
      "Formulario validado. Para enviar mensajes reales, debemos conectar un servicio de contacto."
    );
  }

  return (
    <main className="min-h-[80vh] px-5 py-12">
      <section className="max-w-xl mx-auto">
        <p className="text-[#C6F432] font-bold tracking-widest mb-3">ESTAMOS PARA AYUDARTE</p>

        <h1 className="text-3xl font-bold mb-3">Contacto</h1>

        <p className="text-[#BCA8E0] mb-8">¿Tienes alguna pregunta? enviala</p>

        <form onSubmit={manejarEnvio}className="bg-[#24123F] border border-[#43237A] rounded-2xl p-6 space-y-5">
          <div>
            <label htmlFor="nombre" className="block mb-2">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block mb-2">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              required
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          <div>
            <label htmlFor="asunto" className="block mb-2">Asunto</label>
            <input
              id="asunto"
              name="asunto"
              value={formulario.asunto}
              onChange={manejarCambio}
              required
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block mb-2">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formulario.mensaje}
              onChange={manejarCambio}
              required
              minLength={10}
              rows={4}
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          {estado && (
            <p role="status" className="text-[#C6F432] text-sm">{estado}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl"
          >
            Validar formulario
          </button>
        </form>
      </section>
    </main>
  );
}
