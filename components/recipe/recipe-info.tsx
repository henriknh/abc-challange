import { Recipe } from '../../app/api/cook'

export interface RecipeInfoProps {
  recipe: Recipe
}

export function RecipeInfo({ recipe }: RecipeInfoProps) {
  const hasMetadata =
    recipe.portions || recipe.portions || recipe.ingredients?.length

  if (!hasMetadata && !recipe.description) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-4">
      {hasMetadata && (
        <div className="flex">
          {recipe.portions && <div>{recipe.portions} portions</div>}
          {recipe.ingredients?.length && (
            <>
              {recipe.portions && (
                <div className="divider divider-horizontal" />
              )}
              <div>{recipe.ingredients?.length} ingredints</div>
            </>
          )}
          {recipe.steps?.length && (
            <>
              {(recipe.portions || recipe.ingredients?.length) && (
                <div className="divider divider-horizontal" />
              )}
              <div>{recipe.steps?.length} steps</div>
            </>
          )}
        </div>
      )}

      {recipe.description && <div>{recipe.description}</div>}
    </div>
  )
}
