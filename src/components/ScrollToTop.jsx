import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../animations/gsapConfig'
import { getLenis } from '../animations/smoothScroll'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Reset window scroll
    window.scrollTo(0, 0)

    // Reset Lenis smooth scroll if active
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }

    // Refresh GSAP ScrollTrigger after the page renders at top
    ScrollTrigger.refresh()
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 320)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])

  return null
}
