import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Stats from '../components/Stats'
import { tradeNodes } from '../data/tradeData'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function StatsPage() {
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
          <span className="badge-code">[ TELEMETRY // 05 ]</span>
          <span className="tag-meta">EMPIRICAL PERFORMANCE & CROSSHAIR AUDIT</span>
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
            <span className="gsap-line-inner">SYSTEM SCALE &</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              METRICS.
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
          Continuous verifiable logistics telemetry reflecting insured cargo flow, terminal berthing speed, and sub-48h border velocity.
        </p>
      </div>

      {/* Core Stats Component with Engineering Crosshairs */}
      <Stats />

      {/* Extended Terminal Hubs Table */}
      <section className="section-pad hairline-b" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-code" style={{ marginBottom: '0.75rem' }}>BERTHING REPOSITORY</span>
              <h3 className="heading-display-2" style={{ margin: 0 }}>PRIMARY MARITIME & CARGO AIR HUBS</h3>
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              LIVE SATELLITE TELEMETRY FEED
            </span>
          </div>

          <div className="hairline-all" style={{ backgroundColor: 'var(--surface)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)', color: 'var(--charcoal)' }}>
                  <th style={{ padding: '1.2rem 1.5rem' }}>CODE</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>TERMINAL / PORT NAME</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>COORDINATES</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>STATUS</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>TIME ZONE</th>
                </tr>
              </thead>
              <tbody>
                {tradeNodes.map((node) => (
                  <tr key={node.code} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{node.code}</td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--charcoal)' }}>{node.name}</td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--muted)' }}>{node.coords}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: node.status === 'Optimal' ? '#16a34a' : 'var(--accent)' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: node.status === 'Optimal' ? '#16a34a' : 'var(--accent)' }} />
                        {node.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--charcoal)' }}>{node.timeZone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/allocation" className="btn-primary">
              <span>DISPATCH CORRIDOR MANIFEST</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
