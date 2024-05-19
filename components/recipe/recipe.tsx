'use client'

import { IRecipe } from '@/models/recipe'
import { useState } from 'react'
import Ingredient from './ingredient'
import { RecipeInfo } from './recipe-info'
import Step from './step'

export interface RecipeProps {
  recipe: IRecipe
}
export default function Recipe({ recipe }: RecipeProps) {
  const [isIngredients, setIsIngredients] = useState(true)
  const [isMetric, setIsMetric] = useState(true)

  const info = (
    <div>
      <h1>{recipe.title}</h1>

      <RecipeInfo recipe={recipe} />
    </div>
  )
  const ingredients = (
    <div className="basis-1/3">
      <div className="sticky top-0 w-full">
        <div className="flex items-end justify-between">
          <h4>Ingredients</h4>

          <select
            className="select select-bordered select-xs mb-2 max-w-xs"
            onChange={(e) => setIsMetric(e.target.value === 'Metric')}
          >
            <option>Metric</option>
            <option>Imperial</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          {recipe.ingredients?.map((ingredient, index) => (
            <Ingredient
              key={ingredient.name + index}
              ingredient={ingredient}
              isMetric={isMetric}
            />
          ))}
        </div>
      </div>
    </div>
  )

  const steps = (
    <div className="basis-2/3">
      <div className="sticky top-0 flex-col">
        <div className="flex items-end justify-between">
          <h4>Steps</h4>
          <div className="pb-2">{recipe.total_cooking_time || 0} minutes</div>
        </div>

        <div className="flex flex-col gap-4">
          {recipe.steps?.map((step, index) => (
            <Step key={step.description + step.time + index} step={step} />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex flex-col gap-10 md:hidden">
        {info}

        <div className="max-h- flex flex-col">
          <div role="tablist" className="tabs-boxed tabs">
            <button
              role="tab"
              onClick={() => setIsIngredients(true)}
              className={'tab' + (isIngredients ? ' tab-active' : '')}
            >
              Ingredients
            </button>
            <button
              role="tab"
              onClick={() => setIsIngredients(false)}
              className={'tab' + (!isIngredients ? ' tab-active' : '')}
            >
              Steps
            </button>
          </div>

          <div>{isIngredients ? ingredients : steps}</div>
        </div>
      </div>
      <div className="prose hidden max-w-none flex-col gap-10 md:flex">
        {info}

        <div className="flex gap-10">
          {ingredients}

          {steps}
        </div>
      </div>
    </>
  )
}
