import { useLayoutEffect, useEffect } from 'react'
import { gsap } from './gsapConfig'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Reusable hook to handle GSAP context scoping and cleanup in React components.
 * Guarantees proper cleanup on unmount or dependency changes, preventing memory leaks
 * and duplicate animations in React 18/19 StrictMode.
 *
 * @param {Function} callback - Function containing GSAP animation logic (receives context as argument)
 * @param {import('react').RefObject} [scopeRef] - Ref to the parent DOM element to scope selectors
 * @param {Array} [deps=[]] - Dependency array to trigger recreation
 */
export function useGsapContext(callback, scopeRef, deps = []) {
  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef ? scopeRef.current : undefined
    const ctx = gsap.context((self) => {
      callback(self)
    }, scope)

    return () => {
      ctx.revert()
    }
  }, deps)
}

export default useGsapContext
