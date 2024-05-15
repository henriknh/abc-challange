import { Recipe } from '../../app/api/cook'
import { createRecipe } from 'app/api/create-recipe'

export interface AddToMyCookbookProps {
  recipe: Recipe
}

export function AddToMyCookbook({ recipe }: AddToMyCookbookProps) {
  return (
    <button
      className="btn btn-primary"
      disabled={!recipe}
      onClick={async () => await createRecipe(recipe)}
    >
      Add to my cookbook
    </button>
  )
}
