import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="col-lg-2">
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <NavLink
            activeClassName="active"
            className="nav-link"
            aria-current="page"
            to="/admin/subject"
          >
            Matérias
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/admin/academic"
          >
            Acadêmicos
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
