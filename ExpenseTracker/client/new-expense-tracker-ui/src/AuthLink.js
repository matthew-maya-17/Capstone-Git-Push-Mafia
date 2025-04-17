import { Navigate } from "react-router-dom";

const AuthLink = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthLink;
