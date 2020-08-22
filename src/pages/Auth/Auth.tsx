import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

const Auth = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to={{ pathname: "/boards" }} />;
  }

  return (
    <div className="w-screen h-screen pt-32 bg-gray-200">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/reset-password" component={ForgotPassword} />
      </Switch>
    </div>
  );
};

export default Auth;
