// Cliente HTTP único de la aplicación (axios).
// - Agrega el JWT a cada petición.
// - Renueva el token automáticamente con /auth/refresh (el access token dura 15 min).
// - Si no se puede renovar, cierra la sesión.
import axios from "axios";
import { getTokens, saveSession, clearSession, isExpiringSoon } from "../utils/session";

export const API_URL = "/api";

const http = axios.create({ baseURL: API_URL });

const RUTAS_PUBLICAS = ["/auth/login", "/auth/register", "/auth/refresh"];
const esPublica = (url = "") => RUTAS_PUBLICAS.some((r) => url.startsWith(r));

// Evita lanzar varias renovaciones a la vez: todas esperan la misma promesa.
let renovando = null;

function renovarToken() {
  if (!renovando) {
    const { refreshToken } = getTokens();
    if (!refreshToken) return Promise.reject(new Error("No hay refresh token"));
    renovando = axios
      .post(`${API_URL}/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        saveSession(data);
        return data.token;
      })
      .finally(() => {
        renovando = null;
      });
  }
  return renovando;
}

function cerrarSesionForzada() {
  clearSession();
  // El AuthContext escucha este evento y limpia el estado de React.
  window.dispatchEvent(new Event("auth:logout"));
}

// 1) Antes de enviar: adjuntar token (renovándolo si está por vencer)
http.interceptors.request.use(async (config) => {
  if (esPublica(config.url)) return config;

  let { token } = getTokens();
  if (token && isExpiringSoon(token)) {
    try {
      token = await renovarToken();
    } catch {
      cerrarSesionForzada();
    }
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2) Al recibir: si el backend responde 401, intentar renovar y repetir la petición una vez
http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 401 && config && !config._reintentado && !esPublica(config.url)) {
      config._reintentado = true;
      try {
        const nuevo = await renovarToken();
        config.headers.Authorization = `Bearer ${nuevo}`;
        return http(config);
      } catch {
        cerrarSesionForzada();
      }
    }
    return Promise.reject(error);
  }
);

export default http;
