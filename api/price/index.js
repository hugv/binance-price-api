export default async function handler(req, res) {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Símbolo no especificado" });
  }

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const text = await response.text(); // Tomamos la respuesta como texto para debug
    console.log("Binance API raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "Respuesta no es JSON válido", raw: text });
    }

    if (!data || typeof data.price === "undefined") {
      return res.status(404).json({ error: "No se encontró el precio para el símbolo proporcionado", data });
    }

    res.status(200).json({ symbol: data.symbol, price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el precio de Binance", detail: error.message });
  }
}
