import { CityData } from "../types";

const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? (process.env.API_KEY as string) : "";

async function callGenAI(prompt: string): Promise<string> {
  // Attempt dynamic import and server-side call if API key available and running in Node.
  if (apiKey && typeof window === 'undefined') {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const response: any = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response?.text || "No response from AI.";
    } catch (err) {
      console.error("GenAI call failed:", err);
      return "AI service failed — returning a fallback summary.";
    }
  }

  // Fallback mock response (suitable for browser builds / local testing)
  // Generate a concise mock summary from the prompt.
  const mock = prompt.split('\n').slice(0,5).join(' ').slice(0,300);
  return `Mock AI Summary (no API key): ${mock}... (Install API key or deploy a server-side function for real AI responses)`;
}

export const generateWasteInsights = async (city: CityData): Promise<string> => {
  if (!apiKey && typeof window !== 'undefined') {
    // Return a reasonable deterministic mock insight for frontend-only deployment.
    return `Estimated current daily waste for ${city.name} is ${city.wasteTpd} TPD. With an annual growth rate of ${city.growthRate}%, waste generation will increase significantly over 20 years. Priorities: increase recycling (current recyclable share ${city.recyclableShare}%), scale up composting for organic fraction (~${city.organicShare}%), and plan phased landfill capacity with engineered liners and leachate collection. This is a mock recommendation; deploy server-side AI for detailed reports.`;
  }

  const prompt = `
Act as an expert environmental engineer in India and produce a ~200-word insight for ${city.name}.
Daily Waste (TPD): ${city.wasteTpd}
Population: ${city.population}
Annual Growth Rate (%): ${city.growthRate}
Density (kg/m3): ${city.density}
Provide high-level recommendations for waste management and landfill planning.
Limit response to 200 words.
  `;

  return await callGenAI(prompt);
};

export const generateComparisonReport = async (cityA: CityData, cityB: CityData): Promise<string> => {
  if (!apiKey && typeof window !== 'undefined') {
    return `Comparison (mock): ${cityA.name} generates ${cityA.wasteTpd} TPD vs ${cityB.name} ${cityB.wasteTpd} TPD. ${cityA.name} has higher organic share (${cityA.organicShare}%) compared to ${cityB.organicShare}%. Recommend city-specific composting and recycling programs.`;
  }

  const prompt = `
You are an environmental planner. Compare ${cityA.name} and ${cityB.name} on MSW generation, composition, and recommended strategies.
Provide a concise comparison and action list (max 200 words).
  `;

  return await callGenAI(prompt);
};
