import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../../../services/api";

import Header from "../../../../components/Admin/Header";
import Sidebar from "../../../../components/Admin/Sidebar";

export default function Academic() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [academics, setAcademics] = useState([]);
  const [academic, setAcademic] = useState({
    firstName: null,
    lastName: null,
    email: null,
    registration: null,
  });

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post(`academic/`, academic, {});
      if (data.sucess === false) {
        alert(`Ocorreu um erro. Erro: ${data.notifications[0].message}`);
        return;
      }
      alert("Acadêmico registrado com sucesso!");
      await getAcademics();
    } catch (e) {
      alert(e);
    }
  }

  const getAcademics = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`academic`);
      if (data.sucess === false) {
        alert("error");
        return;
      }
      setAcademics(data.data);
      setLoading(false);
    } catch (e) {
      alert(e.message);
    }
  }, []);

  useEffect(() => {
    getAcademics();
  }, [getAcademics]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="row mt-5">
          <Sidebar />
          <div className="col-lg-10">
            <div className="row">
              <div className="text-center col-lg-4 m-lg-0 mb-1 mt-1">
                <small className="d-block">
                  Cadastre um acadêmico no banco da Clínica
                </small>
                <button
                  onClick={openModal}
                  className="btn btn-primary col-lg-8 col-12"
                >
                  Adicionar Acadêmico
                </button>
              </div>
              <div className="col-lg-8">
                {academics ? (
                  <table className="table table-bordered table-hover border-primary">
                    <thead>
                      <tr className="text-center">
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Matrícula</th>
                        <th>Adicionado em:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academics.map((academic) => {
                        const formatedDate = new Date(
                          academic.createdAt
                        ).toLocaleString();

                        return (
                          <tr key={academic.idAcademic} className="text-center">
                            <td>{academic.firstName}</td>
                            <td>{academic.lastName}</td>
                            <td>{academic.email}</td>
                            <td>{academic.registration}</td>
                            <td>{formatedDate}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>
                    <h3>Sem matérias adicionadas</h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Subject Modal"
        style={customStyles}
      >
        <div className="d-flex justify-content-between mb-3">
          <div className="me-3">
            <h3>Preencha os dados do acadêmico</h3>
          </div>
          <div>
            <button
              className="btn btn-outline-danger ml-3"
              onClick={closeModal}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) =>
                  setAcademic({ ...academic, firstName: e.target.value })
                }
                required
                className="form-control"
                id="inputFirstName"
                type="text"
                placeholder="Nome"
              />
              <label htmlFor="inputFirstName">Nome</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) =>
                  setAcademic({ ...academic, lastName: e.target.value })
                }
                required
                className="form-control"
                id="inputLastName"
                type="text"
                placeholder="Sobrenome"
              />
              <label htmlFor="inputLastName">Sobrenome</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) =>
                  setAcademic({ ...academic, email: e.target.value })
                }
                required
                className="form-control"
                type="email"
                id="inputEmail"
                placeholder="Email"
              />
              <label htmlFor="inputEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) =>
                  setAcademic({ ...academic, registration: e.target.value })
                }
                required
                className="form-control"
                id="inputRegistration"
                type="text"
                placeholder="Matrícula"
              />
              <label htmlFor="inputRegistration">Matrícula</label>
            </div>

            <button type="submit" className="btn btn-primary col-12">
              <i className="bi bi-plus-square"></i> Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
