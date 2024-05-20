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
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <h1 className="mb-0">Welcome chef!</h1>

              <Link href="/create-recipe" className="btn max-sm:btn-square">
                <span className="hidden md:block">Create recipe</span>

                <Icon path={mdiPlus} size={1} className="block md:hidden" />
              </Link>
            </div>

            {recipes.length ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Portions</th>
                      <th>Ingredients</th>
                      <th>Steps</th>
                      <th>Cooking time</th>
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
                        <td className="text-nowrap">
                          {recipe.portions} portions
                        </td>
                        <td className="text-nowrap">
                          {recipe.ingredients.length} ingredients
                        </td>
                        <td className="text-nowrap">
                          {recipe.steps.length} steps
                        </td>
                        <td className="text-nowrap">
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