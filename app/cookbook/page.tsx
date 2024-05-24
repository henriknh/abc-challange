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
import AuthGuard from '../../components/auth-guard'

export default async function Recipes() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  await dbConnect()

  const recipes = await MRecipe.find({
    user: new mongoose.Types.ObjectId(session.user.id),
  }).exec()

  return (
    <AuthGuard>
      <div className="prose max-w-none ">
        <Section>
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <h1>Welcome chef!</h1>

              <Link href="/create-recipe" className="btn max-sm:btn-square btn-ghost">
                <span className="hidden md:block">Create recipe</span>

                <Icon path={mdiPlus} size={1} className="block md:hidden" />
              </Link>
            </div>

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
                          {recipe.ingredients.length} ingredients
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
