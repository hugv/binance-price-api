const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/price', async (req, res) => {
  try {
    const symbol = req.query.symbol || 'BTCUSDT';
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    res.json({
      symbol: response.data.symbol,
      price: response.data.price
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching price from Binance.' });
  }
});

app.get('/', (req, res) => {
  res.send('🚀 Binance Price API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
