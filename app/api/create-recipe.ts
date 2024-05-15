'use server'

import { Recipe } from './cook'
import { authOptions } from '@/utils/auth-options'
import clientPromise from 'lib/mongodb'
import { getServerSession } from 'next-auth'

export async function createRecipe(recipe: Recipe) {
  const session = await getServerSession(authOptions)

  if (!session.user.id) {
    throw 'Session missing?'
  }

  if (!recipe.context) {
    throw 'Context missing'
  }

  const client = await clientPromise
  const collection = client.db().collection('recipes')

  await collection.updateOne(
    { context: recipe.context, userId: session.user.id },
    {
      $set: {
        context: recipe.context,
        userId: session.user.id,
        recipe,
      },
    },
    { upsert: true }
  )
}
