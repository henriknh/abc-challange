import { Recipe } from '../../app/api/cook'

export interface RecipeInfoProps {
  recipe: Recipe
}

export function RecipeStats({ recipe }: RecipeInfoProps) {
  const hasMetadata =
    recipe.portions || recipe.portions || recipe.ingredients?.length

  if (!hasMetadata) {
    return <></>
  }

  return (
    <div className="grid grid-cols-2 md:flex">
      {recipe.portions && <div>{recipe.portions} portions</div>}
      {recipe.ingredients?.length && (
        <>
          {recipe.portions && (
            <div className="divider divider-horizontal hidden md:block" />
          )}
          <div>{recipe.ingredients?.length} ingredints</div>
        </>
      )}
      {recipe.steps?.length && (
        <>
          {(recipe.portions || recipe.ingredients?.length) && (
            <div className="divider divider-horizontal hidden md:block" />
          )}
          <div>{recipe.steps?.length} steps</div>
        </>
      )}

      {recipe.total_cooking_time && (
        <>
          <>
            {(recipe.portions ||
              recipe.ingredients?.length ||
              recipe.steps?.length) && (
              <div className="divider divider-horizontal hidden md:block" />
            )}
            <div>{recipe.total_cooking_time} minutes</div>
          </>
        </>
      )}
    </div>
  )
}
