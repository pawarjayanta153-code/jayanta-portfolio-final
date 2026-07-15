/**
 * LoadingScreen.jsx
 * Initial loading animation shown while the app bootstraps.
 * Animates out with Framer Motion before unmounting.
 */
import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      aria-label="Loading portfolio"
      role="status"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--clr-bg)',
        gap: '2rem',
      }}
    >
      {/* Animated logo mark */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        style={{ position: 'relative' }}
      >
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--clr-primary)',
            borderRightColor: 'var(--clr-accent)',
            position: 'absolute',
            inset: -8,
          }}
        />
        {/* Inner logo text */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--clr-primary-dim)',
            border: '1px solid var(--clr-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--clr-primary)',
          }}
        >
          JP
        </div>
      </motion.div>

      {/* Name and title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--clr-text)',
          marginBottom: '0.25rem',
        }}>
          Jayanta Pawar
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>
          Portfolio Loading…
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        style={{
          width: 160,
          height: 3,
          background: 'var(--clr-border)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'var(--grad-primary)',
            borderRadius: 99,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
