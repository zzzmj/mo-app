// ./app/api/chat/route.js
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
    const { prompt } = await req.json()
    
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'user',
                content: `${prompt}`
            }
        ],
        temperature: 0.5
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}