/* eslint-disable react/prop-types */
import u from '../../functions/utils'
import React, { useCallback } from 'react'
import QRCode from 'qrcode.react'
import { useAppContext } from '../../AppContext'
import { DocumentDuplicateIcon, DevicePhoneMobileIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import SubmitButton from '../common/SubmitButton'

function UPIPaymentComponent() {
  let { channel, setStep, addToast } = useAppContext()

  if (!u.isNonEmptyString(channel?.upi_address)) return

  let address = channel.upi_address

  const upiLink = `upi://pay?pa=${address}`

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(address)
    addToast('success', 'Copied to clipboard!', 2400)
  }, [address])

  const goToNextStep = () => {
    setStep(3)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-col items-center justify-center w-full sm:w-[80%]">
        {/* <div className="grid-container pb-6 max-w-[230px] mx-auto">
          <div className="corner top-left border-2 border-r-0 border-b-0 border-gray-400 p-1 rounded-md rounded-b-none rounded-r-none"></div>
          <div className="corner top-right border-2 border-l-0 border-b-0 border-gray-400 p-1 rounded-md rounded-b-none rounded-l-none"></div>
          <div className="corner bottom-left border-2 border-r-0 border-t-0 border-gray-400 p-1 rounded-md rounded-t-none rounded-r-none"></div>
          <div className="corner bottom-right border-2 border-l-0 border-t-0 border-gray-400 p-1 rounded-md rounded-t-none rounded-l-none"></div>
          <div className="content">
            <div className="flex flex-col items-center pt-4">
              <QRCode value={upiLink} />
              <span className="mt-2 text-sm text-gray-800">Scan to Pay</span>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col items-center pb-4">
          <QRCode value={upiLink} />
          <span className="mt-2 text-sm text-gray-800">Scan to Pay</span>
        </div>

        <div
          className={u.classNames(
            'flex items-center px-[40px]', // added 'items-center'
            'group cursor-pointer relative w-full rounded-md min-h-[48px] mb-6',
            'bg-white',
            'ring-1 ring-inset ring-gray-300',
            ' hover:ring-blu hover:ring-2 hover:bg-opacity-5 hover:bg-blu_med'
          )}
        >
          <div onClick={copyToClipboard} className="flex-grow flex p-[1.5vw] justify-center no-outline">
            <span className="text-sm sm:text-xl font-semibold text-gray-600 group-hover:text-blu">{address}</span>
          </div>
          <div className="flex items-center p-[1.5vw] absolute right-0">
            <DocumentDuplicateIcon className="h-4 w-5 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blu" />
          </div>
        </div>

        <div
          className={u.classNames(
            'group cursor-pointer relative flex items-center w-full rounded-md min-h-[48px]',
            'bg-slate-100 hover:bg-opacity-5 hover:bg-blu_med'
          )}
        >
          <div className="flex-grow flex p-[1.5vw] justify-center items-center">
            {' '}
            <DevicePhoneMobileIcon className="h-4 w-5 sm:w-6 sm:h-6 text-blu_dark group-hover:text-blu" />
            <span className="text-sm sm:text-lg font-semibold pl-2 text-blu_dark group-hover:text-blu">
              Pay With Your UPI App
            </span>
          </div>
          <div className="flex items-center p-[1.5vw] absolute right-0">
            <ChevronRightIcon className="h-6 w-6 text-blu_dark group-hover:text-blu" />
          </div>
        </div>
        <SubmitButton onClick={goToNextStep} />
      </div>
    </div>
  )
}

export default UPIPaymentComponent

{
  /* <div className="flex flex-col items-center mb-4">
<a
  href={upiLink}
  className={u.classNames(
    'mt-10 block w-full rounded-md bg-blu p-4 text-center text-sm font-semibold',
    'text-white shadow-sm hover:bg-blu_med focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu'
  )}
>
  Pay With Your UPI App
</a>
</div> */
}
