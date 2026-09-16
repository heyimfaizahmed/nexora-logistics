import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { tradeNodes } from '../data/tradeData'
import { gsap } from '../animations/gsapConfig'
import { useGsapContext } from '../animations/useGsapContext'
import { useAuth } from '../context/useAuth'

export default function Header({ isLoaded = true }) {
  const headerRef = useRef(null)
  const [activeNode, setActiveNode] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [utcTime, setUtcTime] = useState('')
  const { user, isAuthenticated } = useAuth()

  useGsapContext(() => {
    if (!isLoaded) {
      gsap.set(headerRef.current, { yPercent: -100, opacity: 0 })
      return
    }
    gsap.to(headerRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, headerRef, [isLoaded])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % tradeNodes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])



  return (
    <header
      ref={headerRef}
      className="site-header hairline-b"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(246, 245, 240, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Top Telemetry Bar */}
      <div
        className="telemetry-bar hairline-b"
        style={{
          padding: '0.35rem var(--container-pad)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.725rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--muted)',
          backgroundColor: 'rgba(236, 234, 225, 0.45)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--charcoal)' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
                display: 'inline-block',
              }}
            />
            GLOBAL LOGISTICS NETWORK: ONLINE
          </span>
          <span className="hide-mobile" style={{ opacity: 0.7 }}>
            CORRIDOR: [{tradeNodes[activeNode].code}] {tradeNodes[activeNode].name} — {tradeNodes[activeNode].status}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span className="hide-mobile" style={{ letterSpacing: '0.05em' }}>
            COORDS: {tradeNodes[activeNode].coords}
          </span>
          <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>
            {utcTime || '00:00:00 UTC'}
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.8rem',
        }}
      >
        {/* Brandmark / Logo */}
        <Link to="/" className="brand-wrap" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span
              className="font-display"
              style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                color: 'var(--charcoal)',
              }}
            >
              NEXORA
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '0.1rem 0.35rem',
                borderRadius: '2px',
                letterSpacing: '0.08em',
              }}
            >
              LOGISTICS
            </span>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginTop: '0.2rem',
            }}
          >
            Trade & Sovereign Infrastructure
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent)' : 'var(--charcoal)',
              position: 'relative',
              padding: '0.5rem 0',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ color: 'var(--muted)', marginRight: '0.25rem' }}>01.</span> Manifesto
          </NavLink>

          <NavLink
            to="/capabilities"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent)' : 'var(--charcoal)',
              position: 'relative',
              padding: '0.5rem 0',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ color: 'var(--muted)', marginRight: '0.25rem' }}>02.</span> Capabilities
          </NavLink>

          <NavLink
            to="/trade-flow"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent)' : 'var(--charcoal)',
              position: 'relative',
              padding: '0.5rem 0',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ color: 'var(--muted)', marginRight: '0.25rem' }}>03.</span> Trade Flow
          </NavLink>

          <NavLink
            to="/case-studies"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent)' : 'var(--charcoal)',
              position: 'relative',
              padding: '0.5rem 0',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ color: 'var(--muted)', marginRight: '0.25rem' }}>04.</span> Case Studies
          </NavLink>

          <NavLink
            to="/metrics"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent)' : 'var(--charcoal)',
              position: 'relative',
              padding: '0.5rem 0',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ color: 'var(--muted)', marginRight: '0.25rem' }}>05.</span> Metrics
          </NavLink>

          {/* Authentication State Navigation */}
          {isAuthenticated ? (
            <NavLink
              to="/account"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : 'var(--charcoal)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                borderLeft: '1px solid var(--border)',
                paddingLeft: '1.25rem',
              })}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              <span>COMMAND PORTAL</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : 'var(--charcoal)',
                fontWeight: 500,
                borderLeft: '1px solid var(--border)',
                paddingLeft: '1.25rem',
              })}
            >
              <span>DISPATCH LOGIN</span>
            </NavLink>
          )}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/allocation"
            className="btn-primary hide-mobile"
            style={{
              fontSize: '0.78rem',
              padding: '0.75rem 1.4rem',
            }}
          >
            <span>Request Allocation</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open command drawer"
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--charcoal)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Architectural Command Drawer */}
      {mobileMenuOpen && (
        <MobileCommandDrawer
          onClose={() => setMobileMenuOpen(false)}
          activeNode={activeNode}
          utcTime={utcTime}
          isAuthenticated={isAuthenticated}
          userName={user?.name}
        />
      )}

      <style>{`
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

function MobileCommandDrawer({ onClose, activeNode, utcTime, isAuthenticated, userName }) {
  const drawerRef = useRef(null)

  useEffect(() => {
    // Lock background scroll while drawer is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const drawer = drawerRef.current
    if (!drawer) return

    if (prefersReducedMotion) {
      gsap.set(drawer, { opacity: 1 })
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(drawer, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 })
    tl.fromTo(
      drawer.querySelectorAll('.mobile-nav-link .gsap-line-inner'),
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power4.out' },
      '-=0.2'
    )
    tl.fromTo(
      drawer.querySelector('.drawer-cta-wrap'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.2'
    )

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const handleCloseWithAnimation = (e) => {
    if (e) e.preventDefault()
    const drawer = drawerRef.current
    if (!drawer) {
      onClose()
      return
    }
    gsap.to(drawer, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={drawerRef}
      className="mobile-command-drawer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-dark)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.5rem, 5vw, 2.5rem) var(--container-pad)',
        overflowY: 'auto',
      }}
    >
      {/* Drawer Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" onClick={handleCloseWithAnimation} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
            <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              NEXORA
            </span>
          </Link>
          <span
            className="font-mono"
            style={{
              fontSize: '0.65rem',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              padding: '0.15rem 0.4rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            DISPATCH TERMINAL
          </span>
        </div>

        <button
          type="button"
          onClick={handleCloseWithAnimation}
          aria-label="Close menu"
          style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            padding: '0.5rem 0.75rem',
            border: '1px solid var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>CLOSE</span>
          <span style={{ color: 'var(--accent)', fontSize: '1rem', lineHeight: 1 }}>✕</span>
        </button>
      </div>

      {/* Drawer Navigation Links */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 2.5vh, 1.6rem)',
          margin: 'auto 0',
          padding: '1.5rem 0',
        }}
      >
        {[
          { num: '00', title: 'Main Terminal', path: '/' },
          { num: '01', title: 'Manifesto', path: '/about' },
          { num: '02', title: 'Capabilities', path: '/capabilities' },
          { num: '03', title: 'Trade Flow', path: '/trade-flow' },
          { num: '04', title: 'Case Dispatches', path: '/case-studies' },
          { num: '05', title: 'Metrics', path: '/metrics' },
          { num: '06', title: 'Allocation Ledger', path: '/allocation' },
          isAuthenticated
            ? { num: '07', title: `Command Portal (${userName?.split(' ')[0] || 'Officer'})`, path: '/account' }
            : { num: '07', title: 'Dispatch Login', path: '/login' },
        ].map((item) => (
          <Link
            key={item.num}
            to={item.path}
            onClick={handleCloseWithAnimation}
            className="mobile-nav-link font-display"
            style={{
              fontSize: 'clamp(1.6rem, 5.5vw, 2.4rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
              {item.num} //
            </span>
            <span className="gsap-line-wrap">
              <span className="gsap-line-inner">{item.title}</span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Drawer Bottom Actions & Telemetry */}
      <div>
        <div className="drawer-cta-wrap" style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/allocation"
            onClick={handleCloseWithAnimation}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '1rem',
              fontSize: '0.85rem',
            }}
          >
            <span>Initiate Allocation Request</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div
          className="drawer-telemetry font-mono"
          style={{
            borderTop: '1px solid var(--border-dark)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.68rem',
            color: 'var(--muted-dark)',
            letterSpacing: '0.06em',
          }}
        >
          <div>
            NODE // [{tradeNodes[activeNode].code}] {tradeNodes[activeNode].coords}
          </div>
          <div style={{ color: 'var(--accent)' }}>
            {utcTime || '00:00:00 UTC'}
          </div>
        </div>
      </div>
    </div>
  )
}
