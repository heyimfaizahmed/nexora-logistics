import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsapConfig'

let globalLenis = null

/**
 * Initializes smooth scrolling with Lenis and synchronizes it with GSAP's ScrollTrigger.
 *
 * @param {Object} options - Lenis configuration options
 * @returns {Lenis} - The Lenis instance
 */
export function initSmoothScroll(options = {}) {
  if (typeof window === 'undefined') return null

  // Clean up existing instance if any
  if (globalLenis) {
    globalLenis.destroy()
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    ...options,
  })

  globalLenis = lenis

  // Synchronize Lenis scroll event with ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update)

  // Tie Lenis's requestAnimationFrame to GSAP's ticker
  const tickerUpdate = (time) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tickerUpdate)

  // Disable GSAP lag smoothing to avoid jumps during smooth scroll
  gsap.ticker.lagSmoothing(0)

  // Return cleanup function attached to instance
  lenis._cleanup = () => {
    gsap.ticker.remove(tickerUpdate)
    lenis.destroy()
    if (globalLenis === lenis) {
      globalLenis = null
    }
  }

  return lenis
}

/**
 * React hook to initialize and manage the Lenis smooth scroll instance.
 * Automatically cleans up ticker and event listeners on component unmount.
 *
 * @param {Object} options - Lenis configuration options
 * @returns {import('react').MutableRefObject<Lenis | null>} - Reference to the Lenis instance
 */
export function useLenis(options = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = initSmoothScroll(options)
    lenisRef.current = lenis

    return () => {
      if (lenis && lenis._cleanup) {
        lenis._cleanup()
      }
    }
  }, [options])

  return lenisRef
}

export function getLenis() {
  return globalLenis
}

export default useLenis
