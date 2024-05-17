'use client'

import { IRecipe } from '@/models/recipe'
import { RecipeStats } from './recipe/recipe-stats'

export interface RecipeProps {
  recipe: IRecipe
}
export default function RecipeCard({ recipe }: RecipeProps) {
  return (
    <div className="prose flex max-w-none flex-col rounded-lg bg-base-200 p-4">
      <div className="flex items-center justify-between">
        <h3 className="my-0">{recipe.title}</h3>

        <div>
          <RecipeStats recipe={recipe} />
        </div>
      </div>
    </div>
  )
}
