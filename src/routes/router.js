import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./private";

//Páginas
import PatientAccount from "../pages/Dashboard/Patient/Account";
import PatientScheduling from "../pages/Dashboard/Patient/Scheduling";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Register from "../pages/Register";
import Subject from "../pages/Dashboard/Admin/Subject";
import Academic from "../pages/Dashboard/Admin/Academic";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Menu />} />
      <Route path="/login/" component={() => <Login />} />
      <Route path="/signup/" component={() => <Register />} />
      <PrivateRoute
        path="/dashboard/patient/scheduling"
        component={() => <PatientScheduling />}
      />
      <PrivateRoute
        path="/dashboard/patient/account"
        component={() => <PatientAccount />}
      />
      <Route path="/admin/subject" component={() => <Subject />} />
      <Route path="/admin/academic" component={() => <Academic />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
