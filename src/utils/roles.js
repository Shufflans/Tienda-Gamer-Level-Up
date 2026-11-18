// Nombres de rol EXACTOS como los devuelve el backend.
export const ROLES = {
  ADMIN: "ROLE_ADMINISTRADOR",
  VENDEDOR: "ROLE_VENDEDOR",
  CLIENTE: "ROLE_CLIENTE",
};

export const ROL_LABEL = {
  [ROLES.ADMIN]: "Administrador",
  [ROLES.VENDEDOR]: "Vendedor",
  [ROLES.CLIENTE]: "Cliente",
};

// Ruta a la que va cada rol después de iniciar sesión.
export const homeFor = (rol) =>
  rol === ROLES.ADMIN || rol === ROLES.VENDEDOR ? "/panel" : "/productos";

// Formato de dinero chileno.
export const clp = (n) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n ?? 0);

// Saca un mensaje legible de un error de axios.
export const errorMsg = (err, porDefecto = "Ocurrió un error. Intenta nuevamente.") => {
  if (!err.response) return "No hay conexión con el servidor.";
  const d = err.response.data;
  return d?.mensaje || d?.message || d?.error || porDefecto;
};