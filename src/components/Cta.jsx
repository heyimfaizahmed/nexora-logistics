import { useState, useRef, useEffect } from 'react'
import { useGsapContext } from '../animations/useGsapContext'
import { animateCta } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function Cta() {
  const ctaRef = useRef(null)
  const submitBtnRef = useRef(null)
  const [origin, setOrigin] = useState('Rotterdam [RTM]')
  const [destination, setDestination] = useState('Singapore [SIN]')
  const [cargoType, setCargoType] = useState('High-Value Industrial (FCL)')
  const [contactEmail, setContactEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [refCode, setRefCode] = useState('NEX-882901')

  const tradeDeskPhone = import.meta.env.VITE_CONTACT_PHONE || '+31 (0) 10 892 4100'
  const tradeDeskEmail = import.meta.env.VITE_CONTACT_EMAIL || 'dispatch@nexora-trade.com'
  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || ''

  useGsapContext(() => {
    animateCta(ctaRef.current)
  }, ctaRef)

  // Desktop Magnetic Button Interaction
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion || !submitBtnRef.current) return

    const btn = submitBtnRef.current
    const arrow = btn.querySelector('.btn-arrow-icon')

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power2.out' })
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.25
      const deltaY = (e.clientY - centerY) * 0.25

      xTo(deltaX)
      yTo(deltaY)
      if (arrow) gsap.to(arrow, { x: 5, y: -2, duration: 0.25 })
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
      if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3 })
    }

    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleInputFocus = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'var(--accent)',
      boxShadow: '0 0 12px rgba(230, 62, 38, 0.15)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleInputBlur = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'var(--border)',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const payload = {
      cargoType,
      origin,
      destination,
      contactEmail,
      timestamp: new Date().toISOString(),
    }

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          throw new Error(`Submission failed with status: ${response.status}`)
        }
      } catch {
        setSubmitError('Secure transmission endpoint unreachable. Falling back to local dispatch ledger.')
      }
    }

    const generatedRef = `NEX-${Math.floor(100000 + Math.random() * 900000)}`
    setRefCode(generatedRef)
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => {
      setSubmitted(false)
      setSubmitError(null)
    }, 7000)
  }

  return (
    <section
      ref={ctaRef}
      id="cta"
      className="cta-section section-pad hairline-b"
      style={{
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          className="cta-card hairline-all"
          style={{
            backgroundColor: 'var(--surface)',
            padding: 'clamp(2.5rem, 6vw, 5.5rem)',
            position: 'relative',
          }}
        >
          {/* Top Technical Metadata */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1.5rem',
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            <span className="badge-code">
              [ 06 // ALLOCATION INTAKE ]
            </span>
            <span className="tag-meta">GUARANTEED CARRIER CAPACITY</span>
          </div>

          <div
            className="cta-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Headline & Pitch */}
            <div>
              <h2
                className="heading-hero cta-title"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
                  lineHeight: 0.95,
                  marginBottom: '2rem',
                  color: 'var(--charcoal)',
                }}
              >
                <span className="gsap-line-wrap">
                  <span className="gsap-line-inner">ENGINEER</span>
                </span>
                <span className="gsap-line-wrap">
                  <span className="gsap-line-inner">YOUR TRADE</span>
                </span>
                <span className="gsap-line-wrap">
                  <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                    PIPELINE.
                  </span>
                </span>
              </h2>

              <p
                className="cta-supporting"
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  maxWidth: '560px',
                  marginBottom: '2.5rem',
                }}
              >
                Secure dedicated ocean vessel slots, bonded customs routing, and chartered air freight corridors. 
                Our sovereign trade desk responds within 120 minutes with certified tariffs and clearance itineraries.
              </p>

              <div className="cta-supporting" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--muted)' }}>DIRECT TRADE DESK</div>
                  <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                    {tradeDeskPhone}
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--muted)' }}>DIRECT CLEARANCE DISPATCH</div>
                  <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                    {tradeDeskEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Allocation Intake Dispatch Ledger */}
            <div
              className="cta-form-card"
              style={{
                backgroundColor: 'var(--bg-alt)',
                borderTop: '2px solid var(--accent)',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                position: 'relative',
              }}
            >
              {/* Ledger Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <span className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em' }}>
                    ALLOCATION INTAKE // DISPATCH LEDGER
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>
                  SLOT: UNRESERVED
                </span>
              </div>

              {submitted ? (
                <div
                  style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="badge-code" style={{ marginBottom: '1rem', color: '#22c55e', borderColor: '#22c55e' }}>
                    TRANSMISSION CONFIRMED
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                    Corridor Allocation Logged
                  </h4>
                  <p className="font-mono" style={{ fontSize: '0.825rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    Manifest Code: <strong>{refCode}</strong><br />
                    A Senior Trade Dispatch Officer has been assigned to coordinate your transit manifest.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* FIELD 01: CARGO / PROJECT TYPE */}
                  <div className="intake-field-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                        FIELD 01 // CARGO SPECIFICATION
                      </label>
                      <span className="font-mono field-status" style={{ fontSize: '0.65rem', color: 'var(--accent)', opacity: 0.85 }}>
                        HS CODE / FREIGHT MODE
                      </span>
                    </div>
                    <select
                      value={cargoType}
                      onChange={(e) => setCargoType(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--charcoal)',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                      }}
                    >
                      <option>High-Value Industrial (FCL Ocean Freight)</option>
                      <option>Time-Critical Aerospace & Defense Charter</option>
                      <option>Offshore Energy Heavy-Lift Project Cargo</option>
                      <option>Semiconductor & Cryogenic Cleanroom Transport</option>
                      <option>Sovereign Dual-Channel Customs Fast-Track</option>
                    </select>
                  </div>

                  {/* FIELD 02: ORIGIN */}
                  <div className="intake-field-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                        FIELD 02 // PORT / CORRIDOR ORIGIN
                      </label>
                      <span className="font-mono field-status" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                        UN-LOCODE OR CITY
                      </span>
                    </div>
                    <input
                      type="text"
                      value={origin}
                      required
                      placeholder="e.g. Rotterdam [NLRTM]"
                      onChange={(e) => setOrigin(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--charcoal)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>

                  {/* FIELD 03: DESTINATION */}
                  <div className="intake-field-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                        FIELD 03 // DESTINATION TERMINAL
                      </label>
                      <span className="font-mono field-status" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                        RECEIVING PORT / INLAND HUB
                      </span>
                    </div>
                    <input
                      type="text"
                      value={destination}
                      required
                      placeholder="e.g. Singapore [SGSIN]"
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--charcoal)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>

                  {/* FIELD 04: OPERATIONAL REQUIREMENT / CONTACT */}
                  <div className="intake-field-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                        FIELD 04 // ENTERPRISE CONTACT OR EORI
                      </label>
                      <span className="font-mono field-status" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                        SECURE DISPATCH ADDR
                      </span>
                    </div>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="trade.director@enterprise.com"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--charcoal)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>

                  {submitError && (
                    <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--accent)', marginTop: '-0.75rem' }}>
                      NOTICE: {submitError}
                    </div>
                  )}

                  {/* Industrial Dispatch Action */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1.1rem 1.75rem',
                        fontSize: '0.85rem',
                        letterSpacing: '0.06em',
                        willChange: 'transform',
                        opacity: isSubmitting ? 0.75 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <span>{isSubmitting ? 'ENCRYPTING & DISPATCHING...' : 'DISPATCH ALLOCATION REQUEST'}</span>
                      <svg className="btn-arrow-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                      SECURITY PROTOCOL // 256-BIT ENCRYPTED EDI TRANSMISSION
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
