import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  removeToken: () => {},
});

export default AuthContext;
