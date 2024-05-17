'use server'

import { IRecipe, MRecipe } from '@/models/recipe'
import { authOptions } from '@/utils/auth-options'
import dbConnect from 'lib/db-connect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getCurrentUser } from './current-user'

export async function createRecipe(recipe: IRecipe) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  await dbConnect()

  const mrecipe = new MRecipe({ ...recipe, user: await getCurrentUser() })
  await mrecipe.save()

  redirect(`/recipe/${mrecipe.id}`)
}
