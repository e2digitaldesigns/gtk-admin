import React from "react";
import JWTDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactElement;
  isLoggedIn: boolean;
}
const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  isLoggedIn
}) => {
  try {
    const token =
      process.env?.REACT_APP_JWT_TOKEN &&
      localStorage.getItem(process.env.REACT_APP_JWT_TOKEN);

    const verifyToken = token && JWTDecode(token);

    if (verifyToken) {
      return children;
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
