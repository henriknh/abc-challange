'use client'

import { Step as StepType } from '../../app/api/cook'
import { useState } from 'react'

export interface StepProps {
  step: StepType
}

export default function Step({ step }: StepProps) {
  const [stepCompleted, setStepCompleted] = useState(false)

  return (
    <div
      className="card card-compact w-full cursor-pointer bg-base-200 shadow transition"
      onClick={() => setStepCompleted(!stepCompleted)}
    >
      <div className="card-body">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={stepCompleted}
            readOnly
            className="checkbox-primary checkbox"
          />
          {step.time && (
            <div
              className={
                'transition-opacity' + (stepCompleted ? ' opacity-40' : '')
              }
            >
              {step.time} minutes
            </div>
          )}
        </div>
        <div
          className={
            'transition-opacity' +
            (stepCompleted ? ' line-clamp-1 opacity-40' : '')
          }
        >
          {step.description}
        </div>
      </div>
    </div>
  )
}
