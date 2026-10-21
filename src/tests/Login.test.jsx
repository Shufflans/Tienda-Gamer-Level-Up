import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";

const navegar = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...original,
    useNavigate: () => navegar,
  };
});

function prepararLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

describe("Inicio de sesión", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    navegar.mockClear();

    localStorage.setItem(
      "usuarios",
      JSON.stringify([
        {
          id: "1",
          nombre: "Nico",
          correo: "nico@duoc.cl",
          password: "Hola123!",
        },
      ])
    );
  });

  it("permite entrar con credenciales correctas", async () => {
    const user = userEvent.setup();
    prepararLogin();

    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Hola123!");

    fireEvent.submit(screen.getByRole("button", { name: "Entrar" }).closest("form"));

    expect(navegar).toHaveBeenCalledWith("/productos", { replace: true });

    expect(JSON.parse(sessionStorage.getItem("usuarioActual"))).toEqual({
      id: "1",
      nombre: "Nico",
      correo: "nico@duoc.cl",
    });
  });

  it("rechaza una contraseña incorrecta", async () => {
    const user = userEvent.setup();
    prepararLogin();

    await user.type(screen.getByLabelText("Correo electrónico"), "nico@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Incorrecta123!");

    fireEvent.submit(screen.getByRole("button", { name: "Entrar" }).closest("form"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Correo o contraseña incorrectos."
    );
    expect(sessionStorage.getItem("usuarioActual")).toBeNull();
    expect(navegar).not.toHaveBeenCalled();
  });

  it("rechaza un correo que no está registrado", async () => {
    const user = userEvent.setup();
    prepararLogin();

    await user.type(screen.getByLabelText("Correo electrónico"), "otro@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "Hola123!");

    fireEvent.submit(screen.getByRole("button", { name: "Entrar" }).closest("form"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Correo o contraseña incorrectos."
    );
    expect(navegar).not.toHaveBeenCalled();
  });
});
