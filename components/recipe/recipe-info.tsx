import { IRecipe } from '@/models/recipe'
import compareObjectIds from '@/utils/compare-object-ids'
import isValidHttpUrl from '@/utils/is-valid-http-url'
import { mdiOpenInNew, mdiTrashCanOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { getCurrentUser } from 'app/api/current-user'
import { deleteRecipe } from 'app/api/delete-recipe'
import Link from 'next/link'
import { RecipeStats } from './recipe-stats'

export interface RecipeInfoProps {
  recipe: IRecipe
}

export default async function RecipeInfo({ recipe }: RecipeInfoProps) {
  const currentUser = await getCurrentUser()
  const deleteRecipeWithRecipe = deleteRecipe.bind(null, recipe)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="m-0">{recipe.title}</h1>

        <div className="flex gap-2">
          {compareObjectIds(currentUser, recipe.user) && (
            <form action={deleteRecipeWithRecipe}>
              <button type="submit" className="btn btn-square btn-ghost">
                <Icon path={mdiTrashCanOutline} size={1} />
              </button>
            </form>
          )}

          {isValidHttpUrl(recipe.context) && (
            <Link
              href={recipe.context}
              target="_blank"
              className="btn btn-square btn-ghost"
            >
              <Icon path={mdiOpenInNew} size={1} />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <RecipeStats recipe={recipe} />

        {recipe.description && <div>{recipe.description}</div>}
      </div>
    </div>
  )
}
