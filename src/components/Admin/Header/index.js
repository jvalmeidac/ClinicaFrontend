import React from "react";

import Logo from "../../../assets/logo.png";

export default function Header() {
  return (
    <>
      <div className="row mt-3 mb-3 justify-content-center">
        <img
          style={{ width: "400px" }}
          className="img-fluid"
          src={Logo}
          alt="Unitpac"
        />
      </div>
    </>
  );
}
