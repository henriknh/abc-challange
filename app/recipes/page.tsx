import AuthGuard from '../../components/auth-guard'
import Link from 'next/link'

export default function Recipes() {
  const recipes = []
  return (
    <AuthGuard>
      <div className="container prose flex max-w-none flex-col gap-10 py-10">
        <div className="flex justify-between">
          <h1>Welcome chef!</h1>

          <Link href="/create-recipe" className="btn">
            Create recipe
          </Link>
        </div>

        <div>
          {recipes?.length ? (
            recipes.map((recipe) => <div key={0}>{recipe}</div>)
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div>Oh no.. You don&apos;t have any recipes yet</div>
              <div>Why don&apos;t you create your first now?</div>

              <Link href="/create-recipe" className="btn btn-primary">
                Let&apos;s get cooking
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
