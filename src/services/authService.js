import http from "../api/http";
import { getTokens } from "../utils/session";

export const authService = {
  // POST /api/auth/login  -> { mensaje, username, rol, token, refreshToken }
  login: (username, password) =>
    http.post("/auth/login", { username, password }).then((r) => r.data),

  // POST /api/auth/register -> devuelve token null: después hay que hacer login
  register: (username, password) =>
    http.post("/auth/register", { username, password }).then((r) => r.data),

  // POST /api/auth/logout (si falla igual cerramos sesión en el frontend)
  logout: () => {
    const { refreshToken } = getTokens();
    return http.post("/auth/logout", { refreshToken }).catch(() => {});
  },
};
