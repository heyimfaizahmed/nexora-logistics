import { gsap, ScrollTrigger } from './gsapConfig'

/**
 * Reusable GSAP and ScrollTrigger animation choreography for Phase 2 sections.
 * All functions are designed to run inside a gsap.context() for clean lifecycle teardown.
 */

/**
 * 1. ABOUT / MANIFESTO ANIMATIONS
 */

/**
 * Animates the monumental manifesto headline line-by-line upon viewport entry.
 */
export function animateManifesto(rootEl) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.about-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    return
  }

  const triggerEl = rootEl || '.about-statement-col'

  // Headline line-by-line reveal
  gsap.fromTo(
    '.about-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Subtitle tag slide in
  gsap.fromTo(
    '.about-subtitle',
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-subtitle',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Scroll-driven text emphasis scrub on body manifesto copy
  gsap.fromTo(
    '.manifesto-highlight',
    { color: '#8E919A', fontWeight: 400 },
    {
      color: '#111215',
      fontWeight: 600,
      duration: 1,
      stagger: 0.2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.manifesto-body',
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6,
      },
    }
  )

  // Subtle parallax depth shift between heading and body
  gsap.to('.about-statement-col', {
    y: -35,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  })
}

/**
 * Animates the sequential entrance and subtle hover interactions of the 3 architectural pillars.
 */
export function animatePillars(rootEl) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.pillar-card', { opacity: 1, y: 0 })
    return
  }

  const triggerEl = rootEl || '.about-pillars-col'

  // Sequential pillar cards entrance
  gsap.fromTo(
    '.pillar-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Parallax translation for pillars column
  gsap.to('.about-pillars-col', {
    y: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.4,
    },
  })
}

/**
 * 2. SERVICES / CAPABILITIES ANIMATIONS
 */

/**
 * Animates the services section entrance, line drawing, and row staggers.
 */
