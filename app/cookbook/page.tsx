import AuthGuard from '../../components/auth-guard'
import Section from '@/components/section'
import { TableRow } from '@/components/table-row'
import { MRecipe } from '@/models/recipe'
import { authOptions } from '@/utils/auth-options'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import dbConnect from 'lib/db-connect'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Recipes({ searchParams }) {
  const session = await getServerSession(authOptions)

  
  const search = searchParams.search || ''

  if (!session) {
    redirect('/api/auth/signin')
  }

  await dbConnect()

  const recipes = await MRecipe.find({
    user: new mongoose.Types.ObjectId(session.user.id),
      title: {
        $regex: search,
        $options: "i"
        }
  }).exec()

  return (
    <AuthGuard>
      <div className="prose max-w-none ">
        <Section>
          <div className="flex items-start justify-between">
            <h1>Welcome chef!</h1>

            <Link
              href="/create-recipe"
              className="btn btn-ghost max-sm:btn-square"
            >
              <span className="hidden md:block">Create recipe</span>

              <Icon path={mdiPlus} size={1} className="block md:hidden" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <form>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  name="search"
                  id="recipe-search"
                  defaultValue={search}
                  autoFocus
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </form>

            {recipes.length ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra m-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="text-right">Portions</th>
                      <th className="text-right">Ingredients</th>
                      <th className="text-right">Steps</th>
                      <th className="text-right">Cooking time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map((recipe) => (
                      <TableRow
                        key={recipe._id.toString()}
                        className="cursor-pointer hover:!bg-base-300"
                        href={`recipe/${recipe._id}`}
                      >
                        <td className="text-nowrap">
                          <Link
                            href={`recipe/${recipe._id}`}
                            className="no-underline"
                          >
                            {recipe.title}
                          </Link>
                        </td>
                        <td className="text-nowrap text-right">
                          {recipe.portions} portions
                        </td>
                        <td className="text-nowrap text-right">
                          {recipe.ingredient_sections.reduce(
                            (accu, ingredient_section) =>
                              accu +
                              (ingredient_section.ingredients?.length || 0),
                            0
                          )}{' '}
                          ingredients
                        </td>
                        <td className="text-nowrap text-right">
                          {recipe.steps.length} steps
                        </td>
                        <td className="text-nowrap text-right">
                          {recipe.total_cooking_time} minutes
                        </td>
                      </TableRow>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2">
                  <div>Oh no.. You don&apos;t have any recipes yet.</div>
                  <div>Why don&apos;t you create your first now?</div>
                </div>
                <Link href="/create-recipe" className="btn btn-primary">
                  Let&apos;s get cooking
                </Link>
              </div>
            )}
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
