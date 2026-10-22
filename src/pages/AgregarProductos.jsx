import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productos, guardarProductos } from "../data/productos";

const categoriasDisponibles = [...new Set(productos.map((p) => p.categoria))];

export default function AgregarProducto() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState(categoriasDisponibles[0] || "");
  const [imagen, setImagen] = useState("");

  function manejarImagen(e) {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setImagen(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre,
      precio: Number(precio),
      categoria,
      descripcion: "Producto agregado desde el panel.",
      imagen: imagen || "./default.webp",
      stock: 10,
    };

    productos.push(nuevoProducto);
    guardarProductos(); 

    alert("¡Producto agregado exitosamente!");
    navigate("/productos");
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5">
      <section className="w-full max-w-md bg-[#24123F] border border-[#43237A] rounded-2xl p-7 shadow-xl text-white">
        <h1 className="text-3xl font-bold mb-6 text-[#C6F432]">Agregar Producto</h1>

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input required type="text" value={nombre} onChange={e => setNombre(e.target.value)} 
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Precio</label>
            <input required type="number" value={precio} onChange={e => setPrecio(e.target.value)} 
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Categoría</label>
            <select value={categoria} onChange={e => setCategoria(e.target.value)} 
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-3 outline-none focus:border-[#C6F432]">
              {categoriasDisponibles.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Subir Imagen</label>
            <input 
              required 
              type="file" 
              accept="image/*" 
              onChange={manejarImagen}
              className="w-full bg-[#1A0B2E] border border-[#43237A] rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#C6F432] file:text-[#1A0B2E] hover:file:cursor-pointer" 
            />
          </div>

          {imagen && (
            <div className="flex items-center gap-3 bg-[#1A0B2E] p-3 border border-[#43237A] rounded-xl">
              <img src={imagen} alt="Vista previa" className="w-14 h-14 object-cover rounded-lg border border-[#43237A]" />
              <span className="text-xs text-[#BCA8E0]">Imagen lista para guardar</span>
            </div>
          )}

          <button type="submit" className="w-full bg-[#C6F432] text-[#1A0B2E] font-bold p-3 rounded-xl mt-4 hover:brightness-110 transition">
            Guardar Producto
          </button>
        </form>
      </section>
    </main>
  );
}