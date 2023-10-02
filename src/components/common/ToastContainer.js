/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../../AppContext'
import { XCircleIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

function Toast({ type, message, onClose }) {
  const stripClass = type === 'error' ? 'bg-red-800' : 'bg-green-700'
  const boxBgClass = type === 'error' ? 'bg-red-50' : 'bg-green-50'
  const iconColorClass = type === 'error' ? 'text-red-800' : 'text-green-700'

  const toastRef = useRef(null)

  useEffect(() => {
    const toastEl = toastRef.current
    if (toastEl) {
      toastEl.classList.remove('transform', 'opacity-0', 'translate-y-2')
    }
  }, [])

  return (
    <div className={`${boxBgClass} flex relative rounded-lg shadow-md min-h-[80px] min-w-[240px] fly-in-left`}>
      <div className={`${stripClass} w-[12px] min-h-full rounded-l-lg`}></div>
      <div className={`flex-grow items-center justify-left flex p-3 space-x-3 pr-8ml rounded-lg`}>
        <div className="flex items-center justify-center">
          {type === 'error' ? (
            <XCircleIcon className={`h-8 w-8 ${iconColorClass}`} />
          ) : (
            <CheckCircleIcon className={`h-8 w-8 ${iconColorClass}`} />
          )}
        </div>
        <div className="flex-col items-center justify-center">
          <div className="flex-grow pr-2.5 text-sm font-bold">{type === 'error' ? 'Error' : 'Success'}</div>
          <div className="flex-grow pr-2.5 text-sm">{message}</div>
        </div>
      </div>
      <div onClick={onClose} className="cursor-pointer absolute right-0 p-2 flex items-center justify-center">
        <XMarkIcon className="h-5 w-5 text-gray-800 hover:text-gray-900" />
      </div>
    </div>
  )
}

function ToastsContainer() {
  const { toasts, removeToast } = useAppContext()
  return (
    <div className="fixed bottom-2 left-2 space-y-2.5 p-4 max-h-[50vh] max-w-[300px]">
      {toasts?.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

export default ToastsContainer
