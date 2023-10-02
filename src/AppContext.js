import React, { createContext, useState, useContext } from 'react'
const AppContext = createContext()

import u from './functions/utils'
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(null)
  const [amount, setAmount] = useState(null)
  const [step, setStep] = useState(true)
  const [app_id, setAppId] = useState(null)
  const [auth_token, setToken] = useState(null)
  const [redirect_url, setRedirectUrl] = useState(null)
  const [channels, setChannels] = useState([])
  const [channelType, setChannelType] = useState(null)
  const [channel, setChannel] = useState(null)
  const [selected_channel, selectChannel] = useState(null)
  const [toasts, setToasts] = useState([])
  const [utr, setUtr] = useState('')

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  const addToast = (type, message, duration) => {
    let id = u.UUID()
    setToasts((prevToasts) => [...prevToasts, { id, type, message }])

    if (u.isPositiveNumber(duration)) {
      const timerId = setTimeout(() => removeToast(id), duration)

      // Return a cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timerId)
    }
  }

  const contextValue = {
    error,
    setError,
    selected_channel,
    selectChannel,
    loading,
    setLoading,
    step,
    setStep,
    app_id,
    setAppId,
    auth_token,
    setToken,
    redirect_url,
    setRedirectUrl,
    channels,
    setChannels,
    amount,
    setAmount,
    page,
    setPage,
    channelType,
    setChannelType,
    channel,
    setChannel,
    toasts,
    addToast,
    removeToast,
    utr,
    setUtr
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export { AppProvider, useAppContext }
