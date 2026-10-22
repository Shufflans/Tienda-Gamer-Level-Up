import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Blog from "./pages/Blog.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import AgregarProducto from "./pages/AgregarProductos.jsx";

function RutaProtegida() {
  let usuario = null;
  try {
    const datos = sessionStorage.getItem("usuarioActual");
    if (datos && datos !== "undefined") {
      usuario = JSON.parse(datos);
    }
  } catch (err) {
    console.error("Error al leer sesión:", err);
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "admin") {
    return <Navigate to="/productos" replace />;
  }

  return <Outlet />;
}

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
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route element={<RutaProtegida />}>
            <Route path="/admin/agregar" element={<AgregarProducto />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}