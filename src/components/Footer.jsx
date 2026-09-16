import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { tradeNodes } from '../data/tradeData'
import { useGsapContext } from '../animations/useGsapContext'
import { animateFooter } from '../animations/sectionAnimations'
import { gsap } from '../animations/gsapConfig'

export default function Footer() {
  const footerRef = useRef(null)

  useGsapContext(() => {
    animateFooter(footerRef.current)
  }, footerRef)

  const handleNodeHover = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = e.currentTarget
    const title = el.querySelector('.node-title')
    gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out' })
    if (title) gsap.to(title, { color: 'var(--accent)', duration: 0.2 })
  }

  const handleNodeLeave = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = e.currentTarget
    const title = el.querySelector('.node-title')
    gsap.to(el, { y: 0, duration: 0.25, ease: 'power2.out' })
    if (title) gsap.to(title, { color: '#FFFFFF', duration: 0.25 })
  }

  return (
    <footer
      ref={footerRef}
      className="site-footer theme-dark"
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: '#FFFFFF',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: '2.5rem',
        borderTop: '1px solid var(--border-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Massive Brand Statement & Coordinates */}
        <div
          className="footer-brand-wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: '#FFFFFF',
                }}
              >
                NEXORA
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '2px',
                }}
              >
                GLOBAL
              </span>
            </Link>
            <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--muted-dark)', maxWidth: '440px', lineHeight: 1.6 }}>
              Trans-continental logistics infrastructure, customs brokerage, and sovereign trade route orchestration.
            </p>
          </div>

          {/* Major Operational Hubs Status Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--secondary)', letterSpacing: '0.1em' }}>
              OPERATIONAL HUBS // REAL-TIME BERTHING
            </div>
            <div
              className="terminal-nodes-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem 1.75rem',
              }}
            >
              {tradeNodes.slice(0, 6).map((node) => (
                <div
                  key={node.code}
                  className="terminal-node-item"
                  onMouseEnter={handleNodeHover}
                  onMouseLeave={handleNodeLeave}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: node.status === 'Optimal' ? '#22c55e' : 'var(--accent)',
                        boxShadow: `0 0 6px ${node.status === 'Optimal' ? '#22c55e' : 'var(--accent)'}`,
                        display: 'inline-block',
                      }}
                    />
                    <span className="font-mono node-title" style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, transition: 'color 0.2s' }}>
                      {node.code} — {node.name.replace('Port of ', '')}
                    </span>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--muted-dark)', paddingLeft: '0.75rem' }}>
                    {node.status} • {node.timeZone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns & Regulatory Accreditations */}
        <div
          className="footer-links-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          {/* Col 1 */}
          <div className="footer-col">
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1.25rem', fontWeight: 600 }}>
              01 // CAPABILITIES
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--muted-dark)' }}>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Import & Export Architecture</Link></li>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Customs Clearance & EDI</Link></li>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Multimodal Freight Forwarding</Link></li>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Ocean Vessel Chartering</Link></li>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Documentation & eBL Protocols</Link></li>
              <li><Link to="/capabilities" style={{ transition: 'color 0.2s' }}>Supply Chain Telemetry</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1.25rem', fontWeight: 600 }}>
              02 // CORRIDORS
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--muted-dark)' }}>
              <li><span>Trans-Pacific Express (LAX ⇄ SIN)</span></li>
              <li><span>North Sea Gateway (RTM ⇄ HAM)</span></li>
              <li><span>Eurasian Rail Landbridge</span></li>
              <li><span>Middle East Gulf Corridor (DXB)</span></li>
              <li><span>Trans-Atlantic Precision Air</span></li>
              <li><span>East Asian Deep-Berth (PUS)</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1.25rem', fontWeight: 600 }}>
              03 // REGULATORY LICENSES
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--muted-dark)' }}>
              <li><span>AEO-F (Authorized Economic Operator)</span></li>
              <li><span>FMC Licensed NVOCC (#028941)</span></li>
              <li><span>IATA Cargo Agent (#01-4-8921)</span></li>
              <li><span>WCO SAFE Framework Compliant</span></li>
              <li><span>C-TPAT Tier 3 Validated</span></li>
              <li><span>ISO 28000 Supply Chain Security</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1.25rem', fontWeight: 600 }}>
              04 // HEADQUARTERS
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-dark)', lineHeight: 1.6, marginBottom: '1rem' }}>
              <div>Nexora Trade Tower, Level 42</div>
              <div>Wilhelminakade 901</div>
              <div>3072 AP Rotterdam, Netherlands</div>
              <div style={{ marginTop: '0.5rem', color: '#FFFFFF' }}>LAT 51.9056° N, LON 4.4922° E</div>
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>
              SWIFT // NEXRNL2R
            </div>
          </div>
        </div>

        {/* Bottom Legal & Telemetry Meta */}
        <div
          className="footer-legal-bar"
          style={{
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--muted-dark)',
          }}
        >
          <div>
            © {new Date().getFullYear()} NEXORA TRADE & LOGISTICS B.V. ALL RIGHTS RESERVED.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>INTERNATIONAL TERMS (INCOTERMS® 2020)</span>
            <span>STANDARD BILL OF LADING CLAUSES</span>
            <span>PRIVACY & TELEMETRY GOVERNANCE</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
