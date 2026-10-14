import { motion } from 'framer-motion'
import { useReducedMotion } from '../utils/hooks'

/**
 * Wraps a section and gently fades/slides it in when it scrolls
 * into view. Renders instantly under reduced motion.
 */
export default function Reveal({ children, delay = 0, ...rest }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
