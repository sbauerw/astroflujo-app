"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface AstroData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export default function ResultClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const status = searchParams.get('status');

    // Verificar que el pago fue exitoso
    if (status !== 'paid') {
      router.push('/pay');
      return;
    }

    // Obtener datos del usuario
    const astroDataStr = sessionStorage.getItem('astroData');
    if (!astroDataStr) {
      router.push('/read');
      return;
    }

    const astroData: AstroData = JSON.parse(astroDataStr);

    // Generar lectura
    generateReading(astroData);
  }, [searchParams, router]);

  const generateReading = async (data: AstroData) => {
    try {
      setLoading(true);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al generar la lectura');
      }

      const result = await response.json();
      setReading(result.reading);
    } catch (err) {
      setError(
        'Hubo un error al generar tu lectura. Por favor, contacta a soporte.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    // @ts-ignore — paquete sin tipos oficiales
    const { default: html2pdf } = await import('html2pdf.js');

    const element = document.getElementById('reading-content');
    if (!element) return;

    const opt = {
      margin: 10,
      filename: 'astroflujo-lectura.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    try {
      (html2pdf() as any).set(opt).from(element).save();
    } catch (err) {
      console.error('Error al generar PDF:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-spin">🌟</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Generando tu lectura...
          </h2>
          <p className="text-white/70">Consultando las estrellas ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="card max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-bold text-white mb-4">Algo salió mal</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-white mb-2">Tu Lectura Astrológica</h1>
          <button onClick={downloadPDF} className="btn-secondary mt-4">
            📥 Descargar PDF
          </button>
        </div>

        {/* Contenido de la lectura */}
        <div id="reading-content" className="card prose prose-invert max-w-none">
          <div className="text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: reading }} />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-white/60 text-sm">✨ Lectura generada con inteligencia artificial</p>
          <p className="text-white/50 text-xs max-w-2xl mx-auto">
            Esta lectura tiene fines de entretenimiento y crecimiento personal. No sustituye asesoramiento profesional médico, legal o financiero.
          </p>
          <button onClick={() => router.push('/')} className="text-white/60 hover:text-white transition-colors">
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
