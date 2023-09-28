import React, { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'

import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import ProgressSteps from './pay/ProgressSteps'
import PayHeader from './pay/PayHeader'
import ChannelSelector from './channel/ChannelSelector'
import BackButton from './pay/BackButton'

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

    return (
      <div className="bg-white sm:px-[4vw] sm:py-[2.4vw] bg-transparent flex justify-center">
        <div className="flex flex-col sm:p-2 bg-white rounded-[12px] sm:ring-1 sm:ring-gray-300 w-full lg:max-w-[720px] min-h-[0px] pb-[40px]">
          <BackButton />
          <PayHeader />
          <div className="p-[4vw] pt-[40px]">
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
