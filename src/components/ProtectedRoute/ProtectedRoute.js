import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

/*
ProtectedRoute: guards a route using UserContext.
- If user exists, renders children.
- If not, redirects to /login and preserves attempted location in state.
Usage: wrap protected element with <ProtectedRoute><YourPage /></ProtectedRoute>
*/
export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (user) {
     console.log("ProtectedRoute user:", user);
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}S