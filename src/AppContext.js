import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext()

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
    setChannel
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
