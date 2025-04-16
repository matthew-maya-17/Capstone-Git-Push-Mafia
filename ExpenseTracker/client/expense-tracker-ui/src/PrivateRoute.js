import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
