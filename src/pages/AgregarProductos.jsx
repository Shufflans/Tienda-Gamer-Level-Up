// Crear (/admin/agregar) y editar (/admin/editar/:id) productos. Solo Administrador.
// POST /api/productos  y  PUT /api/productos/{id}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../services/productService";
import { imgSrc } from "../utils/imagenes";
import { errorMsg } from "../utils/roles";

const vacio = { nombre: "", descripcion: "", precio: "", stock: "", imagenUrl: "", activo: true };
const campo = "w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]";

export default function AgregarProducto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [form, setForm] = useState(vacio);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Al editar, se carga el producto actual
  useEffect(() => {
    if (!editando) return;
    productService
      .obtener(id)
      .then((p) =>
        setForm({
          nombre: p.nombre ?? "",
          descripcion: p.descripcion ?? "",
          precio: p.precio ?? "",
          stock: p.stock ?? "",
          imagenUrl: p.imagenUrl ?? "",
          activo: p.activo ?? true,
        })
      )
      .catch((err) => setError(errorMsg(err, "No se pudo cargar el producto.")))
      .finally(() => setCargando(false));
  }, [id, editando]);

  const cambiar = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    const precio = Number(form.precio);
    const stock = Number(form.stock);
    if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
    if (!(precio >= 0.01)) return setError("El precio debe ser mayor a 0.");
    if (!Number.isInteger(stock) || stock < 0) return setError("El stock debe ser un número entero (0 o más).");

    const producto = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio,
      stock,
      imagenUrl: form.imagenUrl.trim(),
      activo: form.activo,
    };

    setGuardando(true);
    try {
      if (editando) await productService.actualizar(id, producto);
      else await productService.crear(producto);
      navigate("/panel/productos");
    } catch (err) {
      setError(errorMsg(err, "No se pudo guardar el producto. Revisa los datos."));
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) return <main className="min-h-[60vh] flex items-center justify-center text-[#BCA8E0]">Cargando...</main>;

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-lg bg-[#24123F] border border-[#43237A] rounded-2xl p-7 shadow-xl text-white">
        <h1 className="text-3xl font-bold mb-6 text-[#C6F432]">{editando ? "Editar producto" : "Agregar producto"}</h1>

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-1 text-sm font-medium">Nombre</label>
            <input id="nombre" name="nombre" required value={form.nombre} onChange={cambiar} maxLength={150} className={campo} />
          </div>

          <div>
            <label htmlFor="descripcion" className="block mb-1 text-sm font-medium">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows={3} value={form.descripcion} onChange={cambiar} className={campo} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="precio" className="block mb-1 text-sm font-medium">Precio (CLP)</label>
              <input id="precio" name="precio" type="number" min="1" step="1" required value={form.precio} onChange={cambiar} className={campo} />
            </div>
            <div>
              <label htmlFor="stock" className="block mb-1 text-sm font-medium">Stock</label>
              <input id="stock" name="stock" type="number" min="0" step="1" required value={form.stock} onChange={cambiar} className={campo} />
            </div>
          </div>

          <div>
            <label htmlFor="imagenUrl" className="block mb-1 text-sm font-medium">Imagen (URL o ruta, ej. ./Monitor.webp)</label>
            <input id="imagenUrl" name="imagenUrl" value={form.imagenUrl} onChange={cambiar} className={campo} placeholder="https://... o ./imagen.webp" />
          </div>

          {form.imagenUrl && (
            <div className="flex items-center gap-3 bg-[#1A0B2E] p-3 border border-[#43237A] rounded-xl">
              <img src={imgSrc(form.imagenUrl)} alt="Vista previa" className="w-14 h-14 object-cover rounded-lg border border-[#43237A]" />
              <span className="text-xs text-[#BCA8E0]">Vista previa de la imagen</span>
            </div>
          )}

          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" name="activo" checked={form.activo} onChange={cambiar} className="accent-[#C6F432] h-4 w-4" />
            Producto activo (visible en la tienda)
          </label>

          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/panel/productos")} className="flex-1 rounded-xl border border-[#43237A] p-3 font-bold hover:border-[#C6F432]">
              Cancelar
            </button>
            <button type="submit" disabled={guardando} className="flex-1 bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl hover:brightness-110 transition disabled:opacity-60">
              {guardando ? "Guardando..." : "Guardar producto"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
