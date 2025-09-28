import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch

// Importa as jogadoras
import { jogadoras } from "./Jogadoras.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Rota para listar jogadoras ---
app.get("/jogadoras", (req, res) => {
  res.json(jogadoras);
});

// --- Rota de notícias ---
app.get("/noticias", async (req, res) => {
  const API_KEY = process.env.API_KEY; // Vercel já injeta essa variável

  if (!API_KEY) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }

  const url = `https://newsapi.org/v2/everything?q=futebol+feminino&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Retorna apenas os artigos
    return res.status(200).json(data.articles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// --- Inicia servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
