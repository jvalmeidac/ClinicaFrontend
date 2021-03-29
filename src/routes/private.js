import { useContext } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "../contexts/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => (token ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
