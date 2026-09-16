import { useState, useRef, useEffect } from 'react'
import { servicesData } from '../data/tradeData'
import { useGsapContext } from '../animations/useGsapContext'
import { animateServices, animateServiceInspector } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const servicesRef = useRef(null)
  const listRef = useRef(null)
  const inspectorRef = useRef(null)

  useGsapContext(() => {
    animateServices(servicesRef.current)
  }, servicesRef)

  // Trigger inspector animation when activeService changes
  useEffect(() => {
    if (inspectorRef.current) {
      animateServiceInspector(inspectorRef.current)
    }
  }, [activeService])

  // Desktop GSAP Hover Management
  const handleRowHover = (idx) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setActiveService(idx)

    const list = listRef.current
    if (!list) return
    const rows = list.querySelectorAll('.service-row')

    rows.forEach((row, i) => {
      const title = row.querySelector('.service-row-title')
      const indexTag = row.querySelector('.service-row-index')
      const arrow = row.querySelector('.service-row-arrow')
      const accentBar = row.querySelector('.service-accent-bar')

      if (i === idx) {
        gsap.to(row, { opacity: 1, duration: 0.25, ease: 'power2.out' })
        if (title) gsap.to(title, { x: 10, color: 'var(--charcoal)', duration: 0.25 })
        if (indexTag) gsap.to(indexTag, { color: 'var(--accent)', x: 4, duration: 0.25 })
        if (arrow) gsap.to(arrow, { x: 8, color: 'var(--accent)', duration: 0.25 })
        if (accentBar) gsap.to(accentBar, { scaleY: 1, duration: 0.25 })
      } else {
        gsap.to(row, { opacity: 0.38, duration: 0.3, ease: 'power2.out' })
        if (title) gsap.to(title, { x: 0, color: 'var(--muted)', duration: 0.25 })
        if (indexTag) gsap.to(indexTag, { color: 'var(--muted)', x: 0, duration: 0.25 })
        if (arrow) gsap.to(arrow, { x: 0, color: 'var(--muted)', duration: 0.25 })
        if (accentBar) gsap.to(accentBar, { scaleY: 0, duration: 0.25 })
      }
    })
  }

  const handleListLeave = () => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const list = listRef.current
    if (!list) return
    const rows = list.querySelectorAll('.service-row')

    rows.forEach((row, i) => {
      const isSelected = i === activeService
      const title = row.querySelector('.service-row-title')
      const indexTag = row.querySelector('.service-row-index')
      const arrow = row.querySelector('.service-row-arrow')
      const accentBar = row.querySelector('.service-accent-bar')

      gsap.to(row, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      if (title) gsap.to(title, { x: 0, color: isSelected ? 'var(--charcoal)' : 'var(--charcoal-secondary)', duration: 0.25 })
      if (indexTag) gsap.to(indexTag, { color: isSelected ? 'var(--accent)' : 'var(--muted)', x: 0, duration: 0.25 })
      if (arrow) gsap.to(arrow, { x: isSelected ? 4 : 0, color: isSelected ? 'var(--accent)' : 'var(--muted)', duration: 0.25 })
      if (accentBar) gsap.to(accentBar, { scaleY: isSelected ? 1 : 0, duration: 0.25 })
    })
  }

  return (
    <section
      ref={servicesRef}
      id="services"
      className="services-section section-pad hairline-b"
      style={{
        backgroundColor: 'var(--bg)',
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
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <div className="badge-code" style={{ marginBottom: '1rem' }}>
              [ 02 // TRADE SERVICES & CAPABILITIES ]
            </div>
            <h2 className="heading-display-1 services-title" style={{ margin: 0, textTransform: 'uppercase' }}>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">PRECISION TRADE</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  INFRASTRUCTURE.
                </span>
              </span>
            </h2>
          </div>

          <div style={{ maxWidth: '440px' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Six dedicated divisions architected to dismantle commercial friction, eliminate regulatory lag, 
              and command maritime and air freight corridors.
            </p>
          </div>
        </div>

        {/* Asymmetric Services Layout: Large Interactive List + Sticky Detail Inspector */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Left: Architectural Service List Rows */}
          <div
            ref={listRef}
            className="services-list"
            onMouseLeave={handleListLeave}
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {servicesData.map((svc, idx) => {
              const isSelected = activeService === idx
              return (
                <div
                  key={svc.index}
                  className="service-row hairline-b"
                  onMouseEnter={() => handleRowHover(idx)}
                  onClick={() => setActiveService(idx)}
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.75rem) 0 clamp(1.75rem, 3vw, 2.75rem) 1.25rem',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Subtle Accent Indicator Bar */}
                  <div
                    className="service-accent-bar"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '15%',
                      bottom: '15%',
                      width: '3px',
                      backgroundColor: 'var(--accent)',
                      transform: isSelected ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'center center',
                      transition: 'transform 0.25s ease',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(1rem, 2vw, 2.5rem)' }}>
                      <span
                        className="font-mono service-row-index"
                        style={{
                          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                          color: isSelected ? 'var(--accent)' : 'var(--muted)',
                          fontWeight: 600,
                        }}
                      >
                        /{svc.index}
                      </span>
                      <h3
                        className="font-display service-row-title"
                        style={{
                          fontSize: 'clamp(1.35rem, 2.4vw, 2.2rem)',
                          fontWeight: 600,
                          color: isSelected ? 'var(--charcoal)' : 'var(--charcoal-secondary)',
                          lineHeight: 1.15,
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {svc.title}
                      </h3>
                    </div>

                    <span
                      className="tag-meta hide-mobile"
                      style={{
                        color: isSelected ? 'var(--accent)' : 'var(--muted)',
                      }}
                    >
                      {svc.route}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingLeft: 'clamp(2rem, 3.5vw, 4rem)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <p style={{ fontSize: '0.925rem', color: 'var(--muted)', margin: 0, maxWidth: '580px' }}>
                      {svc.tagline}
                    </p>
                    <span
                      className="service-row-arrow"
                      style={{
                        color: isSelected ? 'var(--accent)' : 'var(--muted)',
                        fontSize: '1.1rem',
                        transform: isSelected ? 'translateX(4px)' : 'none',
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Architectural Tactical Specification HUD (Sticky, Borderless Architecture) */}
          <div
            ref={inspectorRef}
            className="service-detail-box"
            style={{
              position: 'sticky',
              top: '7rem',
              padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              backgroundColor: 'var(--bg-alt)',
              borderTop: '2px solid var(--accent)',
              overflow: 'hidden',
            }}
          >
            {/* Oversized Ghost Index Number Watermark */}
            <div
              className="inspector-animate"
              style={{
                position: 'absolute',
                top: '-1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(6rem, 10vw, 8.5rem)',
                fontWeight: 800,
                color: 'rgba(17, 18, 21, 0.04)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              {servicesData[activeService].index}
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="font-mono inspector-animate" style={{ fontSize: '0.725rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  SPEC // {servicesData[activeService].index}
                </span>
                <span className="tag-meta inspector-animate" style={{ fontSize: '0.68rem', color: 'var(--secondary)' }}>
                  ACTIVE ALLOCATION
                </span>
              </div>

              <h4
                className="font-display inspector-animate"
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.2,
                }}
              >
                {servicesData[activeService].title}
              </h4>

              <p className="inspector-animate" style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {servicesData[activeService].description}
              </p>

              <div style={{ marginBottom: '1.75rem' }}>
                <div
                  className="font-mono inspector-animate"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  SPECIFIED PROTOCOLS
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {servicesData[activeService].capabilities.map((cap, i) => (
                    <li
                      key={i}
                      className="inspector-animate capability-item"
                      style={{
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        color: 'var(--charcoal)',
                      }}
                    >
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: 'var(--accent)',
                          display: 'inline-block',
                        }}
                      />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="inspector-animate"
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--muted)' }}>
                  CORRIDOR: {servicesData[activeService].route}
                </span>
                <a href="#cta" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                  Book Dispatch ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .service-detail-box {
            position: static !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
