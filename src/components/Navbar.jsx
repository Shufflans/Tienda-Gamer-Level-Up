import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {

    const [estaAbierto, setEstaAbierto] = useState(false);

    return(
        <div className="bg-[#2A1450]">
            <div className="flex flex-row justify-between p-3 items-center">
                <button onClick={() => setEstaAbierto(!estaAbierto)} className={`text-2xl transition-transform
                    ease-in-out duration-300 ${estaAbierto ? 'rotate-90': 'rotate-0'} `}>
                    {estaAbierto ? <IoCloseSharp/> : <CiMenuBurger/>}
                </button>
                <h1 className=" font-bold font-press text-center bg-[#43237A] px-6 py-3 rounded-full">
                    <span className="block text-[#F5EEFF]">Level-Up</span>
                     <span className="text-[#C6F432]">GAMER</span>
                     </h1>
                <div className="bg-[#C6F432] text-[#1A0B2E] p-3 rounded-xl">
                    <p>$0</p>
                </div>
            </div>
            <nav className={`${estaAbierto ? 'max-h-105 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'} flex flex-col bg-[#43237A] overflow-hidden transition-all duration-300 ease-in-out w-full gap-4`}>
                <Link to="/" className="text-xl text-center p-3 w-full">Home</Link>
                <Link to="/" className="text-xl text-center p-3 w-full">Categorías</Link>
                <Link to="/" className="text-xl text-center p-3 w-full">Ofertas</Link>
                <Link to="/" className="text-xl text-center p-3 w-full">Nosotros</Link>
                <Link to="/" className="text-xl text-center p-3 w-full">Blog</Link>
                <Link to="/" className="text-xl text-center p-3 w-full">Contacto</Link>
            </nav>
        </div>
    );
}