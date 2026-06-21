// api/chart-feedback.js
// Función serverless de Vercel. Recibe una imagen de un gráfico (base64) más el
// análisis del alumno, y le pide a Claude (con visión) feedback educativo.
// NUNCA debe usarse para pedir señales de compra/venta en tiempo real.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { concept, reasoning, imageData, imageType } = req.body || {};
  if (!reasoning || !imageData) {
    res.status(400).json({ error: 'Faltan datos (reasoning o imageData)' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Falta configurar ANTHROPIC_API_KEY en Vercel' });
    return;
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system:
          "Eres 'el Oso', mentor de trading de Viruez Trading Academy. Te van a mostrar una imagen de un " +
          'gráfico de velas (captura de TradingView u otra fuente) junto con el análisis de un alumno que ' +
          'cree haber identificado un concepto de trading en esa imagen. Da feedback educativo en español, ' +
          'máximo 4-5 frases cálidas y claras: di si la identificación visual parece razonable según lo que ' +
          'se ve en la imagen, qué reforzaría su análisis, o qué reconsiderar. ' +
          'REGLAS ABSOLUTAS: nunca des señales de compra/venta, nunca digas qué hacer con el precio actual ' +
          'o futuro, nunca analices si "ahora es buen momento para entrar", nunca trates esto como asesoría ' +
          'de inversión. Esto es exclusivamente para practicar el reconocimiento visual de un concepto ya ' +
          'enseñado, sobre una imagen estática. Si la imagen no muestra un gráfico de trading, dilo amablemente.',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: imageType || 'image/jpeg', data: imageData }
              },
              {
                type: 'text',
                text: `Concepto que el alumno cree identificar: "${concept || 'no especificado'}". Su análisis: "${reasoning}"`
              }
            ]
          }
        ]
      })
    });

    const data = await r.json();

    if (!r.ok) {
      res.status(502).json({ error: data.error?.message || 'Error al contactar a Claude' });
      return;
    }

    const text = (data.content || []).map((b) => b.text || '').join(' ').trim();
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
