'use client'

import LetsCook from '../../components/lets-cook'
import Recipe from '../../components/recipe/recipe'
import Section from '../../components/section'
import { onCook } from '../api/cook'
import { useFormState } from 'react-dom'

export default function CreateRecipe() {
  const [recipe, formAction] = useFormState(onCook)

  return (
    <div className="prose max-w-none pb-10">
      <Section>
        <h1>Create new recipe</h1>

        <div className="flex flex-col gap-10">
          <LetsCook onAction={formAction} />

          {recipe ? (
            <div className="flex flex-col gap-10">
              <div className="rounded-xl border p-10">
                <Recipe recipe={recipe} />
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary" disabled={!recipe}>
                  Add to my collection
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <h2>Welcome to the recipe generator!</h2>
              <p>To get started simply do it! TODO :)</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
