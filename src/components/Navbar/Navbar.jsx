import React from "react";

import Tooth from "../../assets/dental-care.png";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href={props.path}>
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
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
