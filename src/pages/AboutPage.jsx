import { useRef } from 'react'
import { Link } from 'react-router-dom'
import About from '../components/About'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function AboutPage() {
  const pageRef = useRef(null)

  useGsapContext(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.05 })
    tl.fromTo('.page-header-meta', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        '.page-header-title .gsap-line-inner',
        { y: '110%', opacity: 0, filter: 'blur(8px)' },
        { y: '0%', opacity: 1, filter: 'blur(0px)', duration: 0.95, stagger: 0.12 },
        '-=0.3'
      )
      .fromTo(
        '.page-header-desc',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.45'
      )
  }, pageRef)

  return (
    <div ref={pageRef} className="page-wrap" style={{ paddingTop: '8rem' }}>
      {/* Page Header Banner */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div className="page-header-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <span className="badge-code">[ ARCHIVE // 01 ]</span>
          <span className="tag-meta">SOVEREIGN TRADE PROTOCOL & JURISPRUDENCE</span>
        </div>
        <h1
          className="heading-hero page-header-title"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 6.2rem)',
            lineHeight: 0.95,
            color: 'var(--charcoal)',
            maxWidth: '1100px',
            marginBottom: '1.5rem',
          }}
        >
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner">GLOBAL LOGISTICS AS A</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              SOVEREIGN SCIENCE.
            </span>
          </span>
        </h1>
        <p
          className="page-header-desc"
          style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
            color: 'var(--muted)',
            maxWidth: '720px',
            lineHeight: 1.65,
          }}
        >
          NEXORA was established to engineer frictionless intercontinental trade pipelines for sovereign industry, aerospace defense, and energy sectors.
        </p>
      </div>

      {/* Core Operational Manifesto & Pillars */}
      <About />

      {/* Extended Architectural Narrative Section */}
      <section className="section-pad hairline-b" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            <div className="hairline-all" style={{ padding: '2.5rem', backgroundColor: 'var(--surface)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem' }}>
                TELEMETRY PRINCIPLE // 01
              </div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Deterministic Transit Windows
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                By locking maritime alliance capacity with priority crane dispatch agreements, our clients bypass conventional terminal queue congestion.
              </p>
            </div>

            <div className="hairline-all" style={{ padding: '2.5rem', backgroundColor: 'var(--surface)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem' }}>
                GOVERNANCE PRINCIPLE // 02
              </div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Algorithmic Tariff Precision
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Harmonized System (HS) classifications are audited in real time against 140+ sovereign single-window customs systems to ensure zero document hold.
              </p>
            </div>

            <div className="hairline-all" style={{ padding: '2.5rem', backgroundColor: 'var(--surface)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem' }}>
                INFRASTRUCTURE PRINCIPLE // 03
              </div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                End-to-End Custody
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                From high-security cleanroom crating to chartered Antonov airlifts and deep-sea flotillas, chain-of-custody sensors provide cryptographic verification.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <Link to="/capabilities" className="btn-primary">
              <span>EXPLORE TRADE CAPABILITIES</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .page-wrap .container > div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
