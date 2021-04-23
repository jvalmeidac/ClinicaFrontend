import React, { useEffect, useState } from "react";
import api from "../../../../services/api";

export default function Scheduling() {
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    async function getOpenedSchedules() {
      try {
        const { data } = await api.get(`appointments`);
        setAppointments(data.data);
      } catch (e) {
        alert(e.message);
      }
    }
    getOpenedSchedules();
  }, []);

  return (
    <>
      <section></section>
    </>
  );
}
