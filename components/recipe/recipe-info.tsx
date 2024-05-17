import { IRecipe } from '@/models/recipe'
import { RecipeStats } from './recipe-stats'

export interface RecipeInfoProps {
  recipe: IRecipe
}

export function RecipeInfo({ recipe }: RecipeInfoProps) {
  const hasMetadata =
    recipe.portions || recipe.portions || recipe.ingredients?.length

  if (!hasMetadata && !recipe.description) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-4">
      <RecipeStats recipe={recipe} />

      {recipe.description && <div>{recipe.description}</div>}
    </div>
  )
}
