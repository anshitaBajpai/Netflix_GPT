import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// ✅ Allow only your frontend URL in production
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

// ✅ Serve static files only from "public" (e.g. images, logos)
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ API Route
app.post("/api/gpt", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ GPT API Error:", error);
    res.status(500).json({ error: "Something went wrong with GPT request" });
  }
});


// ✅ Start backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
