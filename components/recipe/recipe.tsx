'use client'

import { Recipe as RecipeType } from '../../app/api/cook'
import Ingredient from './ingredient'
import { RecipeInfo } from './recipe-info'
import Step from './step'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export interface RecipeProps {
  recipe: RecipeType
}
export default function Recipe({ recipe }: RecipeProps, test) {
  console.log(123, test)

  const currentTab = useSearchParams().get('tab')

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

          {/* <button className="btn btn-ghost w-full" onClick={() => null}>
      Clear completed ingredients
    </button> */}
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
      <div className="flex flex-col gap-4 md:hidden">

        {info}

        <div role="tablist" className="tabs-boxed tabs">
          <a
            role="tab"
            href="?tab=ingredients"
            className={'tab' + (currentTab !== 'steps' ? ' tab-active' : '')}
          >
            Ingredients
          </a>
          <a
            role="tab"
            href="?tab=steps"
            className={'tab' + (currentTab === 'steps' ? ' tab-active' : '')}
          >
            Steps
          </a>
        </div>

        <div>{currentTab !== 'steps' ? ingredients : steps}</div>
      </div>
      <div className="prose hidden max-w-none flex-col gap-4 md:flex">
        {info}

        <div className="flex gap-10">
          {ingredients}

          {steps}
        </div>
      </div>
    </>
  )
}
