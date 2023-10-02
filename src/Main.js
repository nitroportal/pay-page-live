import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppProvider } from './AppContext'
import App from './App'
import './App.css'
import ErrorComponent from './components/ErrorComponent'

function Main() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/:appId/:authToken" component={App} />
          <Route path="*">
            <ErrorComponent />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default Main
