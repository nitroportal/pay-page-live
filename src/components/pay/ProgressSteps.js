import React from 'react'
import { useAppContext } from '../../AppContext'
import { CheckIcon } from '@heroicons/react/20/solid'

function ProgressSteps() {
  const { step, setStep } = useAppContext()

  const commonClass = 'w-6 h-6 flex items-center justify-center rounded-full'
  const hoverClass = 'hover:bg-blu hover:border-blu'
  const nextStepClass = 'border-[1px] border-gray-300 text-gray-300 cursor-default'
  const currentStepClass = 'border-2 border-blu_med bg-white text-white cursor-default'
  const previousStepClass = 'bg-blu_med text-white cursor-pointer ' + hoverClass
  const lineClass = 'flex-grow h-[2px]'

  function Circle() {
    return <div className="w-2.5 h-2.5 bg-blu_med rounded-full"></div>
  }

  const onClickHandler = (stepNumber) => {
    if (step > stepNumber) setStep(stepNumber)
  }

  const renderDiv = (stepNumber) => {
    let className = `${commonClass} ${
      step >= stepNumber ? (step === stepNumber ? currentStepClass : previousStepClass) : nextStepClass
    }`
    return (
      <div className={className} onClick={step >= stepNumber ? () => onClickHandler(stepNumber) : undefined}>
        {step > stepNumber ? <CheckIcon className="w-[14px]" /> : step === stepNumber ? <Circle /> : ''}
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full pb-[36px]">
      {' '}
      {/* <- This will center the inner div */}
      <div className="flex items-center py-[30px] w-[76%]">
        {renderDiv(1)}
        <div className={`${lineClass} ${step > 1 ? 'bg-blu_med' : 'bg-gray-300'}`}></div>
        {renderDiv(2)}
        <div className={`${lineClass} ${step > 2 ? 'bg-blu_med' : 'bg-gray-300'}`}></div>
        {renderDiv(3)}
      </div>
    </div>
  )
}

export default ProgressSteps
