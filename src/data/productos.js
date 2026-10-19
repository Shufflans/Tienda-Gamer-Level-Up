export const productos = [
  {
    id: "1",
    nombre: "Control inalámbrico",
    precio: 39990,
    categoria: "Accesorios",
    descripcion:
      "Control inalámbrico para disfrutar tus juegos favoritos con comodidad.",
    imagen:
      "https://placehold.co/600x400/2A1450/C6F432?text=Control+Gamer",
    stock: 12,
  },
  {
    id: "2",
    nombre: "Audífonos gamer",
    precio: 24990,
    categoria: "Accesorios",
    descripcion:
      "Audífonos gamer diseñados para disfrutar un sonido envolvente.",
    imagen:
      "https://placehold.co/600x400/2A1450/C6F432?text=Audifonos",
    stock: 8,
  },
  {
    id: "3",
    nombre: "Teclado mecánico",
    precio: 45990,
    categoria: "Periféricos",
    descripcion:
      "Teclado mecánico para mejorar la comodidad y precisión al jugar.",
    imagen:
      "https://placehold.co/600x400/2A1450/C6F432?text=Teclado",
    stock: 5,
  },
  {
    id: "4",
    nombre: "Mouse gamer",
    precio: 19990,
    categoria: "Periféricos",
    descripcion:
      "Mouse gamer para mejorar el control durante tus partidas.",
    imagen:
      "https://placehold.co/600x400/2A1450/C6F432?text=Mouse",
    stock: 10,
  },
];

export function obtenerProducto(id) {
  return productos.find((producto) => producto.id === id);
}
