import { Recipe } from '../../app/api/cook'

export interface AddToMyCookbookProps {
  recipe: Recipe
}

export function AddToMyCookbook({ recipe }: AddToMyCookbookProps) {
  return (
    <button
      className="btn btn-primary"
      disabled={!recipe}
      onClick={() => {
        // fetch('api/recipe/create', {body: recipe, method: 'POST'})
        console.log('test')
      }}
    >
      Add to my cookbook
    </button>
  )
}
