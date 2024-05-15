'use server'

import isValidHttpUrl from '../../utils/is-valid-http-url'
import { openai } from '../../utils/openai'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds

export interface Unit {
  value: number
  unit: string
}

export interface UnitSystems {
  metric_unit: Unit
  imperial_unit: Unit
}

export interface Ingredient {
  name: string
  unit: UnitSystems
}

export interface Step {
  description: string
  time: number
}

export interface Recipe {
  context: string
  title: string
  description: string
  total_cooking_time: number
  portions: number
  ingredients: Ingredient[]
  steps: Step[]
}

const recipeFormat = {
  title: 'Title of the recipe',
  total_cooking_time:
    'The total time in minutes this recipe take to cook, type=number',
  portions: 'The total portions this recipe create, type=number',
  description: 'A short text describing the recipe, max 200 characters',
  ingredients: [
    {
      name: 'Name of the ingredient. Remove any units from this text',
      unit: {
        metric_unit: {
          value: 'The amount needed of this ingredient, type=number',
          unit: 'The unit in metric system. Choose volume or weight depending on what is most common. Can also be "pieces" if mote suitable',
        },
        imperial_unit: {
          value: 'The amount needed of this ingredient, type=number',
          unit: 'The unit in imperial system. Choose volume or weight depending on what is most common. Can also be "pieces" if mote suitable',
        },
      },
    },
  ],
  steps: [
    {
      description:
        'Describe the action of this particular step to cook the recipe. The step should not bee too lengthy neither in text nor in time but sometimes a step can take a long time if it requires little hands on for example baking in the oven',
      time: 'The time this part of the recipe take to comeplete, type=number',
    },
  ],
}

const generateRecipeByUrl = async (url) => {
  const content =
    `Summarize this recipe, ${url}, in exact this JSON format: ` +
    JSON.stringify(recipeFormat)

  console.log(JSON.stringify(content))

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  })

  return JSON.parse(completion.choices[0].message.content)
}

const generateRecipeByIngredients = async (
  ingredients: string,
  type?: string,
  portions?: number
): Promise<object> => {
  console.log('handleIngredients', ingredients, type, portions)

  return {}
}

export async function onCook(req, formData: FormData) {
  const context = formData.get('context') as string | null
  const type = formData.get('type') as string | null
  const portions = formData.get('portions')
    ? parseInt(formData.get('portions') as string)
    : null

  const isUrl = isValidHttpUrl(context)
  try {
    if (isUrl) {
      const recipe = {
        ...(await generateRecipeByUrl(context)),
        context,
      }

      console.log('recipe', recipe)
      return recipe
    } else {
      const recipe = {
        ...(await generateRecipeByIngredients(context, type, portions)),
        context: new Date().getTime().toString(), // TODO propper ID
      }

      console.log('recipe', recipe)
      return recipe
    }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
