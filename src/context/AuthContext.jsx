// Gestión de sesión del frontend.
// - Al cargar la app (también al recargar la página) restaura la sesión desde localStorage.
// - Expone user, login, register, logout y helpers de rol.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { clearSession, getTokens, getUser, isExpired, saveSession } from "../utils/session";

const AuthContext = createContext(null);

// Lee la sesión guardada. Si no hay tokens vigentes, la descarta.
function restaurarSesion() {
  const { token, refreshToken } = getTokens();
  const usuario = getUser();
  if (!usuario || !token) return null;
  // Si el access token venció pero el refresh token sigue vigente, la sesión es válida:
  // el interceptor de axios renovará el token en la próxima petición.
  const refreshVigente = refreshToken && !isExpired(refreshToken);
  if (isExpired(token) && !refreshVigente) {
    clearSession();
    return null;
  }
  return usuario;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(restaurarSesion);

  const logout = useCallback(async () => {
    await authService.logout();
    clearSession();
    setUser(null);
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await authService.login(username, password);
    if (!data.token) throw new Error(data.mensaje || "Credenciales inválidas");
    saveSession(data);
    const usuario = { username: data.username, rol: data.rol };
    setUser(usuario);
    return usuario;
  }, []);

  // Registra y luego inicia sesión automáticamente (el registro no devuelve token).
  const register = useCallback(
    async (username, password) => {
      await authService.register(username, password);
      return login(username, password);
    },
    [login]
  );

  // Si el interceptor no logra renovar el token, cierra la sesión en React.
  useEffect(() => {
    const onForzado = () => setUser(null);
    window.addEventListener("auth:logout", onForzado);
    return () => window.removeEventListener("auth:logout", onForzado);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      hasRole: (...roles) => !!user && roles.includes(user.rol),
      login,
      register,
      logout,
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
