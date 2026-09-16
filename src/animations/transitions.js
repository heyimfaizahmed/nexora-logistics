import { gsap } from './gsapConfig'

/**
 * Reusable animation primitives for Nexora Logistics
 */

/**
 * Fades in a target element.
 * @param {gsap.DOMTarget} target
 * @param {gsap.TweenVars} [vars={}]
 */
export function fadeIn(target, vars = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, ...vars.from },
    {
      opacity: 1,
      duration: vars.duration || 0.8,
      ease: vars.ease || 'power2.out',
      ...vars,
    }
  )
}

/**
 * Slides up and fades in a target element.
 * @param {gsap.DOMTarget} target
 * @param {gsap.TweenVars} [vars={}]
 */
export function slideUp(target, vars = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: vars.y || 40, ...vars.from },
    {
      opacity: 1,
      y: 0,
      duration: vars.duration || 0.9,
      ease: vars.ease || 'power3.out',
      ...vars,
    }
  )
}

/**
 * Staggers a list of child elements with fade & upward reveal.
 * @param {gsap.DOMTarget} targets
 * @param {gsap.TweenVars} [vars={}]
 */
export function staggerReveal(targets, vars = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: vars.y || 30, ...vars.from },
    {
      opacity: 1,
      y: 0,
      duration: vars.duration || 0.8,
      stagger: vars.stagger || 0.12,
      ease: vars.ease || 'power2.out',
      ...vars,
    }
  )
}

/**
 * Creates a ScrollTrigger-bound reveal animation.
 * @param {gsap.DOMTarget} target
 * @param {Object} [options={}]
 */
export function scrollReveal(target, options = {}) {
  const {
    trigger = target,
    start = 'top 85%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse',
    scrub = false,
    ...animationVars
  } = options

  return gsap.fromTo(
    target,
    { opacity: 0, y: animationVars.y || 50, ...animationVars.from },
    {
      opacity: 1,
      y: 0,
      duration: animationVars.duration || 1,
      ease: animationVars.ease || 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: scrub ? undefined : toggleActions,
        scrub,
        markers: animationVars.markers || false,
      },
      ...animationVars,
    }
  )
}
