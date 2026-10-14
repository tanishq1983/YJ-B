import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../config'
import { confettiBurst, starTwinkle } from '../utils/confetti'
import styles from './OpeningScene.module.css'

/**
 * Full-screen opening scene with a little illustrated envelope.
 * Clicking the button animates the envelope open, pops confetti and
 * then the scene fades away to reveal the main website.
 */
export default function OpeningScene({ onFinish }) {
  const { opening } = config
  const [phase, setPhase] = useState('closed') // closed -> opening -> leaving

  const handleOpen = (e) => {
    if (phase !== 'closed') return
    setPhase('opening')
    const rect = e.currentTarget.getBoundingClientRect()
    confettiBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setTimeout(() => starTwinkle({ x: window.innerWidth / 2, y: window.innerHeight * 0.32 }), 500)
    // Let the envelope + card moment breathe, then hand over to the site
    setTimeout(() => setPhase('leaving'), 1900)
    setTimeout(() => onFinish(), 2500)
  }

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
      transition={phase === 'leaving' ? { duration: 0.6 } : { duration: 0.3 }}
      aria-label={phase === 'closed' ? 'Birthday surprise intro' : undefined}
    >
      <motion.h1
        className={styles.heading}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        {opening.heading}
      </motion.h1>

      <motion.p
        className={styles.subheading}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {opening.subheading}
      </motion.p>

      {/* ---- The envelope illustration ---- */}
      <motion.div
        className={styles.envelopeWrap}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        <div
          className={`${styles.envelope} ${phase !== 'closed' ? styles.envelopeOpen : ''}`}
          aria-hidden="true"
        >
          {/* flap */}
          <div className={styles.flap} />
          {/* letter peeking out */}
          <div className={styles.letter}>
            <span className={styles.heartDoodle}>💌</span>
          </div>
          {/* envelope body */}
          <div className={styles.pocket} />
          {/* wax-seal style sticker */}
          <AnimatePresence>
            {phase === 'closed' && (
              <motion.div
                className={styles.seal}
                exit={{ scale: 0, opacity: 0, rotate: 40 }}
                transition={{ duration: 0.25 }}
              >
                Y
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        type="button"
        className="friendly-button"
        onClick={handleOpen}
        disabled={phase !== 'closed'}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closed' ? 1 : 0 }}
        transition={{ delay: phase === 'closed' ? 0.9 : 0, duration: 0.4 }}
        style={phase !== 'closed' ? { pointerEvents: 'none' } : undefined}
      >
        🎁 {opening.buttonLabel}
      </motion.button>

      <motion.p
        className={styles.caption}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closed' ? 0.7 : 1 }}
        transition={{ delay: phase === 'closed' ? 1.4 : 0.2, duration: 0.5 }}
      >
        {phase === 'closed' ? opening.cheekyCaption : 'one moment... ✨'}
      </motion.p>
    </motion.div>
  )
}
