import Recipe from '@/components/recipe/recipe'
import { MRecipe } from '@/models/recipe'
import dbConnect from 'lib/db-connect'

export async function generateMetadata({ params }) {
  console.log('params', params)

  await dbConnect()
  const recipe = await MRecipe.findById(params.slug)

  return {
    title: `${recipe.title} - as easy as pie`,
  }
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  await dbConnect()
  const recipe = (await MRecipe.findById(params.slug)).toJSON()

  console.log(recipe)

  return (
    <div className="container prose flex max-w-none flex-col gap-10 py-10">
      <Recipe recipe={recipe} />
    </div>
  )
}
