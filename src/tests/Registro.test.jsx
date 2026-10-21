import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Registro from "../pages/Registro.jsx";

const navegar = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...original,
    useNavigate: () => navegar,
  };
});

function prepararRegistro() {
  return render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );
}

describe("Registro de usuarios", () => {
  beforeEach(() => {
    localStorage.clear();
    navegar.mockClear();
  });

  it("registra un usuario con datos válidos", async () => {
    const user = userEvent.setup();
    prepararRegistro();

    await user.type(screen.getByLabelText("Nombre completo"), "Nico");
    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Hola123!");
    await user.type(screen.getByLabelText("Confirmar contraseña"), "Hola123!");

    fireEvent.submit(screen.getByRole("button", { name: "Crear cuenta" }).closest("form"));

    await waitFor(() => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios"));
      expect(usuarios).toHaveLength(1);
      expect(usuarios[0].correo).toBe("nico@duoc.cl");
      expect(navegar).toHaveBeenCalledWith(
        "/login",
        { state: { registroExitoso: true } }
      );
    });
  });

  it("rechaza un correo con doble arroba", async () => {
    const user = userEvent.setup();
    prepararRegistro();

    await user.type(screen.getByLabelText("Nombre completo"), "Nico");
    await user.type(screen.getByLabelText("Correo electrónico"), "nico@@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Hola123!");
    await user.type(screen.getByLabelText("Confirmar contraseña"), "Hola123!");

    fireEvent.submit(screen.getByRole("button", { name: "Crear cuenta" }).closest("form"));

    const alerta = await screen.findByRole("alert");
    expect(alerta.textContent).toContain("Ingresa un correo válido con un solo @.");
    expect(localStorage.getItem("usuarios")).toBeNull();
  });

  it("rechaza una contraseña débil", async () => {
    const user = userEvent.setup();
    prepararRegistro();

    await user.type(screen.getByLabelText("Nombre completo"), "Nico");
    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "hola1234");
    await user.type(screen.getByLabelText("Confirmar contraseña"), "hola1234");

    fireEvent.submit(screen.getByRole("button", { name: "Crear cuenta" }).closest("form"));

    const alerta = await screen.findByRole("alert");
    expect(alerta.textContent).toMatch(/mayúscula, minúscula, número y símbolo/i);
    expect(localStorage.getItem("usuarios")).toBeNull();
  });

  it("rechaza contraseñas que no coinciden", async () => {
    const user = userEvent.setup();
    prepararRegistro();

    await user.type(screen.getByLabelText("Nombre completo"), "Nico");
    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Hola123!");
    await user.type(screen.getByLabelText("Confirmar contraseña"), "Otra123!");

    fireEvent.submit(screen.getByRole("button", { name: "Crear cuenta" }).closest("form"));

    const alerta = await screen.findByRole("alert");
    expect(alerta.textContent).toContain("Las contraseñas no coinciden.");
    expect(localStorage.getItem("usuarios")).toBeNull();
  });

  it("rechaza un correo que ya está registrado", async () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([
        { id: "1", nombre: "Nico", correo: "nico@duoc.cl", password: "Hola123!" },
      ])
    );

    const user = userEvent.setup();
    prepararRegistro();

    await user.type(screen.getByLabelText("Nombre completo"), "Otro usuario");
    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Nueva123!");
    await user.type(screen.getByLabelText("Confirmar contraseña"), "Nueva123!");

    fireEvent.submit(screen.getByRole("button", { name: "Crear cuenta" }).closest("form"));

    const alerta = await screen.findByRole("alert");
    expect(alerta.textContent).toContain("Ya existe una cuenta registrada con ese correo.");
    expect(JSON.parse(localStorage.getItem("usuarios"))).toHaveLength(1);
  });
});