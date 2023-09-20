import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './App.css';
import ErrorComponent from './components/ErrorComponent';

function App() {
  const [error, setError] = useState(null);
  const { payment_id, token } = useParams();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect'); // Optional

    console.log("redirect", redirect)

    const isJwt = token && token.split('.').length === 3; // Basic JWT validation

    if (!payment_id || !isJwt) {
      console.log("invalid url")
      setError(true);
    }

    // Uncomment the following line if you want to set error state when pathname is 'wow'
    // if (location.pathname === 'wow') setError(true);
  }, [payment_id, token, location]);

  return (
    <div className="bg-backgroundGray min-h-screen">
      {error ? (
        <ErrorComponent />
      ) : (
        <ErrorComponent />
      )}
    </div>
  );
}

export default App;
