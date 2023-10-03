import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../AppContext'
import { CheckIcon } from '@heroicons/react/20/solid'

function ProgressSteps() {
  const { step, setStep } = useAppContext()
  const [displayedStep, setDisplayedStep] = useState(step)
  const [previousStep, setPreviousStep] = useState(step)
  const animationDuration = 600 // in ms

  useEffect(() => {
    if (step < previousStep) {
      setPreviousStep(step)
      setDisplayedStep(step)
    } else if (step > previousStep) {
      let timer = setTimeout(() => {
        setDisplayedStep(step)
        setPreviousStep(step) // <-- Update previousStep here
      }, animationDuration)

      return () => clearTimeout(timer)
    }
  }, [step])

  const commonClass = 'w-6 h-6 flex items-center justify-center rounded-full'
  const hoverClass = 'hover:bg-blu hover:border-blu'
  const nextStepClass = 'border-[1px] border-gray-300 text-gray-300 cursor-default'
  const currentStepClass = 'border-2 border-blu_med bg-white text-white cursor-default'
  const previousStepClass = 'bg-blu_med text-white cursor-pointer ' + hoverClass
  const lineClass = 'flex-grow h-[2px]'

  const onClickHandler = (stepNumber) => {
    if (step > stepNumber) setStep(stepNumber)
  }
  function Circle() {
    return <div className="w-2.5 h-2.5 bg-blu_med rounded-full"></div>
  }
  const renderDiv = (stepNumber) => {
    let className
    let isPreviousStep = stepNumber < step
    let isAnimating = displayedStep !== step && stepNumber === step
    let isCurrentStep = displayedStep === stepNumber && !isAnimating
    let isNextStep = stepNumber > step && !isAnimating

    if (isPreviousStep) {
      className = previousStepClass
    } else if (isAnimating || isNextStep) {
      className = nextStepClass
    } else if (isCurrentStep) {
      className = currentStepClass
    }

    return (
      <div
        className={`${commonClass} ${className}`}
        onClick={isNextStep ? undefined : () => onClickHandler(stepNumber)}
      >
        {isPreviousStep ? <CheckIcon className="w-[14px]" /> : isCurrentStep ? <Circle /> : ''}
      </div>
    )
  }

  const line = (isBlue, shouldAnimate) => (
    <div className={`relative ${lineClass} bg-gray-300`}>
      <div
        className={`absolute inset-0 ${isBlue ? 'bg-blu_med' : ''} ${
          shouldAnimate ? 'transition-all duration-500 ease-in-out' : ''
        }`}
        style={{ width: isBlue ? '100%' : '0' }}
      ></div>
    </div>
  )

  return (
    <div className="flex justify-center w-full pb-4">
      <div className="flex items-center py-[30px] w-[76%]">
        {renderDiv(1)}
        {line(step > 1, step > previousStep)}
        {renderDiv(2)}
        {line(step > 2, step > previousStep)}
        {renderDiv(3)}
      </div>
    </div>
  )
}

export default ProgressSteps
