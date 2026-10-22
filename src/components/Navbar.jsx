import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

    let usuarioSesion = null;
    try {
      const sesionGuardada = sessionStorage.getItem("usuarioActual");
      if (sesionGuardada) {
        usuarioSesion = JSON.parse(sesionGuardada);
      }
    } catch (e) {
      console.error("Error al leer la sesión:", e);
    }

  const cerrarSesion = () => {
    sessionStorage.removeItem("usuarioActual");
    cerrarMenu();
    navigate("/login");
  };

  const buscarProductos = (e) => {
    e.preventDefault();

    const termino = busqueda.trim();

    if (termino) {
      navigate(`/productos?q=${encodeURIComponent(termino)}`);
    } else {
      navigate("/productos");
    }

    setMenuAbierto(false);
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="bg-[#241342] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link to="/" onClick={cerrarMenu} className="text-2xl font-black text-lime-400 shrink-0">
            LEVEL-UP<span className="block text-sm text-lime-400">GAMER</span>
          </Link>

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

          <button type="button" onClick={() => setMenuAbierto(!menuAbierto)} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} className="md:hidden text-lime-400 text-2xl">
            {menuAbierto ? <IoCloseSharp /> : <CiMenuBurger />}
          </button>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center justify-center gap-8 border-t border-purple-800 py-3 font-bold text-sm">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <Link to="/productos" className="hover:text-lime-400">Productos</Link>
          <Link to="/nosotros" className="hover:text-lime-400">Nosotros</Link>
          <Link to="/blog" className="hover:text-lime-400">Blog</Link>
          <Link to="/contacto" className="hover:text-lime-400">Contacto</Link>

          {usuarioSesion?.rol === "admin" && (
            <Link to="/admin/agregar" className="bg-lime-400 text-[#180b2d] px-3 py-1 rounded-lg hover:brightness-110 transition">
              + Agregar Producto
            </Link>
          )}

          {usuarioSesion ? (
            <div className="flex items-center gap-4">
              <span className="text-purple-300">Hola, {usuarioSesion.nombre}</span>
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

            <div className="flex flex-col gap-4 font-bold">
              <Link to="/" onClick={cerrarMenu} className="hover:text-lime-400">Home</Link>
              <Link to="/productos" onClick={cerrarMenu} className="hover:text-lime-400">Productos</Link>
              <Link to="/nosotros" onClick={cerrarMenu} className="hover:text-lime-400">Nosotros</Link>
              <Link to="/blog" onClick={cerrarMenu} className="hover:text-lime-400">Blog</Link>
              <Link to="/contacto" onClick={cerrarMenu} className="hover:text-lime-400">Contacto</Link>
              <Link to="/carrito" onClick={cerrarMenu} className="flex items-center gap-2 text-lime-400"><FaCartShopping />Carrito</Link>

              {usuarioSesion?.rol === "admin" && (
                <Link to="/admin/agregar" onClick={cerrarMenu} className="text-lime-400">
                  + Agregar Producto
                </Link>
              )}

              {usuarioSesion ? (
                <button onClick={cerrarSesion} className="text-left text-red-400">
                  Cerrar Sesión ({usuarioSesion.nombre})
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