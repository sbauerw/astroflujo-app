import { NextRequest, NextResponse } from 'next/server'
import sanitizeHtml from 'sanitize-html'
import { SANITIZE_OPTIONS } from './sanitize-options'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, birthDate, birthTime, birthPlace } = body

    // Validación básica
    if (!name || !birthDate || !birthPlace) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Generar lectura con Claude/ChatGPT
    const reading = await generateAstrologicalReading({
      name,
      birthDate,
      birthTime,
      birthPlace
    })

    // Sanitizar HTML generado para reducir riesgo de XSS antes de enviarlo al cliente
  const sanitizedReading = sanitizeHtml(reading, SANITIZE_OPTIONS)

    return NextResponse.json({ reading: sanitizedReading })
  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Error al generar la lectura' },
      { status: 500 }
    )
  }
}

async function generateAstrologicalReading(data: {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}) {
  const { name, birthDate, birthTime, birthPlace } = data

  // Calcular signo solar básico (simplificado)
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const sign = getSunSign(month, day)

  // Prompt para la IA
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

  // AQUÍ CONECTARÍAS CON LA API DE CLAUDE/CHATGPT
  // Por ahora, devolvemos una lectura de ejemplo
  
  // Ejemplo de llamada a la API de Anthropic (comentado)
  /*
  const apiKey = process.env.ANTHROPIC_API_KEY
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  })
  
  const result = await response.json()
  return result.content[0].text
  */

  // LECTURA DE EJEMPLO (reemplazar con IA real)
  return `
    <h2>🌞 Tu Carta Natal</h2>
    <p>Querida ${name}, naciste bajo el signo de <strong>${sign}</strong>, lo que te otorga una energía única y especial. Tu Sol en ${sign} revela una personalidad que brilla con autenticidad y determinación. Eres alguien que no teme mostrar quien realmente eres, y esa valentía es tu mayor fortaleza.</p>
    
    <p>La posición de tu Luna sugiere una profunda conexión con tus emociones y una capacidad innata para comprender los ciclos naturales de la vida. Tienes el don de transformar experiencias en sabiduría, y tu intuición es una brújula confiable en momentos de incertidumbre.</p>
    
    <p>Tu carta natal indica que posees talentos creativos excepcionales que esperan ser explorados plenamente. El universo te ha dotado de una combinación especial de sensibilidad y fuerza que te permite navegar tanto las profundidades emocionales como los desafíos prácticos de la vida.</p>

    <h2>🌕 Pronóstico del Mes</h2>
    <p>Noviembre 2025 trae energías transformadoras para ti, ${name}. Los tránsitos planetarios actuales están creando un portal de oportunidades en tu vida profesional y personal. Es momento de confiar en tu visión y dar pasos audaces hacia tus metas.</p>
    
    <p>La Luna Nueva de este mes ilumina tu sector de comunicación y aprendizaje. Es un momento excelente para iniciar cursos, compartir tus ideas o comenzar ese proyecto creativo que has estado posponiendo. El cosmos te apoya para expresar tu voz única.</p>
    
    <p>Hacia finales de mes, Mercurio favorece conversaciones importantes y decisiones financieras. Mantén la mente abierta a propuestas inesperadas que podrían cambiar positivamente tu trayectoria. La clave está en equilibrar intuición y lógica.</p>

    <h2>💖 Compatibilidad Amorosa</h2>
    <p>Como ${sign}, tu aproximación al amor es intensa y auténtica. No te conformas con superficialidades; buscas conexiones que toquen tu alma. Los signos de agua y tierra resonan especialmente bien contigo, pues comprenden tu necesidad de profundidad y estabilidad emocional.</p>
    
    <p>En relaciones, valoras la lealtad y la comunicación honesta por encima de todo. Necesitas una pareja que respete tu independencia mientras crea un espacio seguro para la vulnerabilidad. Tu estilo de amar es generoso y protector, siempre dispuesto a apoyar el crecimiento de quien amas.</p>
    
    <p>El consejo astrológico para ti es mantener el equilibrio entre dar y recibir. Recuerda que mereces el mismo nivel de dedicación y cuidado que ofreces. Las relaciones más armoniosas para ti son aquellas donde hay respeto mutuo, pasión y un compromiso compartido con el crecimiento personal.</p>

    <h2>💰 Dinero y Propósito</h2>
    <p>${name}, tu signo ${sign} tiene una relación especial con la abundancia material y espiritual. Posees un talento natural para materializar ideas y crear valor tangible desde conceptos abstractos. Tu determinación y enfoque te convierten en alguien capaz de alcanzar estabilidad financiera cuando alineas tu trabajo con tus valores.</p>
    
    <p>Las áreas más prósperas para ti son aquellas que te permiten usar tu creatividad y liderazgo. Considera emprendimientos o roles donde puedas tomar decisiones independientes. Tu energía emprendedora florece cuando tienes autonomía y puedes ver el impacto directo de tu esfuerzo.</p>
    
    <p>El universo te invita a transformar tu relación con el dinero viéndolo como energía que fluye. Cuando confías en tu capacidad de generar recursos y te enfocas en aportar valor genuino, la abundancia llega naturalmente. Tus mejores inversiones son aquellas que también alimentan tu alma y propósito de vida.</p>

    <h2>🌟 Recomendaciones Prácticas</h2>
    <ul>
      <li><strong>Meditación lunar:</strong> Conecta con las fases de la Luna para alinear tus acciones con los ciclos naturales. La Luna Nueva es ideal para iniciar proyectos; la Luna Llena, para celebrar logros.</li>
      <li><strong>Journaling matutino:</strong> Dedica 10 minutos cada mañana a escribir tus pensamientos. Esto clarificará tu intuición y te ayudará a tomar decisiones alineadas con tu verdadero yo.</li>
      <li><strong>Círculos de apoyo:</strong> Rodéate de personas que eleven tu energía. Las relaciones auténticas son tu mayor tesoro y fuente de fortaleza.</li>
      <li><strong>Creatividad activa:</strong> Reserva tiempo semanal para actividades creativas sin presión de resultados. Pintar, escribir, bailar o cocinar nutren tu espíritu.</li>
      <li><strong>Afirmaciones diarias:</strong> Repite cada mañana: "Confío en mi proceso. Merezco abundancia y amor. Mi luz única ilumina el mundo."</li>
    </ul>

    <h2>🪶 Mensaje Final</h2>
    <p>Querida ${name}, las estrellas han tejido para ti un destino lleno de posibilidades luminosas. Recuerda que tu sensibilidad es tu superpoder, no una debilidad. En un mundo que a veces prioriza la lógica sobre la intuición, tu capacidad de sentir profundamente te permite acceder a verdades que otros no ven.</p>
    
    <p>Este es tu momento para brillar con autenticidad. Confía en el camino que se despliega ante ti, incluso cuando no puedas ver cada paso claramente. El universo conspira a tu favor, y cada experiencia—las alegres y las desafiantes—te está moldeando en la versión más radiante de ti misma.</p>
    
    <p>Avanza con fe, amor propio y la certeza de que eres exactamente quien necesitas ser en este momento. Tu luz es necesaria en el mundo. ✨</p>

    <p style="margin-top: 2rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 0.5rem; font-size: 0.875rem; color: rgba(255,255,255,0.7);">
      <strong>Nota importante:</strong> Esta lectura tiene fines de entretenimiento y crecimiento personal. No sustituye asesoramiento profesional médico, psicológico, legal o financiero.
    </p>
  `
}

function getSunSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Tauro'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Géminis'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cáncer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitario'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricornio'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Acuario'
  return 'Piscis'
}

// SANITIZE_OPTIONS moved to `sanitize-options.ts` to avoid exporting non-route symbols from a Next route file.
