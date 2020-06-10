import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

function mapStateToProps({ auth }) {
  return { isAuthenticated: auth.isAuthenticated };
}

export default connect(mapStateToProps)(PrivateRoute);
