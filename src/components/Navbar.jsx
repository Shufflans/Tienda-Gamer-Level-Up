import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export function Navbar() {

    const [estaAbierto, setEstaAbierto] = useState(false);

    return(
        <div className="bg-[#2A1450] max-w-7xl mx-auto">
            <div className="flex flex-row justify-between p-2 items-center">
                <button onClick={() => setEstaAbierto(!estaAbierto)} className={`text-2xl transition-transform
                    ease-in-out duration-300 md:hidden ${estaAbierto ? 'rotate-90': 'rotate-0'} `}>
                    {estaAbierto ? <IoCloseSharp/> : <CiMenuBurger/>}
                </button>
                <div className="md:border-r border-[#43237A] pr-2 rounded-full">
                    <h1 className="text-sm font-bold font-press text-center bg-[#43237A] px-4 py-3 rounded-full md:py-3 md:px-4 md:text-lg">
                        <span className="block text-[#F5EEFF]">Level-Up</span>
                        <span className="text-[#C6F432]">GAMER</span>
                    </h1>
                </div>
                
                {/* ESTE ES EL NAVEGADOR PARA PC */}
                
                <div className=" hidden md:flex md:flex-col md:flex-1 gap-2 text-sm">
                    <div className="flex justify-between items-center w-full border-b border-[#43237A] pb-1">
                        <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()} className="py-1.5 px-3 flex w-full gap-6 justify-between">
                        <div className="border border-[#43237A] w-full p-3 rounded-xl flex bg-[#1A0B2E]">
                            <input type="text" placeholder="Buscar productos..." className="outline-none w-full"/>
                            <button>
                                <FaSearch />
                            </button>
                        </div>
                            <button className="border border-[#C6F432] text-[#C6F432] p-3 rounded-xl font-bold px-5">Buscar</button>
                        </form>
                        <div className="hidden md:flex md:flex-col md:items-center md:gap-4">
                            <div className="md:flex md:flex-row md:justify-center md:items-center md:gap-3 md:px-5">
                                <Link to="/" onClick={(e) => e.stopPropagation()} className="md:font-bold md:border md:border-[#C6F432] text-[#C6F432] text-center px-4 py-2 rounded-xl text-nowrap">Iniciar Sesión</Link>
                                <Link to="/" onClick={(e) => e.stopPropagation()} className="bg-[#D81B7E] font-bold text-center px-4 py-2 rounded-xl text-nowrap">Crear Cuenta</Link>
                            </div>
                        </div>
                    </div>
                    <nav className="hidden md:flex md:justify-start md:items-center mx-2">
                        <div className="flex font-bold justify-between w-full">
                            <Link to="/" className="text-sm text-center py-1 px-3 text-[#C6F432]">Home</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Categorías</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Ofertas</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Nosotros</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Blog</Link>
                            <Link to="/" className="text-sm text-center py-1 px-3">Contacto</Link>
                            <div className="bg-[#C6F432] text-[#1A0B2E] rounded-xl flex items-center justify-center py-2 px-10 text-lg">
                                <FaCartShopping/>
                            </div>
                        </div>
                    </nav>
                </div>
                    

            
                
                <div className="bg-[#C6F432] text-[#1A0B2E] p-3 rounded-xl md:hidden">
                        <p>$0</p>
                    </div>
                
            </div>

            {/* ESTE ES EL NAVEGADOR PARA CELULAR */}
            <nav onClick={() => setEstaAbierto(false)} className={`${estaAbierto ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'} fixed top-24 left-0 right-0 z-50 flex flex-col bg-[#1A0B2E] overflow-y-auto transition-all duration-300 ease-in-out gap-2 bottom-0`}>
                <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()} className="p-3 flex w-full gap-3 justify-between">
                    <div className="border border-[#43237A] w-full p-2 rounded-xl flex">
                        <input type="text" placeholder="Buscar productos..." className="outline-none w-full text-sm"/>
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                    <button className="border border-[#C6F432] text-[#C6F432] p-2 rounded-xl font-bold px-4 text-sm">Buscar</button>
                </form>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 py-2 text-[#C6F432] border-b-2 border-[#43237A]">Home</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Categorías</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Ofertas</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Nosotros</Link>

                {/* <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Blog</Link> */}

                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-base text-start ml-5 border-b-2 border-[#43237A] py-2 w-full">Contacto</Link>

                <div className="flex flex-col justify-center items-center gap-2 px-5">
                    <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold border border-[#C6F432] text-[#C6F432] w-full text-center py-2.5 rounded-xl text-sm">Iniciar Sesión</Link>
                    <Link to="/" onClick={(e) => e.stopPropagation()} className="bg-[#D81B7E] font-bold w-full text-center py-2.5 rounded-xl text-sm">Crear Cuenta</Link>
                    <span className="text-[#BCA8E0] pb-3 text-xs">Crea una cuenta para comprar más rápido.</span>
                </div>
            </nav>
        </div>
    );
}