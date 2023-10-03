/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

import { useAppContext } from '../../AppContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'

import UpiIcon from '../icons/UpiIcon'
import u from '../../functions/utils'

export default function ChannelOptions() {
  let { channelType, channel, setChannel, setStep } = useAppContext()

  // useEffect(() => console.log('channelType', channelType), [channelType, channel])

  if (!u.isNonEmptyArray(channelType?.options)) return null

  function UpiOption({ address }) {
    return (
      <div className="flex items-center space-x-5 p-2">
        <div className="bg-blu bg-opacity-10 p-2 rounded-[4px]">
          <UpiIcon className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-sm md:text-base ">{address}</span>
      </div>
    )
  }

  function BankTransferOption({ bankName, accountNumber, ifscCode }) {
    return (
      <div className="flex items-center space-x-5 p-1">
        <div className="bg-blu bg-opacity-10 p-2 rounded-[4px]">
          <BanknotesIcon className="h-6 w-6 text-blu_med" />
        </div>
        <div className="space-y-1">
          <div>
            <span className="font-bold text-sm">{bankName}</span>
          </div>
          <div className="font-extralight text-xs">{accountNumber}</div>
          <div className="font-extralight text-xs">{ifscCode}</div>
        </div>
      </div>
    )
  }

  function ChannelOption({ c }) {
    if (!c) return

    const OptionTypeComponent = {
      upi: <UpiOption address={c.upi_address} />,
      bank_transfer: (
        <BankTransferOption bankName={c.bank_name} accountNumber={c.bank_account_number} ifscCode={c.bank_ifsc_code} />
      )
    }[c.type] || <div></div>

    const selectOption = () => {
      setChannel(c)
      setStep(2)
    }

    return (
      <div
        onClick={selectOption}
        className={`group cursor-pointer relative flex w-full rounded-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 min-h-[64px] fade-in ${
          c.channel_id === channel?.channel_id ? 'ring-blu ring-1' : ''
        }  hover:ring-blu hover:ring-2 hover:bg-opacity-5 hover:bg-blu`}
      >
        <div className="flex-grow p-4">{OptionTypeComponent}</div>
        <div className="flex items-center p-3 bg-transparent group-hover:bg-blu text-blu_med group-hover:text-white min-h-full rounded-r-md transition-opacity duration-300">
          <ChevronRightIcon className="h-5 w-5" />
        </div>
        {/* <div className="absolute rounded-md inset-0 border-2 border-transparent transition-all duration-300"></div> */}
      </div>
    )
  }

  return (
    <>
      <div className="block text-sm font-semibold leading-6 text-gray-900">Select an Option</div>
      <div className={`grid gap-4 pt-[14px] grid-cols-1`}>
        {channelType?.options?.map((x) => (
          <ChannelOption key={x.channel_id} c={x} />
        ))}
      </div>
    </>
  )
}
