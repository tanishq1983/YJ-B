import { useState } from 'react'
import config from '../config'
import Reveal from './Reveal'
import NoteModal from './NoteModal'
import styles from './Notes.module.css'

const NOTE_COLORS = ['butter', 'pink', 'sky']
const TAPES = ['washi-tape--sky', 'washi-tape--butter', 'washi-tape--pink']
const ROTATIONS = [-3, 2.5, -2]

export default function Notes() {
  const { notes } = config
  const [openId, setOpenId] = useState(null)
  const openNote = notes.items.find((n) => n.id === openId)

  return (
    <section className="section" id="notes" aria-labelledby="notes-heading">
      <Reveal>
        <h2 id="notes-heading" className="section-heading">
          {notes.heading}
        </h2>
        <p className="section-subheading">{notes.subheading}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.row}>
          {notes.items.map((note, i) => (
            <Envelope
              key={note.id}
              note={note}
              colorClass={NOTE_COLORS[i % NOTE_COLORS.length]}
              tapeClass={TAPES[i % TAPES.length]}
              rotation={ROTATIONS[i % ROTATIONS.length]}
              onOpen={() => setOpenId(note.id)}
              isOpen={openId !== null}
            />
          ))}
        </div>
      </Reveal>

      {openNote && (
        <NoteModal note={openNote} onClose={() => setOpenId(null)} />
      )}
    </section>
  )
}

function Envelope({ note, colorClass, tapeClass, rotation, onOpen, isOpen }) {
  return (
    <button
      type="button"
      className={`${styles.envelope} ${styles[colorClass]}`}
      style={{ rotate: `${rotation}deg` }}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={`Open note: ${note.title}. ${note.preview}`}
    >
      <span className={`washi-tape ${tapeClass}`} style={{ transform: 'translateX(-50%) rotate(-4deg)' }} aria-hidden="true" />
      {/* envelope flap */}
      <span className={styles.flap} aria-hidden="true" />
      {/* cute scalloped bottom edge */}
      <span className={styles.scallopBottom} aria-hidden="true" />
      {/* tiny postage stamp */}
      <span className={styles.stamp} aria-hidden="true">📮</span>
      {/* sticker */}
      <span className={styles.sticker} aria-hidden="true">
        {note.sticker}
      </span>
      {/* preview text */}
      <span className={styles.preview}>"{note.preview}"</span>
      <span className={styles.openHint} aria-hidden="true">
        tap to open ✧
      </span>
    </button>
  )
}
