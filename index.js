export default async function handler(req, res) {
  const { symbol } = req.query;
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.price) {
      return res.status(404).json({ error: "Símbolo no válido" });
    }

    res.status(200).json({ price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el precio" });
  }
}
