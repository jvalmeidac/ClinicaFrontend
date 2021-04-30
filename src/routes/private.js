import { useContext } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "../contexts/auth/AuthContext";
import { useJwt } from "react-jwt";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);
  const { isExpired } = useJwt(token);
  return (
    <Route
      {...rest}
      render={() =>
        token && !isExpired ? (
          <Component {...rest} />
        ) : (
          <Redirect to={rest.to} />
        )
      }
    />
  );
};

export default PrivateRoute;
