'use client'

import { IStep } from '@/models/recipe'
import { useState } from 'react'

export interface StepProps {
  step: IStep
}

export default function Step({ step }: StepProps) {
  const [stepCompleted, setStepCompleted] = useState(false)

  return (
    <div
      className="card w-full cursor-pointer bg-base-200 shadow transition"
      onClick={() => setStepCompleted(!stepCompleted)}
    >
      <div className="card-body p-4">
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
