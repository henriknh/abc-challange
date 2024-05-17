'use client'

import { IRecipe } from '@/models/recipe'
import { useState } from 'react'
import LetsCook from '../../components/lets-cook'
import { AddToMyCookbook } from '../../components/recipe/add-to-my-cookbook'
import Recipe from '../../components/recipe/recipe'
import Section from '../../components/section'

export const maxDuration = 60

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState<IRecipe>() // RECIPE_EXAMPLE_CHIMICHURRI

  return (
    <div className="prose max-w-none pb-10">
      <Section>
        <h1>Create new recipe</h1>

        <div className="flex flex-col gap-10">
          <LetsCook onRecipeGeneration={setRecipe} />

          {recipe ? (
            <div className="flex flex-col gap-10">
              <div className="rounded-xl border p-10">
                <Recipe recipe={recipe} />
              </div>

              <div className="flex justify-end">
                <AddToMyCookbook recipe={recipe} />
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
