import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEscapeKey, useFocusTrap, useBodyScrollLock } from '../utils/hooks'
import PhotoPlaceholder from './PhotoPlaceholder'
import styles from './Lightbox.module.css'

export default function Lightbox({ src, alt, caption, onBroken, onClose }) {
  useEscapeKey(onClose)
  useBodyScrollLock(true)
  useFocusTrap(true)

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
      onClick={onClose}
    >
      <motion.div
        className={styles.inner}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close photo" autoFocus>
          <X size={22} aria-hidden="true" />
        </button>
        <div className={styles.frame}>
          {src ? (
            <img src={src} alt={alt} onError={() => onBroken()} className={styles.img} />
          ) : (
            <div className={styles.imgWrap}>
              <PhotoPlaceholder />
            </div>
          )}
        </div>
        {caption && <p className={styles.caption}>{caption}</p>}
      </motion.div>
    </div>
  )
}
