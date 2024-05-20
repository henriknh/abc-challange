import { IIngredient } from '@/models/recipe'
import { getCurrentUser } from 'app/api/current-user'

export interface IngredientProps {
  ingredient: IIngredient
}

export default async function Ingredient({ ingredient }: IngredientProps) {
  const currentUser = await getCurrentUser()

  const isMetric = currentUser?.isMetric ?? true

  const unit = isMetric
    ? ingredient.unit?.metric_unit
    : ingredient.unit?.imperial_unit

  const toFixedIfNecessary = (value: number, dp = 1) => {
    return +value.toFixed(dp)
  }

  return (
    <div className="flex justify-between gap-4 rounded-md bg-base-200 px-3 py-2 shadow">
      <div className="flex gap-2">
        <div className="capitalize">{ingredient.name}</div>
      </div>
      {unit?.value && (
        <div className="text-nowrap">
          {toFixedIfNecessary(unit.value)} {unit.unit}
        </div>
      )}
    </div>
  )
}
