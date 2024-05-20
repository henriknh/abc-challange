'use server'

import { getCurrentUser } from './current-user'
import { IRecipe, MRecipe } from '@/models/recipe'
import dbConnect from 'lib/db-connect'
import { redirect } from 'next/navigation'

export async function deleteRecipe(recipe: IRecipe) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  if (recipe.user !== currentUser.id) {
    console.log('Not recipe creator')
    return
  }
  console.log('deleteRecipe', recipe)

  if (currentUser.tokens === 0) {
    redirect('/tokens')
  }

  await dbConnect()

  const mrecipe = await MRecipe.findById(recipe._id)

  console.log('mrecipe', mrecipe)

  await mrecipe.deleteOne()

  redirect(`/cookbook`)
}
