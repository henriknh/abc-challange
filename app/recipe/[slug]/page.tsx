import Recipe from '@/components/recipe/recipe'
import { authOptions } from '@/utils/auth-options'
import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import AuthGuard from '../../../components/auth-guard'

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  console.log('params', params)

  const session = await getServerSession(authOptions)

  const client = await clientPromise
  const collection = client.db().collection('recipes')

  const _id = new ObjectId(params.slug)

  const recipe = await collection.findOne({
    _id,
  })

  console.log(recipe)

  return (
    <AuthGuard>
      <div className="container prose flex max-w-none flex-col gap-10 py-10">
        <Recipe recipe={recipe.recipe} />
      </div>
    </AuthGuard>
  )
}
