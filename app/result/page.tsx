import React, { Suspense } from 'react'
import ResultClient from './ResultClient'

// Force dynamic because this page uses client-only APIs (sessionStorage / useSearchParams)
export const dynamic = 'force-dynamic'

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando…</div>}>
      <ResultClient />
    </Suspense>
  )
}
