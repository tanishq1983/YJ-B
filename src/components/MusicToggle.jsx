import { useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import config from '../config'
import styles from './MusicToggle.module.css'

/**
 * Small music player toggle, OFF by default. If the audio file is
 * missing (or music.enabled = false), the control hides itself
 * gracefully instead of erroring.
 */
export default function MusicToggle() {
  const { music } = config
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // Check whether the file actually exists before showing the control
  useEffect(() => {
    if (!music.enabled) return
    let cancelled = false
    fetch(music.src, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || ''
        const looksLikeAudio = res.ok && !type.includes('text/html') // dev server returns index.html for 404s
        if (!cancelled && looksLikeAudio) setAvailable(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [music])

  const toggle = () => {
    if (!available) return
    if (!audioRef.current) {
      audioRef.current = new Audio(music.src)
      audioRef.current.loop = true
      audioRef.current.volume = 0.55
      audioRef.current.addEventListener('ended', () => setPlaying(false))
    }
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)) // e.g. browser blocked it
    }
  }

  if (!music.enabled || !available) return null

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? `Pause background music` : 'Play background music'}
      title={music.title}
    >
      <span className={`${styles.icon} ${playing ? styles.playing : ''}`} aria-hidden="true">
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </span>
      <span className={styles.label}>{playing ? 'pause' : 'music'}</span>
      <span className={styles.bars} aria-hidden="true">
        <i /><i /><i />
      </span>
    </button>
  )
}
