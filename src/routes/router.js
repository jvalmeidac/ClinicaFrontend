import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./private";

//Páginas
import Account from "../pages/Dashboard/Account";
import Scheduling from "../pages/Dashboard/Scheduling";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Register from "../pages/Register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Menu />} />
      <Route path="/login/" component={() => <Login />} />
      <Route path="/signup/" component={() => <Register />} />
      <PrivateRoute
        path="/dashboard/scheduling"
        component={() => <Scheduling />}
      />
      <PrivateRoute path="/dashboard/account" component={() => <Account />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
