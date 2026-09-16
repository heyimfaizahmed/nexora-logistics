import { useRef, useState } from 'react'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'
import { getLenis } from '../animations/smoothScroll'

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const counterRef = useRef(null)
  const [statusText, setStatusText] = useState('INITIALIZING TRANS-OCEANIC TELEMETRY...')
  const [isDone, setIsDone] = useState(false)

  useGsapContext(() => {
    // 0. Freeze scrolling
    const lenis = getLenis()
    if (lenis) lenis.stop()
    document.body.style.overflow = 'hidden'

    const progressObj = { value: 0 }

    // Master Loader Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true)
        if (lenis) lenis.start()
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      },
    })

    // Step 1: Initial entrance of brand elements
    tl.set('.loader-brand', { opacity: 0, y: 15, scale: 0.98 })
      .set('.loader-line', { scaleX: 0, transformOrigin: 'left center' })
      .set('.loader-meta', { opacity: 0 })
      .set('.loader-crosshair', { opacity: 0 })
      .to('.loader-crosshair', {
        opacity: 0.4,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      })
      .to(
        '.loader-brand',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .to(
        '.loader-meta',
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      )

    // Step 2 & 3: Smooth Progress counter & drawing architectural line
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 0.95,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.round(progressObj.value)
          if (counterRef.current) {
            counterRef.current.textContent = current < 10 ? `0${current}` : `${current}`
          }

          // Telemetry step progression
          if (current > 20 && current < 50) {
            setStatusText('CALIBRATING 142 DEEP-WATER TERMINAL BEACONS...')
          } else if (current >= 50 && current < 80) {
            setStatusText('SECURING SOVEREIGN TARIFF & HARMONIZED DATA...')
          } else if (current >= 80) {
            setStatusText('GLOBAL DISPATCH ENGINE ONLINE // ACTIVE')
          }
        },
      },
      '-=0.15'
    )
      .to(
        '.loader-line',
        {
          scaleX: 1,
          duration: 0.95,
          ease: 'power2.inOut',
        },
        '<'
      )

    // Step 4: Outward exit sequence
    tl.to('.loader-center-content', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    })
      .to(
        '.loader-crosshair',
        {
          opacity: 0,
          duration: 0.2,
        },
        '<'
      )
      // Curtain wipe split
      .to(
        '.loader-panel-top',
        {
          yPercent: -100,
          duration: 0.65,
          ease: 'expo.inOut',
        },
        '-=0.05'
      )
      .to(
        '.loader-panel-bottom',
        {
          yPercent: 100,
          duration: 0.65,
          ease: 'expo.inOut',
        },
        '<'
      )
      // Curtain wipe split finishes completely before onComplete fires in timeline onComplete
      .set({}, {}, '+=0.05')

    // Safety fallback: Ensure loader is removed after 2.6 seconds under all circumstances
    const fallbackTimer = setTimeout(() => {
      if (!isDone) {
        setIsDone(true)
        if (lenis) lenis.start()
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      }
    }, 2600)

    return () => clearTimeout(fallbackTimer)
  }, containerRef)

  if (isDone) return null

  return (
    <div
      ref={containerRef}
      id="nexora-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Top Split Panel */}
      <div
        className="loader-panel-top"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          backgroundColor: '#0E0F12',
          borderBottom: '1px solid #22252C',
          zIndex: 1,
        }}
      />

      {/* Bottom Split Panel */}
      <div
        className="loader-panel-bottom"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          backgroundColor: '#0E0F12',
          borderTop: '1px solid #22252C',
          zIndex: 1,
        }}
      />

      {/* Crosshairs in 4 corners */}
      <div
        className="loader-crosshair"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2.5rem',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#838792',
          letterSpacing: '0.12em',
        }}
      >
        [ SYS // CORRIDOR BOOT ]
      </div>

      <div
        className="loader-crosshair"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#838792',
          letterSpacing: '0.12em',
        }}
      >
        LAT 51.9244° N / LON 4.4777° E
      </div>

      <div
        className="loader-crosshair"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2.5rem',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#838792',
          letterSpacing: '0.12em',
        }}
      >
        NEXORA TRADE & LOGISTICS
      </div>

      <div
        className="loader-crosshair"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#E63E26',
          letterSpacing: '0.12em',
        }}
      >
        PROTOCOL // SECURE
      </div>

      {/* Center Content Container */}
      <div
        className="loader-center-content"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: '#FFFFFF',
        }}
      >
        {/* Brandmark block */}
        <div className="loader-brand" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.65rem',
              backgroundColor: '#16181D',
              border: '1px solid #24272E',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#8E919A',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#E63E26',
                boxShadow: '0 0 8px #E63E26',
              }}
            />
            INITIALIZING GLOBAL TELEMETRY
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.6rem' }}>
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              NEXORA
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                backgroundColor: '#E63E26',
                color: '#FFFFFF',
                padding: '0.15rem 0.45rem',
                borderRadius: '2px',
                letterSpacing: '0.08em',
              }}
            >
              LOGISTICS
            </span>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: '#838792',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
            }}
          >
            International Sovereign Movement
          </div>
        </div>

        {/* Architectural Progress Indicator */}
        <div style={{ width: 'min(380px, 85vw)', position: 'relative' }}>
          {/* Top Progress Numeric & Status */}
          <div
            className="loader-meta"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ color: '#8E919A', letterSpacing: '0.08em' }}>SYS_LOAD</span>
            <span
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              <span ref={counterRef}>00</span>
              <span style={{ fontSize: '0.85rem', color: '#E63E26', marginLeft: '0.15rem' }}>%</span>
            </span>
          </div>

          {/* Architectural Line Track & Fill */}
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: '#22252C',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="loader-line"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100%',
                backgroundColor: '#E63E26',
                boxShadow: '0 0 10px rgba(230, 62, 38, 0.7)',
              }}
            />
          </div>

          {/* Real-time Status Readout */}
          <div
            className="loader-meta"
            style={{
              marginTop: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.685rem',
              color: '#838792',
              letterSpacing: '0.06em',
              textAlign: 'center',
              minHeight: '1.2rem',
            }}
          >
            {statusText}
          </div>
        </div>
      </div>
    </div>
  )
}
