export default async function handler(req, res) {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Símbolo no especificado" });
  }

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();

    if (!data.price) {
      return res.status(404).json({ error: "No se encontró el precio para el símbolo proporcionado" });
    }

    res.status(200).json({ symbol: data.symbol, price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el precio de Binance" });
  }
}
