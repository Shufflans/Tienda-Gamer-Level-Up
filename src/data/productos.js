
export const productos = [
  {
    id: "1",
    nombre: "Control Inalambrico Switch Negro RGB y Covertor Magnetico",
    precio: 39990,
    categoria: "Accesorios",
    descripcion: "Control inalámbrico para disfrutar tus juegos favoritos con comodidad.",
    imagen: "./ControlInalambrico.webp",
    stock: 12,
  },
  {
    id: "2",
    nombre: "Audifonos Gamer NPET HS10",
    precio: 13990,
    categoria: "Accesorios",
    descripcion: "Audífonos gamer diseñados para disfrutar un sonido envolvente.",
    imagen: "./audifonosnpet.webp",
    stock: 8,
  },
  {
    id: "3",
    nombre: "Teclado Mecánico RK R65 Phantom",
    precio: 45990,
    categoria: "Periféricos",
    descripcion: "Teclado mecánico para mejorar la comodidad y precisión al jugar.",
    imagen: "./teclado_mecanico.jpg",
    stock: 5,
  },
  {
    id: "4",
    nombre: "Mouse Logitech",
    precio: 39990,
    categoria: "Periféricos",
    descripcion: "Mouse gamer para mejorar el control durante tus partidas.",
    imagen: "./Logitech.webp",
    stock: 10,
  },
  {
    id: "5",
    nombre: "Rgb Gamingpad Iluminación (30 x 30 x 4)",
    precio: 7990,
    categoria: "Accesorios",
    descripcion: "Alfombrilla gamer amplia con iluminación RGB para tu escritorio.",
    imagen: "./Gamingpad.webp",
    stock: 15,
  },
  {
    id: "6",
    nombre: "Micrófono Gamer Streaming Kronos Gregal Flexible ",
    precio: 14990,
    categoria: "Accesorios",
    descripcion: "Micrófono USB para comunicarte con tu equipo y transmitir partidas.",
    imagen: "./Microfono.webp",
    stock: 7,
  },
  {
    id: "7",
    nombre: "Webcam Full HD con microfono incorporado",
    precio: 16990,
    categoria: "Accesorios",
    descripcion: "Cámara Full HD para videollamadas, clases y transmisiones en vivo.",
    imagen: "./Webcam.webp",
    stock: 6,
  },
  {
    id: "8",
    nombre: "Monitor gamer 24 pulgadas HD",
    precio: 129990,
    categoria: "Monitores",
    descripcion: "Monitor gamer de 24 pulgadas para disfrutar tus juegos con una pantalla amplia.",
    imagen: "./Monitor.webp",
    stock: 4,
  },
];

export function obtenerProducto(id) {
  return productos.find((producto) => producto.id === id);
}