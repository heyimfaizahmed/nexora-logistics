import { useRef } from 'react'
import { useGsapContext } from '../animations/useGsapContext'
import { animateManifesto, animatePillars } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function About() {
  const aboutRef = useRef(null)

  useGsapContext(() => {
    animateManifesto(aboutRef.current)
    animatePillars(aboutRef.current)

    // Subtle continuity line reveal (Hero -> About)
    gsap.fromTo(
      '.continuity-hero-about .continuity-line',
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.continuity-hero-about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    gsap.fromTo(
      '.continuity-hero-about .continuity-label',
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.continuity-hero-about',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, aboutRef)

  const handlePillarHover = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const row = e.currentTarget
    const title = row.querySelector('.pillar-title')
    const indexTag = row.querySelector('.pillar-index')
    const border = row.querySelector('.pillar-border-accent')

    gsap.to(row, {
      x: 6,
      duration: 0.25,
      ease: 'power2.out',
    })
    if (border) {
      gsap.to(border, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
    }
    if (title) {
      gsap.to(title, { color: 'var(--accent)', duration: 0.25 })
    }
    if (indexTag) {
      gsap.to(indexTag, { color: 'var(--accent)', duration: 0.25 })
    }
  }

  const handlePillarLeave = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const row = e.currentTarget
    const title = row.querySelector('.pillar-title')
    const indexTag = row.querySelector('.pillar-index')
    const border = row.querySelector('.pillar-border-accent')

    gsap.to(row, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    if (border) {
      gsap.to(border, { scaleX: 0, duration: 0.25, ease: 'power2.out' })
    }
    if (title) {
      gsap.to(title, { color: 'var(--charcoal)', duration: 0.25 })
    }
    if (indexTag) {
      gsap.to(indexTag, { color: 'var(--muted)', duration: 0.25 })
    }
  }

  return (
    <section
      ref={aboutRef}
      id="about"
      className="about-section section-pad hairline-t hairline-b"
      style={{
        backgroundColor: 'var(--bg-alt)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Cross-Section Continuity Track: Hero -> About */}
        <div
          className="continuity-hero-about"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            paddingBottom: 'clamp(1rem, 2vw, 1.75rem)',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
            borderBottom: '1px dashed var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--muted)',
            letterSpacing: '0.08em',
          }}
        >
          <div className="continuity-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 600 }}>
            <span>ROUTE CONTINUUM 01</span>
            <span>//</span>
            <span>NORTH PACIFIC ARTERY</span>
          </div>
          <div className="continuity-line" style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <div className="continuity-label hide-mobile" style={{ color: 'var(--secondary)' }}>
            WAYPOINT // RTM [51.95°N] ───→ SIN [01.28°N]
          </div>
          <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
        </div>

        {/* Section Index & Header Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge-code">
              [ 01 // OPERATIONAL MANIFESTO ]
            </span>
            <span className="tag-meta">SOVEREIGN TRADE PROTOCOL</span>
          </div>
          <span className="font-mono hide-mobile" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            NEXORA GLOBAL INFRASTRUCTURE
          </span>
        </div>

        {/* Large Statement Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Massive Editorial Statement */}
          <div
            className="about-statement-col"
            style={{
              gridColumn: 'span 7',
              willChange: 'transform',
            }}
          >
            <h2
              className="heading-display-1 about-title"
              style={{
                color: 'var(--charcoal)',
                marginBottom: '2rem',
                textTransform: 'uppercase',
              }}
            >
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">GLOBAL COMMERCE</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">DOES NOT FORGIVE</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  FRICTION.
                </span>
              </span>
            </h2>

            <div
              className="font-mono about-subtitle"
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: 'var(--secondary)',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              // BORDERLESS ARBITRAGE THROUGH COLD EFFICIENCY
            </div>

            {/* Manifesto Body Copy with Scroll-driven text emphasis */}
            <p
              className="manifesto-body"
              style={{
                fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                lineHeight: 1.75,
                color: 'var(--muted)',
                maxWidth: '680px',
              }}
            >
              International logistics is commonly mistaken for simple trucking and shipping. 
              At <span className="manifesto-highlight">sovereign scale</span>, it is an{' '}
              <span className="manifesto-highlight">algorithmic discipline</span> of{' '}
              <span className="manifesto-highlight">tariff architecture</span>, bilateral legal treaties, 
              deep-water berthing priority, and <span className="manifesto-highlight">zero-dwell customs passage</span>.
            </p>
          </div>

          {/* Right Column: Architectural Pillar Ledger (Borderless Hairline Structure) */}
          <div
            className="about-pillars-col"
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform',
            }}
          >
            {/* Pillar 01 */}
            <div
              className="pillar-card hairline-t"
              onMouseEnter={handlePillarHover}
              onMouseLeave={handlePillarLeave}
              style={{
                padding: 'clamp(1.5rem, 2.5vw, 2.25rem) 0',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div className="pillar-border-accent" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.25s ease' }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="font-mono pillar-index" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  01 // PREDICTIVE COMPLIANCE
                </span>
                <span className="tag-meta" style={{ fontSize: '0.68rem' }}>HARMONIZED TARIFFS</span>
              </div>
              <h3 className="heading-headline pillar-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', transition: 'color 0.25s' }}>
                Single-Window Digital Clearance
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Direct digital handshakes with 142 customs administrations allow container manifests 
                to clear regulatory scrutiny before vessels enter territorial waters.
              </p>
            </div>

            {/* Pillar 02 */}
            <div
              className="pillar-card hairline-t"
              onMouseEnter={handlePillarHover}
              onMouseLeave={handlePillarLeave}
              style={{
                padding: 'clamp(1.5rem, 2.5vw, 2.25rem) 0',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div className="pillar-border-accent" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.25s ease' }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="font-mono pillar-index" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  02 // CARRIER ALLIANCE PRIORITY
                </span>
                <span className="tag-meta" style={{ fontSize: '0.68rem' }}>GUARANTEED BERTHS</span>
              </div>
              <h3 className="heading-headline pillar-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', transition: 'color 0.25s' }}>
                Locked Multimodal Allocations
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                We maintain direct sovereign equity and volume-guaranteed tier-one ocean liner contracts, 
                eliminating cargo roll risks during peak trans-Pacific congestion seasons.
              </p>
            </div>

            {/* Pillar 03 */}
            <div
              className="pillar-card hairline-t hairline-b"
              onMouseEnter={handlePillarHover}
              onMouseLeave={handlePillarLeave}
              style={{
                padding: 'clamp(1.5rem, 2.5vw, 2.25rem) 0',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div className="pillar-border-accent" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.25s ease' }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="font-mono pillar-index" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  03 // CONTINENTAL INTERMODAL
                </span>
                <span className="tag-meta" style={{ fontSize: '0.68rem' }}>PORT-TO-DOOR</span>
              </div>
              <h3 className="heading-headline pillar-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', transition: 'color 0.25s' }}>
                Inland Autonomous Telemetry
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                From terminal gantry directly to high-speed rail links and bonded logistics hubs, 
                monitored by sub-second satellite telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-statement-col {
            grid-column: span 12 !important;
          }
          .about-pillars-col {
            grid-column: span 12 !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
