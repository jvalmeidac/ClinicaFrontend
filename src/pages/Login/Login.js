import React, { useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { login } from "../../services/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    if (email === null || password === null) {
      setLoading(false);
      toast.error("Os campos não podem ser vazios");
      return;
    }
    try {
      const response = await api.post("api/patient/auth/", { email, password });
      if (response.data.authenticated === false) {
        toast.error("Email ou senha inválidos!");
        setLoading(false);
        return;
      }
      login(response.data.accessToken);
    } catch (e) {
      toast.error(e);
    }
    setLoading(false);
    history.push("/app");
  }

  return (
    <>
      <div className="main">
        <form
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="col-lg-4"
        >
          <img src={Logo} alt="Logo Unitpac" className="img-fluid mb-2" />
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              id="inputEmail"
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Senha
            </label>
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            {loading ? (
              <button className="btn btn-primary col-12" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Entrando...
              </button>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary col-12">
                Entrar
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
