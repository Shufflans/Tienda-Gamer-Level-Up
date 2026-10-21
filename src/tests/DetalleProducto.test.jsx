import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetalleProducto from "../pages/DetalleProducto.jsx";
import * as datosCarrito from "../data/carrito.js";

vi.mock("../data/carrito.js", () => ({
  agregarAlCarrito: vi.fn(() => ({ mensaje: "Producto agregado con éxito" })),
}));

vi.mock("../data/productos.js", () => ({
  obtenerProducto: vi.fn((id) => {
    if (id === "1") {
      return {
        id: "1",
        nombre: "Control Inalámbrico Switch",
        precio: 39990,
        categoria: "Accesorios",
        descripcion: "Control para Switch RGB",
        imagen: "/control.webp",
        stock: 3,
      };
    }
    return null;
  }),
}));

function renderDetalleProducto(id = "1") {
  return render(
    <MemoryRouter initialEntries={[`/producto/${id}`]}>
      <Routes>
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Detalle del Producto", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra la información completa del producto", () => {
    renderDetalleProducto("1");

    expect(screen.getByText("Control Inalámbrico Switch")).toBeTruthy();
    expect(screen.getByText("Control para Switch RGB")).toBeTruthy();
    expect(screen.getByText("3 unidades")).toBeTruthy();
  });

  it("permite agregar el producto al carrito al hacer clic", () => {
    renderDetalleProducto("1");

    const botonAgregar = screen.getByRole("button", {
      name: /agregar al carrito/i,
    });
    fireEvent.click(botonAgregar);

    expect(datosCarrito.agregarAlCarrito).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" })
    );
  });
});