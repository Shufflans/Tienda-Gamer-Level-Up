import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje] = useState(
    location.state?.registroExitoso
      ? "Cuenta creada correctamente. Ya puedes iniciar sesión."
      : ""
  );

  function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    const correoNormalizado = correo.trim().toLowerCase();

    if (!correoNormalizado || !password) {
      setError("Completa el correo electrónico y la contraseña.");
      return;
    }

    let usuarios;
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch {
      setError("No se pudieron consultar las cuentas guardadas.");
      return;
    }

    if (!Array.isArray(usuarios)) {
      usuarios = [];
    }

    const existeAdmin = usuarios.some(u => u.correo === "admin@levelup.com");

    if (!existeAdmin) {
      const adminPorDefecto = {
        id: "admin-1",
        nombre: "Administrador",
        correo: "admin@levelup.com",
        password: "admin",
        rol: "admin",
      };
      usuarios.push(adminPorDefecto);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo === correoNormalizado &&
        usuario.password === password
    );

    if (!usuarioEncontrado) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    try {
      sessionStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          correo: usuarioEncontrado.correo,
          rol: usuarioEncontrado.rol || "cliente",
        })
      );
    } catch {
      setError("No se pudo iniciar la sesión en este navegador.");
      return;
    }

    if (usuarioEncontrado.rol === "admin") {
      navigate("/admin/agregar", { replace: true });
    } else {
      navigate("/productos", { replace: true });
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-md bg-[#24123F] border border-[#43237A] rounded-2xl p-7 md:p-9 shadow-xl">
        <p className="text-[#C6F432] text-sm font-bold tracking-widest mb-3">LEVEL-UP GAMER</p>

        <h1 className="text-3xl font-bold mb-2">Iniciar sesión</h1>

        <p className="text-[#BCA8E0] mb-8">Ingresa a tu cuenta para continuar.</p>

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <label htmlFor="correo" className="block mb-2">Correo electrónico</label>

            <input
              id="correo"
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">Contraseña</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
            />
          </div>

          {mensaje && (<p role="status" className="text-[#C6F432] text-sm">{mensaje}</p>
          )}

          {error && (<p role="alert" className="text-red-400 text-sm">{error}</p>
          )}

          <button type="submit"className="w-full bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl hover:brightness-110 transition">Entrar</button>
        </form>

        <p className="text-center text-[#BCA8E0] mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro"className="text-[#C6F432] font-bold hover:underline">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
