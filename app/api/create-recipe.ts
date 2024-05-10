'use server'

import { Recipe } from './cook'
import { authOptions } from '@/utils/auth-options'
import clientPromise from 'lib/mongodb'
import { getServerSession } from 'next-auth'

export async function createRecipe(recipe: Recipe) {
  console.log('createRecipe', recipe)
  const session = await getServerSession(authOptions)

  if (!session.user.id) {
    throw 'Session missing?'
  }

  if (!recipe.context) {
    throw 'Context missing'
  }

  console.log('session', session)

  const client = await clientPromise
  const collection = client.db().collection('recipes')

  const count1 = await collection.countDocuments()
  console.log('count1', count1)

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

  const count2 = await collection.countDocuments()
  console.log('count2', count2)
}
