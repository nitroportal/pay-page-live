import React, { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppContext } from './AppContext'
import './App.css'

// components
import ErrorComponent from './components/ErrorComponent'
import PayComponent from './components/PayComponent'
import LoadingComponent from './components/LoadingComponent'
import ToastsContainer from './components/common/ToastContainer'
import DoneComponent from './components/DoneComponent'

import loadPage from './functions/load-page'

function App() {
  const { error, setError, loading, setRedirectUrl, setLoading, setChannels, setAmount, page, setPage, setStep } =
    useAppContext()

  const { appId, authToken } = useParams()
  const { search } = useLocation()

  const loadPageCalledRef = useRef(false)

  useEffect(() => {
    try {
      const params = new URLSearchParams(search)
      const redirect = params.get('redirect_url')

      const isJwt = authToken && authToken.split('.').length === 3

      if (!appId || !isJwt) throw Error('invalid url')

      sessionStorage.setItem('appId', appId)
      sessionStorage.setItem('authToken', authToken)

      setRedirectUrl(redirect)

      if (!loadPageCalledRef.current) {
        loadPage({ setPage, setError, setLoading, setChannels, setAmount, setStep })
        loadPageCalledRef.current = true
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setLoading(false)
    }
  }, [search, authToken, appId])

  return (
    <div className="bg-white min-h-screen">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : page === 'pay' ? (
        <PayComponent />
      ) : page === 'done' ? (
        <DoneComponent />
      ) : (
        <ErrorComponent />
      )}
      <ToastsContainer />
    </div>
  )
}

export default App
