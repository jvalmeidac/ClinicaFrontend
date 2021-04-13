import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import api from "../../services/api";

import AuthContext from "../../contexts/auth/AuthContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("patient/auth/", { email, password });
      console.log(data);
      if (data.authenticated === false) {
        toast.error("Email ou senha inválidos!");
        setLoading(false);
        return;
      }
      setToken(data.accessToken);
      setLoading(false);
      history.push("/dashboard/scheduling");
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <>
      <div className="main">
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="col-lg-4 col-md-6 m-3 p-3"
        >
          <img src={Logo} alt="Logo Unitpac" className="img-fluid mb-2" />
          <div className="form-floating mt-3">
            <input
              autoComplete="off"
              required
              placeholder="exemplo@email.com"
              id="inputEmail"
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="inputEmail">Email</label>
          </div>
          <div className="form-floating mt-3 mb-3">
            <input
              required
              id="inputPassword"
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="inputPassword">Senha</label>
          </div>

          <div>
            <p className="text-center">
              Não tem uma conta? Crie uma <Link to="/signup">aqui!</Link>
            </p>
            {loading ? (
              <button
                className="btn btn-primary col-12 align-middle"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Entrando...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary col-12">
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
