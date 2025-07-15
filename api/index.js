export default async function handler(req, res) {
  const symbol = req.query.symbol || 'BTCUSDT';
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  const data = await response.json();
  res.status(200).json({ price: data.price });
}
