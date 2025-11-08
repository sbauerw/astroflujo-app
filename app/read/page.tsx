'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Guardar datos en sessionStorage para usarlos después del pago
    sessionStorage.setItem('astroData', JSON.stringify(formData))
    
    // Redirigir a página de pago
    router.push('/pay')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="card max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔮</div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Ingresa tus datos
          </h1>
          <p className="text-white/70">
            Necesitamos esta información para crear tu lectura personalizada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-medium">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Ej: María García"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              Fecha de nacimiento *
            </label>
            <input
              type="date"
              name="birthDate"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              Hora de nacimiento (opcional)
            </label>
            <input
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
              className="input-field"
            />
            <p className="text-white/50 text-sm mt-2">
              Si no la conoces, déjala en blanco
            </p>
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              Ciudad y país de nacimiento *
            </label>
            <input
              type="text"
              name="birthPlace"
              required
              value={formData.birthPlace}
              onChange={handleChange}
              className="input-field"
              placeholder="Ej: Ciudad de Guatemala, Guatemala"
            />
          </div>

          <div className="pt-6">
            <button type="submit" className="btn-primary w-full">
              Continuar al pago → $1.99
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>

      <p className="text-white/50 text-sm text-center max-w-xl mt-8">
        🔒 Tus datos son privados y solo se usan para generar tu lectura
      </p>
    </div>
  )
}
