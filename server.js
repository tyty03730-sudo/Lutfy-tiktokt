import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Kamu adalah AI pintar dan singkat." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan." });
  }
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});