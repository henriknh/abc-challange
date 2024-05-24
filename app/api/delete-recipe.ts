'use server'

import { getCurrentUser } from './current-user'
import { IRecipe, MRecipe } from '@/models/recipe'
import dbConnect from 'lib/db-connect'
import { redirect } from 'next/navigation'

export async function deleteRecipe(recipe: IRecipe): Promise<void | ApiError> {
  if (!recipe) {
    return { error: 'Recipe missing' }
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  if (recipe.user !== currentUser.id) {
    return { error: 'Not recipe creator' }
  }

  if (currentUser.tokens === 0) {
    redirect('/tokens')
  }

  await dbConnect()

  const mrecipe = await MRecipe.findById(recipe._id)
  await mrecipe.deleteOne()

  redirect(`/cookbook`)
}
