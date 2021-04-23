import React from "react";
import Header from "../../../../components/Admin/Header";
import Sidebar from "../../../../components/Admin/Sidebar";

export default function Academic() {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <Sidebar />
        <div className="d-flex align-items-center col-lg-8">
          <button className="btn btn-primary">Adicionar Acadêmico</button>
        </div>
      </div>
    </div>
  );
}
