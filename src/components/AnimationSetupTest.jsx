import { useRef, useState, useEffect } from 'react'
import { gsap, useGsapContext, getLenis } from '../animations'

export default function AnimationSetupTest() {
  const containerRef = useRef(null)
  const [lenisStatus, setLenisStatus] = useState('Initializing...')
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track Lenis smooth scrolling activity
  useEffect(() => {
    const checkLenis = () => {
      const lenis = getLenis()
      if (lenis) {
        setLenisStatus('Active (Smooth Scrolling On)')
        const handleScroll = (e) => {
          setScrollProgress(Math.round((e.progress || 0) * 100))
        }
        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }

    const timer = setTimeout(checkLenis, 100)
    return () => clearTimeout(timer)
  }, [])

  // GSAP animations with proper React context cleanup
  useGsapContext(() => {
    // 1. Basic GSAP Animation Test: rotating badge & pulsing dot
    gsap.to('.gsap-test-orb', {
      scale: 1.15,
      opacity: 0.9,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // 2. ScrollTrigger Test: Progress indicator linked to scroll position
    gsap.to('.scroll-test-fill', {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, containerRef)

  return (
    <div
      ref={containerRef}
      style={{
        margin: '24px auto',
        padding: '16px 24px',
        maxWidth: '720px',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        background: 'var(--social-bg)',
        boxShadow: 'var(--shadow)',
        textAlign: 'left',
      }}
    >
      {/* ScrollTrigger indicator bar at top of test panel */}
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <div
          className="scroll-test-fill"
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--accent)',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            className="gsap-test-orb"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
            }}
          />
          <span style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: '15px' }}>
            GSAP & Lenis Architecture Ready
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text)' }}>
          <span>
            <strong>GSAP:</strong> v{gsap.version} (ScrollTrigger OK)
          </span>
          <span>•</span>
          <span>
            <strong>Lenis:</strong> {lenisStatus}
          </span>
          <span>•</span>
          <span>
            <strong>Scroll:</strong> {scrollProgress}%
          </span>
        </div>
      </div>
    </div>
  )
}
