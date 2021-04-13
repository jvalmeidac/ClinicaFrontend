import React from "react";
import { Link } from "react-router-dom";

import Patient from "../../assets/patient.svg";
import Scholar from "../../assets/dentist.svg";

export default function Menu() {
  return (
    <>
      <div className="main">
        <div className="row">
          <div
            style={{ backgroundColor: "white" }}
            className="col-lg col-12 rounded shadow m-lg-3 mb-3 p-3 text-center"
          >
            <Link
              to="/dashboard/scheduling"
              style={{ textDecoration: "none", height: "100%" }}
              className="d-flex flex-column justify-content-between"
            >
              <img
                style={{ height: "150px" }}
                className="img-fluid"
                src={Patient}
                alt="Paciente"
              />
              <h3>Sou Paciente</h3>
            </Link>
          </div>
          <div
            style={{ backgroundColor: "white" }}
            className="col-lg col-12 rounded shadow m-lg-3 mb-3 p-3 text-center"
          >
            <Link
              to="/"
              style={{ textDecoration: "none", height: "100%" }}
              className="d-flex flex-column justify-content-between"
            >
              <img
                style={{ height: "150px" }}
                className="img-fluid"
                src={Scholar}
                alt="Acadêmico"
              />
              <h3>Sou Acadêmico</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}