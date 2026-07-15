/**
 * ScrollProgress.jsx
 * Thin bar at the top of the viewport showing reading/scroll progress.
 */
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Spring-smooth the raw scroll value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--grad-primary)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 'calc(var(--z-nav) + 10)',
      }}
      aria-hidden="true"
    />
  )
}
