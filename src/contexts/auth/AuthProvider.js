import React from "react";
import useStorage from "../../utils/useStorage";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken, removeToken] = useStorage("token");
  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
}
