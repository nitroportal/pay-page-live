import React from 'react'
import { useAppContext } from '../../AppContext'
import u from '../../functions/utils'

import { CurrencyRupeeIcon, BanknotesIcon } from '@heroicons/react/20/solid'
import UpiIcon from '../icons/UpiIcon'

import ChannelTypeDropdown from './ChannelTypeDropdown'
import ChannelOptions from './ChannelOptions'

const channel_type_avatars = {
  upi: UpiIcon,
  bank_transfer: BanknotesIcon
}

export default function ChannelSelector() {
  let { channels } = useAppContext()

  const channel_type_options = channels.map(({ name, type }) => ({
    name,
    id: type,
    avatar: channel_type_avatars[type] || CurrencyRupeeIcon
  }))

  return (
    <form className="space-y-8" action="#" method="POST">
      <div>
        <div className="mt-2">
          <ChannelTypeDropdown items={channel_type_options} label="Deposit Type" />
        </div>
        <ChannelOptions />
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
