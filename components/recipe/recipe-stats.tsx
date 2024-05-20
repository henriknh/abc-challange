import { IRecipe } from '@/models/recipe'

export interface RecipeInfoProps {
  recipe: IRecipe
}

export async function RecipeStats({ recipe }: RecipeInfoProps) {
  const hasMetadata =
    recipe.portions || recipe.portions || recipe.ingredients?.length

  if (!hasMetadata) {
    return <></>
  }

  return (
    <div className="grid grid-cols-2 sm:flex">
      <div className="text-nowrap py-2 max-sm:text-center">
        {recipe.portions} portions
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">
        {recipe.total_cooking_time} minutes
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">
        {recipe.ingredients?.length} ingredints
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">
        {recipe.steps?.length} steps
      </div>
    </div>
  )
}
