import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import User from "../../assets/user.svg";

export default function Account() {
  return (
    <>
      <Navbar />
      <section id="account-panel">
        <div className="d-flex justify-content-center">
          <img src={User} alt="Usuário" />
        </div>
      </section>
    </>
  );
}
