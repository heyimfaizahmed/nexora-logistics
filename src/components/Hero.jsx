import { useRef, useEffect } from 'react'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function Hero({ isLoaded = true }) {
  const heroRef = useRef(null)
  const routeArcRef = useRef(null)

  useGsapContext(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initial setup states before animation
    if (!isLoaded) {
      gsap.set('.hero-meta-row', { opacity: 0, y: -15 })
      gsap.set('.hero-tag-meta', { opacity: 0, x: -20 })
      gsap.set('.hero-title .gsap-line-inner', { y: '110%', opacity: 0, filter: 'blur(8px)' })
      gsap.set('.hero-services-tag', { opacity: 0, y: 15 })
      gsap.set('.hero-desc', { opacity: 0, y: 20 })
      gsap.set('.hero-cta-btns', { opacity: 0, y: 20 })
      gsap.set('.hero-visual-container', { opacity: 0, scale: 0.98 })
      gsap.set('.hero-hud-data', { opacity: 0, y: 30 })
      gsap.set('.hero-corner-coords', { opacity: 0 })
      return
    }

    if (prefersReducedMotion) {
      gsap.set(
        [
          '.hero-meta-row',
          '.hero-tag-meta',
          '.hero-title .gsap-line-inner',
          '.hero-services-tag',
          '.hero-desc',
          '.hero-cta-btns',
          '.hero-visual-container',
          '.hero-hud-data',
          '.hero-corner-coords',
        ],
        { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' }
      )
      return
    }

    // -------------------------------------------------------------
    // 1. CINEMATIC HERO ENTRANCE TIMELINE
    // -------------------------------------------------------------
    const masterEntrance = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.12,
    })

    // Set starting states explicitly so there is zero flash
    masterEntrance
      .set('.hero-meta-row', { opacity: 0, y: -15 })
      .set('.hero-tag-meta', { opacity: 0, x: -20 })
      .set('.hero-title .gsap-line-inner', { y: '125%', opacity: 0, filter: 'blur(8px)' })
      .set('.hero-services-tag', { opacity: 0, y: 18, filter: 'blur(4px)' })
      .set('.hero-desc', { opacity: 0, y: 22, filter: 'blur(4px)' })
      .set('.hero-cta-btns', { opacity: 0, y: 20 })
      .set('.hero-visual-container', { opacity: 0, scale: 0.98 })
      .set('.hero-hud-data', { opacity: 0, y: 25 })
      .set('.hero-corner-coords', { opacity: 0 })

    // Sub-Step A: Top operational metadata reveals
    masterEntrance.to(
      '.hero-meta-row',
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )

    // Sub-Step B: Hero supporting label reveals
    masterEntrance.to(
      '.hero-tag-meta',
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.35'
    )

    // Sub-Step C: Monumental Headline line-by-line reveal
    masterEntrance.to(
      '.hero-title .gsap-line-inner',
      {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.15,
        stagger: 0.16,
        ease: 'power4.out',
      },
      '-=0.25'
    )

    // Sub-Step D: Supporting narrative copy & services string
    masterEntrance.to(
      '.hero-services-tag',
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    )
    masterEntrance.to(
      '.hero-desc',
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
      '-=0.45'
    )

    // Sub-Step E: CTA buttons reveal
    masterEntrance.to(
      '.hero-cta-btns',
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )

    // Sub-Step F: Hero visual container curtain reveal
    masterEntrance.to(
      '.hero-visual-container',
      { opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
      '-=0.65'
    )
    masterEntrance.to(
      '.gsap-reveal-image-overlay',
      { scaleY: 0, duration: 0.8, ease: 'expo.inOut' },
      '-=0.8'
    )

    // Sub-Step G: HUD overlay card & corner metadata
    masterEntrance.to(
      '.hero-hud-data',
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    masterEntrance.to(
      '.hero-corner-coords',
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.45'
    )

    // -------------------------------------------------------------
    // 2. RADAR & TRADE VECTOR DRAWING ANIMATIONS
    // -------------------------------------------------------------
    // Animate primary trade arc path drawing
    if (routeArcRef.current) {
      const pathLength = routeArcRef.current.getTotalLength
        ? routeArcRef.current.getTotalLength()
        : 1200
      gsap.fromTo(
        routeArcRef.current,
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: 2.0,
          ease: 'power2.inOut',
          delay: 0.25,
        }
      )
    }

    // Secondary dashed routes sweep
    gsap.fromTo(
      '.dashed-route-arc',
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 35,
        repeat: -1,
        ease: 'none',
      }
    )

    // Concentric Radar Ring Pulses
    gsap.to('.radar-ring-pulse', {
      scale: 1.06,
      opacity: 0.75,
      transformOrigin: 'center center',
      repeat: -1,
      yoyo: true,
      duration: 3.2,
      stagger: 0.4,
      ease: 'sine.inOut',
    })

    // Continuous Bearing Rotation (Compass Ring)
    gsap.to('.radar-compass-ring', {
      rotation: 360,
      transformOrigin: 'center center',
      duration: 50,
      repeat: -1,
      ease: 'none',
    })

    // Hub Nodes Pulse
    gsap.to('.hub-point circle:nth-child(2)', {
      scale: 1.5,
      opacity: 0,
      transformOrigin: 'center center',
      repeat: -1,
      duration: 2.4,
      stagger: 0.6,
      ease: 'power1.out',
    })

    // Vessel Blueprint Drift
    gsap.to('.vessel-indicator', {
      x: 14,
      y: -4,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // -------------------------------------------------------------
    // 3. HERO SCROLL INTERACTION (ScrollTrigger Scrub)
    // -------------------------------------------------------------
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })

    scrollTl
      .to('.hero-title', { y: -80, opacity: 0.2, ease: 'none' }, 0)
      .to('.hero-narrative-block', { y: -45, opacity: 0.35, ease: 'none' }, 0)
      .to('.hero-visual-container', { y: -65, scale: 0.96, ease: 'none' }, 0)
      .to('.hero-grid-bg', { y: 90, ease: 'none' }, 0)
      .to('.hero-hud-data', { y: -30, opacity: 0.5, ease: 'none' }, 0)

  }, heroRef, [isLoaded])

  // -------------------------------------------------------------
  // 4. MOUSE PARALLAX (quickTo — Hardware Accelerated)
  // -------------------------------------------------------------
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion || !heroRef.current) return

    const el = heroRef.current

    // Set up quickTo interpolation targets for 60fps responsiveness
    const xGrid = gsap.quickTo(el.querySelector('.hero-grid-bg'), 'x', { duration: 0.9, ease: 'power2.out' })
    const yGrid = gsap.quickTo(el.querySelector('.hero-grid-bg'), 'y', { duration: 0.9, ease: 'power2.out' })
    const xVisual = gsap.quickTo(el.querySelector('.hero-visual-container'), 'x', { duration: 0.7, ease: 'power2.out' })
    const yVisual = gsap.quickTo(el.querySelector('.hero-visual-container'), 'y', { duration: 0.7, ease: 'power2.out' })
    const xHud = gsap.quickTo(el.querySelector('.hero-hud-data'), 'x', { duration: 0.5, ease: 'power2.out' })
    const yHud = gsap.quickTo(el.querySelector('.hero-hud-data'), 'y', { duration: 0.5, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5

      // Subtly shift elements proportionally
      xGrid(relX * -14)
      yGrid(relY * -14)
      xVisual(relX * 18)
      yVisual(relY * 16)
      xHud(relX * 30)
      yHud(relY * 26)
    }

    const handleMouseLeave = () => {
      xGrid(0)
      yGrid(0)
      xVisual(0)
      yVisual(0)
      xHud(0)
      yHud(0)
    }

    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        paddingTop: 'clamp(8rem, 14vw, 12rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="hero-grid-bg"
        style={{
          position: 'absolute',
          inset: '-20px',
          backgroundImage: `
            linear-gradient(to right, rgba(219, 215, 203, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(219, 215, 203, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.75,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Operational Telemetry Meta Row */}
        <div
          className="hero-meta-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span className="badge-code">
              <span className="indicator-dot" />
              GLOBAL TRADE NETWORK // VER. 4.2
            </span>
            <span className="tag-meta hide-mobile">LAT 51°55'N / LON 04°29'E</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="tag-meta">
              DISPATCH STATUS: <strong style={{ color: 'var(--charcoal)' }}>OPTIMAL TRANSIT</strong>
            </span>
            <span className="tag-meta hide-mobile">
              OCEAN • AIR • INTERMODAL
            </span>
          </div>
        </div>

        {/* Main Hero Headline & Asymmetric Layout */}
        <div
          className="hero-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: 'clamp(2.5rem, 5vw, 5.5rem)',
            alignItems: 'end',
            marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
          }}
        >
          {/* Left: Monumental Editorial Headline */}
          <div className="hero-heading-block">
            <div className="tag-meta hero-tag-meta" style={{ marginBottom: '1.25rem', color: 'var(--accent)', fontWeight: 600 }}>
              TRANS-CONTINENTAL LOGISTICS ARCHITECTURE
            </div>
            
            <h1
              className="heading-hero hero-title"
              style={{
                margin: 0,
                color: 'var(--charcoal)',
              }}
            >
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">WE MOVE</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">BUSINESS</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  ACROSS BORDERS.
                </span>
              </span>
            </h1>
          </div>

          {/* Right: Supporting Statement & Action */}
          <div
            className="hero-narrative-block"
            style={{
              paddingLeft: 'clamp(0rem, 2vw, 2rem)',
              borderLeft: '1px solid var(--border)',
            }}
          >
            {/* Core Services String */}
            <div
              className="font-mono hero-services-tag"
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                fontWeight: 600,
                color: 'var(--charcoal)',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span>Import.</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>Export.</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>Customs.</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>Logistics.</span>
            </div>

            <p
              className="hero-desc"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              Nexora engineers sovereign trade corridors and multimodal freight pipelines for global enterprise. 
              We synchronize customs intelligence, port allocations, and intercontinental shipping with zero friction.
            </p>

            <div className="hero-cta-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#cta" className="btn-primary">
                <span>Initiate Global Dispatch</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#services" className="btn-outline">
                <span>View Capabilities</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Visual Centerpiece — Architectural Trade Matrix & Global Vessel Visual Canvas */}
        <div
          className="hero-visual-container gsap-reveal-image-wrap"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(380px, 50vw, 600px)',
            backgroundColor: 'var(--bg-dark)',
            overflow: 'hidden',
            willChange: 'transform',
            borderTop: '1px solid var(--border-dark)',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          {/* Architectural Crosshair Corner Markers */}
          <div className="hero-crosshair top-left" style={{ position: 'absolute', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>+</span>
            <span className="hide-mobile" style={{ color: 'var(--muted-dark)', letterSpacing: '0.12em' }}>GRID // 51.95°N 04.14°E</span>
          </div>
          <div className="hero-crosshair top-right" style={{ position: 'absolute', top: 0, right: 0, zIndex: 5, pointerEvents: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="hide-mobile" style={{ color: 'var(--muted-dark)', letterSpacing: '0.12em' }}>RADAR // 360° SWEEP</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>+</span>
          </div>
          <div className="hero-crosshair bottom-left" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 5, pointerEvents: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>+</span>
            <span className="hide-mobile" style={{ color: 'var(--muted-dark)', letterSpacing: '0.12em' }}>SYS.REF // NX-9942</span>
          </div>
          <div className="hero-crosshair bottom-right" style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 5, pointerEvents: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="hide-mobile" style={{ color: 'var(--muted-dark)', letterSpacing: '0.12em' }}>STATUS // ACTIVE CONTINUUM</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>+</span>
          </div>

          {/* GSAP Reveal Curtain Layer */}
          <div className="gsap-reveal-image-overlay dark" />

          {/* SVG Vector Trade Map & Vessel Trajectory */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.96,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#121419" />
                  <stop offset="50%" stopColor="#0E0F12" />
                  <stop offset="100%" stopColor="#08090C" />
                </linearGradient>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E63E26" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FF7A66" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E63E26" stopOpacity="0.4" />
                </linearGradient>
                <pattern id="gridLines" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1D25" strokeWidth="0.8" />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#oceanGrad)" />
              <rect width="100%" height="100%" fill="url(#gridLines)" opacity="0.75" />

              {/* Architectural Canvas Coordinate Lines */}
              <line x1="0" y1="300" x2="1200" y2="300" stroke="#1F232D" strokeWidth="1" strokeDasharray="3 9" />
              <line x1="600" y1="0" x2="600" y2="600" stroke="#1F232D" strokeWidth="1" strokeDasharray="3 9" />

              {/* Concentric Radar Rings */}
              <circle cx="600" cy="300" r="260" stroke="#1E2330" strokeWidth="1" strokeDasharray="4 6" />
              <circle className="radar-ring-pulse" cx="600" cy="300" r="180" stroke="#283042" strokeWidth="1" />
              <circle className="radar-ring-pulse" cx="600" cy="300" r="90" stroke="#323C52" strokeWidth="1" strokeDasharray="2 4" />

              {/* Bearing Rotation Ring */}
              <g className="radar-compass-ring">
                <circle cx="600" cy="300" r="220" stroke="#202533" strokeWidth="1" strokeDasharray="2 12" />
                <line x1="600" y1="75" x2="600" y2="85" stroke="#E63E26" strokeWidth="2" />
                <line x1="600" y1="515" x2="600" y2="525" stroke="#838792" strokeWidth="1" />
              </g>

              {/* Continental Trade Arcs */}
              <path
                ref={routeArcRef}
                d="M 120 380 Q 380 140 600 240 T 1080 200"
                stroke="url(#routeGrad)"
                strokeWidth="3"
                fill="none"
                className="trade-route-arc"
              />
              <path
                d="M 180 440 Q 520 280 840 360 T 1120 320"
                stroke="#3D475C"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                fill="none"
                className="dashed-route-arc"
              />
              <path
                d="M 260 220 Q 580 460 920 180"
                stroke="#E63E26"
                strokeWidth="1"
                strokeOpacity="0.45"
                fill="none"
              />

              {/* Major Maritime Hub Points */}
              <g className="hub-point" transform="translate(240, 310)">
                <circle r="5" fill="#E63E26" />
                <circle r="14" stroke="#E63E26" strokeWidth="1" opacity="0.4" />
                <text x="18" y="4" fill="#EAECEF" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="1">
                  LAX // PACIFIC GATEWAY
                </text>
              </g>

              <g className="hub-point" transform="translate(600, 240)">
                <circle r="6" fill="#FFFFFF" />
                <circle r="18" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
                <text x="18" y="4" fill="#FFFFFF" fontFamily="JetBrains Mono" fontSize="12" fontWeight="600">
                  RTM // ROTTERDAM TERMINAL [HUB]
                </text>
              </g>

              <g className="hub-point" transform="translate(940, 220)">
                <circle r="5" fill="#E63E26" />
                <circle r="14" stroke="#E63E26" strokeWidth="1" opacity="0.4" />
                <text x="18" y="4" fill="#EAECEF" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="1">
                  SIN // STRAIT CORRIDOR
                </text>
              </g>

              {/* Vessel Blueprint Geometry */}
              <g className="vessel-indicator" transform="translate(560, 360)">
                <polygon points="0,0 80,-20 120,0 80,20" fill="none" stroke="#E63E26" strokeWidth="1.5" />
                <line x1="20" y1="-5" x2="100" y2="-5" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                <line x1="20" y1="5" x2="100" y2="5" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                <text x="135" y="4" fill="#A1A7B5" fontFamily="JetBrains Mono" fontSize="10">
                  VESSEL // NEXORA MERIDIAN (24,000 TEU)
                </text>
              </g>
            </svg>
          </div>

          {/* Integrated Telemetry Legend (Architectural HUD, no heavy border card) */}
          <div
            className="hero-hud-data"
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 2.5vw, 2rem)',
              left: 'clamp(1rem, 2.5vw, 2rem)',
              backgroundColor: 'rgba(10, 11, 14, 0.85)',
              borderLeft: '2px solid var(--accent)',
              padding: '0.85rem 1.35rem',
              maxWidth: '380px',
              color: '#FFFFFF',
              zIndex: 3,
              willChange: 'transform',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 600 }}>
                ● LIVE CONVOY TELEMETRY
              </span>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--muted-dark)' }}>24.2 KNOTS</span>
            </div>
            <div className="font-display" style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Trans-Pacific Ultra-Class Corridor
            </div>
            <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--muted-dark)', lineHeight: 1.45 }}>
              4,120 TEU High-Value Industrial Freight in Automated Customs Hold Bypass. Zero Dwell Time Recorded.
            </div>
          </div>

          {/* Top-Right Technical Coordinates */}
          <div
            className="hide-mobile hero-corner-coords"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.5rem',
              textAlign: 'right',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted-dark)',
              zIndex: 3,
              lineHeight: 1.5,
            }}
          >
            <div>NAV-GRID // GBR-88301</div>
            <div>STATUS: SEA-LANE SECURED</div>
            <div style={{ color: 'var(--accent)' }}>ZERO INSPECTION HOLD</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-narrative-block {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border);
            padding-top: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
