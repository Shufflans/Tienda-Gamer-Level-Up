import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export function Navbar() {

    const [estaAbierto, setEstaAbierto] = useState(false);

    return(
        <div className="bg-[#2A1450]">
            <div className="flex flex-row justify-between p-3 items-center">
                <button onClick={() => setEstaAbierto(!estaAbierto)} className={`text-2xl transition-transform
                    ease-in-out duration-300 md:hidden ${estaAbierto ? 'rotate-90': 'rotate-0'} `}>
                    {estaAbierto ? <IoCloseSharp/> : <CiMenuBurger/>}
                </button>
                <h1 className=" font-bold font-press text-center bg-[#43237A] px-6 py-3 rounded-full">
                    <span className="block text-[#F5EEFF]">Level-Up</span>
                     <span className="text-[#C6F432]">GAMER</span>
                </h1>
                
                {/* ESTE ES EL NAVEGADOR PARA PC */}
                <nav className="hidden md:flex bg-[#1A0B2E]">
                    <Link to="/" className="text-lg text-center p-3 w-full">Home</Link>
                    <Link to="/" className="text-lg text-center p-3 w-full">Categorías</Link>
                    <Link to="/" className="text-lg text-center p-3 w-full">Ofertas</Link>
                    <Link to="/" className="text-lg text-center p-3 w-full">Nosotros</Link>
                    <Link to="/" className="text-lg text-center p-3 w-full">Blog</Link>
                    <Link to="/" className="text-lg text-center p-3 w-full">Contacto</Link>
                </nav>
                
                <div className="bg-[#C6F432] text-[#1A0B2E] p-3 rounded-xl">
                    <p>$0</p>
                </div>
            </div>

            {/* ESTE ES EL NAVEGADOR PARA CELULAR */}
            <nav onClick={() => setEstaAbierto(false)} className={`${estaAbierto ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'} fixed top-24 left-0 right-0 z-50 flex flex-col bg-[#1A0B2E] overflow-y-auto transition-all duration-300 ease-in-out gap-4 bottom-0`}>
                <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()} className="p-4 flex w-full gap-6 justify-between">
                    <div className="border border-[#43237A] w-fit p-3 rounded-xl flex">
                        <input type="text" placeholder="Buscar productos..." className="outline-none w-full"/>
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                    <button className="border border-[#C6F432] text-[#C6F432] p-3 rounded-xl font-bold px-5">Buscar</button>
                </form>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 py-3.5 text-[#C6F432] border-b-2 border-[#43237A]">Home</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 border-b-2 border-[#43237A] py-3.5 w-full">Categorías</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 border-b-2 border-[#43237A] py-3.5 w-full">Ofertas</Link>
                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 border-b-2 border-[#43237A] py-3.5 w-full">Nosotros</Link>

                {/* <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 border-b-2 border-[#43237A] py-3.5 w-full">Blog</Link> */}

                <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold text-xl text-start ml-5 border-b-2 border-[#43237A] py-3.5 w-full">Contacto</Link>

                <div className="flex flex-col justify-center items-center gap-3 px-5">
                    <Link to="/" onClick={(e) => e.stopPropagation()} className="font-bold border border-[#C6F432] text-[#C6F432] w-full text-center py-4 rounded-xl">Iniciar Sesión</Link>
                    <Link to="/" onClick={(e) => e.stopPropagation()} className="bg-[#D81B7E] font-bold w-full text-center py-4 rounded-xl">Crear Cuenta</Link>
                    <span className="text-[#BCA8E0] pb-4">Crea una cuenta para comprar más rápido.</span>
                </div>
            </nav>
        </div>
    );
}