import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './App.css';

import ErrorComponent from './components/ErrorComponent';
import ChannelsComponent from './components/ChannelsComponent';
import LoadingComponent from './components/LoadingComponent';

import loadPage from './functions/load-page';

function App() {
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedChannel, setChannel] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState(true);
  const { payment_id, token } = useParams();
  const location = useLocation();

  const manageState = {
    setError, setChannel, setStep, setLoading
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect'); // Optional

    console.log("redirect", redirect)
    console.log("payment_id", payment_id)
    console.log("token", token)

    const isJwt = token && token.split('.').length === 3; // Basic JWT validation

    if (!payment_id || !isJwt) {
      console.log("invalid url")
      setError(true);
    }

    if (!error) loadPage(manageState, payment_id, token)

    // Uncomment the following line if you want to set error state when pathname is 'wow'
    // if (location.pathname === 'wow') setError(true);
  }, [payment_id, token, location]);

  return (
    <div className="bg-backgroundGray min-h-screen">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : step === "channels" ? (
        <ChannelsComponent manageState={manageState}/>
      ) : ( <ErrorComponent />) }
    </div>
  );
}

export default App;