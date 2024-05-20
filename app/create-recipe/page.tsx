'use client'

import LetsCook from '../../components/lets-cook'
import { AddToMyCookbook } from '../../components/recipe/add-to-my-cookbook'
import Recipe from '../../components/recipe/recipe'
import Section from '../../components/section'
import { IRecipe } from '@/models/recipe'
import { useState } from 'react'

export const maxDuration = 60

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState<IRecipe>() // RECIPE_EXAMPLE_CHIMICHURRI

  return (
    <div className="prose max-w-none">
      <Section>
        <h1>Create recipe</h1>

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
              <div className="flex flex-col items-center">
                  Provide a recipe web address, to create easy-to-follow cooking
                  instructions that simplify the original recipe.
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
