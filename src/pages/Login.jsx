import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../utils/roles";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const mensaje = location.state?.registroExitoso
    ? "Cuenta creada correctamente. Ya puedes iniciar sesión."
    : "";

  // Si ya hay una sesión activa no se muestra el login
  if (user) return <Navigate to={homeFor(user.rol)} replace />;

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    const usuarioLimpio = usuario.trim();
    if (!usuarioLimpio || !password) {
      setError("Completa el usuario y la contraseña.");
      return;
    }

    setCargando(true);
    try {
      // POST /api/auth/login -> guarda token, refreshToken y rol (ver AuthContext)
      const sesion = await login(usuarioLimpio, password);
      // Vuelve a la página que quería abrir, o a la pantalla de inicio de su rol
      const destino = location.state?.from?.pathname ?? homeFor(sesion.rol);
      navigate(destino, { replace: true });
    } catch (err) {
      if (!err.response) setError("No hay conexión con el servidor.");
      else setError("Usuario o contraseña incorrectos.");
    } finally {
      setCargando(false);
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
            <label htmlFor="usuario" className="block mb-2">Usuario o correo electrónico</label>

            <input
              id="usuario"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
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

          {mensaje && <p role="status" className="text-[#C6F432] text-sm">{mensaje}</p>}

          {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl hover:brightness-110 transition disabled:opacity-60"
          >
            {cargando ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-[#BCA8E0] mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-[#C6F432] font-bold hover:underline">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
