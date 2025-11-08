'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PayPage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar que haya datos en sessionStorage
    const astroData = sessionStorage.getItem('astroData')
    if (!astroData) {
      router.push('/read')
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="card max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Completa tu pago
          </h1>
          <p className="text-white/70">
            Solo $1.99 USD para recibir tu lectura completa
          </p>
        </div>

        {/* AQUÍ VA EL IFRAME O LINK DE RECURRENTE */}
        <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-xl p-12 text-center">
          <p className="text-white/80 mb-6">
            🔧 <strong>Configuración pendiente</strong>
          </p>
          <p className="text-white/60 text-sm mb-6">
            Aquí se integrará el sistema de pago de Recurrente.
            <br />
            Puedes usar un iframe o redirección directa.
          </p>
          
          {/* Botón temporal para simular pago exitoso (SOLO PARA DESARROLLO) */}
          <div className="space-y-4">
            <p className="text-secondary text-sm font-semibold">
              ⚠️ MODO DESARROLLO - Simulación de pago
            </p>
            <button
              onClick={() => router.push('/result?status=paid')}
              className="btn-secondary"
            >
              Simular pago exitoso (testing) ✓
            </button>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-lg text-left">
            <p className="text-white/80 font-semibold mb-2">📝 Instrucciones de integración:</p>
            <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
              <li>Crea tu cuenta en Recurrente.com</li>
              <li>Genera un link de pago fijo de $1.99</li>
              <li>Configura el return_url a: <code className="text-secondary">/result</code></li>
              <li>Reemplaza este div con el iframe de Recurrente</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/read')}
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Volver atrás
          </button>
        </div>
      </div>

      <p className="text-white/50 text-sm text-center max-w-xl mt-8">
        🔒 Pago seguro procesado por Recurrente
      </p>
    </div>
  )
}
