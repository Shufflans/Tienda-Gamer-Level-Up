import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";

function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-[#C6F432] font-bold tracking-widest mb-4">
        LEVEL-UP GAMER
      </p>

      <h1 className="font-press text-2xl md:text-4xl leading-relaxed mb-6">
        TU PRÓXIMO NIVEL
        <span className="block text-[#C6F432] mt-3">COMIENZA AQUÍ</span>
      </h1>

      <p className="text-[#BCA8E0] max-w-xl mb-8">
        Descubre juegos, accesorios y productos para llevar tu experiencia
        gamer al siguiente nivel.
      </p>

      <Link
        to="/productos"
        className="bg-[#C6F432] text-[#1A0B2E] font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
      >
        Explorar productos
      </Link>
    </main>
  );
}
export default function App() {
  return (
    <BrowserRouter basename="/Tienda-Gamer-Level-Up">
      <div className="bg-[#1A0B2E] min-h-screen text-[#F5EEFF] font-outfit">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route
            path="/productos/:id"
            element={<DetalleProducto />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
