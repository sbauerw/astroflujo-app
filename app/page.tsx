import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-6xl mb-4">🪐</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          AstroFlujo
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light">
          Tu lectura astrológica al instante
        </p>
      </div>

      {/* Main Card */}
      <div className="card max-w-2xl w-full mb-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Descubre tu destino cósmico
        </h2>
        
        <div className="space-y-4 text-white/90 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌞</span>
            <div>
              <h3 className="font-semibold text-lg">Carta Natal Personalizada</h3>
              <p className="text-white/70">Conoce tu esencia astrológica única</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🌕</span>
            <div>
              <h3 className="font-semibold text-lg">Pronóstico Mensual</h3>
              <p className="text-white/70">Tránsitos y oportunidades del mes actual</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">💖</span>
            <div>
              <h3 className="font-semibold text-lg">Compatibilidad Amorosa</h3>
              <p className="text-white/70">Análisis profundo de tus relaciones</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-lg">Dinero y Propósito</h3>
              <p className="text-white/70">Claves de abundancia y energía financiera</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-secondary mb-2">
            $1.99 USD
          </div>
          <p className="text-white/60 text-sm mb-6">
            Lectura completa • PDF descargable • Resultados inmediatos
          </p>
          
          <Link href="/read" className="btn-primary block text-center">
            Hacer mi lectura ahora ✨
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-white/50 text-sm text-center max-w-xl">
        Lectura con fines de entretenimiento y crecimiento personal. 
        No sustituye asesoramiento profesional.
      </p>
    </div>
  )
}
