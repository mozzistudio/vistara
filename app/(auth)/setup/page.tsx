'use client'

import { useState } from 'react'

type Step = 'idle' | 'migrating' | 'seeding' | 'done' | 'error'

export default function SetupPage() {
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [log, setLog] = useState<string[]>([])
  const [showPw, setShowPw] = useState(false)

  const addLog = (msg: string) => setLog(prev => [...prev, msg])

  async function runSetup() {
    if (!password) return
    setLog([])
    setStep('migrating')
    addLog('⏳ Conectando a la base de datos…')

    try {
      // Step 1 — migrate
      const r1 = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action: 'migrate' }),
      })
      const d1 = await r1.json()
      if (!r1.ok) throw new Error(d1.error || 'Migration failed')
      addLog(`✅ ${d1.message}`)

      // Step 2 — seed
      setStep('seeding')
      addLog('⏳ Insertando datos de ejemplo…')
      const r2 = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action: 'seed' }),
      })
      const d2 = await r2.json()
      if (!r2.ok) throw new Error(d2.error || 'Seed failed')
      addLog(`✅ ${d2.message}`)

      setStep('done')
      addLog('')
      addLog('🚀 Listo. Ir a /login con:')
      addLog('   vendedor@vistara.com / demo2026')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setStep('error')
      addLog(`❌ Error: ${msg}`)
    }
  }

  const isRunning = step === 'migrating' || step === 'seeding'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-dm-sans, system-ui)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'var(--deep-mid)',
        border: '1px solid rgba(110,231,160,0.15)',
        borderRadius: '16px',
        padding: '2.5rem',
        color: 'white',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1 style={{ fontFamily: 'var(--font-bricolage, sans-serif)', fontSize: '1.75rem', color: 'var(--neon-mint, #6EE7A0)', margin: 0 }}>
            Vistara Setup
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Ejecuta la migración y seed de la base de datos
          </p>
        </div>

        {/* Instructions */}
        <div style={{
          background: 'rgba(110,231,160,0.08)',
          border: '1px solid rgba(110,231,160,0.2)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: '1.6',
        }}>
          <strong style={{ color: '#6EE7A0' }}>Contraseña de base de datos:</strong><br />
          Encuéntrala en <a href="https://app.supabase.com/project/wxqbapavtmqbrldvoxla/settings/database" target="_blank" rel="noreferrer" style={{ color: '#6EE7A0' }}>
            Supabase → Settings → Database
          </a>
          {' '}→ campo <em>"Database Password"</em>.
        </div>

        {/* Password input */}
        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Database Password
          </span>
          <div style={{ position: 'relative', marginTop: '0.5rem' }}>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="tu-password-de-supabase"
              disabled={isRunning}
              onKeyDown={e => e.key === 'Enter' && !isRunning && runSetup()}
              style={{
                width: '100%',
                padding: '0.75rem 3rem 0.75rem 1rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={() => setShowPw(!showPw)}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1rem' }}
            >
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
        </label>

        {/* Run button */}
        <button
          onClick={runSetup}
          disabled={!password || isRunning}
          style={{
            width: '100%',
            padding: '0.875rem',
            background: !password || isRunning ? 'rgba(110,231,160,0.3)' : '#6EE7A0',
            color: !password || isRunning ? 'rgba(255,255,255,0.5)' : '#0D2818',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: !password || isRunning ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            marginBottom: '1.5rem',
          }}
        >
          {step === 'migrating' ? '⏳ Migrando esquema…' :
           step === 'seeding' ? '⏳ Insertando datos…' :
           step === 'done' ? '✅ Completado' :
           '🚀 Ejecutar Setup'}
        </button>

        {/* Log output */}
        {log.length > 0 && (
          <div style={{
            background: '#0D1117',
            borderRadius: '8px',
            padding: '1rem',
            fontFamily: 'var(--font-ibm-mono, monospace)',
            fontSize: '0.75rem',
            lineHeight: '1.8',
            color: '#A3D9B5',
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {log.map((line, i) => (
              <div key={i} style={{ color: line.startsWith('❌') ? '#F87171' : line.startsWith('🚀') ? '#6EE7A0' : '#A3D9B5' }}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        )}

        {/* Go to app button */}
        {step === 'done' && (
          <a
            href="/login"
            style={{
              display: 'block',
              marginTop: '1.25rem',
              padding: '0.75rem',
              background: 'rgba(110,231,160,0.1)',
              border: '1px solid rgba(110,231,160,0.3)',
              borderRadius: '8px',
              color: '#6EE7A0',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
            }}
          >
            Ir al Login →
          </a>
        )}
      </div>
    </div>
  )
}
