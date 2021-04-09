import React, { useContext, useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import Swal from "sweetalert2";

import AuthContext from "../../contexts/auth/AuthContext";

import api from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

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

  const [appointments, setAppointments] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

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
          `appointment/${decodedToken.unique_name}`
        );
        setAppointments(data.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    }
  }, [decodedToken]);

  async function handleScheduling(e) {
    e.preventDefault();

    const schedule = new Date(`${date}T${time}Z`).toJSON();
    await api.post("appointment/", {
      schedule,
      patientId: decodedToken.unique_name,
      appointmentType: 2,
    });
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
              {appointments.length > 0 ? (
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
                              {appointment.operator || "Aguardando dados..."}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Nenhuma consulta agendada</p>
              )}
            </div>
          </div>
        </section>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="d-flex justify-content-between">
          <div className="col-10">
            <h2>Preencha os dados</h2>
          </div>
          <div className="col-2 text-center">
            <button className="btn btn-outline-danger" onClick={closeModal}>
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
            <input
              className="form-control"
              type="time"
              id="appointmentScheduleTime"
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="appointmentScheduleTime">Horário</label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary col-12">
              <i className="bi bi-calendar-check"></i> Agendar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
