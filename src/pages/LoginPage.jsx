import { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function LoginPage() {
  const pageRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useGsapContext(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(
      '.auth-card',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.05 }
    )
  }, pageRef)

  const from = location.state?.from?.pathname || '/account'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Authorization failed. Check enterprise credentials.')
    }
  }

  const fillDemo = () => {
    setEmail('trade.director@enterprise.com')
    setPassword('nexora2026')
  }

  return (
    <div
      ref={pageRef}
      className="page-wrap"
      style={{
        paddingTop: 'clamp(8rem, 14vh, 12rem)',
        paddingBottom: '6rem',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="container" style={{ maxWidth: '580px', marginInline: 'auto' }}>
        <div
          className="hairline-all auth-card"
          style={{
            backgroundColor: 'var(--surface)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            position: 'relative',
            borderTop: '3px solid var(--accent)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge-code">[ AUTH // TERMINAL ]</span>
              <span className="tag-meta">EDI 256-BIT ENCRYPTED</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--charcoal)', margin: 0 }}>
              DISPATCH AUTHORIZATION
            </h1>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Access corporate allocation manifests, berthing holds, and live telemetry.
            </p>
          </div>

          {error && (
            <div
              className="font-mono"
              style={{
                backgroundColor: 'rgba(230, 62, 38, 0.08)',
                borderLeft: '3px solid var(--accent)',
                padding: '0.85rem 1.25rem',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                marginBottom: '1.75rem',
              }}
            >
              SECURITY ALERT: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600 }}>
                  ENTERPRISE EMAIL OR DISPATCH ID
                </label>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                  SECURE CORP DOMAIN
                </span>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trade.director@enterprise.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--charcoal)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600 }}>
                  SECURITY AUTHORIZATION KEY
                </label>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                  MIN 6 CHARS
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--charcoal)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1.1rem',
                  fontSize: '0.85rem',
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                <span>{loading ? 'AUTHENTICATING DISPATCH...' : 'AUTHENTICATE CREDENTIALS →'}</span>
              </button>
            </div>
          </form>

          {/* Demo Fill Shortcut */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={fillDemo}
              className="font-mono"
              style={{
                fontSize: '0.725rem',
                color: 'var(--accent)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              [ DEMO FILL: TRADE DIRECTOR CREDENTIALS ]
            </button>
          </div>

          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--muted)',
            }}
          >
            <span>Need enterprise provisioning?</span>
            <Link to="/signup" style={{ color: 'var(--charcoal)', fontWeight: 600 }}>
              REGISTER CORRIDOR ACCOUNT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
