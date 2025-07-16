export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({ symbol: symbol.toUpperCase(), price: data.price });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Binance', details: error.message });
  }
}
