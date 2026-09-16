import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function SignupPage() {
  const pageRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    eoriNumber: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  useGsapContext(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(
      '.auth-card',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.05 }
    )
  }, pageRef)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Authorization keys do not match. Please re-enter.')
      return
    }

    try {
      await signup(formData)
      navigate('/account')
    } catch (err) {
      setError(err.message || 'Registration failed. Check submitted values.')
    }
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
      <div className="container" style={{ maxWidth: '640px', marginInline: 'auto' }}>
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
              <span className="badge-code">[ ONBOARDING // ENTERPRISE ]</span>
              <span className="tag-meta">WCO / IMO REGULATORY READY</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--charcoal)', margin: 0 }}>
              ENTERPRISE PROVISIONING
            </h1>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Register your organization to access locked multimodal allocations and automated customs EDI filings.
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
              REGISTRATION ALERT: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                DIRECTOR / DISPATCH OFFICER FULL NAME *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Marcus Vance"
                style={{
                  width: '100%',
                  padding: '0.7rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--charcoal)',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                CORPORATE DISPATCH EMAIL *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="trade.director@enterprise.com"
                style={{
                  width: '100%',
                  padding: '0.7rem 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--charcoal)',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  ENTERPRISE ENTITY
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Foundry NV / Aerospace Corp"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--charcoal)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  EORI / TAX IDENTIFIER
                </label>
                <input
                  type="text"
                  name="eoriNumber"
                  value={formData.eoriNumber}
                  onChange={handleChange}
                  placeholder="NL8492019482"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--charcoal)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  AUTHORIZATION KEY *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--charcoal)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  CONFIRM KEY *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--charcoal)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
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
                <span>{loading ? 'PROVISIONING ACCOUNT...' : 'PROVISION CORRIDOR ACCOUNT →'}</span>
              </button>
            </div>
          </form>

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
            <span>Already have active credentials?</span>
            <Link to="/login" style={{ color: 'var(--charcoal)', fontWeight: 600 }}>
              AUTHENTICATE HERE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
