import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'

export default function AccountPage() {
  const pageRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useGsapContext(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.05 })
    tl.fromTo('.dashboard-header', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo('.dashboard-metric-card', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
      .fromTo('.dashboard-ledger-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
  }, pageRef)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div ref={pageRef} className="page-wrap" style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg)' }}>
      <div className="container">
        {/* Dashboard Title & User Header */}
        <div
          className="hairline-b dashboard-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className="badge-code">[ MISSION CONTROL // DASHBOARD ]</span>
              <span className="tag-meta" style={{ color: 'var(--accent)' }}>
                {user?.accountTier || 'SOVEREIGN ALLIANCE // TIER-1'}
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--charcoal)', margin: 0 }}>
              DISPATCH COMMAND PORTAL
            </h1>
            <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              LOGISTICS OFFICER: <strong style={{ color: 'var(--charcoal)' }}>{user?.name}</strong> • ORG: <strong style={{ color: 'var(--charcoal)' }}>{user?.company}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/allocation" className="btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.78rem' }}>
              <span>NEW ALLOCATION INTAKE</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-outline"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.78rem' }}
            >
              <span>TERMINATE SESSION</span>
            </button>
          </div>
        </div>

        {/* 3-Column Telemetry Summary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div className="hairline-all dashboard-metric-card" style={{ padding: '1.75rem', backgroundColor: 'var(--surface)' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.5rem' }}>
              SECURITY & EDI CLEARANCE
            </div>
            <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              AUTONOMOUS FAST-TRACK
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              EORI STATUS: {user?.eoriNumber || 'VERIFIED'}
            </div>
          </div>

          <div className="hairline-all dashboard-metric-card" style={{ padding: '1.75rem', backgroundColor: 'var(--surface)' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.5rem' }}>
              GUARANTEED ALLOCATION QUOTA
            </div>
            <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              4,800 TEU / QUARTER
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              CARRIER ALLIANCE PRIORITY BERTH
            </div>
          </div>

          <div className="hairline-all dashboard-metric-card" style={{ padding: '1.75rem', backgroundColor: 'var(--surface)' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.5rem' }}>
              DEDICATED DISPATCH DESK
            </div>
            <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              ROTTERDAM [NL]
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              DESK OFFICER: ERASMUS VAN DIJK
            </div>
          </div>
        </div>

        {/* Active Dispatches & Manifest History Ledger */}
        <div className="hairline-all dashboard-ledger-card" style={{ backgroundColor: 'var(--surface)', marginBottom: '3.5rem' }}>
          <div
            style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge-code">[ MANIFESTS // ACTIVE CORRIDORS ]</span>
              <h3 className="font-display" style={{ fontSize: '1.35rem', marginTop: '0.5rem', margin: 0 }}>
                Enterprise Cargo Pipeline
              </h3>
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              {user?.activeAllocations?.length || 0} ACTIVE SHIPMENTS
            </span>
          </div>

          {user?.activeAllocations?.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)', color: 'var(--secondary)' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>MANIFEST ID</th>
                    <th style={{ padding: '1rem 1.5rem' }}>CORRIDOR</th>
                    <th style={{ padding: '1rem 1.5rem' }}>CARGO SPECIFICATION</th>
                    <th style={{ padding: '1rem 1.5rem' }}>STATUS</th>
                    <th style={{ padding: '1rem 1.5rem' }}>CARRIER ALLOCATION</th>
                  </tr>
                </thead>
                <tbody>
                  {user.activeAllocations.map((alloc) => (
                    <tr key={alloc.manifestId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
                        {alloc.manifestId}
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--charcoal)' }}>{alloc.corridor}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--charcoal)' }}>{alloc.cargo}</td>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontWeight: 600 }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                          {alloc.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--muted)' }}>{alloc.carrier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <p className="font-mono" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                No active corridor dispatches logged for this enterprise account.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/allocation" className="btn-primary">
                  <span>DISPATCH NEW CARGO MANIFEST</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Corporate Profile Settings Panel */}
        <div className="hairline-all" style={{ backgroundColor: 'var(--bg-alt)', padding: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge-code">[ ACCOUNT IDENTITY ]</span>
            <h4 className="font-display" style={{ fontSize: '1.35rem', marginTop: '0.5rem', margin: 0 }}>
              Authorized Enterprise Credentials
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: '0.725rem', marginBottom: '0.25rem' }}>ACCOUNT IDENTIFIER</div>
              <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{user?.id}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: '0.725rem', marginBottom: '0.25rem' }}>AUTHENTICATED EMAIL</div>
              <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{user?.email}</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: '0.725rem', marginBottom: '0.25rem' }}>AUTHORIZED ROLE</div>
              <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .page-wrap .container > div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
