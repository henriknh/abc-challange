import { SubmitButton } from './form/submit-button'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'
import { onCook } from 'app/api/cook'

export default async function LetsCook() {
  return (
    <form action={onCook} className="flex gap-4">
      <label className="input input-bordered flex w-full items-center gap-2">
        <input
          name="context"
          type="text"
          className="min-w-0 grow"
          placeholder="https://www.some-tasty-recipe.com"
        />
      </label>

      <div className="flex flex-col items-center">
        <SubmitButton>
          <Icon path={mdiChefHat} size={0.8} />
          Let&apos;s cook
        </SubmitButton>
      </div>
    </form>
  )
}
