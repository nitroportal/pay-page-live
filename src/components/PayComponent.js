import React, { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'

import ProgressSteps from './pay/ProgressSteps'
import PayHeader from './pay/PayHeader'
import BackButton from './pay/BackButton'

import ChannelSelector from './step-1/ChannelSelector'
import UPIPaymentComponent from './step-2/UPIPayComponent'
import BankTransferPayComponent from './step-2/BankTransferPayComponent'
import ConfirmComponent from './step-3/ConfirmComponent'

import u from '../functions/utils.js'

export default function PayComponent() {
  const { setError, step, channels, amount, channel } = useAppContext()

  useEffect(() => {
    if (!u.isNonEmptyArray(channels) || !u.isPositiveNumber(amount)) setError(true)
  }, [channels, step, channel])

  try {
    const showStepName = () =>
      step === 1
        ? 'Payment Options'
        : step === 2
        ? 'Make Payment'
        : step === 3
        ? 'Submit Confirmation'
        : step === 4
        ? 'Thank You'
        : ''

    // const MakePaymentComponent = {
    //   upi: <UPIPaymentComponent address={channel.upi_address} />
    // }[channel.type]

    return (
      <div className="bg-white sm:px-[4vw] sm:py-[2.4vw] bg-transparent flex justify-center">
        <div className="flex flex-col sm:p-2 bg-white rounded-[12px] sm:ring-1 sm:ring-gray-300 w-full lg:max-w-[720px] min-h-[0px] pb-[40px]">
          <BackButton />
          <PayHeader />
          <div className="p-[4vw] pt-[40px]">
            <h3 className="text-xl text-center font-bold text-gray-900">{showStepName()}</h3>
            <ProgressSteps />
            {step === 1 && <ChannelSelector />}
            {step === 2 && channel?.type === 'upi' && <UPIPaymentComponent />}
            {step === 2 && channel?.type === 'bank_transfer' && <BankTransferPayComponent />}
            {step === 3 && <ConfirmComponent />}
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
