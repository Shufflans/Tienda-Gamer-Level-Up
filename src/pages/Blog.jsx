import { Link } from "react-router-dom";
import { FaGamepad, FaComputer, FaNewspaper } from "react-icons/fa6";

const articulos = [
  {
    id: 1,
    categoria: "NVIDIA",
    titulo: "Novedades de NVIDIA GeForce",
    descripcion:
      "Hardware, tecnologías gráficas y mejoras para juegos",
    fecha: "2026",
    icono: FaComputer,
    enlace: "https://www.nvidia.com/es-la/",
    textoBoton: "Ver noticia",
  },
  {
    id: 2,
    categoria: "Gaming",
    titulo: "Hardzone",
    descripcion:
      "Noticias sobre mejoras gráficas y rendimiento en juegos.",
    fecha: "2026",
    icono: FaGamepad,
    enlace: "https://hardzone.es/noticias/",
    textoBoton: "Ver noticia",
  },
  {
    id: 3,
    categoria: "Consejos",
    titulo: "Mira esto ANTES de Comprar una PC GAMER en 2026",
    descripcion:
      "Consejo antes de comprar un pc gamer",
    fecha: "2026",
    icono: FaNewspaper,
    enlace:
      "https://www.youtube.com/watch?v=TP8rDXQdjg8",
    textoBoton: "Ver video",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen px-5 py-12 md:px-10">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C6F432] font-bold tracking-[0.3em] mb-3">
            LEVEL-UP GAMER
          </p>

          <h1 className="font-press text-2xl md:text-4xl mb-6">
            NUESTRO <span className="text-[#C6F432]">BLOG</span>
          </h1>

          <p className="text-[#BCA8E0] max-w-2xl mx-auto">
            En nuestro blog te compartimos noticias, videos, consejos y recomendaciones del mundo gamer para
            ayudarte a elegir tus próximos productos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articulos.map((articulo) => {
            const Icono = articulo.icono;

            return (
              <article
                key={articulo.id}
                className="bg-[#2A1450] border border-[#43237A] rounded-2xl overflow-hidden flex flex-col hover:border-[#C6F432] transition"
              >
                <div className="h-48 bg-[#43237A] flex items-center justify-center"><Icono className="text-[#C6F432] text-7xl" /></div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[#C6F432] text-sm font-bold mb-3">{articulo.categoria}</span>
                  <h2 className="text-xl font-bold mb-3">{articulo.titulo}</h2>
                  <p className="text-[#BCA8E0] text-sm leading-relaxed mb-5">{articulo.descripcion}</p>
                  <p className="text-xs text-[#BCA8E0] mt-auto mb-5">{articulo.fecha}</p>

                  <a
                    href={articulo.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#C6F432] text-[#1A0B2E] font-bold py-3 rounded-xl hover:scale-105 transition"
                  >
                    {articulo.textoBoton}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/productos" className="inline-block border border-[#C6F432] text-[#C6F432] font-bold px-7 py-3 rounded-xl hover:bg-[#C6F432] hover:text-[#1A0B2E] transition">Explorar productos</Link>
        </div>
      </section>
    </main>
  );
}