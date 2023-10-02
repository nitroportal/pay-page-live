import { CurrencyRupeeIcon, BanknotesIcon } from '@heroicons/react/20/solid'
import UpiIcon from '../icons/UpiIcon'

const channel_type_avatars = {
  upi: UpiIcon,
  bank_transfer: BanknotesIcon
}

const channelTypeItem = ({ name, type }) => ({
  name,
  id: type,
  avatar: channel_type_avatars[type] || CurrencyRupeeIcon
})

export default channelTypeItem
