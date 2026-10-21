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
          {/* Logo */}
          <Link to="/"onClick={cerrarMenu} className="text-2xl font-black text-lime-400 shrink-0">LEVEL-UP<span className="block text-sm text-lime-400">GAMER</span></Link>

          {/* Buscador escritorio */}
          <form onSubmit={buscarProductos}className="hidden md:flex flex-1 max-w-xl mx-4">
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-purple-700 bg-[#180b2d] px-4 py-2 text-sm text-white outline-none focus:border-lime-400"
            />

            <button type="submit" aria-label="Buscar productos" className="ml-2 text-lime-400 hover:text-lime-300"><FaSearch /></button>
          </form>

          {/* Carrito escritorio */}
          <Link to="/carrito" onClick={cerrarMenu} aria-label="Ver carrito" className="hidden md:flex items-center gap-2 text-lime-400 hover:text-lime-300"> <FaCartShopping size={22} /><span>Carrito</span></Link>

          {/* Botón menú móvil */}
          <button type="button" onClick={() => setMenuAbierto(!menuAbierto)} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} className="md:hidden text-lime-400 text-2xl">
            {menuAbierto ? <IoCloseSharp /> : <CiMenuBurger />}
          </button>
        </div>

        {/* Navegación escritorio */}
        <div className="hidden md:flex items-center justify-center gap-10 border-t border-purple-800 py-3 font-bold">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <Link to="/productos" className="hover:text-lime-400">Productos</Link>
          <Link to="/nosotros" className="hover:text-lime-400">Nosotros</Link>
          <Link to="/blog" className="hover:text-lime-400">Blog</Link>
          <Link to="/contacto" className="hover:text-lime-400">Contacto</Link>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden border-t border-purple-800 py-4">
            {/* Buscador móvil */}
            <form
              onSubmit={buscarProductos}
              className="flex mb-4"
            >
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-l-lg border border-purple-700 bg-[#180b2d] px-3 py-2 text-sm text-white outline-none focus:border-lime-400"
              />

              <button type="submit" aria-label="Buscar productos"className="rounded-r-lg bg-lime-400 px-4 text-[#180b2d]">
                <FaSearch />
              </button>
            </form>

            {/* Enlaces móvil */}
            <div className="flex flex-col gap-4 font-bold">
              <Link to="/" onClick={cerrarMenu} className="hover:text-lime-400">Home</Link>
              <Link to="/productos" onClick={cerrarMenu} className="hover:text-lime-400">Productos</Link>
              <Link to="/nosotros" onClick={cerrarMenu} className="hover:text-lime-400">Nosotros</Link>
              <Link to="/blog" onClick={cerrarMenu} className="hover:text-lime-400">Blog</Link>
              <Link to="/contacto" onClick={cerrarMenu} className="hover:text-lime-400">Contacto</Link>
              <Link to="/carrito" onClick={cerrarMenu} className="flex items-center gap-2 text-lime-400"><FaCartShopping />Carrito</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
