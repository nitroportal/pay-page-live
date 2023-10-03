import React, { useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useAppContext } from '../AppContext'

import u from '../functions/utils'
function DoneComponent() {
  const { redirect_url } = useAppContext()

  let actionTxt = u.isNonEmptyString(redirect_url) ? 'Redirecting...' : 'You may close this wondow'

  useEffect(() => {
    if (u.isNonEmptyString(redirect_url)) {
      setTimeout(() => {
        window.location.href = redirect_url
      }, 2000)
    }
  }, [redirect_url])

  return (
    <div className="mx-auto flex flex-col items-center max-w-2xl py-32 sm:py-48 lg:py-56 fly-in-right">
      <CheckCircleIcon className="w-20 h-20 text-green-600" />
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">All Done</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">{actionTxt}</p>
      </div>
    </div>
  )
}

export default DoneComponent
