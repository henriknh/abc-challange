
import { IRecipe } from '@/models/recipe'
import Step from './step'

export interface StepsProps {
  recipe: IRecipe
}
export default async function Steps({ recipe }: StepsProps) {

  console.log(recipe.steps);
  
  return (
    <div className="sticky top-0 flex-col">
      <div className="flex items-end justify-between">
        <h4>Steps</h4>
        <div className="pb-2">{recipe.total_cooking_time || 0} minutes</div>
      </div>

      <div className="flex flex-col gap-4">
        {recipe.steps?.map((step, index) => (
          <Step key={step.description + step.time + index} step={step} />
        ))}
      </div>
    </div>
  )
}
