import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROL_LABEL } from "../utils/roles";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const { user, hasRole, logout } = useAuth();

  const esAdmin = hasRole(ROLES.ADMIN);
  const esVendedor = hasRole(ROLES.VENDEDOR);

  // El menú se arma según el rol. El Vendedor SOLO ve productos y órdenes.
  const enlaces = esVendedor
    ? [
        { to: "/panel/productos", texto: "Productos" },
        { to: "/panel/ordenes", texto: "Órdenes" },
      ]
    : [
        { to: "/", texto: "Home" },
        { to: "/productos", texto: "Productos" },
        { to: "/nosotros", texto: "Nosotros" },
        { to: "/blog", texto: "Blog" },
        { to: "/contacto", texto: "Contacto" },
      ];
  if (esAdmin) enlaces.push({ to: "/panel", texto: "Panel" });

  const cerrarMenu = () => setMenuAbierto(false);

  const cerrarSesion = async () => {
    await logout();
    cerrarMenu();
    navigate("/login");
  };

  const buscarProductos = (e) => {
    e.preventDefault();
    const termino = busqueda.trim();
    navigate(termino ? `/productos?q=${encodeURIComponent(termino)}` : "/productos");
    setMenuAbierto(false);
  };

  return (
    <nav className="bg-[#241342] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link to={esVendedor ? "/panel" : "/"} onClick={cerrarMenu} className="text-2xl font-black text-lime-400 shrink-0">
            LEVEL-UP<span className="block text-sm text-lime-400">GAMER</span>
          </Link>

          {/* Buscador y carrito: solo en la tienda (no para el Vendedor) */}
          {!esVendedor && (
            <>
              <form onSubmit={buscarProductos} className="hidden md:flex flex-1 max-w-xl mx-4">
                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full rounded-full border border-purple-700 bg-[#180b2d] px-4 py-2 text-sm text-white outline-none focus:border-lime-400"
                />
                <button type="submit" aria-label="Buscar productos" className="ml-2 text-lime-400 hover:text-lime-300">
                  <FaSearch />
                </button>
              </form>

              <Link to="/carrito" onClick={cerrarMenu} aria-label="Ver carrito" className="hidden md:flex items-center gap-2 text-lime-400 hover:text-lime-300">
                <FaCartShopping size={22} />
                <span>Carrito</span>
              </Link>
            </>
          )}

          <button type="button" onClick={() => setMenuAbierto(!menuAbierto)} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} className="md:hidden text-lime-400 text-2xl">
            {menuAbierto ? <IoCloseSharp /> : <CiMenuBurger />}
          </button>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center justify-center gap-8 border-t border-purple-800 py-3 font-bold text-sm">
          {enlaces.map((e) => (
            <Link key={e.to} to={e.to} className="hover:text-lime-400">{e.texto}</Link>
          ))}

          {esAdmin && (
            <Link to="/admin/agregar" className="bg-lime-400 text-[#180b2d] px-3 py-1 rounded-lg hover:brightness-110 transition">
              + Agregar Producto
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-purple-300">
                Hola, {user.username} · {ROL_LABEL[user.rol] ?? user.rol}
              </span>
              <button onClick={cerrarSesion} className="text-red-400 hover:underline">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-lime-400">Inicio de Sesión</Link>
              <Link to="/registro" className="text-[#D81B7E]">Registrarse</Link>
            </>
          )}
        </div>

        {/* MENÚ MÓVIL */}
        {menuAbierto && (
          <div className="md:hidden border-t border-purple-800 py-4">
            {!esVendedor && (
              <form onSubmit={buscarProductos} className="flex mb-4">
                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full rounded-l-lg border border-purple-700 bg-[#180b2d] px-3 py-2 text-sm text-white outline-none focus:border-lime-400"
                />
                <button type="submit" aria-label="Buscar productos" className="rounded-r-lg bg-lime-400 px-4 text-[#180b2d]">
                  <FaSearch />
                </button>
              </form>
            )}

            <div className="flex flex-col gap-4 font-bold">
              {enlaces.map((e) => (
                <Link key={e.to} to={e.to} onClick={cerrarMenu} className="hover:text-lime-400">{e.texto}</Link>
              ))}

              {!esVendedor && (
                <Link to="/carrito" onClick={cerrarMenu} className="flex items-center gap-2 text-lime-400"><FaCartShopping />Carrito</Link>
              )}

              {esAdmin && (
                <Link to="/admin/agregar" onClick={cerrarMenu} className="text-lime-400">
                  + Agregar Producto
                </Link>
              )}

              {user ? (
                <button onClick={cerrarSesion} className="text-left text-red-400">
                  Cerrar Sesión ({user.username})
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={cerrarMenu} className="text-lime-400">Inicio de Sesión</Link>
                  <Link to="/registro" onClick={cerrarMenu} className="text-[#D81B7E]">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
