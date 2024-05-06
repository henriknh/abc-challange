import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

let assistant_generate_recipe_by_content = null

const getAssistantGenerateRecipeByContent = async () => {
  if (!assistant_generate_recipe_by_content) {
    assistant_generate_recipe_by_content =
      await openai.beta.assistants.retrieve('asst_YCl0F7fqu0Nt1HhvXAZm4B34')
  }

  return assistant_generate_recipe_by_content
}

export { openai, getAssistantGenerateRecipeByContent }
