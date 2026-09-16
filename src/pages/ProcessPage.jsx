import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Process from '../components/Process'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function ProcessPage() {
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
          <span className="badge-code">[ CONTINUUM // 03 ]</span>
          <span className="tag-meta">THE 4-STAGE SOVEREIGN TRANSIT PROTOCOL</span>
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
            <span className="gsap-line-inner">DETERMINISTIC</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              TRADE FLOW.
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
          A methodical four-tier operational continuum transforming regulatory and maritime friction into synchronized global velocity.
        </p>
      </div>

      {/* Core Process Component */}
      <Process />

      {/* Verification Next Steps */}
      <section className="section-pad hairline-b" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
              padding: 'clamp(2rem, 4vw, 3rem)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>
                CONTINUUM CONTINUATION // STAGE 04 → EXECUTION
              </div>
              <h3 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--charcoal)' }}>
                Inspect Real-World Scenario Executions
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', maxWidth: '580px', marginTop: '0.5rem' }}>
                Examine how our aerospace, offshore energy, and semiconductor missions operate under the sovereign transit protocol.
              </p>
            </div>
            <div>
              <Link to="/case-studies" className="btn-primary">
                <span>VIEW CASE DISPATCHES</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
