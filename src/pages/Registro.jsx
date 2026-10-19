import { useState } from "react";
import { Link } from "react-router-dom";

export default function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  }

  function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setMensaje("");

    const { nombre, correo, password, confirmarPassword } = formulario;

    if (
      !nombre.trim() ||
      !correo.trim() ||
      !password ||
      !confirmarPassword
    ) {
      setError("Completa todos los campos.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setMensaje(
      "Formulario validado correctamente. Falta conectar el registro de usuarios."
    );
  }

  const campos = [
    {
      nombre: "nombre",
      etiqueta: "Nombre completo",
      tipo: "text",
      autocomplete: "name",
    },
    {
      nombre: "correo",
      etiqueta: "Correo electrónico",
      tipo: "email",
      autocomplete: "email",
    },
    {
      nombre: "password",
      etiqueta: "Contraseña",
      tipo: "password",
      autocomplete: "new-password",
    },
    {
      nombre: "confirmarPassword",
      etiqueta: "Confirmar contraseña",
      tipo: "password",
      autocomplete: "new-password",
    },
  ];

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-lg bg-[#24123F] border border-[#43237A] rounded-2xl p-7 md:p-9 shadow-xl">
        <p className="text-[#C6F432] text-sm font-bold tracking-widest mb-3">
          ÚNETE A LA COMUNIDAD
        </p>

        <h1 className="text-3xl font-bold mb-2">Crear cuenta</h1>
        <p className="text-[#BCA8E0] mb-7">
          Regístrate para disfrutar de Level-Up Gamer.
        </p>

        <form onSubmit={manejarEnvio} className="space-y-5">
          {campos.map((campo) => (
            <div key={campo.nombre}>
              <label
                htmlFor={campo.nombre}
                className="block mb-2"
              >
                {campo.etiqueta}
              </label>

              <input
                id={campo.nombre}
                name={campo.nombre}
                type={campo.tipo}
                autoComplete={campo.autocomplete}
                value={formulario[campo.nombre]}
                onChange={manejarCambio}
                className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
              />
            </div>
          ))}

          {error && (
            <p role="alert" className="text-red-400 text-sm">
              {error}
            </p>
          )}

          {mensaje && (
            <p role="status" className="text-[#C6F432] text-sm">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#D81B7E] text-white font-bold p-3 rounded-xl hover:brightness-110 transition"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-center text-[#BCA8E0] mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#C6F432] font-bold">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
