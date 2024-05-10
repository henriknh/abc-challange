'use client'

import { RecipeInfo } from './recipe/recipe-info'
import { Recipe } from 'app/api/cook'
import { RecipeStats } from './recipe/recipe-stats'

export interface RecipeProps {
  recipe: Recipe
}
export default function RecipeCard({ recipe }: RecipeProps) {
  return (
    <div className="prose flex max-w-none flex-col rounded-lg bg-base-200 p-4">
        <div className='flex justify-between items-center'>
      <h3 className='my-0'>{recipe.title}</h3>

      <div>
      <RecipeStats recipe={recipe} />
</div>

        </div>

    </div>
  )
}
