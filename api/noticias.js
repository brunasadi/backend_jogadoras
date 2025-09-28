import fetch from "node-fetch";

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "Chave API não configurada" });

  const url = `https://newsapi.org/v2/everything?q=futebol+feminino&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.articles);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
