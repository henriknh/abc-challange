import { IRecipe } from '@/models/recipe'
import { getCurrentUser } from 'app/api/current-user'
import Ingredient from './ingredient'
import SystemOfUnitsDropdown from './system-of-units-dropdown'

export interface IngredientsProps {
  recipe: IRecipe
}
export default async function Ingredients({ recipe }: IngredientsProps) {
  const currentUser = await getCurrentUser()

  return (
    <div className="sticky top-0 w-full">
      <div className="flex items-end justify-between">
        <h4>Ingredients</h4>

        <SystemOfUnitsDropdown isMetric={!!currentUser?.isMetric} />
      </div>

      <div className="flex flex-col gap-2">
        {recipe.ingredients?.map((ingredient, index) => (
          <Ingredient key={ingredient.name + index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  )
}
