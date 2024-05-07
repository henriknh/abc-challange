'use server'

import isValidHttpUrl from '../../utils/is-valid-http-url'
import { getAssistantGenerateRecipeByContent, openai } from '../../utils/openai'
import { TextContentBlock } from 'openai/resources/beta/threads/messages'
import puppeteer from 'puppeteer'

const generateRecipeByIngredients = async (
  ingredients: string,
  type?: string,
  portions?: number
): Promise<object> => {
  console.log('handleIngredients', ingredients, type, portions)

  return {}
}

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
      name: 'Name of the ingredient',
      unit: {
        metric_unit: {
          value: 'The amount needed of this ingredient, type=number',
          unit: 'The unit in metric system. Can also be "pieces" if mote suitable',
        },
        imperial_unit: {
          value: 'The amount needed of this ingredient, type=number',
          unit: 'The unit in imperial system. Can also be "pieces" if mote suitable',
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

const generateRecipeByContent = async (content): Promise<object> => {
  const assistant = await getAssistantGenerateRecipeByContent()

  console.log(assistant)

  let run = await openai.beta.threads.createAndRun({
    assistant_id: assistant.id,
    thread: {
      messages: [
        {
          role: 'assistant',
          content:
            'You should always return the response formatted like this JSON object: ' +
            JSON.stringify(recipeFormat),
        },
        { role: 'user', content },
      ],
    },
  })

  while (run.status !== 'completed') {
    console.log('Run status:', run.status)
    await new Promise((r) => setTimeout(r, 500))
    run = await openai.beta.threads.runs.retrieve(run.thread_id, run.id)
  }

  console.log('Run status:', run.status)

  const threadMessages = await openai.beta.threads.messages.list(run.thread_id)

  const recipe = JSON.parse(
    (threadMessages.data[0].content[0] as TextContentBlock).text.value
  )

  console.log('Prompt tokens:', run.usage.prompt_tokens)
  console.log('Completion tokens:', run.usage.completion_tokens)
  console.log('Total tokens:', run.usage.total_tokens)

  return recipe
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
      const content = await extractContentByRL(context)
      const recipe = await generateRecipeByContent(content)

      console.log('recipe', recipe)
      return recipe
    } else {
      const recipe = await generateRecipeByIngredients(context, type, portions)

      console.log('recipe', recipe)
      return recipe
    }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
