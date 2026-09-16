import { useRef } from 'react'
import { operationalStats } from '../data/tradeData'
import { useGsapContext } from '../animations/useGsapContext'
import { animateStats } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function Stats() {
  const statsRef = useRef(null)
  const counterRefs = useRef([])

  useGsapContext(() => {
    animateStats(counterRefs.current, statsRef.current)
  }, statsRef)

  const handleStatHover = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const card = e.currentTarget
    const num = card.querySelector('.stat-number')
    const subtext = card.querySelector('.stat-subtext')

    gsap.to(card, {
      backgroundColor: 'rgba(230, 62, 38, 0.04)',
      borderColor: 'var(--accent)',
      duration: 0.3,
      ease: 'power2.out',
    })
    if (num) {
      gsap.to(num, { y: -3, duration: 0.25 })
    }
    if (subtext) {
      gsap.to(subtext, { color: '#FFFFFF', duration: 0.25 })
    }
  }

  const handleStatLeave = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const card = e.currentTarget
    const num = card.querySelector('.stat-number')
    const subtext = card.querySelector('.stat-subtext')

    gsap.to(card, {
      backgroundColor: 'transparent',
      borderColor: 'var(--border-dark)',
      duration: 0.3,
      ease: 'power2.out',
    })
    if (num) {
      gsap.to(num, { y: 0, duration: 0.25 })
    }
    if (subtext) {
      gsap.to(subtext, { color: 'var(--muted-dark)', duration: 0.25 })
    }
  }

  return (
    <section
      ref={statsRef}
      id="stats"
      className="stats-section section-pad theme-dark"
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
            borderBottom: '1px solid var(--border-dark)',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <div className="badge-code dark" style={{ marginBottom: '1rem' }}>
              [ 05 // SYSTEM SCALE & METRICS ]
            </div>
            <h2 className="heading-display-1 stats-title" style={{ margin: 0, textTransform: 'uppercase', color: '#FFFFFF' }}>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">OPERATIONAL</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  VELOCITY.
                </span>
              </span>
            </h2>
          </div>

          <div style={{ maxWidth: '440px' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-dark)', lineHeight: 1.6 }}>
              Verifiable empirical metrics reflecting continuous intercontinental volume across our 
              oceanic berths, bonded hangars, and automated customs portals.
            </p>
          </div>
        </div>

        {/* 4-Column Architectural Statistics Grid with Engineering Crosshairs Framing */}
        <div style={{ position: 'relative' }}>
          {/* Engineering Crosshair Corner Markers */}
          <div style={{ position: 'absolute', top: '-8px', left: '-8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 300, zIndex: 3, pointerEvents: 'none' }}>+</div>
          <div style={{ position: 'absolute', top: '-8px', right: '-8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 300, zIndex: 3, pointerEvents: 'none' }}>+</div>
          <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 300, zIndex: 3, pointerEvents: 'none' }}>+</div>
          <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 300, zIndex: 3, pointerEvents: 'none' }}>+</div>

          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderTop: '1px solid var(--border-dark)',
              position: 'relative',
            }}
          >
            {operationalStats.map((stat, idx) => {
              const nodeTicks = ['RTM // 51.95°N', 'SIN // 01.28°N', 'HAM // 53.55°N', 'DXB // 25.20°N']
              return (
                <div
                  key={idx}
                  className="stat-card"
                  onMouseEnter={handleStatHover}
                  onMouseLeave={handleStatLeave}
                  style={{
                    padding: 'clamp(2rem, 3.5vw, 3.5rem) clamp(1rem, 2vw, 2rem)',
                    borderRight: idx < 3 ? '1px solid var(--border-dark)' : 'none',
                    borderBottom: '1px solid var(--border-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '270px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.25s ease',
                  }}
                >
                  {/* Card Header with Technical Coordinate & Crosshair */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
                      INDEX // 0{idx + 1}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted-dark)' }}>
                      <span className="hide-mobile">{nodeTicks[idx]}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 300, fontSize: '0.8rem' }}>+</span>
                    </div>
                  </div>

                  <div>
                    <div
                      className="font-display stat-number"
                      style={{
                        fontSize: 'clamp(2.8rem, 5.2vw, 4.8rem)',
                        fontWeight: 700,
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        marginBottom: '0.75rem',
                        color: '#FFFFFF',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginRight: '0.15rem' }}>{stat.prefix}</span>
                      <span
                        ref={(el) => (counterRefs.current[idx] = el)}
                        className="gsap-counter"
                      >
                        0
                      </span>
                      <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                    </div>

                    <div
                      className="font-display"
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        color: '#FFFFFF',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>

                  <div
                    className="font-mono stat-subtext"
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted-dark)',
                      lineHeight: 1.5,
                      borderTop: '1px solid var(--border-dark-subtle)',
                      paddingTop: '1rem',
                      marginTop: '1.5rem',
                      transition: 'color 0.25s',
                    }}
                  >
                    {stat.subtext}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Global Port Network Ticker Banner */}
        <div
          className="stats-ticker-banner"
          style={{
            marginTop: '3.5rem',
            padding: '1.25rem 2rem',
            border: '1px solid var(--border-dark)',
            backgroundColor: 'var(--bg-dark-elevated)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                display: 'inline-block',
              }}
            />
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>
              GLOBAL ROUTE NETWORK STATUS: ALL MAJOR TRANS-OCEANIC CORRIDORS CLEARED
            </span>
          </div>

          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted-dark)' }}>
            DATA PROTOCOL // WCO & IMO AUDITED TELEMETRY
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-card:nth-child(2) {
            border-right: none !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-card {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  )
}
