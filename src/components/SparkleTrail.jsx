import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../utils/hooks'
import styles from './SparkleTrail.module.css'

const GLYPHS = ['✦', '✧', '✨']

/**
 * Desktop-only sparkle trail that follows the cursor.
 * Skipped on touch devices and under reduced motion, and throttled
 * so it never affects page performance.
 */
export default function SparkleTrail() {
  const reduced = useReducedMotion()
  const [sparkles, setSparkles] = useState([])
  const lastAdd = useRef(0)

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(hover: none)').matches) return // touch devices

    let id = 0
    const onMove = (e) => {
      const now = performance.now()
      if (now - lastAdd.current < 90) return
      lastAdd.current = now
      const sparkle = {
        id: id++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        size: 10 + Math.random() * 8,
      }
      setSparkles((prev) => [...prev.slice(-7), sparkle])
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
      }, 650)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return (
    <div className={styles.trailLayer} aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className={styles.sparkle}
          style={{ left: s.x, top: s.y, fontSize: s.size }}
        >
          {s.glyph}
        </span>
      ))}
    </div>
  )
}
