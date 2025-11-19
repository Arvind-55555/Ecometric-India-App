import { CityData } from "../types";

const API_URL = "/api/insights";

export const generateWasteInsights = async (city: CityData): Promise<string> => {
  const prompt = `
Act as an environmental engineer. Provide MSW insights for ${city.name}.
Daily Waste: ${city.wasteTpd} TPD
Population: ${city.population}
Growth Rate: ${city.growthRate}%
Density: ${city.density} kg/m3
Limit to 200 words.
  `;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.text || "No response from AI.";
  } catch (err) {
    console.error("Frontend AI error:", err);
    return "AI request failed.";
  }
};

export const generateComparisonReport = async (cityA: CityData, cityB: CityData): Promise<string> => {
  const prompt = `
Compare MSW metrics between ${cityA.name} and ${cityB.name}.
Provide a concise 200-word policy-oriented report.
  `;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.text || "No response from AI.";
  } catch (err) {
    console.error("Frontend AI error:", err);
    return "AI request failed.";
  }
};
