import React, { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppContext } from './AppContext'
import './App.css'

// components
import ErrorComponent from './components/ErrorComponent'
import ChannelsComponent from './components/ChannelsComponent'
import LoadingComponent from './components/LoadingComponent'

import loadPage from './functions/load-page'

function App() {
  const { error, setError, loading, step, setStep, setRedirectUrl, setLoading, setChannels, setAmount } =
    useAppContext()

  const { appId, authToken } = useParams()
  const { search } = useLocation()

  const loadPageCalledRef = useRef(false)

  useEffect(() => {
    try {
      const params = new URLSearchParams(search)
      const redirect = params.get('redirect') // Optional

      const isJwt = authToken && authToken.split('.').length === 3 // Basic JWT validation

      if (!appId || !isJwt) throw Error('invalid url')

      sessionStorage.setItem('appId', appId)
      sessionStorage.setItem('authToken', authToken)

      setRedirectUrl(redirect)

      if (!loadPageCalledRef.current) {
        //... rest of the code in useEffect
        loadPage({ setStep, setError, setLoading, setChannels, setAmount })
        loadPageCalledRef.current = true
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setLoading(false)
    }
  }, [search, authToken, appId])

  return (
    <div className="bg-backgroundGray min-h-screen">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : step === 'channels' ? (
        <ChannelsComponent />
      ) : (
        <ErrorComponent />
      )}
    </div>
  )
}

export default App
