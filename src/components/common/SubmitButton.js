import React from 'react'
import u from '../../functions/utils'

// eslint-disable-next-line react/prop-types
function SubmitButton({ onClick, className, children }) {
  return (
    <div
      onClick={onClick}
      className={u.classNames(
        'mt-6 block w-full rounded-md bg-blu_med p-4 text-center text-md font-semibold cursor-pointer',
        'text-white shadow-sm hover:bg-blu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu',
        className // To allow extra class names to be passed
      )}
    >
      {children || 'Continue'} {/* This allows the button text to be customizable via children prop */}
    </div>
  )
}

export default SubmitButton
