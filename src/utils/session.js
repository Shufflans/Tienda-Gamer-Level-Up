// Manejo de la sesión en el navegador (persiste al recargar la página).
// Se guarda en localStorage: access token, refresh token y datos básicos del usuario.

const KEYS = { token: "token", refresh: "refreshToken", user: "usuario" };

const safe = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const getTokens = () => ({
  token: safe(() => localStorage.getItem(KEYS.token)),
  refreshToken: safe(() => localStorage.getItem(KEYS.refresh)),
});

export const getUser = () => safe(() => JSON.parse(localStorage.getItem(KEYS.user)));

// Recibe una respuesta de la API (AuthResponse) y la guarda.
// Si la respuesta no trae algún dato (ej. refresh no devuelve rol), conserva el anterior.
export function saveSession(data) {
  safe(() => {
    if (data.token) localStorage.setItem(KEYS.token, data.token);
    if (data.refreshToken) localStorage.setItem(KEYS.refresh, data.refreshToken);
    const previo = getUser() || {};
    const usuario = {
      username: data.username ?? previo.username,
      rol: data.rol ?? previo.rol,
    };
    localStorage.setItem(KEYS.user, JSON.stringify(usuario));
  });
}

export function clearSession() {
  safe(() => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  });
}

// ---- Utilidades JWT (solo lectura del payload, NO valida la firma: eso lo hace el backend) ----
export function decodeJwt(token) {
  return safe(() => {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(payload))));
  });
}

// true si el token ya venció. Si no se puede leer, se asume vigente (el backend decide).
export function isExpired(token) {
  const p = token && decodeJwt(token);
  return !!(p && p.exp && p.exp * 1000 <= Date.now());
}

// true si vence en menos de `segundos` (para renovar antes de que falle una petición)
export function isExpiringSoon(token, segundos = 30) {
  const p = token && decodeJwt(token);
  return !!(p && p.exp && p.exp * 1000 - Date.now() < segundos * 1000);
}
