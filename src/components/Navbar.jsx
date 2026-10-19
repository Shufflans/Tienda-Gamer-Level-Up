import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export function Navbar() {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  function cerrarMenu() {setEstaAbierto(false);}

  function manejarBusqueda(e) {e.preventDefault();

    if (busqueda.trim()) {
      window.location.href =
        `/Tienda-Gamer-Level-Up/productos?q=${encodeURIComponent(busqueda.trim())}`;
    } else {
      window.location.href = "/Tienda-Gamer-Level-Up/productos";
    }
    cerrarMenu();
  }

  const enlaces = [
    { texto: "Home", ruta: "/" },
    { texto: "Productos", ruta: "/productos" },
    { texto: "Categorías", ruta: "/productos" },
    { texto: "Ofertas", ruta: "/productos" },
    { texto: "Nosotros", ruta: "/" },
    { texto: "Blog", ruta: "/" },
    { texto: "Contacto", ruta: "/" },
  ];

  return (
    <header className="bg-[#2A1450]">
      <div className="flex flex-row justify-between p-3 items-center gap-3">
        <button
          type="button"
          aria-label={estaAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={estaAbierto}
          onClick={() => setEstaAbierto(!estaAbierto)}
          className={`text-2xl transition-transform ease-in-out duration-300 md:hidden ${
            estaAbierto ? "rotate-90" : "rotate-0"
          }`}
        >
          {estaAbierto ? <IoCloseSharp /> : <CiMenuBurger />}
        </button>

        <Link to="/" onClick={cerrarMenu} className="font-bold font-press text-center bg-[#43237A] px-4 md:px-6 py-3 rounded-full text-sm md:text-base shrink-0">
          <span className="block text-[#F5EEFF]">Level-Up</span>
          <span className="text-[#C6F432]">GAMER</span>
        </Link>

        {/* Navegación para PC */}
        <nav className="hidden md:flex bg-[#1A0B2E]">
            {enlaces.map((enlace) => (
            <Link
                key={enlace.texto}
                to={enlace.ruta}
                className="text-lg text-center p-3 hover:text-[#C6F432] transition"
            >
                {enlace.texto}
            </Link>
            ))}
            <Link to="/login" className="text-lg text-center p-3 text-[#C6F432] hover:bg-[#43237A] transition">Iniciar sesión</Link>
            <Link to="/registro" className="text-lg text-center p-3 bg-[#C6F432] text-[#1A0B2E] font-bold">Crear cuenta</Link>
        </nav>
        {/* Carrito provisional */}
        <Link to="/productos" aria-label="Ver productos y carrito" className="bg-[#C6F432] text-[#1A0B2E] p-3 rounded-xl shrink-0"> $0</Link>
      </div>

      {/* Navegación para celular */}
      <nav className={`${estaAbierto? "opacity-100 visible": "pointer-events-none opacity-0 invisible"} fixed top-20 left-0 right-0 z-50 flex flex-col bg-[#1A0B2E] overflow-y-auto transition-all duration-300 ease-in-out gap-4 bottom-0 md:hidden`}>
        <form onSubmit={manejarBusqueda} className="p-4 flex w-full gap-2">
          <div className="border border-[#43237A] flex-1 min-w-0 p-3 rounded-xl flex items-center gap-2">
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              className="bg-transparent outline-none w-full min-w-0"
            />

            <button type="submit" aria-label="Buscar">
              <FaSearch />
            </button>
          </div>

          <button type="submit" className="border border-[#C6F432] text-[#C6F432] p-3 rounded-xl font-bold">Buscar</button>
        </form>
        {enlaces.map((enlace) => (
          <Link
            key={enlace.texto}
            to={enlace.ruta}
            onClick={cerrarMenu}
            className="font-bold text-xl ml-5 py-3 border-b-2 border-[#43237A] hover:text-[#C6F432]"
          >
            {enlace.texto}
          </Link>
        ))}

        <div className="flex flex-col justify-center items-center gap-3 px-5 pb-6">
          <Link to="/login" onClick={cerrarMenu} className="font-bold border border-[#C6F432] text-[#C6F432] w-full text-center py-4 rounded-xl">Iniciar Sesión</Link>
          <Link to="/registro" onClick={cerrarMenu} className="bg-[#D81B7E] font-bold w-full text-center py-4 rounded-xl">Crear Cuenta</Link>
          <span className="text-[#BCA8E0] text-center pb-4"> Crea una cuenta para comprar más rápido.</span>
        </div>
      </nav>
    </header>
  );
}
