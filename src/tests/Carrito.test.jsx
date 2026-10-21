import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../pages/Carrito.jsx";
import * as datosCarrito from "../data/carrito.js";

vi.mock("../data/carrito.js", () => ({
  obtenerCarrito: vi.fn(),
  cambiarCantidad: vi.fn(),
  eliminarDelCarrito: vi.fn(),
}));

const productoPrueba = {
  id: "1",
  nombre: "Teclado gamer",
  precio: 10000,
  imagen: "/teclado.svg",
  cantidad: 2,
  stock: 5,
};

function renderCarrito() {
  return render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>
  );
}

describe("Carrito de compras", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    datosCarrito.obtenerCarrito.mockReturnValue([{ ...productoPrueba }]);
  });

  it("muestra los productos del carrito", () => {
    renderCarrito();

    expect(screen.getByText("Teclado gamer")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("calcula y muestra el total", () => {
    renderCarrito();

    expect(screen.getAllByText("$20.000")).toHaveLength(2);
    });

  it("permite solicitar el aumento de cantidad", () => {renderCarrito();

    fireEvent.click(screen.getByRole("button", {name: "Aumentar cantidad de Teclado gamer",}));

    expect(datosCarrito.cambiarCantidad).toHaveBeenCalledWith("1", 3);
  });

  it("permite solicitar la disminución de cantidad", () => {renderCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Disminuir cantidad de Teclado gamer",
      })
    );

    expect(datosCarrito.cambiarCantidad).toHaveBeenCalledWith("1", 1);
  });

  it("permite eliminar un producto", () => {
    renderCarrito();

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(datosCarrito.eliminarDelCarrito).toHaveBeenCalledWith("1");
  });

  it("muestra el enlace para continuar la compra", () => {renderCarrito();

    expect(screen.getByRole("link", { name: "Continuar compra" }).getAttribute("href")).toBe("/checkout");
  });
});
