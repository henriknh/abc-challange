'use client'

import { Recipe as RecipeType } from '../../app/api/cook'
import Ingredient from './ingredient'
import Step from './step'
import { useState } from 'react'

export interface RecipeProps {
  recipe: RecipeType
}
export default function Recipe({ recipe }: RecipeProps) {
  const [isMetric, setIsMetric] = useState(true)

  return (
    <div className="prose flex max-w-none flex-col">
      <h1>{recipe?.title || <div className="skeleton h-12 w-96"></div>}</h1>

      <div className="flex">
        <div>{recipe.portions} portions</div>
        <div className="divider divider-horizontal" />
        <div>{recipe.ingredients.length} ingredints</div>
        <div className="divider divider-horizontal" />
        <div>{recipe.steps.length} steps</div>
      </div>

      <div>{recipe.description}</div>
      <div className="flex gap-10">
        <div className="max-w-96">
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
              {recipe.ingredients.map((ingredient, index) => (
                <Ingredient
                  key={ingredient.name + index}
                  ingredient={ingredient}
                  isMetric={isMetric}
                />
              ))}

              {/* <button className="btn btn-ghost w-full" onClick={() => null}>
                Clear completed ingredients
              </button> */}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="sticky top-0 flex-col">
            <div className="flex items-end justify-between">
              <h4>Steps</h4>
              <div className="pb-2">{recipe.total_cooking_time} minutes</div>
            </div>

            <div className="flex flex-col gap-4">
              {recipe.steps.map((step, index) => (
                <Step key={step.description + step.time + index} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
