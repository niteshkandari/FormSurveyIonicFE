import React,{ lazy } from "react";
import { Redirect, Switch } from "react-router";
// import ProtectedRoute from "../protectedRoutes";

const ProtectedRoute = lazy(() => import("../protectedRoutes"));
const CreateForm = lazy(() => import("./CreateForm"));
const Forms = lazy(() => import("./Forms"));
const User = lazy(() => import("./User"));


const PageRoutes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/tabs/p/CreateForm/edit/:id"
        component={CreateForm}
      />
      <ProtectedRoute path="/tabs/p/CreateForm" component={CreateForm} />
      <ProtectedRoute path="/tabs/p/Forms" component={Forms} />
      <ProtectedRoute path="/tabs/p/User" component={User} />
      <Redirect exact={true} path="/" to="/tabs/p/CreateForm" />
    </Switch>
  );
};

export default PageRoutes;
