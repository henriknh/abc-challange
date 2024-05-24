import Ingredients from './ingredients'
import RecipeInfo from './recipe-info'
import Steps from './steps'
import { IRecipe } from '@/models/recipe'

export interface RecipeProps {
  recipe: IRecipe
}
export default async function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <div className="flex flex-col gap-10 md:hidden">
        <RecipeInfo recipe={recipe} />

        <div className="flex flex-col">
          <div role="tablist" className="tabs tabs-bordered grid-cols-2">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label='Ingredients'
              defaultChecked
            />
            <div role="tabpanel" className="tab-content max-h-[80vh] overflow-y-auto">
              <Ingredients recipe={recipe} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label='Steps'
            />
            <div role="tabpanel" className="tab-content max-h-[80vh] overflow-y-auto">
              <Steps recipe={recipe} />
            </div>
          </div>
        </div>
      </div>
      <div className="prose hidden max-w-none flex-col gap-10 md:flex">
        <RecipeInfo recipe={recipe} />

        <div className="flex gap-10">
          <div className="basis-1/3">
            <Ingredients recipe={recipe} />
          </div>
          <div className="basis-2/3">
            <Steps recipe={recipe} />
          </div>
        </div>
      </div>
    </>
  )
}
