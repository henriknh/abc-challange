'use server'

import isValidHttpUrl from '../../utils/is-valid-http-url'
import { openai } from '../../utils/openai'
import { getCurrentUser } from './current-user'
import { IRecipe, MRecipe } from '@/models/recipe'
import { authOptions } from '@/utils/auth-options'
import { RECIPE_EXAMPLE_CHIMICHURRI } from '@/utils/example-recipes'
import dbConnect from 'lib/db-connect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

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

const recipeFormat2 = `
{
  // Title of the recipe
  "title": string;
  // The total time in minutes this recipe take to cook
  "total_cooking_time": number;
  // The total portions this recipe create
  "portions": number;
  // A short text describing the recipe, max 200 characters
  "description": string;
  // Which meal type is this recipe
  "mealType": 'breakfast' | 'lunch' | 'starter' | 'dinner' | 'desert' | 'snack' | 'drink';
  // How difficult is this recipe in general to cook for the average household chef.
  "difficuly": 'easy' | 'medium' | 'hard';
  // An object of food allergies of which some ingredients of this recipe might fall under
  "food_allergies": {
    // Does the recipe's list of ingredients contain any peanuts
    "peanuts": boolean;
    // Does the recipe's list of ingredients contain any tree nuts
    "tree_nuts": boolean;
    // Does the recipe's list of ingredients contain any milk
    "milk": boolean;
    // Does the recipe's list of ingredients contain any eggs
    "eggs": boolean;
    // Does the recipe's list of ingredients contain any wheat
    "wheat": boolean;
    // Does the recipe's list of ingredients contain any shellfish
    "shellfish": boolean;
  },
  // An object of food preferences of which this recipe might fall under
  "food_preferences": {
    // Is this recipe suitable for vegetarians
    "vegetarian": boolean;
    // Is this recipe suitable for vegans
    "vegan": boolean;
    // Is this recipe suitable for people with gluten intolerance
    "gluten_free": boolean;
    // Is this recipe suitable for pescatarians
    "pescatarian": boolean;
  }
  // An array of the ingredients needed to complete this recipe
  "ingredients": [
    {
      // Name of the ingredient. Remove any units from this text.
      "name": string;
      // 
      "unit": {
        // Metric unit for this ingredients decribing how much is needed for this recipe. 
        "metric_unit": {
          // The amount needed of this ingredient
          "value": number;
          // The unit in metric system. Choose volume or weight depending on what is most common. Can also be "pieces" if mote suitable. Avoid cups as unit.
          "unit": string;
        },
        // Imperial unit for this ingredients decribing how much is needed for this recipe
        "imperial_unit": {
          // The amount needed of this ingredient
          "value": number;
          // The unit in imperial system. Choose volume or weight depending on what is most common. Can also be "pieces" if mote suitable
          "unit": string;
        },
      },
    },
  ],
  // Cooking steps to complete the recipe
  "steps": [
    {
      // Describe the action of this particular step to cook the recipe. The step should not bee too lengthy neither in text nor in time but sometimes a step can take a long time if it requires little hands on for example baking in the oven
      "description": string;
      // The time this part of the recipe take to comeplete
      "time": number;
      // Does this step require timer? Such as letting a cooking on low heat for a longer time.
      "isTimer": boolean;
    },
  ],
}
`

export const generateLogo = async () => {
  const prompt = `
  Generate an image of an logo.
  The logo is of a book from the front straight up.
  The front of the book is white and there is a pie in black and white on the front as well
  There is a small bookmark hanging out from the bottom of the book.
  The background of the image should be transparent.
  The only two colors allowed to be used are white(#fff) and black(#000). No shading is allowed.
  The style must be minimalistic, white and black, outlined.
  Dont use too many rounded lines and keep the curners squared.
  Dont use any shadow, I want the image to be flat.
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
    `
    Summarize this recipe, ${url}.
    Identify the langauge of the recipe and write the summary in the same language.
    The output should follow this exact JSON format(Each field is described on a comment on the line above): 
    ` + JSON.stringify(recipeFormat2)

  console.log(content)

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

export async function onCook(formData: FormData): Promise<IRecipe> {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  if (currentUser.tokens === 0) {
    redirect('/tokens')
  }

  await dbConnect()

  const context = formData.get('context') as string | null
  // const type = formData.get('type') as string | null
  // const portions = formData.get('portions')
  //   ? parseInt(formData.get('portions') as string)
  //   : null

  if (!context) {
    throw 'URL missing'
  }

  if (!isValidHttpUrl(context)) {
    throw 'Not a valid URL'
  }

  const recipeData = {
    ...(await generateRecipeByUrl(context)),
    context,
    user: currentUser,
  }

  const recipe = new MRecipe(recipeData)
  await recipe.save()

  currentUser.tokens--
  await currentUser.save()

  redirect(`/recipe/${recipe.id}`)
}
