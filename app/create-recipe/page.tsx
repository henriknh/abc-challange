'use client'

import Section from '../../components/section'
import AuthGuard from '@/components/auth-guard'
import { SubmitButton } from '@/components/form/submit-button'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'
import { onCook } from 'app/api/cook'

export const maxDuration = 60

export default function CreateRecipe() {
  return (
    <AuthGuard>
      <div className="prose max-w-none">
        <Section>
          <h1>Create recipe</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              Provide a recipe web address, to create easy-to-follow cooking
              instructions that simplify the original recipe.
            </div>

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
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
