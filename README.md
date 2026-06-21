# Viruez Trading Academy 🐻

Un legado de Alexander Viruez Laime para Doris, Valery y Sarai — y para el mundo.

## Estructura del proyecto

```
viruez-trading-academy/
├── index.html              ← la app completa
├── api/
│   ├── leo.js               ← mentor "el Oso": feedback de texto (conceptos + diario)
│   └── chart-feedback.js    ← mentor "el Oso" con visión: feedback sobre capturas de gráficos
├── package.json
├── .gitignore
└── README.md
```

## Todo lo que incluye

**Aprendizaje del glosario (6 módulos, ~70 conceptos):**
- 🗂️ Tarjetas con **diagramas ilustrativos dibujados a mano** (22 conceptos clave de análisis técnico y Smart Money tienen su propio gráfico esquemático, como en un libro de texto, para entrenar el ojo)
- 🧩 Memoria · ❓ Quiz · ✍️ Escribir
- 📅 Repaso Inteligente con repetición espaciada (Leitner)
- 🔀 Repaso Mezclado (interleaving)
- 🔊 Voz / pronunciación
- 🍅 Sesión Pomodoro

**Herramientas nuevas:**
- 📊 **Gráficos en Vivo** — TradingView real embebido (EUR/USD, oro, Bitcoin, acciones, etc.)
- 🐻🔍 **Practica con el Oso** — el alumno sube una captura de un gráfico, explica qué concepto cree ver, y el Oso (con visión de IA) da feedback educativo. **Nunca da señales de compra/venta.**
- 📓 **Diario de Trading** — registro de operaciones de práctica (paper trading) con reflexión y feedback del Oso sobre el razonamiento, no sobre si ganó o perdió
- 🧮 **Calculadora de Gestión de Riesgo** — tamaño de posición según capital y % de riesgo (matemática pura, no asesoría)
- 📖 **Glosario Completo buscable** — los ~70 conceptos en una vista de referencia, con diagramas

**Legado personal:**
- 💛 Carta para Doris, Valery y Sarai

---

## Paso 1 — GitHub

Igual que ya hiciste con las apps anteriores: crea el repo, arrastra el **contenido** de esta carpeta (no la carpeta en sí) a "Add file → Upload files", confirma los cambios.

## Paso 2 — Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
2. En **Environment Variables**, agrega `ANTHROPIC_API_KEY` con tu key (necesaria para "Explícaselo al Oso", el Diario y "Practica con el Oso"). Si todavía no tienes crédito, despliega igual — todo lo demás funciona gratis.
3. **Deploy**.

---

## Notas importantes

- **"Practica con el Oso" envía una imagen a la IA.** La imagen se reduce automáticamente en el navegador (máximo 800px de ancho) antes de enviarse, para que el archivo sea liviano y rápido.
- **Ningún lugar de la app da señales de trading en tiempo real**, ni le dice a nadie qué comprar o vender. Esto es una decisión de diseño, no una limitación técnica — es lo que hace que este legado sea seguro de compartir con tu familia y con cualquiera.
- El gráfico de **TradingView** es 100% gratuito de embeber (no requiere cuenta ni API key de TradingView).
- El progreso, el diario y los trucos se guardan en el navegador de cada persona (`localStorage`).
