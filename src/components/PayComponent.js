import React, { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'

import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import ProgressSteps from './pay/ProgressSteps'
import PayHeader from './pay/PayHeader'
import ChannelSelector from './select-channel/ChannelSelector'

import u from '../functions/utils.js'

export default function PayComponent() {
  const { setError, step, channels, amount, setStep } = useAppContext()

  useEffect(() => {
    if (!u.isNonEmptyArray(channels) || !u.isPositiveNumber(amount)) setError(true)
  }, [channels, step])

  try {
    const showStepName = () =>
      step === 1
        ? 'Payment Options'
        : step === 2
        ? 'Make Payment'
        : step === 3
        ? 'Submit Payment'
        : step === 4
        ? 'Thank You'
        : ''

    const goBack = () => {
      if (step > 1) setStep(step - 1)
    }

    return (
      <div className="bg-white px-[4vw] py-[2.4vw] bg-transparent flex justify-center">
        <div className="flex flex-col p-2 bg-white rounded-[12px] ring-1 ring-gray-200 w-full lg:max-w-[720px] min-h-[0px]">
          {step > 1 && (
            <button
              className="absolute top-[3vw] left-[4.6vw] m-2 p-2 lg:top-[2.4vw] lg:left-[2.44vw]"
              onClick={goBack}
              aria-label="Go Back"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
          )}
          <PayHeader />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-xl text-center font-bold text-gray-900">{showStepName()}</h3>
            <ProgressSteps />
            {step === 1 && <ChannelSelector />} {/* Render ChannelSelector only if step is 1 */}
          </div>
        </div>
      </div>
    )
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    setError(true)
    return
  }
}
