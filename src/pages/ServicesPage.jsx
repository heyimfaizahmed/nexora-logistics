import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function ServicesPage() {
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
          <span className="badge-code">[ SPECIFICATION // 02 ]</span>
          <span className="tag-meta">TRANS-CONTINENTAL DIVISIONS & OPERATIONAL HUD</span>
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
            <span className="gsap-line-inner">SOVEREIGN TRADE</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              DIVISIONS.
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
          Six precision logistical disciplines engineered to command oceanic lanes, expedite customs EDI declarations, and execute critical freight corridors.
        </p>
      </div>

      {/* Core Tactical Specification HUD */}
      <Services />

      {/* Booking Prompt Banner */}
      <section className="section-pad hairline-b" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-code" style={{ marginBottom: '1.25rem' }}>CARRIER CAPACITY ACCESS</span>
          <h2 className="heading-display-2" style={{ marginBottom: '1.5rem', color: 'var(--charcoal)' }}>
            READY TO DISPATCH CORRIDOR ALLOCATION?
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '580px', margin: '0 auto 2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Our direct trade desk coordinates vessel slot reservations, customs bonded storage, and air charter corridors within 120 minutes.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/allocation" className="btn-primary">
              <span>OPEN ALLOCATION LEDGER</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/case-studies" className="btn-outline">
              <span>REVIEW CASE STUDIES</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
