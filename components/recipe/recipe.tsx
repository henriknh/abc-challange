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

        <div className="max-h- flex flex-col">
          {/* <div role="tablist" className="tabs-boxed tabs">
            <button
              role="tab"
              onClick={() => setIsIngredients(true)}
              className={'tab' + (isIngredients ? ' tab-active' : '')}
            >
              Ingredients
            </button>
            <button
              role="tab"
              onClick={() => setIsIngredients(false)}
              className={'tab' + (!isIngredients ? ' tab-active' : '')}
            >
              Steps
            </button>
          </div> */}

          {/* <div>{isIngredients ? ingredients : steps}</div> */}
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
