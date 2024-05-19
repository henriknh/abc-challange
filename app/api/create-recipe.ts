'use server'

import { IRecipe, MRecipe } from '@/models/recipe'
import dbConnect from 'lib/db-connect'
import { redirect } from 'next/navigation'
import { getCurrentUser } from './current-user'

export async function createRecipe(recipe: IRecipe) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  if (currentUser.tokens === 0 ){
    redirect('/tokens')
  }

  await dbConnect()

  const mrecipe = new MRecipe({ ...recipe, user: currentUser })
  await mrecipe.save()

  currentUser.tokens--;
  await currentUser.save()


  redirect(`/recipe/${mrecipe.id}`)
}
