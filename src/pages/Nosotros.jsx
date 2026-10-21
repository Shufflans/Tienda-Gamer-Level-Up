import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <main className="min-h-[80vh] px-5 py-16">
      <section className="max-w-4xl mx-auto text-center">
        <p className="text-[#C6F432] font-bold tracking-widest mb-4">LEVEL-UP GAMER </p>
        <h1 className="font-press text-2xl md:text-4xl leading-relaxed mb-8">SOBRE <span className="text-[#C6F432]">NOSOTROS</span></h1>

        <div className="bg-[#24123F] border border-[#43237A] rounded-2xl p-7 md:p-10">
          <h2 className="text-2xl font-bold mb-4">Tu próximo nivel</h2>

          <p className="text-[#BCA8E0] leading-7 mb-5">
            Level-Up Gamer es una tienda de videojuegos,
            Accesorios y periféricos para quienes disfrutan del mundo gamer.
          </p>

          <p className="text-[#BCA8E0] leading-7">
            Nuestro objetivo es ofrecer una experiencia de compra rapida y facil,
            donde puedas explorar productos, comparar opciones y encontrar
            accesorios para tu PC.
          </p>

          <Link to="/productos"className="inline-block mt-8 bg-[#C6F432] text-[#1A0B2E] font-bold px-7 py-3 rounded-xl hover:brightness-110 transition">Explorar productos</Link>
        </div>
      </section>
    </main>
  );
}
