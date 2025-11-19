import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY in Vercel env" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",      // Good performance + low cost
      messages: [
        { role: "system", content: "You are an expert environmental engineer specializing in Indian MSW management and landfill planning." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800
    });

    return res.status(200).json({ text: completion.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: "AI generation failed" });
  }
}
