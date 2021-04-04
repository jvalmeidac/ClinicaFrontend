import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  decodedToken: null,
  isExpired: null,
  setToken: () => {},
  removeToken: () => {},
});

export default AuthContext;