export function animateServices() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.service-row', { opacity: 1, y: 0 })
    gsap.set('.services-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    return
  }

  // Section title reveal
  gsap.fromTo(
    '.services-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.services-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Sequential entrance of service rows
  gsap.fromTo(
    '.service-row',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-list',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Draw top border across services list
  gsap.fromTo(
    '.services-list',
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.services-list',
        start: 'top 84%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Sticky Inspector box entrance
  gsap.fromTo(
    '.service-detail-box',
    { opacity: 0, y: 40, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.service-detail-box',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Smooth transition when active service changes in the sticky inspector.
 * @param {HTMLElement} inspectorEl
 */
export function animateServiceInspector(inspectorEl) {
  if (!inspectorEl) return

  gsap.fromTo(
    inspectorEl.querySelectorAll('.inspector-animate'),
    { opacity: 0, y: 10, filter: 'blur(3px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.out',
    }
  )
}

/**
 * 3. PROCESS / TRADE ROUTE CONTINUUM ANIMATIONS
 */

/**
 * Animates the process section title and 4-tier cards sequence.
 */
export function animateProcess() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.process-card', { opacity: 1, y: 0 })
    gsap.set('.process-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    return
  }

  // Headline line-by-line reveal
  gsap.fromTo(
    '.process-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.process-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Stage cards sequential upward reveal
  gsap.fromTo(
    '.process-card',
    { opacity: 0, y: 45 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Bottom EDI technical protocol banner reveal
  gsap.fromTo(
    '.process-bottom-banner',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.process-bottom-banner',
        start: 'top 92%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Animates the SVG trade route connecting track across the 4 continuum stages.
 * Bound to ScrollTrigger scrub as user traverses the process section.
 * @param {SVGPathElement} pathEl
 * @param {HTMLElement} triggerEl
 */
export function animateRoute(pathEl, triggerEl) {
  if (!pathEl || !triggerEl) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const pathLength = pathEl.getTotalLength ? pathEl.getTotalLength() : 1000

  gsap.set(pathEl, {
    strokeDasharray: pathLength,
    strokeDashoffset: prefersReduced ? 0 : pathLength,
  })

  if (prefersReduced) return

  // Scroll scrub draws route line through the 4 stages
  gsap.to(pathEl, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.5,
    },
  })

  // Pulsing cargo beacon along the route line
  gsap.to('.route-waypoint-beacon', {
    scale: 1.4,
    opacity: 0,
    transformOrigin: 'center center',
    repeat: -1,
    duration: 2.2,
    stagger: 0.55,
    ease: 'power1.out',
  })
}

/**
 * 4. PROJECTS / CASE STUDIES ANIMATIONS
 */

/**
 * Animates the case studies section, curtain overlays, and numerical metric reveals.
 */
export function animateProjects(rootEl) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.case-study-item', { opacity: 1, y: 0 })
    gsap.set('.projects-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    gsap.set('.cs-curtain-overlay', { scaleY: 0 })
    return
  }

  // Section title reveal
  gsap.fromTo(
    '.projects-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.projects-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Staggered Case Study Cards Entrance
  const items = (rootEl || document).querySelectorAll('.case-study-item')
  items.forEach((item) => {
    const curtain = item.querySelector('.cs-curtain-overlay')
    const visual = item.querySelector('.cs-visual-col')
    const content = item.querySelector('.cs-content-col')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      item,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
    )

    if (curtain) {
      tl.fromTo(
        curtain,
        { scaleY: 1, transformOrigin: 'top center' },
        { scaleY: 0, duration: 0.95, ease: 'expo.inOut' },
        '-=0.6'
      )
    }

    if (visual) {
      tl.fromTo(
        visual.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        '-=0.6'
      )
    }

    if (content) {
      tl.fromTo(
        content.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        '-=0.7'
      )
    }

    // Parallax shift for case study item
    gsap.to(item, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })
  })
}

/**
 * 5. STATS / METRICS ANIMATIONS
 */

/**
 * Animates the dark operational statistics section, statement typography, and exact numerical count-ups.
 */
export function animateStats(counterElements, rootEl) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.stat-card', { opacity: 1, y: 0 })
    gsap.set('.stats-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    const finalValues = ['4.8', '142', '99.8', '48']
    finalValues.forEach((value, index) => {
      if (counterElements?.[index]) counterElements[index].textContent = value
    })
    return
  }

  const triggerEl = rootEl || '.stats-grid'

  // Section title reveal
  gsap.fromTo(
    '.stats-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.stats-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // 4-Card Sequential Entrance
  gsap.fromTo(
    '.stat-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Numerical Count-up for the 4 verified metrics (Triggered ONCE on entry)
  if (counterElements && counterElements.length >= 4) {
    const targets = [
      { obj: { val: 0 }, end: 4.8, decimals: 1, el: counterElements[0] },
      { obj: { val: 0 }, end: 142, decimals: 0, el: counterElements[1] },
      { obj: { val: 0 }, end: 99.8, decimals: 1, el: counterElements[2] },
      { obj: { val: 0 }, end: 48, decimals: 0, el: counterElements[3] },
    ]

    ScrollTrigger.create({
      trigger: '.stats-grid',
      start: 'top 82%',
      once: true,
      onEnter: () => {
        targets.forEach((t) => {
          gsap.to(t.obj, {
            val: t.end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (t.el) {
                t.el.textContent = t.decimals > 0 ? t.obj.val.toFixed(t.decimals) : Math.round(t.obj.val)
              }
            },
          })
        })
      },
    })
  }

  // Live Port Network Ticker Banner Entrance
  gsap.fromTo(
    '.stats-ticker-banner',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 92%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * 6. CTA / ALLOCATION INTAKE ANIMATIONS
 */

/**
 * Animates the CTA section, headline line-by-line reveal, and form container entrance.
 */
export function animateCta() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.cta-title .gsap-line-inner', { opacity: 1, y: 0, filter: 'none' })
    gsap.set('.cta-form-card', { opacity: 1, y: 0 })
    return
  }

  // Headline line-by-line reveal
  gsap.fromTo(
    '.cta-title .gsap-line-inner',
    { y: '120%', opacity: 0, filter: 'blur(8px)' },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.cta-title',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Supporting narrative & trade desk phone/email coordinates
  gsap.fromTo(
    '.cta-supporting',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-supporting',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Form container entrance
  gsap.fromTo(
    '.cta-form-card',
    { opacity: 0, y: 35, scale: 0.99 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-form-card',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * 7. FOOTER ANIMATIONS
 */

/**
 * Animates the footer entrance, sequential terminal activation, and link columns.
 */
export function animateFooter(rootEl) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set('.footer-brand-wrap', { opacity: 1, y: 0 })
    gsap.set('.terminal-node-item', { opacity: 1, y: 0 })
    gsap.set('.footer-col', { opacity: 1, y: 0 })
    return
  }

  const triggerEl = rootEl || '.site-footer'

  // Top brandmark & statement entrance
  gsap.fromTo(
    '.footer-brand-wrap',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Sequential Operational Hubs (Terminals RTM, SIN, HAM, DXB, LAX, PUS) activation
  gsap.fromTo(
    '.terminal-node-item',
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // 4 Footer link columns staggered upward reveal
  gsap.fromTo(
    '.footer-col',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    }
  )

  // Bottom legal bar
  gsap.fromTo(
    '.footer-legal-bar',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

