'use client'

import browserStorage from '../utils/browser-storage'
import isValidHttpUrl from '../utils/is-valid-http-url'
import { SubmitButton } from './submit-button'
import { mdiChefHat, mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { useEffect, useRef, useState } from 'react'

export interface LetsCookProps {
  onAction: any
}

export default function LetsCook({ onAction }: LetsCookProps) {
  const [isIngredients, setIsIngredients] = useState(false)

  const form = useRef<HTMLFormElement>()
  useEffect(() => {
    const context = browserStorage.getItem('letsCookInput')
    setIsIngredients(!isValidHttpUrl(context))

    if (context && browserStorage.getItem('triggerSearch')) {
      console.log(form.current.elements['context'])

      form.current.elements['context'].value =
        browserStorage.getItem('letsCookInput')
      // form.current.elements['type'].value =
      //   browserStorage.getItem('letsCookType')
      // form.current.elements['portions'].value =
      //   browserStorage.getItem('letsCookPortions')
      form.current.requestSubmit()

      browserStorage.removeItem('triggerSearch')
    }
  }, [])

  return (
    <form
      action={onAction}
      ref={form}
      className="flex flex-col items-end gap-2"
    >
      <label className="input input-bordered flex w-full items-center gap-2">
        <input
          name="context"
          type="text"
          className="min-w-0 grow"
          placeholder="Feed me an URL of a tasty recipe..."
          onChange={(change) => {
            const value = change.target.value
            browserStorage.setItem('letsCookInput', value)
            setIsIngredients(!isValidHttpUrl(value))
          }}
        />

        <SubmitButton>
          <Icon path={mdiChefHat} size={0.8} />
          Let&apos;s cook
        </SubmitButton>
      </label>

      {/* <div className="flex justify-end gap-2">
        <select
          name="type"
          title="Available only when cooking by ingredients"
          disabled={!isIngredients}
          className="select select-bordered select-xs w-full max-w-xs"
          onChange={(change) => {
            browserStorage.setItem('letsCookType', change.target.value)
          }}
        >
          <option>Tiny Apple</option>
          <option>Tiny Orange</option>
          <option>Tiny Tomato</option>
        </select>
        <div
          className={
            "relative after:pointer-events-none after:absolute after:right-8 after:text-xs after:leading-[28px] after:content-['portions']" +
            (!isIngredients ? ' after:opacity-disabled' : '')
          }
        >
          <select
            name="portions"
            title="Available only when cooking by ingredients"
            disabled={!isIngredients}
            className="select select-bordered select-xs w-full min-w-28 max-w-xs pr-20 text-right"
            onChange={(change) => {
              browserStorage.setItem('letsCookPortions', change.target.value)
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>66</option>
          </select>
        </div>

        <button
          type="reset"
          className="btn btn-square btn-ghost btn-xs"
          onClick={() => {
            browserStorage.removeItem('letsCookInput')
            browserStorage.removeItem('letsCookType')
            browserStorage.removeItem('letsCookPortions')
          }}
        >
          <Icon path={mdiClose} size={0.8} />
        </button>
      </div> */}
    </form>
  )
}
