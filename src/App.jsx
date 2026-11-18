import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { ROLES } from "./utils/roles.js";

import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import NoAutorizado from "./pages/NoAutorizado.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Blog from "./pages/Blog.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import CompraFallida from "./pages/CompraFallida.jsx";
import Panel from "./pages/Panel.jsx";
import PanelProductos from "./pages/PanelProductos.jsx";
import PanelOrdenes from "./pages/PanelOrdenes.jsx";
import AgregarProducto from "./pages/AgregarProductos.jsx";

// La tienda es para Cliente y Administrador. El Vendedor solo trabaja en su panel
// (productos y órdenes), así que si intenta abrir la tienda se le devuelve al panel.
function SoloTienda() {
  const { user } = useAuth();
  if (user?.rol === ROLES.VENDEDOR) return <Navigate to="/panel" replace />;
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
          {/* Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/no-autorizado" element={<NoAutorizado />} />

          {/* Tienda (todos menos el Vendedor) */}
          <Route element={<SoloTienda />}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />

            {/* El catálogo y el carrito requieren sesión (así lo exige el backend) */}
            <Route
              element={
                <ProtectedRoute roles={[ROLES.CLIENTE, ROLES.ADMIN]}>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
            </Route>
          </Route>

          {/* Compra: requiere sesión de Cliente (o Administrador) */}
          <Route
            element={
              <ProtectedRoute roles={[ROLES.CLIENTE, ROLES.ADMIN]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
            <Route path="/compra-fallida" element={<CompraFallida />} />
          </Route>

          {/* Panel interno: Administrador y Vendedor (solo lectura para el Vendedor) */}
          <Route
            element={
              <ProtectedRoute roles={[ROLES.ADMIN, ROLES.VENDEDOR]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/panel" element={<Panel />} />
            <Route path="/panel/productos" element={<PanelProductos />} />
            <Route path="/panel/ordenes" element={<PanelOrdenes />} />
          </Route>

          {/* Solo Administrador: crear y editar productos */}
          <Route
            element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/agregar" element={<AgregarProducto />} />
            <Route path="/admin/editar/:id" element={<AgregarProducto />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}