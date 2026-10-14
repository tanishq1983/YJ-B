import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import config from '../config'
import Reveal from './Reveal'
import { useTypewriter, useReducedMotion } from '../utils/hooks'
import styles from './Greeting.module.css'

export default function Greeting() {
  const { greeting, friend } = config
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  // The teaser line gets the gentle typewriter reveal.
  const { output } = useTypewriter(greeting.cardTeaser, {
    enabled: true,
    speed: reduced ? 0 : 34,
    delay: 300,
  })

  return (
    <section className="section" id="greeting" aria-labelledby="greeting-heading">
      <Reveal>
        <h1 id="greeting-heading" className="section-heading">
          {greeting.heading}
        </h1>
        <p className="section-subheading">{greeting.subheading}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className={styles.cardWrap}>
          {/* washi tapes pinning the card */}
          <div className={`washi-tape washi-tape--pink ${styles.tapeLeft}`} aria-hidden="true" />
          <div className={`washi-tape washi-tape--sky ${styles.tapeRight}`} aria-hidden="true" />

          <div className={styles.card} role="article" aria-label="A birthday message from your friend">
            <div className={styles.cardHeader}>
              <span className={styles.doodle} aria-hidden="true">🎈</span>
              <span className={styles.sticker} aria-hidden="true">{friend.doodleNickname === 'dost' ? '🎂' : '⭐'}</span>
            </div>

            <p className={styles.teaser}>
              {output}
              <span className={styles.caret} aria-hidden="true" />
            </p>

            <div
              className={`${styles.fullMessage} ${expanded ? styles.expanded : ''}`}
              aria-hidden={!expanded}
            >
              {greeting.fullMessage.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {!expanded && (
              <div className={styles.fadeBelow} aria-hidden="true" />
            )}

            <button
              type="button"
              className={styles.expandButton}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="greeting-full-message"
            >
              {expanded ? (
                <>
                  Fold the card back up <ChevronUp size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  {greeting.expandButtonLabel} <ChevronDown size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
