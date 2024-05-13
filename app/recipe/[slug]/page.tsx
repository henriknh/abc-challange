import Recipe from '@/components/recipe/recipe'
import { findOneRecipe } from 'app/api/find-one-recipe'
import AuthGuard from '../../../components/auth-guard'

export async function generateMetadata({ params }) {
  const recipe = await findOneRecipe(params.slug)
  return {
    title: `${recipe.recipe.title} - as easy as pie`
  }
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  // const session = await getServerSession(authOptions)

  const recipe = await findOneRecipe(params.slug)


  return (
    <AuthGuard>
      <div className="container prose flex max-w-none flex-col gap-10 py-10">
        <Recipe recipe={recipe.recipe} />
      </div>
    </AuthGuard>
  )
}
