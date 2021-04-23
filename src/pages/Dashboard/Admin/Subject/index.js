import React from "react";
import Header from "../../../../components/Admin/Header";
import Sidebar from "../../../../components/Admin/Sidebar";

export default function Subject() {
  return (
    <div className="container m-3">
      <Header />
      <div className="row">
        <Sidebar />
        <div className="col-lg-10">
          <div className="row">
            <div className="d-flex align-items-center col-lg-4">
              <button className="btn btn-primary">Adicionar Matéria</button>
            </div>
            <div className="col-lg-8">
              <table className="table">
                <thead>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Dia da Semana</th>
                  <th>Período do Dia</th>
                </thead>
                <tbody>
                  <td>
                    <td>7</td>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
