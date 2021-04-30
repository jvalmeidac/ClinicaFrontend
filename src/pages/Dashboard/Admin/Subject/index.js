import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../../../services/api";

import Header from "../../../../components/Admin/Header";
import Sidebar from "../../../../components/Admin/Sidebar";

export default function Subject() {
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

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({
    name: null,
    description: null,
    code: null,
    weekDay: 0,
    dayPeriod: 0,
  });

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  console.log(subject);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post(`subject/`, subject);
      if (data.sucess === false) {
        alert(`Ocorreu um erro. Erro: ${data.notifications[0].message}`);
        return;
      }
      alert("Matéria cadastrada com sucesso!");
      await getSubjects();
    } catch (e) {
      alert(e);
    }
  }

  const getSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`subject`);
      if (data.sucess === false) {
        alert("error");
        return;
      }
      setSubjects(data.data);
      setLoading(false);
      console.log(data);
    } catch (e) {
      alert(e.message);
    }
  }, []);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

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
                  Cadastre uma matéria no banco da Clínica
                </small>
                <button onClick={openModal} className="btn btn-primary">
                  Adicionar Matéria
                </button>
              </div>
              <div className="col-lg-8">
                {subjects ? (
                  <table className="table table-bordered table-hover border-primary">
                    <thead>
                      <tr className="text-center">
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Dia da Semana</th>
                        <th>Período do Dia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject) => {
                        return (
                          <tr key={subject.subjectId} className="text-center">
                            <td>{subject.name}</td>
                            <td>{subject.description}</td>
                            <td>{subject.weekDay}</td>
                            <td>{subject.dayPeriod}</td>
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
            <h3>Preencha os dados da matéria</h3>
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
                  setSubject({ ...subject, name: e.target.value })
                }
                className="form-control"
                id="inputName"
                type="text"
                placeholder="Nome"
              />
              <label htmlFor="inputName">Nome</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={(e) =>
                  setSubject({ ...subject, description: e.target.value })
                }
                className="form-control"
                placeholder="Descrição"
                id="tareaDescription"
                cols="50"
                maxLength="150"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="tareaDescription">Descrição</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) =>
                  setSubject({ ...subject, code: e.target.value })
                }
                className="form-control"
                id="inputCode"
                type="text"
                placeholder="Código"
              />
              <label htmlFor="inputCode">Código</label>
            </div>
            <div className="form-floating mb-3">
              <select
                defaultValue={subject.weekDay}
                className="form-select"
                id="selectWeekDay"
                onChange={(e) =>
                  setSubject({
                    ...subject,
                    weekDay: e.target.value,
                  })
                }
              >
                <option value={1}>Segunda-Feira</option>
                <option value={2}>Terça-Feira</option>
                <option value={3}>Quarta-Feira</option>
                <option value={4}>Quinta-Feira</option>
                <option value={5}>Sexta-Feira</option>
                <option value={6}>Sábado</option>
              </select>
              <label htmlFor="selectWeekDay">Dia da Semana</label>
            </div>
            <div className="form-floating mb-3">
              <select
                defaultValue={subject.dayPeriod}
                className="form-select"
                id="selectDayPeriod"
                onChange={(e) =>
                  setSubject({
                    ...subject,
                    dayPeriod: e.target.value,
                  })
                }
              >
                <option value={1}>Manhã</option>
                <option value={2}>Tarde</option>
                <option value={3}>Noite</option>
              </select>
              <label htmlFor="selectDayPeriod">Período do Dia</label>
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
