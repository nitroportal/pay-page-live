import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/:payment_id/:token" component={App} />
      </Switch>
    </Router>
  );
}

export default Main;