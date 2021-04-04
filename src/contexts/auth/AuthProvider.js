import React from "react";
import { useJwt } from "react-jwt";
import useStorage from "../../utils/useStorage";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken, removeToken] = useStorage("token");

  const { decodedToken, isExpired } = useJwt(token);

  return (
    <AuthContext.Provider
      value={{ token, decodedToken, isExpired, setToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
