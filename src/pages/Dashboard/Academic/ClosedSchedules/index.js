import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import StatusBadge from "../../../../components/StatusBadge";
import Header from "../../../../components/Admin/Header";
import api from "../../../../services/api";
import AuthContext from "../../../../contexts/auth/AuthContext";

export default function Scheduling() {
  const { decodedToken } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getOpenedSchedules() {
      try {
        const { data } = await api.get(`academic/${decodedToken.unique_name}`);
        setAppointments(data.data);
      } catch (e) {
        alert(e.message);
      }
    }
    if (decodedToken) getOpenedSchedules();
  }, [decodedToken]);

  console.log(appointments);

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    aria-current="page"
                    to="/dashboard/academic/schedulings"
                  >
                    Consultas em aberto
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/dashboard/academic/closedschedules"
                  >
                    Consultas que você realizou
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-8">
              {appointments.length > 0 ? (
                <table className="col-12 table table-bordered border-primary table-hover">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Agendamento</th>
                      <th scope="col">Paciente</th>
                      <th scope="col">Status</th>
                      <th scope="col">Descrição</th>
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
                          <td>João Victor A. Costa</td>
                          <td>
                            <StatusBadge
                              status={appointment.appointmentStatus}
                            />
                          </td>
                          <td>
                            <button className="btn btn-primary">
                              Adicionar descrição
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center mt-5">
                  <h3>Nenhuma consulta realizada!</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
