import { CityData } from "../types";

const API_URL = "/api/insights";

export const generateWasteInsights = async (city: CityData): Promise<string> => {
  const prompt = `
You are a senior environmental engineer. Provide expert MSW strategy insights.

CITY: ${city.name}
Daily Waste Generation: ${city.wasteTpd} TPD
Population: ${city.population.toLocaleString()}
Annual Growth Rate: ${city.growthRate}%
Density: ${city.density} kg/m3
Waste Composition:
- Organic: ${city.organicShare}%
- Recyclable: ${city.recyclableShare}%
- Inert: ${city.inertShare}%

Provide:
1. Key landfill capacity risks
2. 20-year waste trend insights
3. Recommended interventions
4. Landfill engineering guidance
5. Policy/operational steps

Write in 150–200 words, factual and confident.
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!data.text) return "No AI response. Check API_KEY on Vercel.";
  return data.text;
};

export const generateComparisonReport = async (cityA: CityData, cityB: CityData): Promise<string> => {
  const prompt = `
Compare MSW characteristics and waste management strategies for:

• ${cityA.name}
• ${cityB.name}

Include:
- Waste generation comparison
- Composition differences
- 20-year projection differences
- Required capacity & infrastructure
- Strategy recommendations

Write in 150–200 words, expert-level.
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.text || "No AI response. Check Vercel logs.";
};
