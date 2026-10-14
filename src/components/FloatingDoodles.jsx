import styles from './FloatingDoodles.module.css'

const STARS = ['✦', '✧', '❀', '✿', '☆', '🌸', '✨', '🌼']

/**
 * Decorative floating stars / flowers / sparkles scattered around the page.
 * Purely decorative (aria-hidden) and disabled under reduced motion via CSS.
 */
export default function FloatingDoodles() {
  const doodles = [
    { left: '3%', top: '10%', size: 24, delay: 0, char: 0 },
    { left: '90%', top: '16%', size: 18, delay: 0.8, char: 3 },
    { left: '7%', top: '32%', size: 14, delay: 1.6, char: 2 },
    { left: '86%', top: '38%', size: 22, delay: 0.4, char: 1 },
    { left: '94%', top: '62%', size: 20, delay: 2.2, char: 5 },
    { left: '5%', top: '66%', size: 16, delay: 1.2, char: 4 },
    { left: '91%', top: '84%', size: 18, delay: 2.8, char: 0 },
    { left: '10%', top: '90%', size: 22, delay: 0.6, char: 6 },
  ]

  return (
    <div className={styles.doodleLayer} aria-hidden="true">
      {doodles.map((d, i) => (
        <span
          key={i}
          className={styles.doodle}
          style={{
            left: d.left,
            top: d.top,
            fontSize: d.size,
            animationDelay: `${d.delay}s`,
          }}
        >
          {STARS[d.char]}
        </span>
      ))}
    </div>
  )
}
