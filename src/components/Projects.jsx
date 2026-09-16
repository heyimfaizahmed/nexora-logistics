import { useRef, useState, useEffect } from 'react'
import { useGsapContext } from '../animations/useGsapContext'
import { animateProjects } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function Projects() {
  const projectsRef = useRef(null)
  const stackRef = useRef(null)
  const hoverHudRef = useRef(null)
  const [hudLabel, setHudLabel] = useState('AERO-01 // INSPECT BLUEPRINT')

  useGsapContext(() => {
    animateProjects(projectsRef.current)

    // Continuity Line: Process -> Projects
    gsap.fromTo(
      '.continuity-process-projects .continuity-line',
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.continuity-process-projects',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    gsap.fromTo(
      '.continuity-process-projects .continuity-label',
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.continuity-process-projects',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, projectsRef)

  // Desktop Contextual Pointer-Follow Hover HUD
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const stack = stackRef.current
    const hud = hoverHudRef.current
    if (!stack || !hud) return

    gsap.set(hud, { opacity: 0, scale: 0.92, pointerEvents: 'none' })
    const xTo = gsap.quickTo(hud, 'x', { duration: 0.16, ease: 'power2.out' })
    const yTo = gsap.quickTo(hud, 'y', { duration: 0.16, ease: 'power2.out' })

    const handlePointerMove = (e) => {
      xTo(e.clientX + 16)
      yTo(e.clientY + 18)
    }

    const handleStackEnter = () => {
      gsap.to(hud, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    const handleStackMouseLeave = () => {
      gsap.to(hud, { opacity: 0, scale: 0.92, duration: 0.2, ease: 'power2.out' })
    }

    stack.addEventListener('pointermove', handlePointerMove)
    stack.addEventListener('pointerenter', handleStackEnter)
    stack.addEventListener('pointerleave', handleStackMouseLeave)

    return () => {
      stack.removeEventListener('pointermove', handlePointerMove)
      stack.removeEventListener('pointerenter', handleStackEnter)
      stack.removeEventListener('pointerleave', handleStackMouseLeave)
    }
  }, [])

  // Desktop GSAP Hover Management
  const handleItemHover = (idx) => {
    if (idx === 0) setHudLabel('AERO-01 // INSPECT BLUEPRINT')
    else if (idx === 1) setHudLabel('WIND-02 // INSPECT BLUEPRINT')
    else if (idx === 2) setHudLabel('SEMI-03 // INSPECT BLUEPRINT')

    if (!window.matchMedia('(pointer: fine)').matches) return
    const stack = stackRef.current
    if (!stack) return
    const items = stack.querySelectorAll('.case-study-item')

    items.forEach((item, i) => {
      const title = item.querySelector('.cs-title')
      const visual = item.querySelector('.cs-visual-col')
      const metric = item.querySelector('.cs-stat-val')

      if (i === idx) {
        gsap.to(item, { opacity: 1, borderColor: 'var(--accent)', duration: 0.3, ease: 'power2.out' })
        if (title) gsap.to(title, { x: 8, color: 'var(--accent)', duration: 0.25 })
        if (visual) gsap.to(visual, { scale: 1.015, duration: 0.4, ease: 'power2.out' })
        if (metric) gsap.to(metric, { scale: 1.06, color: 'var(--accent-hover)', duration: 0.25 })
      } else {
        gsap.to(item, { opacity: 0.42, duration: 0.3, ease: 'power2.out' })
        if (title) gsap.to(title, { x: 0, color: 'var(--charcoal)', duration: 0.25 })
        if (visual) gsap.to(visual, { scale: 1, duration: 0.3 })
        if (metric) gsap.to(metric, { scale: 1, color: 'var(--accent)', duration: 0.25 })
      }
    })
  }

  const handleStackLeave = () => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const stack = stackRef.current
    if (!stack) return
    const items = stack.querySelectorAll('.case-study-item')

    items.forEach((item) => {
      const title = item.querySelector('.cs-title')
      const visual = item.querySelector('.cs-visual-col')
      const metric = item.querySelector('.cs-stat-val')

      gsap.to(item, { opacity: 1, borderColor: 'var(--border)', duration: 0.35, ease: 'power2.out' })
      if (title) gsap.to(title, { x: 0, color: 'var(--charcoal)', duration: 0.25 })
      if (visual) gsap.to(visual, { scale: 1, duration: 0.35 })
      if (metric) gsap.to(metric, { scale: 1, color: 'var(--accent)', duration: 0.25 })
    })
  }

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="projects-section section-pad hairline-b"
      style={{
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Desktop Contextual Hover HUD (pointer: fine only) */}
      <div
        ref={hoverHudRef}
        className="cs-hover-hud hide-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          backgroundColor: 'rgba(14, 15, 18, 0.94)',
          border: '1px solid var(--accent)',
          padding: '0.35rem 0.65rem',
          color: '#FFFFFF',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity',
        }}
      >
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
        <span>{hudLabel}</span>
      </div>

      <div className="container">
        {/* Cross-Section Continuity Track: Process -> Projects */}
        <div
          className="continuity-process-projects"
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
            <span>TRANSIT CONTINUUM</span>
            <span>//</span>
            <span>STAGE 04 [CLEAR_DISPATCH] ──→ VERIFIED EXECUTION</span>
          </div>
          <div className="continuity-line" style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <div className="continuity-label hide-mobile" style={{ color: 'var(--secondary)' }}>
            DISPATCH LEDGER // AERO-01 • WIND-02 • SEMI-03
          </div>
          <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
        </div>

        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <div className="badge-code" style={{ marginBottom: '1rem' }}>
              [ 04 // OPERATIONAL SCENARIOS & CASE HISTORIES ]
            </div>
            <h2 className="heading-display-1 projects-title" style={{ margin: 0, textTransform: 'uppercase' }}>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">MISSION-CRITICAL</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  DISPATCHES.
                </span>
              </span>
            </h2>
          </div>

          <div style={{ maxWidth: '420px' }}>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Engineering logistics scenarios demonstrating deterministic corridor execution across 
              dimensional extremes, tight tidal windows, and cleanroom tolerances.
            </p>
          </div>
        </div>

        {/* Editorial Case Studies Stack with Asymmetric Compositions & Custom Blueprint Artwork */}
        <div
          ref={stackRef}
          className="projects-stack"
          onMouseLeave={handleStackLeave}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(3.5rem, 6vw, 5.5rem)',
          }}
        >
          {/* CASE 01 — AEROSPACE (Visual Left / Data Right) */}
          <div
            className="case-study-item case-01-layout hairline-all"
            onMouseEnter={() => handleItemHover(0)}
            style={{
              backgroundColor: 'var(--surface)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              willChange: 'transform',
            }}
          >
            {/* Oversized Ghost Watermark */}
            <div
              className="cs-ghost-id"
              style={{
                position: 'absolute',
                top: '-0.5rem',
                left: '2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.03)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              AERO-01
            </div>

            {/* Visual Narrative Column */}
            <div
              className="cs-visual-col gsap-reveal-image-wrap"
              style={{
                backgroundColor: 'var(--bg-dark)',
                minHeight: '420px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                color: '#FFFFFF',
                borderRight: '1px solid var(--border-dark)',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              <div
                className="cs-curtain-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--bg)',
                  zIndex: 4,
                  willChange: 'transform',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <span className="badge-code dark">CS-01 // AIR-MISSION</span>
                <span className="tag-meta" style={{ color: 'var(--accent)' }}>TLS ⇄ BFI CORRIDOR</span>
              </div>

              {/* Custom Aerospace Technical Blueprint SVG */}
              <div style={{ margin: 'auto 0', width: '100%', position: 'relative', zIndex: 2 }}>
                <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  <defs>
                    <pattern id="aeroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1B1F2A" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#aeroGrid)" opacity="0.8" />
                  {/* Aircraft Silhouette Wireframe */}
                  <path d="M 270 20 L 285 70 L 460 135 L 460 148 L 300 135 L 305 185 L 350 205 L 345 215 L 270 205 L 195 215 L 190 205 L 235 185 L 240 135 L 80 148 L 80 135 L 255 70 Z" stroke="#E63E26" strokeWidth="1.5" fill="none" opacity="0.85" />
                  {/* Wing Spar Rib Lines */}
                  <line x1="160" y1="110" x2="380" y2="110" stroke="#3A4252" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="120" y1="125" x2="420" y2="125" stroke="#3A4252" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Flight Trajectory Path */}
                  <path d="M 40 180 Q 240 60 500 90" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 6" />
                  {/* Altitude / Vibration Telemetry */}
                  <text x="30" y="35" fill="#E63E26" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600">CRUISE ALT // FL380</text>
                  <text x="30" y="50" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">VELOCITY // MACH 0.84</text>
                  <text x="370" y="35" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">VIB-TOL // &lt;0.02G MAX</text>
                  <text x="370" y="50" fill="#22C55E" fontFamily="JetBrains Mono" fontSize="8">CRADLE // ACTIVE DAMPING</text>
                </svg>
              </div>

              {/* Bottom Metric Callout */}
              <div
                style={{
                  borderTop: '1px solid var(--border-dark)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <span className="font-display cs-stat-val" style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                  100%
                </span>
                <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--muted-dark)', textTransform: 'uppercase' }}>
                  Zero Sensor Deviation • Vibration Stabilized
                </span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div
              className="cs-content-col"
              style={{
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                CASE 01 // ADVANCED AEROSPACE
              </div>

              <h3
                className="font-display cs-title"
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                  color: 'var(--charcoal)',
                  transition: 'color 0.25s',
                }}
              >
                Composite Wing Spars & Avionics Modules
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Orchestrated chartered Antonov transport with specialized vibration-damping cradle mounts for mission-critical aircraft assembly components across the Toulouse to Seattle route.
              </p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <div className="tag-meta" style={{ marginBottom: '0.4rem' }}>LOGISTICS SPECIFICATION</div>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--charcoal)' }}>
                  Temperature Stabilized • Shock Monitored • 18-Hour Air Transit
                </div>
              </div>
            </div>
          </div>

          {/* CASE 02 — OFFSHORE WIND (Expansive Visual with Overlapping Typography) */}
          <div
            className="case-study-item case-02-layout hairline-all"
            onMouseEnter={() => handleItemHover(1)}
            style={{
              backgroundColor: 'var(--surface)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              willChange: 'transform',
            }}
          >
            {/* Oversized Ghost Watermark */}
            <div
              className="cs-ghost-id"
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(5rem, 9vw, 8.5rem)',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.03)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              WIND-02
            </div>

            {/* Top Expansive Blueprint Canvas */}
            <div
              className="cs-visual-col gsap-reveal-image-wrap"
              style={{
                backgroundColor: 'var(--bg-dark)',
                minHeight: '340px',
                position: 'relative',
                padding: '2.5rem',
                color: '#FFFFFF',
                borderBottom: '1px solid var(--border-dark)',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              <div
                className="cs-curtain-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--bg)',
                  zIndex: 4,
                  willChange: 'transform',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, marginBottom: '1rem' }}>
                <span className="badge-code dark">CS-02 // MARITIME PROJECT CARGO</span>
                <span className="tag-meta" style={{ color: 'var(--accent)' }}>ESBJERG ⇄ TAICHUNG [SUEZ FLOTILLA]</span>
              </div>

              {/* Custom Offshore Wind Turbine & Vessel Deck Blueprint SVG */}
              <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                <svg viewBox="0 0 900 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  <defs>
                    <pattern id="windGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1F2B" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#windGrid)" opacity="0.75" />
                  {/* Heavy-Lift Vessel Hull Outline */}
                  <path d="M 80 150 L 140 150 L 760 150 L 820 130 L 80 130 Z" stroke="#3A4252" strokeWidth="1.5" fill="#141822" />
                  {/* 85-Meter Turbine Blade Profiles Stacked in Sea-Fastening Cradle */}
                  <path d="M 160 120 C 300 115 540 100 740 95" stroke="#E63E26" strokeWidth="3" fill="none" />
                  <path d="M 160 105 C 300 100 540 85 740 80" stroke="#E63E26" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />
                  <path d="M 160 90 C 300 85 540 70 740 65" stroke="#E63E26" strokeWidth="2" fill="none" strokeDasharray="3 3" opacity="0.6" />
                  {/* Sea-Fastening Lash Vectors */}
                  <line x1="280" y1="130" x2="280" y2="70" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
                  <line x1="480" y1="130" x2="480" y2="70" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
                  <line x1="680" y1="130" x2="680" y2="70" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
                  {/* Bathymetry & Suez draft indicator */}
                  <line x1="40" y1="165" x2="860" y2="165" stroke="#253046" strokeWidth="1" />
                  <text x="40" y="30" fill="#E63E26" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600">TURBINE ROTOR // 85M BLADE CLASS</text>
                  <text x="40" y="45" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">SEA-FASTENING TENSION // 1,420 KN</text>
                  <text x="680" y="30" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">DRAFT // 16.2M (SUEZ CLEARED)</text>
                  <text x="680" y="45" fill="#22C55E" fontFamily="JetBrains Mono" fontSize="8">SCHEDULE // +14 DAYS ADVANCE</text>
                </svg>
              </div>
            </div>

            {/* Bottom Overlapping Editorial & Metrics Grid */}
            <div
              className="cs-content-col"
              style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
                gap: '2.5rem',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                  CASE 02 // OFFSHORE RENEWABLE ENERGY
                </div>
                <h3
                  className="font-display cs-title"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    color: 'var(--charcoal)',
                    transition: 'color 0.25s',
                  }}
                >
                  85-Meter Offshore Wind Turbine Blades
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                  Engineered specialized sea-fastening calculations and multi-port clearance coordination across the Suez Canal route under tight tidal windows for a 6-vessel heavy-lift flotilla.
                </p>
              </div>

              <div
                style={{
                  borderLeft: '1px solid var(--border)',
                  paddingLeft: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div>
                  <div className="font-display cs-stat-val" style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    14 Days
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    Ahead of Construction Schedule
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <span className="tag-meta" style={{ fontSize: '0.68rem' }}>TRANSIT SPECIFICATION</span>
                  <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--charcoal)', marginTop: '0.2rem' }}>
                    Heavy-Lift Project Cargo • 6-Vessel Flotilla
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CASE 03 — SEMICONDUCTOR (Data Left / Visual Right) */}
          <div
            className="case-study-item case-03-layout hairline-all"
            onMouseEnter={() => handleItemHover(2)}
            style={{
              backgroundColor: 'var(--surface)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              willChange: 'transform',
            }}
          >
            {/* Oversized Ghost Watermark */}
            <div
              className="cs-ghost-id"
              style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.03)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              SEMI-03
            </div>

            {/* Editorial Content Column (Left) */}
            <div
              className="cs-content-col"
              style={{
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                CASE 03 // SEMICONDUCTOR FOUNDRY
              </div>

              <h3
                className="font-display cs-title"
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                  color: 'var(--charcoal)',
                  transition: 'color 0.25s',
                }}
              >
                Lithography Optics & Cryogenic Materials
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Established a dedicated customs fast-track corridor reducing dwell time at Frankfurt airport from 42 hours down to 110 minutes for extreme precision EUV manufacturing nodes.
              </p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <div className="tag-meta" style={{ marginBottom: '0.4rem' }}>CLEANROOM INTEGRITY</div>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--charcoal)' }}>
                  Cleanroom Class 100 Packing • Active Nitrogen Purge
                </div>
              </div>
            </div>

            {/* Visual Narrative Column (Right) */}
            <div
              className="cs-visual-col gsap-reveal-image-wrap"
              style={{
                backgroundColor: 'var(--bg-dark)',
                minHeight: '420px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                color: '#FFFFFF',
                borderLeft: '1px solid var(--border-dark)',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              <div
                className="cs-curtain-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--bg)',
                  zIndex: 4,
                  willChange: 'transform',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <span className="badge-code dark">CS-03 // CRYOGENIC CORRIDOR</span>
                <span className="tag-meta" style={{ color: 'var(--accent)' }}>HSZ ⇄ DRS FAST-TRACK</span>
              </div>

              {/* Custom Semiconductor Silicon Wafer & Nitrogen Circuit Blueprint SVG */}
              <div style={{ margin: 'auto 0', width: '100%', position: 'relative', zIndex: 2 }}>
                <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  <defs>
                    <pattern id="semiGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#161B26" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#semiGrid)" opacity="0.8" />
                  {/* Silicon 300mm Wafer Outline */}
                  <circle cx="270" cy="110" r="90" stroke="#3A4252" strokeWidth="1.5" fill="#0C0E14" />
                  <circle cx="270" cy="110" r="82" stroke="#E63E26" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
                  {/* IC Die Matrix Grid inside Wafer */}
                  <line x1="210" y1="60" x2="210" y2="160" stroke="#252D3C" strokeWidth="1" />
                  <line x1="240" y1="40" x2="240" y2="180" stroke="#252D3C" strokeWidth="1" />
                  <line x1="270" y1="20" x2="270" y2="200" stroke="#E63E26" strokeWidth="1" opacity="0.6" />
                  <line x1="300" y1="40" x2="300" y2="180" stroke="#252D3C" strokeWidth="1" />
                  <line x1="330" y1="60" x2="330" y2="160" stroke="#252D3C" strokeWidth="1" />
                  <line x1="190" y1="80" x2="350" y2="80" stroke="#252D3C" strokeWidth="1" />
                  <line x1="180" y1="110" x2="360" y2="110" stroke="#E63E26" strokeWidth="1" opacity="0.6" />
                  <line x1="190" y1="140" x2="350" y2="140" stroke="#252D3C" strokeWidth="1" />
                  {/* Cryogenic Purge Conduits */}
                  <circle cx="270" cy="110" r="14" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="30" y="35" fill="#E63E26" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600">CRYO // -196°C PURGE</text>
                  <text x="30" y="50" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">ATMOSPHERE // N2 99.999%</text>
                  <text x="360" y="35" fill="#8E95A5" fontFamily="JetBrains Mono" fontSize="8">PARTICLES // 0.00 / M³</text>
                  <text x="360" y="50" fill="#22C55E" fontFamily="JetBrains Mono" fontSize="8">DWELL TIME // 110 MINS</text>
                </svg>
              </div>

              {/* Bottom Metric Callout */}
              <div
                style={{
                  borderTop: '1px solid var(--border-dark)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <span className="font-display cs-stat-val" style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                  96.2%
                </span>
                <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--muted-dark)', textTransform: 'uppercase' }}>
                  Dwell Time Reduction • 42h down to 110m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .case-01-layout, .case-03-layout {
            grid-template-columns: 1fr !important;
          }
          .case-02-layout .cs-content-col {
            grid-template-columns: 1fr !important;
          }
          .case-03-layout .cs-content-col {
            order: 2 !important;
          }
          .case-03-layout .cs-visual-col {
            order: 1 !important;
            border-left: none !important;
            border-bottom: 1px solid var(--border-dark);
          }
        }
      `}</style>
    </section>
  )
}
