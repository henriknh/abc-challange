'use client'

import { SubmitButton } from './form/submit-button'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'
import { onCook } from 'app/api/cook'
import { useFormState, useActionState } from 'react-dom'

export default function LetsCook() {
  const [state, formAction] = useFormState(onCook)

  return (
    <>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="form-control w-full">
            <input
              name="context"
              type="text"
              className={
                'input input-bordered w-full' +
                (state?.error ? ' input-error' : '')
              }
              placeholder="https://www.some-tasty-recipe.com"
            />

            {state?.error && (
              <div className="label">
                <span className="label-text-alt text-error">{state.error}</span>
              </div>
            )}
          </label>

          <div className="flex flex-col items-center">
            <SubmitButton>
              <Icon path={mdiChefHat} size={0.8} />
              Let&apos;s cook
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
