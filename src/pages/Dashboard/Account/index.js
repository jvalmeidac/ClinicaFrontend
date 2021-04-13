import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../../components/Navbar";
import ClipLoader from "react-spinners/ClipLoader";

import User from "../../../assets/user.svg";
import AuthContext from "../../../contexts/auth/AuthContext";
import api from "../../../services/api";

export default function Account() {
  const { decodedToken } = useContext(AuthContext);

  const [patient, setPatient] = useState({});
  const [birthDate, setBirthDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  function convertToDateString(date) {
    if (date) {
      const dateObj = date.split("T");
      setBirthDate(dateObj[0]);
    }
    return null;
  }

  useEffect(() => {
    async function GetPatient() {
      if (decodedToken) {
        try {
          setLoading(true);
          const { data } = await api.get(`patient/${decodedToken.unique_name}`);
          setPatient(data.data);
          convertToDateString(patient.birthDate);
          setLoading(false);
        } catch (err) {
          alert(err.message);
        }
      }
    }
    GetPatient();
  }, [decodedToken, patient.birthDate]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "300px",
            boxSizing: "border-box",
          }}
        >
          <ClipLoader size={150} />
        </div>
      ) : (
        <div className="m-3 pt-3 pb-3 shadow  rounded  d-flex flex-column justify-content-center align-items-center">
          <img
            style={{ width: "100px", height: "auto" }}
            src={User}
            alt="Usuário"
            className="mb-3"
          />
          <form className="container">
            <legend>Dados pessoais</legend>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  placeholder="Nome"
                  className="form-control"
                  id="inputFirstName"
                  type="text"
                  defaultValue={patient.firstName}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputFirstName"
                >
                  Nome
                </label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  placeholder="Sobrenome"
                  className="form-control"
                  id="inputLastName"
                  type="text"
                  defaultValue={patient.lastName}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputLastName"
                >
                  Sobrenome
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  placeholder="Email"
                  className="form-control"
                  id="inputEmail"
                  type="email"
                  defaultValue={patient.email}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputEmail">
                  Email
                </label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  placeholder="Data de Nascimento"
                  className="form-control"
                  id="inputBirthDate"
                  type="date"
                  defaultValue={birthDate}
                  disabled
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputBirthDate"
                >
                  Data de Nascimento
                </label>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
