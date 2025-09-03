const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT; // <- sem fallback

app.get('/boats', async (req, res) => {
  try {
    const response = await axios.get('https://api.zerosheets.com/v1/ics');
    const boats = JSON.parse(response.data);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(boats);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar dados do ZeroSheets',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
