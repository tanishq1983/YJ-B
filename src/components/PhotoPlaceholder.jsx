import styles from './PhotoPlaceholder.module.css'

/**
 * Cute hand-drawn SVG shown whenever a photo file hasn't been added
 * to public/images/ yet — keeps the layout pretty and never broken.
 */
export default function PhotoPlaceholder() {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 100 100" width="72%" height="72%" aria-hidden="true">
        <rect x="22" y="10" width="56" height="80" rx="4" fill="#bfe3ff" stroke="#4a3b5c" strokeWidth="1.5" />
        <circle cx="42" cy="62" r="7" fill="#fff" stroke="#4a3b5c" strokeWidth="1.3" />
        <path d="M28 78 Q40 62 52 74 Q62 66 72 78" fill="none" stroke="#4a3b5c" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M56 22 l3 6 6 1 -5 4 2 6 -6-3 -6 3 2-6 -5-4 6-1z" fill="#ffefad" stroke="#4a3b5c" strokeWidth="1" />
        <text x="50" y="98" textAnchor="middle" fontSize="7" fill="#4a3b5c" fontFamily="Caveat, cursive">
          (add your photo here!)
        </text>
      </svg>
      <p className={styles.text}>photo coming soon 📷</p>
    </div>
  )
}
