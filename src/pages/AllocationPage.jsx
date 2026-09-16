import { useRef } from 'react'
import Cta from '../components/Cta'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function AllocationPage() {
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
          <span className="badge-code">[ DISPATCH PORTAL // 06 ]</span>
          <span className="tag-meta">GUARANTEED OCEAN ALLOCATIONS & AIR CHARTER SLOTS</span>
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
            <span className="gsap-line-inner">ALLOCATION INTAKE</span>
          </span>
          <span className="gsap-line-wrap">
            <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
              LEDGER.
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
          Submit enterprise shipment parameters. Our sovereign trade desk synthesizes certified tariff quotes, berthing itineraries, and bonded customs pathways within 120 minutes.
        </p>
      </div>

      {/* Core Allocation Intake Component */}
      <Cta />
    </div>
  )
}
