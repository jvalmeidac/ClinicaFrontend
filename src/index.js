import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./contexts/auth/AuthProvider";

// import "./styles/global.css";
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
