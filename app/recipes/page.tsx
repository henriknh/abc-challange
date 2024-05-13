import { TableRow } from '@/components/table-row'
import AuthGuard from '../../components/auth-guard'
import { authOptions } from '@/utils/auth-options'
import clientPromise from 'lib/mongodb'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'

export default async function Recipes() {
  const session = await getServerSession(authOptions)

  const client = await clientPromise
  const collection = client.db().collection('recipes')

  const recipes = await collection
    .find({
      userId: session.user.id,
    })
    .toArray()

  return (
    <AuthGuard>
      <div className="container prose flex max-w-none flex-col gap-10 py-10">
        <div className="flex justify-between items-center">
          <h1 className='mb-0'>Welcome chef!</h1>

          <Link href="/create-recipe" className="btn max-sm:btn-square">
            <span className='hidden md:block'>
              Create recipe
              </span>

            <Icon path={mdiPlus} size={1} className='block md:hidden' />
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
                  <TableRow key={recipe._id.toString()} className="cursor-pointer hover:!bg-base-300" href={`recipe/${recipe._id}`}>
                    <td className='text-nowrap'>
                      <Link
                        href={`recipe/${recipe._id}`}
                        className="no-underline"
                      >
                        {recipe.recipe.title}
                      </Link>
                    </td>
                    <td className='text-nowrap'>{recipe.recipe.portions} portions</td>
                    <td className='text-nowrap'>{recipe.recipe.ingredients.length} ingredients</td>
                    <td className='text-nowrap'>{recipe.recipe.steps.length} steps</td>
                    <td className='text-nowrap'>{recipe.recipe.total_cooking_time} minutes</td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
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
    </AuthGuard>
  )
}
