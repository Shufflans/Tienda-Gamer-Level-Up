import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!correo.trim() || !password) {
      setError("Completa todos los campos.");
      return;
    }

    setMensaje(
      "Formulario validado. El inicio de sesión real requiere conectar una autenticación."
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-md bg-[#24123F] border border-[#43237A] rounded-2xl p-7 md:p-9 shadow-xl">
        <p className="text-[#C6F432] text-sm font-bold tracking-widest mb-3">
          LEVEL-UP GAMER
        </p>

        <h1 className="text-3xl font-bold mb-2">Iniciar sesión</h1>
        <p className="text-[#BCA8E0] mb-8">
          Ingresa a tu cuenta para continuar.
        </p>

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <label htmlFor="correo" className="block mb-2">
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

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
            className="w-full bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl hover:brightness-110 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-[#BCA8E0] mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-[#C6F432] font-bold">
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  );
}
