import { Recipe } from 'app/api/cook'
import clientPromise from 'lib/mongodb'
import { ObjectId, WithId } from 'mongodb'

export interface ReturnValue {
  context: string
  userId: string
  recipe: Recipe
}

export const findOneRecipe = async (recipeId): Promise<ReturnValue> => {
  const client = await clientPromise
  const collection = client.db().collection('recipes')

  const _id = new ObjectId(recipeId)

  return collection.findOne<WithId<any>>({
    _id,
  })
}
