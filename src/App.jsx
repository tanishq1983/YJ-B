import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import config from './config'
import OpeningScene from './components/OpeningScene'
import FloatingDoodles from './components/FloatingDoodles'
import SparkleTrail from './components/SparkleTrail'
import Greeting from './components/Greeting'
import Scrapbook from './components/Scrapbook'
import Notes from './components/Notes'
import FinalSurprise from './components/FinalSurprise'
import Compliments from './components/Compliments'
import MusicToggle from './components/MusicToggle'
import BackToTop from './components/BackToTop'
import { confettiBurst } from './utils/confetti'
import styles from './App.module.css'

/* Inject the editable palette from config.js as CSS variables */
function applyPalette(palette) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(palette)) {
    root.style.setProperty(`--c-${key}`, value)
  }
}

export default function App() {
  const [showOpening, setShowOpening] = useState(true)

  useEffect(() => {
    applyPalette(config.palette)
  }, [])

  const finishOpening = () => {
    setShowOpening(false)
    // a small celebratory burst as the main site is revealed
    setTimeout(() => confettiBurst({ y: window.innerHeight * 0.35 }), 350)
  }

  return (
    <>
      <a className="sr-only" href="#greeting">Skip to the birthday message</a>

      <FloatingDoodles />
      <SparkleTrail />
      <MusicToggle />
      <BackToTop />

      <main>
        {/* The main site is always rendered behind the opening scene so
            it is instantly ready the moment the envelope opens. */}
        <div className={styles.site} aria-hidden={showOpening}>
          <Greeting />
          <Scrapbook />
          <Notes />
          <FinalSurprise />
          <Compliments />

          <footer className={styles.footer}>
            <p>
              made with 🌸, a lot of ✨ &amp; exactly one {config.friend.doodleNickname === 'dost' ? '🤝' : '🎁'}
              <br />
              <span className={styles.footerHand}>happy birthday, {config.friend.name}! don't forget the cake 🎂</span>
            </p>
          </footer>
        </div>

        <AnimatePresence>
          {showOpening && <OpeningScene key="opening" onFinish={finishOpening} />}
        </AnimatePresence>
      </main>
    </>
  )
}
