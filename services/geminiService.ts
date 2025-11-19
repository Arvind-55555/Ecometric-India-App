import { CityData } from "../types";

const API_URL = "/api/insights";

export const generateWasteInsights = async (city: CityData): Promise<string> => {
  const prompt = `
Generate an expert MSW strategy report for the city below using real environmental engineering guidelines.

City: ${city.name}
Daily Waste Generation: ${city.wasteTpd} TPD
Population: ${city.population}
Annual Growth Rate: ${city.growthRate}%
Density: ${city.density} kg/m³
Waste Composition:
- Organic: ${city.organicShare}%
- Recyclable: ${city.recyclableShare}%
- Inert: ${city.inertShare}%

Provide:
1. 20-year waste generation trends
2. Landfill capacity risks
3. Required landfill area (qualitative)
4. Recommended interventions (processing, recycling, composting, biomethanation)
5. Engineering recommendations (liners, leachate, gas collection)
6. Policy recommendations

Length: 150–200 words, structured and authoritative.
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.text || "No response from AI.";
};

export const generateComparisonReport = async (cityA: CityData, cityB: CityData): Promise<string> => {
  const prompt = `
Provide a comparative expert report on MSW generation, processing, and landfill requirements for:

City A: ${cityA.name}
City B: ${cityB.name}

Analyse:
- Waste generation differences
- Composition differences
- Infrastructure gaps
- Landfill demand over 20 years
- Recommended priority actions for each city

Length: 150–200 words, concise but detailed.
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.text || "No response from AI.";
};
