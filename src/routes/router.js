import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "../contexts/auth/AuthProvider";

import Account from "../pages/Dashboard/Account";
import Scheduling from "../pages/Dashboard/Scheduling";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./private";

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={() => <Login />} />
        <Route path="/signup/" component={() => <Register />} />
        <PrivateRoute
          path="/dashboard/scheduling"
          component={() => <Scheduling />}
        />
        <PrivateRoute path="/dashboard/account" component={() => <Account />} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
);

export default Routes;
