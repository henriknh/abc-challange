import { IRecipe } from '@/models/recipe'

export interface RecipeInfoProps {
  recipe: IRecipe
}

export async function RecipeStats({ recipe }: RecipeInfoProps) {
  const portions = recipe.portions
  const total_cooking_time = recipe.total_cooking_time
  const ingredients = recipe.ingredient_sections?.reduce(
    (accu, ingredient_section) =>
      accu + (ingredient_section.ingredients?.length || 0),
    0
  )
  const steps = recipe.steps?.length
  const hasMetadata = portions || total_cooking_time || ingredients || steps

  if (!hasMetadata) {
    return <></>
  }
  return (
    <div className="grid grid-cols-2 sm:flex">
      <div className="text-nowrap py-2 max-sm:text-center">
        {portions} portions
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">
        {total_cooking_time} minutes
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">
        {ingredients} ingredints
      </div>

      <div className="divider divider-horizontal max-sm:hidden" />

      <div className="text-nowrap py-2 max-sm:text-center">{steps} steps</div>
    </div>
  )
}
