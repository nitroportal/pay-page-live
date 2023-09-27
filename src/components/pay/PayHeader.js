import React from 'react'
import { useAppContext } from '../../AppContext'
import u from '../../functions/utils'

export default function PayHeader() {
  let { amount } = useAppContext()

  return (
    <div className="rounded-[8px] bg-slate-50 py-[4vw] text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-[40px]">
      <div className="mx-auto max-w-xs px-8">
        {/* <p className="text-base font-semibold text-gray-600">Your Deposit</p> */}
        <p className="mt-6 flex items-baseline justify-center gap-x-2">
          <span className="font-bold tracking-tight text-gray-900 text-4xl sm:text-5xl">{u.displayCents(amount)}</span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">INR</span>
        </p>
        <p className="mt-2 text-xs leading-5 text-gray-600">Please send this amount</p>
        {/* <p className="mt-2 text-xs leading-5 text-gray-600">Please send this amountt</p> */}
      </div>
    </div>
  )
}
