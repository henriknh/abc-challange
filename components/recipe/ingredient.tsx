'use client'

import { Ingredient as IngredientType } from '../../app/api/cook'
import { useMemo, useState } from 'react'

export interface IngredientProps {
  ingredient: IngredientType
  isMetric: boolean
}

export default function Ingredient({ ingredient, isMetric }: IngredientProps) {
  const [ingredientCompleted, setIngredientCompleted] = useState(false)

  const unit = useMemo(
    () =>
      isMetric ? ingredient.unit?.metric_unit : ingredient.unit?.imperial_unit,
    [ingredient, isMetric]
  )

  return (
    <div
      className="flex cursor-pointer justify-between gap-4 rounded-md bg-base-200 px-3 py-2 shadow"
      onClick={() => setIngredientCompleted(!ingredientCompleted)}
    >
      <div className="flex gap-2">
        {/* <input
          type="checkbox"
          checked={ingredientCompleted}
          defaultChecked={ingredientCompleted}
          className="checkbox-primary checkbox"
        /> */}

        <div
          className={
            'capitalize transition-opacity' +
            (ingredientCompleted ? ' opacity-40' : '')
          }
        >
          {ingredient.name}
        </div>
      </div>
      {unit && (
        <div
          className={
            'transition-opacity' + (ingredientCompleted ? ' opacity-40' : '')
          }
        >
          {unit.value}
          {unit.unit}
        </div>
      )}
    </div>
  )
}
