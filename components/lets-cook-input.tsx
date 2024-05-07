'use client'

import browserStorage from '../utils/browser-storage'
import { SubmitButton } from './submit-button'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'

export default function LetsCookInput() {
  return (
    <label className="input input-bordered flex w-full items-center gap-2">
      <input
        name="context"
        type="text"
        className="min-w-0 grow"
        placeholder="Feed me an URL of a tasty recipe..."
        onChange={(change) => {
          const value = change.target.value
          browserStorage.setItem('letsCookInput', value)
        }}
      />

      <SubmitButton>
        <Icon path={mdiChefHat} size={0.8} />
        Let&apos;s cook
      </SubmitButton>
    </label>
  )
}
