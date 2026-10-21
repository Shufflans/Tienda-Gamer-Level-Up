import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../pages/Checkout.jsx";
import * as datosCarrito from "../data/carrito.js";

vi.mock("../data/carrito.js", () => ({
  obtenerCarrito: vi.fn(),
  vaciarCarrito: vi.fn(),
}));

const productoPrueba = {
  id: "1",
  nombre: "Teclado gamer",
  precio: 10000,
  imagen: "/teclado.svg",
  cantidad: 2,
  stock: 5,
};

function renderCheckout() {
  return render(
    <MemoryRouter>
      <Checkout />
    </MemoryRouter>
  );
}

function completarFormulario() {
  fireEvent.change(screen.getByLabelText("Nombre completo"), {
    target: { value: "Juan Pérez" },
  });

  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "juan@ejemplo.cl" },
  });

  fireEvent.change(screen.getByLabelText("Teléfono"), {
    target: { value: "912345678" },
  });

  fireEvent.change(screen.getByLabelText("Dirección"), {
    target: { value: "Av. Central 123" },
  });

  fireEvent.change(screen.getByLabelText("Comuna"), {
    target: { value: "Santiago" },
  });
}

describe("Checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    datosCarrito.obtenerCarrito.mockReturnValue([{ ...productoPrueba }]);
  });

  it("muestra el formulario y el resumen del pedido", () => {
    renderCheckout();

    expect(screen.getByText("Finalizar compra")).toBeTruthy();
    expect(screen.getByText("Resumen del pedido")).toBeTruthy();
    expect(screen.getByText("Teclado gamer")).toBeTruthy();
    expect(screen.getAllByText("$20.000")).toHaveLength(2);
  });

  it("muestra los métodos de pago disponibles", () => {
    renderCheckout();

    expect(screen.getByLabelText("Transferencia bancaria")).toBeTruthy();
    expect(screen.getByLabelText("Tarjeta de débito/crédito")).toBeTruthy();
  });

  it("permite seleccionar tarjeta", () => {
    renderCheckout();

    const tarjeta = screen.getByLabelText("Tarjeta de débito/crédito");
    fireEvent.click(tarjeta);

    expect(tarjeta.checked).toBe(true);
  });

  it("no permite confirmar con los datos obligatorios vacíos", () => {
    renderCheckout();

    expect(screen.getByLabelText("Nombre completo").required).toBe(true);
    expect(screen.getByLabelText("Correo electrónico").required).toBe(true);
    expect(screen.getByLabelText("Teléfono").required).toBe(true);
    expect(screen.getByLabelText("Dirección").required).toBe(true);
    expect(screen.getByLabelText("Comuna").required).toBe(true);
  });

  it("registra la compra y vacía el carrito al confirmar", () => {
    renderCheckout();
    completarFormulario();

    fireEvent.click(
      screen.getByRole("button", { name: "Confirmar compra" })
    );

    expect(screen.getByText("Compra exitosa")).toBeTruthy();
    expect(datosCarrito.vaciarCarrito).toHaveBeenCalledOnce();

    const pedidos = JSON.parse(localStorage.getItem("pedidos"));
    expect(pedidos).toHaveLength(1);
    expect(pedidos[0].total).toBe(20000);
    expect(pedidos[0].cliente.nombre).toBe("Juan Pérez");
  });

  it("muestra un aviso si el carrito está vacío", () => {
    datosCarrito.obtenerCarrito.mockReturnValue([]);

    renderCheckout();

    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
  });
});