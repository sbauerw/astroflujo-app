# 🤖 Guía: Integración con APIs de IA

Esta guía te explica cómo conectar tu proyecto con Claude (Anthropic) o ChatGPT (OpenAI) para generar las lecturas astrológicas.

---

## 🎯 ¿Qué API usar?

### Claude (Anthropic) - Recomendado ✅
- **Pros:** Respuestas más creativas y empáticas, mejor para contenido narrativo
- **Precio:** ~$3 por 1M tokens (input), $15 por 1M tokens (output)
- **Modelo recomendado:** `claude-3-sonnet-20240229`

### ChatGPT (OpenAI)
- **Pros:** Más conocido, documentación extensa
- **Precio:** Similar a Claude
- **Modelo recomendado:** `gpt-4-turbo-preview`

**Mi recomendación:** Claude para contenido astrológico (mejor tono místico y empático)

---

## OPCIÓN 1: Integrar Claude (Anthropic)

### 1.1 Obtener API Key

1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Crea una cuenta (si no tienes)
3. Ve a "API Keys"
4. Click en "Create Key"
5. Copia la key (empieza con `sk-ant-`)

### 1.2 Agregar a tu Proyecto

En Vercel:
1. Ve a tu proyecto → Settings → Environment Variables
2. Agrega: `ANTHROPIC_API_KEY` = `sk-ant-tu-key-aqui`
3. Redespliega

En local (`.env.local`):
```
ANTHROPIC_API_KEY=sk-ant-tu-key-aqui
```

### 1.3 Actualizar el Código

Edita `app/api/generate/route.ts` y reemplaza la función `generateAstrologicalReading`:

```typescript
async function generateAstrologicalReading(data: {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}) {
  const { name, birthDate, birthTime, birthPlace } = data

  // Calcular signo solar
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const sign = getSunSign(month, day)

  // Prompt para Claude
  const prompt = `Genera una lectura astrológica completa y personalizada en español para:

Nombre: ${name}
Fecha de nacimiento: ${birthDate}
${birthTime ? `Hora de nacimiento: ${birthTime}` : 'Hora de nacimiento: Desconocida'}
Lugar de nacimiento: ${birthPlace}
Signo solar: ${sign}

La lectura DEBE incluir exactamente estas secciones en formato HTML:

<h2>🌞 Tu Carta Natal</h2>
<p>Describe la esencia astrológica de ${name}, su signo solar ${sign}, y características principales. Menciona energías de Sol, Luna (estima basándote en el mes) y rasgos generales. 3-4 párrafos inspiradores.</p>

<h2>🌕 Pronóstico del Mes</h2>
<p>Análisis de tránsitos astrológicos actuales (noviembre 2025). Menciona oportunidades, desafíos y áreas de enfoque. 3-4 párrafos.</p>

<h2>💖 Compatibilidad Amorosa</h2>
<p>Análisis de ${sign} en el amor: signos compatibles, estilo de amar, necesidades emocionales y consejos para relaciones. 3-4 párrafos.</p>

<h2>💰 Dinero y Propósito</h2>
<p>Energía financiera de ${sign}, áreas de abundancia, talentos naturales y consejos para prosperidad. 3-4 párrafos.</p>

<h2>🌟 Recomendaciones Prácticas</h2>
<ul>
<li>Consejo práctico 1</li>
<li>Consejo práctico 2</li>
<li>Consejo práctico 3</li>
<li>Consejo práctico 4</li>
<li>Consejo práctico 5</li>
</ul>

<h2>🪶 Mensaje Final</h2>
<p>Cierre inspirador y empático para ${name}, recordándole su potencial único. 2-3 párrafos.</p>

<p style="margin-top: 2rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 0.5rem; font-size: 0.875rem; color: rgba(255,255,255,0.7);">
<strong>Nota importante:</strong> Esta lectura tiene fines de entretenimiento y crecimiento personal. No sustituye asesoramiento profesional médico, psicológico, legal o financiero.
</p>

IMPORTANTE:
- Usa un tono cálido, profesional y místico
- Sé específico y personalizado, menciona el nombre frecuentemente
- Evita fatalismo o negatividad extrema
- Balancea insights profundos con positividad
- NO uses lenguaje médico o promesas absolutas`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
    return result.content[0].text
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw error
  }
}
```

---

## OPCIÓN 2: Integrar ChatGPT (OpenAI)

### 2.1 Obtener API Key

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Crea cuenta y agrega método de pago
3. Ve a "API Keys"
4. Click en "Create new secret key"
5. Copia la key (empieza con `sk-`)

### 2.2 Agregar a tu Proyecto

En Vercel:
```
OPENAI_API_KEY=sk-tu-key-aqui
```

En local (`.env.local`):
```
OPENAI_API_KEY=sk-tu-key-aqui
```

### 2.3 Actualizar el Código

Edita `app/api/generate/route.ts`:

```typescript
async function generateAstrologicalReading(data: {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}) {
  const { name, birthDate, birthTime, birthPlace } = data

  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const sign = getSunSign(month, day)

  const prompt = `[MISMO PROMPT QUE ARRIBA]`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Eres un astrólogo profesional experto en crear lecturas personalizadas, empáticas e inspiradoras.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
    return result.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw error
  }
}
```

---

## 📊 Estimación de Costos

### Por lectura generada:

**Claude:**
- Input: ~1,000 tokens × $0.003 = $0.003
- Output: ~3,000 tokens × $0.015 = $0.045
- **Total: ~$0.05 por lectura**

**ChatGPT (GPT-4):**
- Input: ~1,000 tokens × $0.01 = $0.01
- Output: ~3,000 tokens × $0.03 = $0.09
- **Total: ~$0.10 por lectura**

### Si vendes a $1.99:
- **Margen con Claude:** $1.94 por venta (~97%)
- **Margen con GPT-4:** $1.89 por venta (~95%)

*Nota: Estos son costos solo de IA, sin contar fees de procesador de pagos*

---

## 🧪 Testing

### Probar la API en Desarrollo:

1. Agrega tu API key a `.env.local`
2. Ejecuta `npm run dev`
3. Completa el formulario
4. En `/pay`, click en "Simular pago exitoso"
5. Verifica que se genere la lectura

### Probar en Producción:

1. Despliega en Vercel
2. Asegúrate de que la API key esté en las variables de entorno
3. Haz un pago real de prueba (o simula el callback de Recurrente)
4. Verifica logs en Vercel si hay errores

---

## ⚠️ Consideraciones Importantes

### Rate Limits
- **Claude:** 1,000 requests/minuto (tier 1)
- **OpenAI:** Varía según tu tier

### Manejo de Errores
El código ya incluye try-catch, pero considera agregar:
- Reintentos automáticos
- Logs detallados en Vercel
- Mensaje de error amigable al usuario

### Optimización de Costos
- Cachea respuestas para combinaciones comunes de datos
- Usa modelos más baratos para usuarios de prueba
- Monitorea uso mensual en el dashboard de la API

---

## 🔐 Seguridad

✅ **NUNCA** expongas tu API key en el código del cliente
✅ **SIEMPRE** usa variables de entorno
✅ **NUNCA** subas `.env.local` a GitHub (ya está en `.gitignore`)

---

## 📚 Recursos

- [Documentación Claude API](https://docs.anthropic.com)
- [Documentación OpenAI API](https://platform.openai.com/docs)
- [Pricing Claude](https://www.anthropic.com/pricing)
- [Pricing OpenAI](https://openai.com/pricing)

---

**¡Tu IA está lista para generar lecturas! ✨**
