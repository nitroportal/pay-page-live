/* eslint-disable react/prop-types */
import u from '../../functions/utils'
import React from 'react'
import { useAppContext } from '../../AppContext'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import SubmitButton from '../common/SubmitButton'

function DetailDisplay({ title, text }) {
  const { addToast } = useAppContext()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    addToast('success', 'Copied to clipboard!', 2400)
  }

  return (
    <>
      <div className="block text-sm mb-2 font-semibold leading-6 text-gray-900">{title}</div>
      <div
        onClick={copyToClipboard}
        className={u.classNames(
          'flex items-center p-4 space-x-2', // added 'items-center'
          'group cursor-pointer relative w-full rounded-md min-h-[48px] mb-6',
          'bg-slate-50',
          'ring-1 ring-inset ring-gray-300',
          ' hover:ring-blu hover:bg-opacity-5 hover:bg-blu_med'
        )}
      >
        <div>
          <DocumentDuplicateIcon className="h-4 w-5 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blu" />
        </div>
        <div className="flex-grow">
          <span className="text-sm text-gray-600 group-hover:text-blu">{text}</span>
        </div>
      </div>
    </>
  )
}

function BankTransferPayComponent() {
  let { channel, setStep, addToast } = useAppContext()

  if (!u.isNonEmptyString(channel?.bank_name)) return

  const goToNextStep = () => {
    setStep(3)
  }

  return (
    <div className="p-4 pt-0 flex flex-col items-center justify-center">
      <div className="flex-col items-center justify-center w-full sm:w-[80%]">
        {DetailDisplay({ title: 'Bank Name', text: channel.bank_name })}
        {DetailDisplay({ title: 'Account Number', text: channel.bank_account_number })}
        {DetailDisplay({ title: 'IFSC Code', text: channel.bank_ifsc_code })}
        <SubmitButton onClick={goToNextStep} />
      </div>
    </div>
  )
}

export default BankTransferPayComponent
