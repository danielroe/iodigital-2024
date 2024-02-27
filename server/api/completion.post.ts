import { OpenAI } from 'openai'

export default defineEventHandler(async event => {
  const { prompt, malleables } = await readBody(event)
  const api = new OpenAI({
    apiKey: useRuntimeConfig().openai.token,
  })
  const result = await api.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
    messages: [
      {
        role: 'system',
        content: 'You only speak JSON. You are a computer in charge of modifying elements of a Vue application to suit the needs of the user.'
      },
      {
        role: 'system',
        content: 'Here is the current state of the app in JSON format:\n\n' + JSON.stringify(malleables, null, 2)
      },
      {
        role: 'user',
        content: prompt
      },
      {
        role: 'system',
        content: 'Provide the new state of the app in JSON format:\n\n'
      }
    ]
  })
  return JSON.parse(result.choices[0].message.content!)
})
