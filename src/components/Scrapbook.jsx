import { useState } from 'react'
import config from '../config'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import PhotoPlaceholder from './PhotoPlaceholder'
import { useReducedMotion } from '../utils/hooks'
import styles from './Scrapbook.module.css'

const tapeClass = (color) =>
  color === 'butter' ? 'washi-tape--butter' :
  color === 'pink' ? 'washi-tape--pink' :
  color === 'sky' ? 'washi-tape--sky' : ''

function Polaroid({ photo, index, onOpen, big = false }) {
  const [broken, setBroken] = useState(false)
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      className={`${styles.polaroid} ${big ? styles.polaroidSingle : ''}`}
      style={{
        rotate: `${photo.rotation}deg`,
        transition: reduced ? 'none' : 'rotate 0.25s ease, transform 0.25s ease',
      }}
      onClick={() => onOpen()}
      aria-label={`Open photo: ${photo.caption}`}
    >
      <span
        className={`washi-tape ${tapeClass(photo.tapeColor)}`}
        style={{ transform: `translateX(-50%) rotate(${index % 2 === 0 ? 4 : -5}deg)` }}
        aria-hidden="true"
      />
      <div className={styles.photoArea}>
        {!broken ? (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            onError={() => setBroken(true)}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      <span className={styles.caption}>{photo.caption}</span>
      <span className={styles.hoverHint} aria-hidden="true">
        click to zoom ✨
      </span>
    </button>
  )
}

export default function Scrapbook() {
  const { scrapbook, photos } = config
  const [lightbox, setLightbox] = useState(null)
  const [brokenInLightbox, setBrokenInLightbox] = useState(false)

  // If only one photo is provided, show a single larger centred composition.
  const single = photos.length === 1

  const closeLightbox = () => {
    setLightbox(null)
    setBrokenInLightbox(false)
  }

  return (
    <section className="section" id="scrapbook" aria-labelledby="scrapbook-heading">
      <Reveal>
        <h2 id="scrapbook-heading" className="section-heading">
          {scrapbook.heading}
        </h2>
        <p className="section-subheading">{scrapbook.subheading}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={single ? styles.singleComposition : styles.board}>
          {photos.map((photo, i) => (
            <Polaroid
              key={i}
              photo={photo}
              index={i}
              big={single}
              onOpen={() => {
                setBrokenInLightbox(false)
                setLightbox(i)
              }}
            />
          ))}
        </div>
      </Reveal>

      {lightbox !== null && photos[lightbox] && (
        <Lightbox
          src={brokenInLightbox ? null : photos[lightbox].src}
          alt={photos[lightbox].alt}
          caption={photos[lightbox].caption}
          onBroken={() => setBrokenInLightbox(true)}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}
