/**
 * Tiny dependency-free canvas confetti.
 * Usage: import { confettiBurst, confettiRain } from '../utils/confetti'
 * Respects prefers-reduced-motion (does nothing when reduced).
 */

const PALETTE = ['#c9b6ff', '#ffd3e0', '#ffefad', '#bfe3ff', '#ffb3a7', '#b8e6c9']
const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let canvas = null
let ctx = null
let pieces = []
let rafId = null
let lastTime = 0

function ensureCanvas() {
  if (canvas) return
  canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
}

function resize() {
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function spawn(x, y, count, spread, power) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * spread
    const speed = power * (0.5 + Math.random() * 0.8)
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      life: 0,
      ttl: 1.8 + Math.random() * 1.2,
      star: Math.random() < 0.25,
    })
  }
}

function drawStar(p) {
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(Math.cos((18 + i * 72) * (Math.PI / 180)) * p.size, -Math.sin((18 + i * 72) * (Math.PI / 180)) * p.size)
    ctx.lineTo(Math.cos((54 + i * 72) * (Math.PI / 180)) * p.size * 0.45, -Math.sin((54 + i * 72) * (Math.PI / 180)) * p.size * 0.45)
  }
  ctx.closePath()
}

function drawRect(p) {
  ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66)
}

function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05)
  lastTime = now
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  pieces = pieces.filter((p) => p.life < p.ttl)
  for (const p of pieces) {
    p.life += dt
    p.vy += 620 * dt // gravity
    p.vx *= 0.995
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.rot += p.rotSpeed

    const alpha = p.life > p.ttl - 0.5 ? (p.ttl - p.life) / 0.5 : 1
    ctx.save()
    ctx.globalAlpha = Math.max(alpha, 0)
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    ctx.fillStyle = p.color
    if (p.star) {
      drawStar(p)
      ctx.fill()
    } else {
      drawRect(p)
    }
    ctx.restore()
  }

  if (pieces.length > 0) {
    rafId = requestAnimationFrame(tick)
  } else {
    rafId = null
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
}

function start() {
  if (rafId === null) {
    lastTime = performance.now()
    rafId = requestAnimationFrame(tick)
  }
}

/** One joyful burst from a screen position (defaults to bottom-center). */
export function confettiBurst({ x, y } = {}) {
  if (REDUCED) return
  ensureCanvas()
  spawn(
    x ?? window.innerWidth / 2,
    y ?? window.innerHeight * 0.75,
    90,
    0.9,
    560,
  )
  start()
}

/** Gentle drizzle from the top edge — used with the final surprise. */
export function confettiRain() {
  if (REDUCED) return
  ensureCanvas()
  const w = window.innerWidth
  spawn(w * 0.2, -20, 30, 1.4, 260)
  spawn(w * 0.5, -20, 30, 1.4, 260)
  spawn(w * 0.8, -20, 30, 1.4, 260)
  start()
}

/** A few floating stars around a point (no gravity-heavy look). */
export function starTwinkle({ x, y } = {}) {
  if (REDUCED) return
  ensureCanvas()
  spawn(x ?? window.innerWidth / 2, y ?? window.innerHeight / 2, 18, 2.2, 200)
  start()
}
