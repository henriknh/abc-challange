'use server'

import { getServerSession } from 'next-auth'
import isValidHttpUrl from '../../utils/is-valid-http-url'
import { openai } from '../../utils/openai'
import { IRecipe, MRecipe } from '@/models/recipe'
import { authOptions } from '@/utils/auth-options'

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

const generateImageByRecipe = async (recipe: IRecipe) => {
  const prompt = `
  The style must be minimalistic, white and black, outlined and top-down.
    Generate a cover image for a recipe.
    The content of the image is a white background.
    On top of the white(#fff) background is a plate.
    On the plate is the dish from a recipe that I will supply you with now.
    The title of the dish is ${recipe.title}.
    This is a brief description of the recipe ${recipe.description}.
    These are the igredients of the recipe: ${recipe.ingredients.map((ingredient) => ingredient.name).join(', ')}.
    These are the steps to cook the recipe: 
    ${recipe.steps.map((step, index) => `${index + 1}. ${step.description}`).join('\n')}.
    There is nothing around the plate, just white(#fff) background.
    Remove anything that is not on the plate.
    And the background should be completely white(#fff).
  `

  console.log(prompt)

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  })
  return response.data[0].url
}

const generateRecipeByUrl = async (url) => {
  const content =
    `Summarize this recipe, ${url}, in exact this JSON format: ` +
    JSON.stringify(recipeFormat)

  console.log(content)

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-3.5-turbo-0125',
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

export async function onCook(req, formData: FormData): Promise<IRecipe> {
  
  const context = formData.get('context') as string | null
  const type = formData.get('type') as string | null
  const portions = formData.get('portions')
    ? parseInt(formData.get('portions') as string)
    : null

  try {
    const isUrl = isValidHttpUrl(context)
    if (isUrl) {
      return {
        ...(await generateRecipeByUrl(context)),
        context,
      }
    // } else {
    //   const recipe = {
    //     ...(await generateRecipeByIngredients(context, type, portions)),
    //     context: new Date().getTime().toString(), // TODO propper ID
    //   }

    //   console.log('recipe', recipe)
    //   return recipe
    }
  } catch (error) {
    console.error(error)
  }

  return null
}
