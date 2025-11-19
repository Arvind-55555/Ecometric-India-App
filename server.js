import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

app.post("/api/insights", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    res.json({ text: response.text || "No output" });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ text: "AI error" });
  }
});

app.listen(8000, () => console.log("AI server running on http://localhost:8000"));

app.get("/", (req, res) => {
  res.send("AI Server is running ✔️");
});
