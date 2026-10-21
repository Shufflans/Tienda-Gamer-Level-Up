import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/Productos.jsx";

vi.mock("../data/productos.js", () => ({
  productos: [
    {
      id: "1",
      nombre: "Teclado Mecánico RK R65",
      precio: 45990,
      categoria: "Periféricos",
      descripcion: "Teclado mecánico gamer",
      imagen: "/teclado.webp",
      stock: 5,
    },
    {
      id: "2",
      nombre: "Audífonos Gamer NPET",
      precio: 13990,
      categoria: "Accesorios",
      descripcion: "Audífonos envolventes",
      imagen: "/audifonos.webp",
      stock: 8,
    },
  ],
}));

function renderProductos() {
  return render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );
}

describe("Catálogo de Productos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza todos los productos del catálogo", () => {
    renderProductos();

    expect(screen.getByText("Teclado Mecánico RK R65")).toBeTruthy();
    expect(screen.getByText("Audífonos Gamer NPET")).toBeTruthy();
  });

  it("filtra productos al escribir en el buscador", () => {
    renderProductos();

    const buscador = screen.getByPlaceholderText(/buscar productos/i);
    fireEvent.change(buscador, { target: { value: "Teclado" } });

    expect(screen.getByText("Teclado Mecánico RK R65")).toBeTruthy();
    expect(screen.queryByText("Audífonos Gamer NPET")).toBeNull();
  });

  it("muestra el mensaje de precio formateado correctamente", () => {
    renderProductos();

    expect(screen.getByText("$45.990")).toBeTruthy();
    expect(screen.getByText("$13.990")).toBeTruthy();
  });
});