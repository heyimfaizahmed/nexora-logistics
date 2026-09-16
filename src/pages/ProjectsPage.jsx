import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Projects from '../components/Projects'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function ProjectsPage() {
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
          <span className="badge-code">[ DISPATCH // 04 ]</span>
          <span className="tag-meta">ENGINEERING BLUEPRINTS & OPERATIONAL SCENARIOS</span>
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
            <span className="gsap-line-inner">MISSION-CRITICAL</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              DISPATCHES.
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
          Detailed engineering logistics scenarios demonstrating extreme dimensional transport, vibration stabilization, and cryogenic customs corridors.
        </p>
      </div>

      {/* Core Projects Component with Vector Blueprints */}
      <Projects />

      {/* Cross-link to Metrics */}
      <section className="section-pad hairline-b" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-code" style={{ marginBottom: '1.25rem' }}>EMPIRICAL RECORD</span>
          <h2 className="heading-display-2" style={{ marginBottom: '1.25rem', color: 'var(--charcoal)' }}>
            VALIDATED OPERATIONAL VELOCITY
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '580px', margin: '0 auto 2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Explore our empirical metrics across 142 deep-water maritime ports, chartered air lanes, and transcontinental rail hubs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/metrics" className="btn-primary">
              <span>EXPLORE SYSTEM METRICS</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/allocation" className="btn-outline">
              <span>INITIATE ALLOCATION</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
