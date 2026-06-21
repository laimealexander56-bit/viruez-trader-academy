// api/leo.js
// Función serverless de Vercel. Corre en el servidor, así que la API key
// nunca queda expuesta en el navegador del alumno.
// La usan dos pantallas: "Explícaselo al Oso" y las reflexiones del Diario de Trading.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { concept, definition, sentence } = req.body || {};
  if (!concept || !sentence) {
    res.status(400).json({ error: 'Faltan datos (concept o sentence)' });
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
        max_tokens: 220,
        system:
          "Eres 'el Oso', un mentor de trading amigable y didáctico de Viruez Trading Academy. " +
          'Puedes recibir dos tipos de mensajes: (1) un alumno explicando un concepto de trading en sus ' +
          'propias palabras, o (2) una entrada del diario de trading del alumno (qué operó, por qué entró ' +
          'y por qué salió). En ambos casos, responde en español, máximo 2-4 frases cortas, cálidas y ' +
          'alentadoras, evaluando la CALIDAD DEL RAZONAMIENTO o la precisión conceptual — nunca si la ' +
          'operación fue buena o mala en sí, nunca si ganó o perdió importa más que el proceso. ' +
          'IMPORTANTE: nunca des señales de trading, nunca digas si comprar o vender, nunca recomiendes ' +
          'operar ahora mismo ni analices mercados en vivo — es contenido educativo. Nunca hables de otros ' +
          'temas, nunca pidas información personal.',
        messages: [
          {
            role: 'user',
            content: `Concepto/contexto: "${concept}" (definición esperada: ${definition || ''}). Texto del alumno: "${sentence}"`
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
