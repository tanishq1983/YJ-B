import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../config'
import Reveal from './Reveal'
import { confettiBurst, confettiRain, starTwinkle } from '../utils/confetti'
import styles from './FinalSurprise.module.css'

export default function FinalSurprise() {
  const { finalSurprise } = config
  const [revealed, setRevealed] = useState(false)

  const reveal = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    confettiRain()
    setTimeout(() => starTwinkle({ x: rect.left + rect.width / 2, y: rect.top }), 200)
    setTimeout(() => starTwinkle({ x: rect.left + rect.width / 2, y: rect.top }), 500)
    setRevealed(true)
  }

  return (
    <section className="section" id="final-surprise" aria-labelledby="final-heading">
      <Reveal>
        <h2 id="final-heading" className="section-heading">
          {finalSurprise.heading}
        </h2>
        <p className="section-subheading">{finalSurprise.subheading}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="cta"
                type="button"
                className={`${styles.bigButton} friendly-button`}
                onClick={reveal}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {finalSurprise.buttonLabel}
              </motion.button>
            ) : (
              <motion.div
                key="tada"
                className={styles.cardWrap}
                initial={{ scale: 0.5, rotate: -6, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.35, duration: 0.8 }}
              >
                <div className={`washi-tape ${styles.tape}`} aria-hidden="true" />
                <div className={styles.card} role="article" aria-label="Final birthday message">
                  <span className={styles.sticker} aria-hidden="true">🌟</span>
                  {finalSurprise.message.split('\n\n').map((para, i) => (
                    <p key={i} className={styles.para}>
                      {para}
                    </p>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.replay}
                  onClick={reveal}
                >
                  {finalSurprise.replayLabel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
