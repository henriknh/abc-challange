import Recipe from '@/components/recipe/recipe'
import Section from '@/components/section'
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
    <div className="prose max-w-none">
      <Section>
        <Recipe recipe={recipe} />
      </Section>
    </div>
  )
}
