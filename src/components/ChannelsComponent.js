import React, { useState } from 'react'
import { useAppContext } from '../AppContext'

// import { ReactComponent as Logo } from '../logo.svg'

import { CurrencyRupeeIcon, AtSymbolIcon, BanknotesIcon } from '@heroicons/react/20/solid'

import CustomDropdown from './CustomDropdown'

import u from '../functions/utils.js'

const test = [
  {
    name: 'UPI',
    type: 'upi',
    options: [
      {
        type: 'upi',
        upi_address: 'example@adress',
        channel_id: '2184b1c4-4add-4bf7-8888-d4fdf302ef9f'
      }
    ]
  },
  {
    name: 'Bank Transfer',
    type: 'bank_transfer',
    options: [
      {
        type: 'bank_transfer',
        bank_name: 'Some Bank',
        bank_account_number: '123123123123',
        bank_ifsc_code: '456456',
        channel_id: 'e529c0f1-7789-40ae-86e9-892e3ad52c46'
      }
    ]
  }
]

const channel_type_avatars = {
  upi: AtSymbolIcon,
  bank_transfer: BanknotesIcon
}

export default function ChannelsComponent() {
  const { setError, selectChannel, setStep, setLoading, channels, amount } = useAppContext()

  if (!u.isNonEmptyArray(channels)) return setError(true)

  const [selectedChannelType, setSelectedChannelType] = useState(null)
  const [selectedChannelOption, setSelectedChannelOption] = useState(null)
  const [channelOptions, setChannelOptions] = useState([])

  const handleChannelTypeChange = (e) => {
    const selectedType = e.target.value
    const channel = channels.find((ch) => ch.type === selectedType)

    setSelectedChannelType(selectedType)
    if (channel) setChannelOptions(channel.options)
  }

  const handleChannelOptionChange = (e) => {
    setSelectedChannelOption(e.target.value)
  }

  // name, id, avatar

  const channel_type_options = channels.map(({ name, type }) => ({
    name,
    id: type,
    avatar: channel_type_avatars[type] || CurrencyRupeeIcon
  }))

  // return (
  //   <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
  //     <div className="text-center">
  //       <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Channels</h1>
  //       <p className="mt-6 text-lg leading-8 text-gray-600">Channels component stuff.</p>

  //       {/* Channel Type Dropdown */}
  //       <select onChange={handleChannelTypeChange} value={selectedChannelType || ''}>
  //         <option value="" disabled>
  //           Select Channel Type
  //         </option>
  //         {channels.map((channel) => (
  //           <option key={channel.type} value={channel.type}>
  //             {channel.name}
  //           </option>
  //         ))}
  //       </select>

  //       {/* Channel Options Dropdown */}
  //       {selectedChannelType && (
  //         <select onChange={handleChannelOptionChange} value={selectedChannelOption || ''}>
  //           <option value="" disabled>
  //             Select Channel Option
  //           </option>
  //           {channelOptions.map((option) => (
  //             <option key={option.channel_id} value={option.channel_id}>
  //               {option.type}
  //             </option>
  //           ))}
  //         </select>
  //       )}
  //     </div>
  //   </div>
  // )

  return (
    <div className="bg-white min-h-screen px-[4vw] py-[40px] bg-transparent flex justify-center">
      <div className="p-2 bg-white rounded-[12px] ring-1 ring-gray-200 max-w-md">
        <div className="rounded-[8px] bg-slate-50 py-[4vw] text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-[40px]">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">Your Deposit</p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">{u.displayCents(amount)}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">INR</span>
            </p>
            <p className="mt-6 text-xs leading-5 text-gray-600">Please send this amountt</p>
          </div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2">
                <CustomDropdown items={channel_type_options} label="Deposit Type" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between"></div>
              <div className="mt-2"></div>
            </div>
          </form>
        </div>
        <div>
          <a
            href="#"
            className="mt-10 block w-full rounded-md bg-blu_med px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu"
          >
            Big Mama
          </a>
        </div>
      </div>
    </div>
  )
}
