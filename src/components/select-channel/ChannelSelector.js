import React from 'react'
import { useAppContext } from '../../AppContext'
import u from '../../functions/utils'

import { CurrencyRupeeIcon, AtSymbolIcon, BanknotesIcon } from '@heroicons/react/20/solid'

import ChannelTypeDropdown from './ChannelTypeDropdown'

const channel_type_avatars = {
  upi: AtSymbolIcon,
  bank_transfer: BanknotesIcon
}

export default function ChannelSelector() {
  let { channels } = useAppContext()

  const channel_type_options = channels.map(({ name, type }) => ({
    name,
    id: type,
    avatar: channel_type_avatars[type] || CurrencyRupeeIcon
  }))

  //   const channelTypeChange = (e) => {
  //     const selectedTypeId = e.target.value
  //     const selectedChannelType = channels.find((ch) => ch.type === selectedTypeId)
  //     setChannelType(selectedChannelType)
  //   }

  //   const selectChannel = (e) => {
  //     let SelectedChannel = channelType.options.find((x) => x._id === e.target.value)
  //     setChannel(e.target.value)
  //     setStep(2)
  //   }

  return (
    <form className="space-6" action="#" method="POST">
      <div>
        <div className="mt-2">
          <ChannelTypeDropdown items={channel_type_options} label="Deposit Type" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-300">01</div>
        <div className="bg-slate-300">02</div>
        <div className="bg-slate-300">03</div>
      </div>
      <div>
        <a
          href="#"
          className="mt-10 block w-full rounded-md bg-blu_dark px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blu_med focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu"
        >
          Big Mama
        </a>
      </div>
    </form>
  )
}

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
