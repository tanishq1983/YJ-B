import { useEffect, useState } from 'react'

/** True when the user prefers reduced motion (or no-JS-motion environments). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Escape key closes handlers for modals/lightboxes. */
export function useEscapeKey(onEscape, active = true) {
  useEffect(() => {
    if (!active) return
    const handler = (e) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEscape, active])
}

/**
 * Keyboard trap for modal-style dialogs: keeps Tab cycling inside the
 * open `.modal-overlay`. Does not set initial focus (components do that). */
export function useFocusTrap(active = true) {
  useEffect(() => {
    if (!active) return
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const scope = document.querySelector('.modal-overlay')
      if (!scope) return
      const visible = Array.from(
        scope.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]'),
      ).filter((el) => el.offsetParent !== null)
      if (visible.length === 0) return
      const idx = visible.indexOf(document.activeElement)
      if (e.shiftKey && idx <= 0) {
        e.preventDefault()
        visible[visible.length - 1].focus()
      } else if (!e.shiftKey && idx === visible.length - 1) {
        e.preventDefault()
        visible[0].focus()
      } else if (idx === -1) {
        e.preventDefault()
        visible[0].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active])
}

/** Locks body scroll while a modal/lightbox is open. */
export function useBodyScrollLock(active = true) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])
}

/** Small typewriter effect. Shows text instantly under reduced motion. */
export function useTypewriter(text, { enabled = true, speed = 28, delay = 0 } = {}) {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) {
      setOutput(text)
      setDone(true)
      return
    }
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOutput(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, enabled, speed, delay, reduced])

  return { output, done }
}
