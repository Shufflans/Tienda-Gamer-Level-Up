// Guardia de rutas: exige sesión y, opcionalmente, uno de los roles indicados.
//   <ProtectedRoute roles={[ROLES.ADMIN]}> ... </ProtectedRoute>
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // No hay sesión -> al login, recordando a dónde quería ir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && !roles.includes(user.rol)) {
    // Hay sesión pero el rol no tiene permiso
    return <Navigate to="/no-autorizado" replace />;
  }
  return children;
}
