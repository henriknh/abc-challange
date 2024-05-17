import { IRecipe } from '@/models/recipe'
import { createRecipe } from 'app/api/create-recipe'

export interface AddToMyCookbookProps {
  recipe: IRecipe
}

export function AddToMyCookbook({ recipe }: AddToMyCookbookProps) {
  const createRecipeWithRecipe = createRecipe.bind(null, recipe)

  return (
    <form action={createRecipeWithRecipe}>
      <button className="btn btn-primary" disabled={!recipe} type="submit">
        Add to my cookbook
      </button>
    </form>
  )
}
