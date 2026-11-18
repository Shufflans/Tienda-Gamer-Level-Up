// Panel interno: lo que se ve depende del rol (Administrador o Vendedor).
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROL_LABEL } from "../utils/roles";

export default function Panel() {
  const { user, hasRole } = useAuth();

  return (
    <main className="max-w-5xl mx-auto p-5 md:p-8">
      <p className="text-[#C6F432] text-sm font-bold tracking-widest mb-3">LEVEL-UP GAMER</p>
      <h1 className="text-3xl font-bold mb-2">Panel de gestión</h1>
      <p className="text-[#BCA8E0] mb-8">
        Sesión iniciada como <strong>{user.username}</strong> ({ROL_LABEL[user.rol]})
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Administrador y Vendedor */}
        <Tarjeta to="/panel/productos" titulo="Productos" texto="Ver lista y detalle de productos." />
        <Tarjeta to="/panel/ordenes" titulo="Órdenes" texto="Ver lista y detalle de órdenes." />

        {/* Solo Administrador */}
        {hasRole(ROLES.ADMIN) && (
          <Tarjeta to="/admin/agregar" titulo="Agregar producto" texto="Crear nuevos productos en la tienda." />
        )}
      </div>
    </main>
  );
}

function Tarjeta({ to, titulo, texto }) {
  return (
    <Link
      to={to}
      className="block bg-[#24123F] border border-[#43237A] rounded-2xl p-6 shadow-xl hover:border-[#C6F432] transition"
    >
      <h2 className="text-xl font-bold mb-1">{titulo}</h2>
      <p className="text-[#BCA8E0] text-sm">{texto}</p>
    </Link>
  );
}
