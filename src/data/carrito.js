const CLAVE_CARRITO = "carrito";

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  window.dispatchEvent(new Event("carritoActualizado"));
}

export function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    if (existente.cantidad >= producto.stock) {
      return { ok: false, mensaje: "No hay más unidades disponibles." };
    }

    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      stock: producto.stock,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  return { ok: true, mensaje: "Producto agregado al carrito." };
}

export function cambiarCantidad(id, cantidad) {
  const carrito = obtenerCarrito();
  const producto = carrito.find((item) => item.id === id);

  if (!producto) return;

  if (cantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  if (cantidad > producto.stock) return;

  producto.cantidad = cantidad;
  guardarCarrito(carrito);
}

export function eliminarDelCarrito(id) {
  guardarCarrito(obtenerCarrito().filter((item) => item.id !== id));
}

export function vaciarCarrito() {
  guardarCarrito([]);
}
