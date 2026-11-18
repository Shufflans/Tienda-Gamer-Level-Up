// Lista y detalle de productos.
//  - Vendedor: solo lectura (ver lista y detalle). No ve botones de crear/editar/eliminar.
//  - Administrador: además puede crear, editar y eliminar.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { productService } from "../services/productService";
import { imgSrc } from "../utils/imagenes";
import { ROLES, clp, errorMsg } from "../utils/roles";

export default function PanelProductos() {
  const { hasRole } = useAuth();
  const esAdmin = hasRole(ROLES.ADMIN);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [detalle, setDetalle] = useState(null);

  const cargar = () => {
    setCargando(true);
    productService
      .listar() // GET /api/productos
      .then(setProductos)
      .catch((err) => setError(errorMsg(err, "No se pudieron cargar los productos.")))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  // GET /api/productos/{id}
  const verDetalle = (id) =>
    productService
      .obtener(id)
      .then(setDetalle)
      .catch((err) => setError(errorMsg(err, "No se pudo cargar el detalle.")));

  // DELETE /api/productos/{id}  (solo Administrador)
  const eliminar = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      await productService.eliminar(p.id);
      setProductos((lista) => lista.filter((x) => x.id !== p.id));
    } catch (err) {
      setError(errorMsg(err, "No se pudo eliminar el producto (puede estar asociado a pedidos)."));
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-[#BCA8E0]">{esAdmin ? "Gestión completa del catálogo." : "Consulta de productos (solo lectura)."}</p>
        </div>
        {esAdmin && (
          <Link to="/admin/agregar" className="rounded-xl bg-[#C6F432] px-5 py-3 font-bold text-[#1A0B2E] hover:brightness-110">
            + Agregar producto
          </Link>
        )}
      </div>

      {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-300">{error}</p>}
      {cargando && <p className="text-[#BCA8E0]">Cargando...</p>}

      {!cargando && (
        <div className="overflow-x-auto rounded-2xl border border-[#43237A] bg-[#24123F]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#43237A] text-[#C6F432]">
              <tr>
                <th className="p-3">Producto</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-[#43237A]/50 last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={imgSrc(p.imagenUrl)} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <span className="font-bold">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="p-3">{clp(p.precio)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.activo ? <span className="text-[#C6F432]">Activo</span> : <span className="text-red-400">Inactivo</span>}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => verDetalle(p.id)} className="text-[#C6F432] underline">Ver detalle</button>
                      {esAdmin && (
                        <>
                          <Link to={`/admin/editar/${p.id}`} className="text-[#BCA8E0] underline">Editar</Link>
                          <button onClick={() => eliminar(p)} className="text-red-400 underline">Eliminar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-[#BCA8E0]">No hay productos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detalle del producto */}
      {detalle && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4" onClick={() => setDetalle(null)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl border border-[#43237A] bg-[#24123F] p-6" onClick={(e) => e.stopPropagation()}>
            <img src={imgSrc(detalle.imagenUrl)} alt={detalle.nombre} className="mb-4 h-52 w-full rounded-xl object-cover" />
            <h2 className="mb-2 text-2xl font-bold">{detalle.nombre}</h2>
            <p className="mb-4 text-[#BCA8E0]">{detalle.descripcion}</p>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-[#BCA8E0]">ID</dt><dd>{detalle.id}</dd>
              <dt className="text-[#BCA8E0]">Precio</dt><dd>{clp(detalle.precio)}</dd>
              <dt className="text-[#BCA8E0]">Stock</dt><dd>{detalle.stock}</dd>
              <dt className="text-[#BCA8E0]">Estado</dt><dd>{detalle.activo ? "Activo" : "Inactivo"}</dd>
              <dt className="text-[#BCA8E0]">Creado</dt>
              <dd>{detalle.fechaCreacion ? new Date(detalle.fechaCreacion).toLocaleString("es-CL") : "—"}</dd>
            </dl>
            <button onClick={() => setDetalle(null)} className="mt-6 w-full rounded-xl border border-[#43237A] py-3 font-bold hover:border-[#C6F432]">Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}
