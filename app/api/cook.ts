'use server'

import isValidHttpUrl from '../../utils/is-valid-http-url'
import { openai } from '../../utils/openai'
import { getCurrentUser } from './current-user'
import { IRecipe, MRecipe } from '@/models/recipe'
import dbConnect from 'lib/db-connect'
import { redirect } from 'next/navigation'
import puppeteer from 'puppeteer'

const extractContentByRL = async (url: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.emulateMediaType('screen')
  const pageSourceHTML = await page.content()

  await browser.close()

  const regexScriptTags = /<script.*?>.*?<\/script>/gims
  const noScriptTags = pageSourceHTML.replace(regexScriptTags, '')

  const regexStyleTags = /<style.*?>.*?<\/style>/gims
  const noStyleTags = noScriptTags.replace(regexStyleTags, '')

  const regexHTMLTags =
    /<(a|g|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|search|section|select|small|source|span|strike|strong|style|sub|summary|sup|svg|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)[^>]+>/gims
  const cleanDivTags = noStyleTags.replace(regexHTMLTags, '<$1>')

  const regexHTMLComments = /<!--(.*?)-->/gims
  const noHTMLComments = cleanDivTags.replace(regexHTMLComments, '')

  const regexOpeningTag = /<.*?>/gims
  const noOpeningTags = noHTMLComments.replace(regexOpeningTag, '')

  const regexClosingTags = /<\/.*?>/gims
  const noClosingTags = noOpeningTags.replace(regexClosingTags, '')

  const regexNewLines = /(\r\n|\n|\r)/gims
  const noNewLines = noClosingTags.replace(regexNewLines, '')

  const regexWhiteSpace = /\s\s+/gims
  const noWhiteSpace = noNewLines.replace(regexWhiteSpace, ' ')

  console.log('pageSourceHTML', pageSourceHTML.length)
  console.log('noScriptTags', noScriptTags.length)
  console.log('noStyleTags', noStyleTags.length)
  console.log('cleanDivTags', cleanDivTags.length)
  console.log('noHTMLComments', noHTMLComments.length)
  console.log('noOpeningTags', noOpeningTags.length)
  console.log('noClosingTags', noClosingTags.length)
  console.log('noNewLines', noNewLines.length)
  console.log('noWhiteSpace', noWhiteSpace.length)
  console.log(
    'Reduction:',
    ((noWhiteSpace.length / pageSourceHTML.length) * 100).toFixed(1) + '%'
  )

  return noWhiteSpace
}

// Extract the ingredients from the recipe and categorize them into their respective sections. If the recipe includes sections like 'Main Ingredients,' 'Sauce,' 'Garnish,' etc., please list the ingredients under each respective section with appropriate headings. There has to be at least one section. Identify all ingredient sections and include them. Don't skip a single one.
const recipeFormat = `
{
  // Title of the recipe
  "title": string;
  // The total time in minutes this recipe take to cook
  "total_cooking_time": number;
  // The total portions this recipe create
  "portions": number;
  // A short text describing the recipe. The length should be 200-250 characters
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
  // Nutrients table for a portion of this recipe
  "nutrients_table": {
    // kcal (kilocalories)
    "calories": number
    // g (grams)
    "total_fat": number
    // g (grams)
    "saturated_fat": number
    // mg (milligrams)
    "cholesterol": number
    // mg (milligrams)
    "sodium": number
    // g (grams)
    "total_carbohydrates": number
    // g (grams)
    "dietary_fiber": number
    // g (grams)
    "total_sugars": number
    // g (grams)
    "protein": number
  }
  // An array of sections or chapters containing different ingredients needed to complete
  // this different parts of this recipe. The recipe might have one or several of these
  // sections/chapters. The recipe will always have a main ingredient section. Other
  // section examples are addons when serving, sauce, rice or sallad. All sections must
  // be included. And all ingredients in each ssections must also all be included.
  "ingredient_sections": [
    {
      // A title that describe the section.
      "title": string;
      // An array of the ingredients needed to complete this recipe. All ingredients in this section needs to be included. Dont skip a single one.
      "ingredients": [{
        // Name of the ingredient. Remove any units from this text.
        "name": string;
        // Extract/translate the metric system unit needed for this recipe.
        "metric_unit": string;
        // Extract/convert the lower amount of metric system value needed for this recipe.
        "metric_min_value": number;
        // Extract/convert the upper amount metric system value needed for this recipe.
        "metric_max_value": number;
        // Extract/translate the imperial system unit needed for this recipe.
        "imperial_unit": string;
        // Extract/convert the lower amount of imperial system value needed for this recipe.
        "imperial_min_value": number;
        // Extract/convert the upper amount imperial system value needed for this recipe.
        "imperial_max_value": number;
        // Extract/translate the US customary system unit needed for this recipe.
        "us_customary_unit": string;
        // Extract/convert the lower amount of US customary system value needed for this recipe.
        "us_customary_min_value": number;
        // Extract/convert the upper amount US customary system value needed for this recipe.
        "us_customary_max_value": number;
      }]
    }
  ],
  // Cooking steps to complete the recipe
  "steps": [
    {
      // Describe the action of this particular step to cook the recipe. The step should not bee too lengthy neither in text nor in time but sometimes a step can take a long time if it requires little hands on for example baking in the oven
      "description": string;
      // The time this step of the recipe take to complete.
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
    These are the igredients of the recipe: ${recipe.ingredient_sections.reduce((accu, ingredient_section) => [...accu, ...ingredient_section.ingredients.map((ingredient) => ingredient.name)], []).join(', ')}.
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

const generateRecipeByContent = async (htmlContent) => {
  const currentUser = await getCurrentUser()
  const content = `
    You are a expect chef and I need you to summarize a recipe for me.

    Identify the langauge of the recipe and write the summary in the same language.

    The steps of the recipe has to be followed exactly. The same number of steps in the original recipe content should be generated in the response as well.
    
    And also all the ingredients has to be identified and used in the steps. The ingredients should also be listed in the correct ingredient section. Make sure that the ingredient count of the original recipe content is the same as the count in the response. 

    The output should follow this exact JSON format(Each field is described with a comment above the field): ${JSON.stringify(recipeFormat)}

    This is the content of the recipe: ${htmlContent}
  `

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-3.5-turbo',
    response_format: { type: 'json_object' },
  })

  return JSON.parse(completion.choices[0].message.content)
}

export async function onCook(
  _: any,
  formData: FormData
): Promise<IRecipe | ApiError> {
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
    return { error: 'URL missing' }
  }

  if (!isValidHttpUrl(context)) {
    return { error: 'Not a valid URL' }
  }

  const webContent = await extractContentByRL(context)

  const recipeData = {
    ...(await generateRecipeByContent(webContent)),
    context,
    user: currentUser,
  }


  console.log(JSON.stringify(recipeData));
  

  const recipe = new MRecipe(recipeData)
  await recipe.save()

  currentUser.tokens--
  await currentUser.save()

  redirect(`/recipe/${recipe.id}`)
}
