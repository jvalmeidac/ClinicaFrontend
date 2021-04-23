import React, { useContext, useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

import AuthContext from "../../../../contexts/auth/AuthContext";

import api from "../../../../services/api";

import NoData from "../../../../assets/empty-box.svg";

import Navbar from "../../../../components/Navbar";
import StatusBadge from "../../../../components/StatusBadge";

Modal.setAppElement("#root");

export default function Scheduling() {
  const { decodedToken } = useContext(AuthContext);

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

  //Consultas Agendadas
  const [appointments, setAppointments] = useState([]);

  //Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  //Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //Agendamento
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("08:00");

  const timetable = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const GetSchedules = useCallback(async () => {
    if (decodedToken) {
      try {
        setLoading(true);
        const { data } = await api.get(
          `appointment/${decodedToken.unique_name}?PageNumber=${currentPage}`
        );
        setAppointments(data.data);
        setPagination(data.pagination);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    }
  }, [decodedToken, currentPage]);

  async function handleScheduling(e) {
    e.preventDefault();

    const schedule = new Date(`${date}T${time}Z`).toJSON();
    try {
      const { data } = await api.post("appointment/", {
        schedule,
        patientId: decodedToken.unique_name,
        appointmentType: 2,
      });
      if (!data.success) {
        toast.error(`Erro: ${data.notifications[0].message}`);
        return;
      }
    } catch (e) {
      window.alert(e);
    }
    closeModal();
    Swal.fire("Sucesso", "Sua consulta foi agendada com sucesso!", "success");
    await GetSchedules();
  }

  useEffect(() => {
    GetSchedules();
  }, [GetSchedules]);

  return (
    <>
      <Navbar />
      <section id="appointments" className="container mt-3">
        <div className="row m-1">
          <div className="col-lg-4 mb-3 text-center">
            <h4>Bem Vindo(a)</h4>
            <button className="btn btn-primary" onClick={openModal}>
              Agendar Consulta
            </button>
          </div>
          <div className="col-lg-8 col-12 shadow rounded">
            <legend>Consultas</legend>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                }}
                className="mb-3"
              >
                <ClipLoader size={150} />
              </div>
            ) : (
              <>
                {appointments.length > 0 ? (
                  <div>
                    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                      <table className="col-12 table table-bordered border-primary table-hover">
                        <thead>
                          <tr className="text-center">
                            <th scope="col">Agendamento</th>
                            <th scope="col">Status</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Acadêmico</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => {
                            const schedule = new Date(appointment.schedule);
                            const scheduleDate = schedule.toLocaleDateString();
                            const scheduleTime = schedule.toLocaleTimeString();

                            return (
                              <tr
                                key={appointment.appointmentId}
                                className="text-center"
                              >
                                <td>{scheduleDate + " - " + scheduleTime}</td>
                                <td>
                                  <StatusBadge
                                    status={appointment.appointmentStatus}
                                  />
                                </td>
                                <td>{appointment.description}</td>
                                <td>
                                  {appointment.operator ||
                                    "Aguardando dados..."}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "0.15rem",
                      }}
                    >
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            pagination.hasPrevious ? "" : " disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Anterior
                          </button>
                        </li>
                        {Array(pagination.totalPages)
                          .fill("")
                          .map((_, index) => {
                            return (
                              <li
                                key={index}
                                className={`page-item ${
                                  currentPage === index + 1 ? " active" : ""
                                }`}
                              >
                                <button
                                  style={{ position: "static" }}
                                  className="page-link"
                                  onClick={() => setCurrentPage(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            );
                          })}
                        <li
                          className={`page-item ${
                            pagination.hasNext ? "" : " disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Próximo
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column justfify-between align-items-center">
                    <img
                      className="img-fluid w-25"
                      src={NoData}
                      alt="Sem dados"
                    />
                    <p>Nenhuma consulta agendada</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="d-flex justify-content-between">
          <div className="me-3">
            <h3>Preencha os dados</h3>
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
        <form onSubmit={handleScheduling}>
          <div className="form-floating mt-3 mb-3">
            <input
              className="form-control"
              id="appointmentSchedule"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="appointmentSchedule">Data</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={(e) => setTime(e.target.value)}
              className="form-select"
              id="appointmensScheduleTime"
            >
              {timetable.map((time, index) => {
                return (
                  <option key={index} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>
            <label htmlFor="appointmentScheduleTime">Horário</label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary col-12">
              <i className="bi bi-calendar-check"></i> Agendar
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}
