import { IIngredient } from '@/models/recipe'
import { getCurrentUser } from 'app/api/current-user'

export interface IngredientProps {
  ingredient: IIngredient
}

export default async function Ingredient({ ingredient }: IngredientProps) {
  const currentUser = await getCurrentUser()

  const getSystemOfUnit = () => {
    switch (currentUser?.systemOfUnits) {
      case 'imperial_system':
        return {
          min: ingredient.imperial_min_value,
          max: ingredient.imperial_max_value,
          unit: ingredient.imperial_unit,
        }
      case 'us_imperial_system':
        return {
          min: ingredient.us_customary_min_value,
          max: ingredient.us_customary_max_value,
          unit: ingredient.us_customary_unit,
        }
      default:
        return {
          min: ingredient.metric_min_value,
          max: ingredient.metric_max_value,
          unit: ingredient.metric_unit,
        }
    }
  }
  const unit = getSystemOfUnit()

  const toFixedIfNecessary = (value: number, dp = 1) => {
    return +value.toFixed(dp)
  }

  return (
    <div className="flex justify-between gap-4 rounded-md bg-base-200 px-3 py-2 shadow">
      <div className="flex gap-2">
        <div className="capitalize">{ingredient.name}</div>
      </div>
      {unit?.min > 0 && (
        <div className="text-nowrap">
          {toFixedIfNecessary(unit.min)}
          {unit.min < unit.max &&
            `-${toFixedIfNecessary(unit.max)}`}{' '}
          {unit.unit}
        </div>
      )}
    </div>
  )
}
