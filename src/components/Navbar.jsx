import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export function Navbar() {
    const [estaAbierto, setEstaAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    function cerrarMenu() {
        setEstaAbierto(false);
    }

    function manejarBusqueda(e) {
        e.preventDefault();
        if (busqueda.trim()) {
            window.location.href = `/Tienda-Gamer-Level-Up/productos?q=${encodeURIComponent(busqueda.trim())}`;
        } else {
            window.location.href = "/Tienda-Gamer-Level-Up/productos";
        }
        cerrarMenu();
    }

    return (
        <header className="bg-[#2A1450] max-w-7xl mx-auto">
            <div className="flex flex-row justify-between p-2 items-center">
                {/* Botón menú hamburguesa (móvil) */}
                <button 
                    type="button"
                    aria-label={estaAbierto ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={estaAbierto}
                    onClick={() => setEstaAbierto(!estaAbierto)} 
                    className={`text-2xl transition-transform ease-in-out duration-300 md:hidden ${estaAbierto ? 'rotate-90' : 'rotate-0'}`}
                >
                    {estaAbierto ? <IoCloseSharp/> : <CiMenuBurger/>}
                </button>

                {/* Logo */}
                <div className="md:border-r border-[#43237A] pr-2 rounded-full">
                    <Link to="/" onClick={cerrarMenu} className="block text-center bg-[#43237A] px-4 py-3 rounded-full md:py-3 md:px-4 text-sm md:text-lg font-bold font-press">
                        <span className="block text-[#F5EEFF]">Level-Up</span>
                        <span className="text-[#C6F432]">GAMER</span>
                    </Link>
                </div>
                
                {/* NAVEGADOR PARA PC */}
                <div className="hidden md:flex md:flex-col md:flex-1 gap-2 text-sm">
                    {/* Piso 1: Búsqueda + Sesión */}
                    <div className="flex justify-between items-center w-full border-b border-[#43237A] pb-1">
                        <form onSubmit={manejarBusqueda} className="py-1.5 px-3 flex w-full gap-6 justify-between">
                            <div className="border border-[#43237A] w-full p-3 rounded-xl flex bg-[#1A0B2E]">
                                <input 
                                    type="search" 
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="Buscar productos..." 
                                    aria-label="Buscar productos"
                                    className="outline-none w-full bg-transparent text-[#F5EEFF]"
                                />
                                <button type="submit" aria-label="Buscar">
                                    <FaSearch />
                                </button>
                            </div>
                            <button type="submit" className="border border-[#C6F432] text-[#C6F432] p-3 rounded-xl font-bold px-5">Buscar</button>
                        </form>

                        <div className="hidden md:flex md:flex-col md:items-center md:gap-4">
                            <div className="md:flex md:flex-row md:justify-center md:items-center md:gap-3 md:px-5">
                                <Link to="/login" className="md:font-bold md:border md:border-[#C6F432] text-[#C6F432] text-center px-4 py-2 rounded-xl text-nowrap">Iniciar Sesión</Link>
                                <Link to="/registro" className="bg-[#D81B7E] font-bold text-center px-4 py-2 rounded-xl text-nowrap text-white">Crear Cuenta</Link>
                            </div>
                        </div>
                    </div>

                    {/* Piso 2: Enlaces + Carrito */}
                    <nav className="hidden md:flex md:justify-start md:items-center mx-2">
                        <div className="flex font-bold justify-between w-full">
                            <Link to="/" className="text-sm text-center py-1 px-3 text-[#C6F432]">Home</Link>
                            <Link to="/productos" className="text-sm text-center py-1 px-3">Categorías</Link>
                            <Link to="/productos" className="text-sm text-center py-1 px-3">Ofertas</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Nosotros</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Blog</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Contacto</Link>
                            <Link to="/productos" aria-label="Ver productos y carrito" className="bg-[#C6F432] text-[#1A0B2E] rounded-xl flex items-center justify-center py-2 px-10 text-lg">
                                <FaCartShopping/>
                            </Link>
                        </div>
                    </nav>
                </div>

                {/* Carrito Móvil */}
                <Link to="/productos" aria-label="Ver productos y carrito" className="bg-[#C6F432] text-[#1A0B2E] p-3 rounded-xl md:hidden font-bold">
                    $0
                </Link>
            </div>

            {/* NAVEGADOR PARA CELULAR */}
            <nav onClick={cerrarMenu} className={`${estaAbierto ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'} fixed top-24 left-0 right-0 z-50 flex flex-col bg-[#1A0B2E] overflow-y-auto transition-all duration-300 ease-in-out gap-2 bottom-0`}>
                <form onSubmit={manejarBusqueda} onClick={(e) => e.stopPropagation()} className="p-3 flex w-full gap-3 justify-between">
                    <div className="border border-[#43237A] w-full p-2 rounded-xl flex">
                        <input 
                            type="search" 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar productos..." 
                            aria-label="Buscar productos"
                            className="outline-none w-full text-sm bg-transparent text-[#F5EEFF]"
                        />
                        <button type="submit" aria-label="Buscar">
                            <FaSearch />
                        </button>
                    </div>
                    <button type="submit" className="border border-[#C6F432] text-[#C6F432] p-2 rounded-xl font-bold px-4 text-sm">Buscar</button>
                </form>

                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 py-2 text-[#C6F432] border-b-2 border-[#43237A]">Home</Link>
                <Link to="/productos" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Categorías</Link>
                <Link to="/productos" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Ofertas</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Nosotros</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Contacto</Link>

                <div className="flex flex-col justify-center items-center gap-2 px-5">
                    <Link to="/login" onClick={(e) => e.stopPropagation()} className="font-bold border border-[#C6F432] text-[#C6F432] w-full text-center py-2.5 rounded-xl text-sm">Iniciar Sesión</Link>
                    <Link to="/registro" onClick={(e) => e.stopPropagation()} className="bg-[#D81B7E] font-bold w-full text-center py-2.5 rounded-xl text-sm text-white">Crear Cuenta</Link>
                    <span className="text-[#BCA8E0] pb-3 text-xs text-center">Crea una cuenta para comprar más rápido.</span>
                </div>
            </nav>
        </header>
    );
}