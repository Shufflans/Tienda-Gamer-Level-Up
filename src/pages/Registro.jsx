import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../utils/roles";

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])\S{8,}$/;

export default function Registro() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    correo: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  if (user) return <Navigate to={homeFor(user.rol)} replace />;

  function manejarCambio(e) {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    setError("");
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    const correo = formulario.correo.trim().toLowerCase();
    const { password, confirmarPassword } = formulario;

    if (!correo || !password || !confirmarPassword) {
      setError("Debes completar todos los campos.");
      return;
    }
    if (!regexCorreo.test(correo)) {
      setError("Ingresa un correo válido con un solo @.");
      return;
    }
    if (!regexPassword.test(password)) {
      setError("La contraseña necesita 8 caracteres, mayúscula, minúscula, número y símbolo.");
      return;
    }
    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      // POST /api/auth/register y luego login automático. El correo se usa como "username".
      const sesion = await register(correo, password);
      navigate(homeFor(sesion.rol), { replace: true });
    } catch (err) {
      if (!err.response) setError("No hay conexión con el servidor.");
      else setError("No se pudo crear la cuenta. Es posible que ese correo ya esté registrado.");
    } finally {
      setCargando(false);
    }
  }

  const campos = [
    { nombre: "correo", etiqueta: "Correo electrónico", tipo: "email", autocomplete: "email" },
    { nombre: "password", etiqueta: "Contraseña", tipo: "password", autocomplete: "new-password" },
    { nombre: "confirmarPassword", etiqueta: "Confirmar contraseña", tipo: "password", autocomplete: "new-password" },
  ];

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-lg bg-[#24123F] border border-[#43237A] rounded-2xl p-7 md:p-9 shadow-xl">
        <p className="text-[#C6F432] text-sm font-bold tracking-widest mb-3">ÚNETE A LA COMUNIDAD</p>

        <h1 className="text-3xl font-bold mb-2">Crear cuenta</h1>

        <p className="text-[#BCA8E0] mb-7">Regístrate para disfrutar de Level-Up Gamer.</p>

        <form onSubmit={manejarEnvio} className="space-y-5">
          {campos.map((campo) => (
            <div key={campo.nombre}>
              <label htmlFor={campo.nombre} className="block mb-2">
                {campo.etiqueta}
              </label>

              <input
                id={campo.nombre}
                name={campo.nombre}
                type={campo.tipo}
                autoComplete={campo.autocomplete}
                value={formulario[campo.nombre]}
                onChange={manejarCambio}
                required
                className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]"
              />
            </div>
          ))}

          {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#D81B7E] text-white font-bold p-3 rounded-xl hover:brightness-110 transition disabled:opacity-60"
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-[#BCA8E0] mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#C6F432] font-bold hover:underline">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}
