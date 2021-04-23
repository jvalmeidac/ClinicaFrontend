import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Tooth from "../../assets/dental-care.png";
import AuthContext from "../../contexts/auth/AuthContext";

import "./navbar.css";

export default function Navbar(props) {
  const { removeToken } = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <button
            className="navbar-toggler float-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand float-center" href="/dashboard/scheduling">
            <img
              src={Tooth}
              alt="Dente"
              width="30"
              height="24"
              className="d-inline-block align-text-top img-fluid"
            />{" "}
            {props.title}
          </a>
          <button
            className="btn btn-outline-danger d-lg-none float-end"
            onClick={removeToken}
          >
            <i className="bi bi-box-arrow-left"> </i>
            Sair
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav text-center mt-ml-3">
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to="/dashboard/patient/scheduling"
                >
                  Agendamento
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to="/dashboard/patient/account"
                >
                  Minha conta
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-outline-danger d-lg-block d-none float-end"
            onClick={removeToken}
          >
            <i className="bi bi-box-arrow-left"> </i>
            Sair
          </button>
        </div>
      </nav>
    </>
  );
}
