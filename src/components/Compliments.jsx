import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../config'
import Reveal from './Reveal'
import { starTwinkle } from '../utils/confetti'
import styles from './Compliments.module.css'

export default function Compliments() {
  const { compliments } = config
  const [current, setCurrent] = useState(null)

  const giveCompliment = (e) => {
    let next
    // avoid repeating the same compliment twice in a row (when list > 1)
    do {
      next = compliments.list[(Math.random() * compliments.list.length) | 0]
    } while (compliments.list.length > 1 && next === current)
    setCurrent(next)
    const rect = e.currentTarget.getBoundingClientRect()
    starTwinkle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <section className="section" id="compliments" aria-labelledby="compliments-heading">
      <Reveal>
        <div className={styles.wrap}>
          <span className={styles.doodle} aria-hidden="true">🎁</span>
          <h2 id="compliments-heading" className="section-heading">
            {compliments.heading}
          </h2>
          <button type="button" className="friendly-button" onClick={giveCompliment}>
            {compliments.buttonLabel}
          </button>

          <div className={styles.output} aria-live="polite">
            <AnimatePresence mode="wait">
              {current && (
                <motion.p
                  key={current}
                  className={styles.compliment}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {current}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
