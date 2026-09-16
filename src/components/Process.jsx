import { useRef, useState } from 'react'
import { processStages } from '../data/tradeData'
import { useGsapContext } from '../animations/useGsapContext'
import { animateProcess, animateRoute } from '../animations/sectionAnimations'
import { ScrollTrigger } from '../animations/gsapConfig'

export default function Process() {
  const processRef = useRef(null)
  const routePathRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useGsapContext(() => {
    animateProcess(processRef.current)
    animateRoute(routePathRef.current, processRef.current)

    // ScrollTrigger to activate each stage sequentially as user scrolls through
    const cards = processRef.current.querySelectorAll('.process-card')
    cards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 75%',
        end: 'bottom 40%',
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      })
    })
  }, processRef)

  return (
    <section
      ref={processRef}
      id="process"
      className="process-section section-pad hairline-b"
      style={{
        backgroundColor: 'var(--bg-alt)',
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
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div>
            <div className="badge-code" style={{ marginBottom: '1rem' }}>
              [ 03 // TRADE ROUTE CONTINUUM ]
            </div>
            <h2 className="heading-display-1 process-title" style={{ margin: 0, textTransform: 'uppercase' }}>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner">THE SOVEREIGN</span>
              </span>
              <span className="gsap-line-wrap">
                <span className="gsap-line-inner" style={{ color: 'var(--accent)' }}>
                  TRANSIT PROTOCOL.
                </span>
              </span>
            </h2>
          </div>

          <div style={{ maxWidth: '420px' }}>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              A systematic four-tier continuum transforming complex border friction into deterministic, 
              scheduled velocity.
            </p>
          </div>
        </div>

        {/* Trade Route Visual Progress Vector Line */}
        <div
          className="route-vector-track hide-mobile"
          style={{
            position: 'relative',
            width: '100%',
            height: '48px',
            marginBottom: '1.25rem',
          }}
        >
          <svg
            width="100%"
            height="48"
            viewBox="0 0 1000 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', overflow: 'visible' }}
          >
            {/* Background Track Line */}
            <line x1="125" y1="24" x2="875" y2="24" stroke="#DBD7CB" strokeWidth="2" strokeDasharray="4 6" />

            {/* Active Scrub Route Line */}
            <path
              ref={routePathRef}
              d="M 125 24 L 375 24 L 625 24 L 875 24"
              stroke="#E63E26"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* 4 Waypoint Hub Beacons */}
            {[125, 375, 625, 875].map((xPos, i) => {
              const isActive = activeStep >= i
              return (
                <g key={i} transform={`translate(${xPos}, 24)`}>
                  <circle r="6" fill={isActive ? '#E63E26' : '#FFFFFF'} stroke={isActive ? '#E63E26' : '#DBD7CB'} strokeWidth="2" />
                  {isActive && (
                    <circle className="route-waypoint-beacon" r="14" stroke="#E63E26" strokeWidth="1.5" opacity="0.5" />
                  )}
                  <text
                    x="0"
                    y="-12"
                    textAnchor="middle"
                    fill={isActive ? '#E63E26' : '#9B9FA9'}
                    fontFamily="JetBrains Mono"
                    fontSize="9"
                    fontWeight="600"
                    letterSpacing="1"
                  >
                    STAGE 0{i + 1}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Process Stages: Desktop Continuum Grid + Mobile Vertical Schematic Spine */}
        <div className="process-layout-wrap">
          {/* Mobile Vertical Schematic Spine (visible <= 900px) */}
          <div className="process-mobile-spine">
            <svg
              className="process-mobile-spine-svg"
              width="28"
              height="100%"
              viewBox="0 0 28 800"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background dashed vertical line */}
              <line x1="14" y1="20" x2="14" y2="780" stroke="#DBD7CB" strokeWidth="2" strokeDasharray="4 6" />
              {/* Active vertical progress line based on activeStep */}
              <line
                x1="14"
                y1="20"
                x2="14"
                y2={activeStep === 0 ? 100 : activeStep === 1 ? 320 : activeStep === 2 ? 540 : 760}
                stroke="#E63E26"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ transition: 'y2 0.4s ease' }}
              />
            </svg>

            {/* 4 Mobile Waypoint Beacons positioned along the vertical track */}
            {[
              { label: 'ORIGIN', top: '12%' },
              { label: 'DOCS', top: '38%' },
              { label: 'TRANSIT', top: '64%' },
              { label: 'DEST', top: '90%' },
            ].map((node, i) => {
              const isActive = activeStep >= i
              const isCurrent = activeStep === i
              return (
                <div
                  key={node.label}
                  className="mobile-spine-node"
                  style={{
                    position: 'absolute',
                    top: node.top,
                    left: '14px',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#E63E26' : '#FFFFFF',
                      border: `2px solid ${isActive ? '#E63E26' : '#DBD7CB'}`,
                      boxShadow: isCurrent ? '0 0 10px rgba(230, 62, 38, 0.6)' : 'none',
                      transition: 'background-color 0.3s, border-color 0.3s',
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.62rem',
                      color: isActive ? '#E63E26' : '#9B9FA9',
                      fontWeight: 600,
                      marginTop: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Process Stages Grid */}
          <div
            className="process-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem',
              position: 'relative',
              width: '100%',
            }}
          >
            {processStages.map((stage, idx) => {
              const isCurrent = activeStep === idx
              return (
                <div
                  key={stage.code}
                  className="process-card"
                  style={{
                    backgroundColor: 'var(--surface)',
                    padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '340px',
                    position: 'relative',
                    borderTop: `2px solid ${isCurrent ? 'var(--accent)' : 'var(--border)'}`,
                    borderBottom: '1px solid var(--border)',
                    borderLeft: '1px solid var(--border-subtle)',
                    borderRight: '1px solid var(--border-subtle)',
                    transition: 'border-top-color 0.3s ease',
                  }}
                >
                  {/* Card Header */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '0.85rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: isCurrent ? 'var(--accent)' : 'var(--charcoal)',
                        }}
                      >
                        {stage.phase}
                      </span>
                      <span
                        className="badge-code"
                        style={{
                          fontSize: '0.65rem',
                          borderColor: isCurrent ? 'var(--accent)' : 'var(--border)',
                          color: isCurrent ? 'var(--accent)' : 'var(--charcoal)',
                        }}
                      >
                        {stage.code}
                      </span>
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        lineHeight: 1.25,
                        marginBottom: '0.85rem',
                        color: isCurrent ? 'var(--charcoal)' : 'var(--charcoal-secondary)',
                      }}
                    >
                      {stage.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.885rem',
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {stage.summary}
                    </p>
                  </div>

                  {/* Card Footer Technical Indicator */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.85rem',
                      marginTop: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.725rem',
                      color: isCurrent ? 'var(--accent)' : 'var(--secondary)',
                    }}
                  >
                    <span>STEP 0{idx + 1} / 04</span>
                    <span style={{ fontWeight: isCurrent ? 600 : 400 }}>
                      {isCurrent ? '→ [ ACTIVE DISPATCH ]' : '→ SYNCHRONIZED'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dynamic Route Vector Banner Underneath */}
        <div
          className="hairline-all process-bottom-banner"
          style={{
            marginTop: '2rem',
            padding: '1.25rem 2rem',
            backgroundColor: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge-code" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--accent)' }}>
              LIVE PROTOCOL
            </span>
            <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--charcoal)' }}>
              EDI PROTOCOL: UN/EDIFACT • ANSI ASC X12 • ASYCUDA DUAL-WAY
            </span>
          </div>

          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            AVERAGE BORDER DWELL TIME: <strong style={{ color: 'var(--charcoal)' }}>1.8 HOURS</strong> (INDUSTRY AVG: 28.4 HOURS)
          </div>
        </div>
      </div>

      <style>{`
        .process-mobile-spine {
          display: none;
        }
        @media (max-width: 900px) {
          .process-layout-wrap {
            display: flex;
            gap: 1.25rem;
            position: relative;
          }
          .process-mobile-spine {
            display: block;
            width: 38px;
            flex-shrink: 0;
            position: relative;
          }
          .process-mobile-spine-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .process-grid {
            grid-template-columns: 1fr !important;
            flex: 1;
          }
          .route-vector-track {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
