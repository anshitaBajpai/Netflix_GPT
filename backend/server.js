import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// Allow frontend to access this backend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // replace with your frontend URL in production
}));

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle GPT requests
app.post("/api/gpt", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
