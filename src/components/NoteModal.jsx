import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEscapeKey, useFocusTrap, useBodyScrollLock, useReducedMotion } from '../utils/hooks'
import styles from './NoteModal.module.css'

const COLOR_BY_STICKER = {
  '🌷': 'butter',
  '😂': 'pink',
  '🎂': 'sky',
}

export default function NoteModal({ note, onClose }) {
  useEscapeKey(onClose)
  useBodyScrollLock(true)
  const reduced = useReducedMotion()
  const cardRef = useRef(null)
  const previouslyFocused = useRef(null)
  useFocusTrap(true)

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    cardRef.current?.querySelector('.modal-close')?.focus()
    return () => previouslyFocused.current?.focus?.()
  }, [])

  const color = COLOR_BY_STICKER[note.sticker] || 'butter'

  return (
    <AnimatePresence>
      <div
        className="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-title"
        onClick={onClose}
      >
        <motion.div
          ref={cardRef}
          className={`${styles.paper} ${styles[color]}`}
          initial={reduced ? { scale: 1 } : { rotateX: -80, y: 60, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.65 }}
          style={{ transformOrigin: 'top center', perspective: 800 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={`modal-close ${styles.close}`}
            onClick={onClose}
            aria-label="Close note"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className={styles.foldLine} aria-hidden="true" />

          <h3 id="note-title" className={styles.title}>
            {note.title} {note.sticker}
          </h3>

          <div className={styles.body}>
            {note.message.split('\n\n').map((para, i) => (
              <p key={i} className={styles.para}>
                {para}
              </p>
            ))}
          </div>

          <p className={styles.signature} aria-hidden="true">
            — with lots of birthday energy ✨
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
