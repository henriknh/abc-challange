'use client'

import { IIngredient } from '@/models/recipe'
import { useMemo, useState } from 'react'

export interface IngredientProps {
  ingredient: IIngredient
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
      className="flex justify-between gap-4 rounded-md bg-base-200 px-3 py-2 shadow"
      onClick={() => setIngredientCompleted(!ingredientCompleted)}
    >
      <div className="flex gap-2">
        <div className="capitalize">{ingredient.name}</div>
      </div>
      {unit?.value && (
        <div className="text-nowrap">
          {unit.value} {unit.unit}
        </div>
      )}
    </div>
  )
}
