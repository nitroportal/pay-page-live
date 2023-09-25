import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import ErrorComponent from "./components/ErrorComponent";

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/:merchant_id/:token" component={App} />
        <Route path="*">
          <ErrorComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default Main;
