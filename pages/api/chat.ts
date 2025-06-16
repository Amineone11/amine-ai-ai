import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    })

    res.status(200).json({ message: completion.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' })
  }
}
