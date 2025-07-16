export default async function handler(req, res) {
  try {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== "string") {
      return res.status(400).json({ error: "Símbolo inválido o no especificado" });
    }

    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code || !data.price) {
      return res.status(404).json({ error: "No se encontró el precio para el símbolo proporcionado" });
    }

    res.status(200).json({ symbol: data.symbol, price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el precio de Binance", detail: error.message });
  }
}
