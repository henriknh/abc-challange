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

  console.log(ingredient);
  

  return (
    <div className="flex justify-between gap-4 rounded-md bg-base-200 px-3 py-2 shadow">
      <div className="flex gap-2">
        <div className="capitalize">{ingredient.name}</div>
      </div>
      {unit?.minValue > 0 && (
        <div className="text-nowrap">
          {toFixedIfNecessary(unit.minValue)}{unit.minValue < unit.maxValue && `-${toFixedIfNecessary(unit.maxValue)}`} {unit.unit}
        </div>
      )}
    </div>
  )
}
