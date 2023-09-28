import React from 'react'
import { useAppContext } from '../../AppContext'

import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export default function BackButton() {
  const { step, setStep } = useAppContext()

  const goBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    step > 1 && (
      <button
        className="absolute sm:top-[3vw] sm:left-[4.6vw] m-2 p-2 lg:top-[2.4vw] lg:left-[2.44vw]"
        onClick={goBack}
        aria-label="Go Back"
      >
        <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
      </button>
    )
  )
}
