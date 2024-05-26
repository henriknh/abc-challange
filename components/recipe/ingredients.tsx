import Ingredient from './ingredient'
import SystemOfUnitsDropdown from './system-of-units-dropdown'
import { IRecipe } from '@/models/recipe'
import { getCurrentUser } from 'app/api/current-user'

export interface IngredientsProps {
  recipe: IRecipe
}
export default async function Ingredients({ recipe }: IngredientsProps) {
  const currentUser = await getCurrentUser()

  console.log(recipe)

  const hasMultipleSections = recipe.ingredient_sections.length >= 2

  return (
    <div className="sticky top-0 w-full">
      <div className="flex items-end justify-between">
        <h4>Ingredients</h4>

        <SystemOfUnitsDropdown isMetric={!!currentUser?.isMetric} />
      </div>

      <div className="flex flex-col">
        {recipe.ingredient_sections?.map((ingredient_section, index) => (
          <div className="flex flex-col">
            {hasMultipleSections && <h4>{ingredient_section.title}</h4>}

            <div className="flex flex-col gap-2">
              {ingredient_section.ingredients?.map((ingredient, index) => (
                <Ingredient
                  key={ingredient.name + index}
                  ingredient={ingredient}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
