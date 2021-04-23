import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../../../components/Navbar";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import User from "../../../../assets/user.svg";
import AuthContext from "../../../../contexts/auth/AuthContext";
import api from "../../../../services/api";

export default function Account() {
  const { decodedToken } = useContext(AuthContext);

  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (decodedToken) {
      try {
        const { data } = await api.put(
          `patient/${decodedToken.unique_name}`,
          patient
        );
        if (!data.success) {
          toast.error(data.notifications[0].message);
          return;
        }
        Swal.fire(
          "Alterado com sucesso",
          "Seus dados foram alterados com sucesso!",
          "success"
        );
      } catch (e) {
        alert(e.message);
      }
    }
  }

  useEffect(() => {
    async function GetPatient() {
      if (decodedToken) {
        try {
          setLoading(true);
          const { data } = await api.get(`patient/${decodedToken.unique_name}`);
          setPatient(data.data);
          setLoading(false);
        } catch (err) {
          alert(err.message);
        }
      }
    }
    GetPatient();
  }, [decodedToken]);

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
          <form onSubmit={handleSubmit} className="container">
            <legend>Dados pessoais</legend>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, firstName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setPatient({ ...patient, lastName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setPatient({ ...patient, email: e.target.value })
                  }
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
                  defaultValue={String(patient.birthDate).split("T")[0]}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputBirthDate"
                >
                  Data de Nascimento
                </label>
              </div>
            </div>
            <legend>Endereço</legend>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, address: e.target.value })
                  }
                  placeholder="Endereço"
                  className="form-control"
                  id="inputAddress"
                  type="text"
                  defaultValue={patient.address}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputAddress"
                >
                  Endereço
                </label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, district: e.target.value })
                  }
                  placeholder="Bairro"
                  className="form-control"
                  id="inputDistrict"
                  type="text"
                  defaultValue={patient.district}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputDistrict"
                >
                  Bairro
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, cep: e.target.value })
                  }
                  placeholder="CEP"
                  className="form-control"
                  id="inputCep"
                  type="text"
                  defaultValue={patient.cep}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputCep">
                  CEP
                </label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, complement: e.target.value })
                  }
                  placeholder="Complemento"
                  className="form-control"
                  id="inputComplement"
                  type="text"
                  defaultValue={patient.complement}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputComplement"
                >
                  Complemento
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, city: e.target.value })
                  }
                  placeholder="Cidade"
                  className="form-control"
                  id="inputCity"
                  type="text"
                  defaultValue={patient.city}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputCity">
                  Cidade
                </label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  onChange={(e) =>
                    setPatient({ ...patient, state: e.target.value })
                  }
                  placeholder="Estado"
                  className="form-control"
                  id="inputState"
                  type="text"
                  defaultValue={patient.state}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputState">
                  Estado
                </label>
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-primary col-12 col-lg-4" type="submit">
                Alterar Dados
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
