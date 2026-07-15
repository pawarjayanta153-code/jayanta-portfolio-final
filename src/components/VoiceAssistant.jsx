/**
 * VoiceAssistant.jsx
 * Floating voice introduction widget using Web Speech API.
 *
 * Browser autoplay policy: Speech synthesis requires a prior user gesture.
 * This component NEVER auto-plays. The user must click "Play Introduction" first.
 *
 * Features:
 *  – English and Marathi language options
 *  – Play / Pause / Resume / Stop / Replay controls
 *  – Volume and speech-rate sliders
 *  – Animated waveform while speaking
 *  – Scrolling transcript (accessibility)
 *  – sessionStorage: does not replay automatically on revisit
 *  – Graceful fallback when Web Speech API is unsupported
 *  – Marathi voice fallback message if no Marathi voice available
 */
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, X, Play, Pause, Square, RefreshCw, Volume2, ChevronDown, ChevronUp, Globe } from 'lucide-react'
import useSpeech from '../hooks/useSpeech'
import { voiceScripts } from '../data/portfolioData'

// ── Animated waveform bars ────────────────────────────────────────────────
function Waveform({ active }) {
  return (
    <div
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28 }}
    >
      {[0.4, 0.7, 1, 0.7, 0.5, 0.9, 0.6, 1, 0.8, 0.5].map((h, i) => (
        <motion.div
          key={i}
          animate={active ? {
            scaleY: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3],
          } : { scaleY: 0.2 }}
          transition={active ? {
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.07,
            ease: 'easeInOut',
          } : { duration: 0.3 }}
          style={{
            width: 3,
            height: '100%',
            background: active ? 'var(--clr-primary)' : 'var(--clr-border)',
            borderRadius: 2,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}

// ── Language selector button ──────────────────────────────────────────────
function LangButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.3rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        border: '1.5px solid',
        transition: 'all 0.2s',
        borderColor: active ? 'var(--clr-primary)' : 'var(--clr-border)',
        background:  active ? 'var(--clr-primary-dim)' : 'transparent',
        color:       active ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
      }}
    >
      {children}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function VoiceAssistant() {
  const [open, setOpen]                   = useState(false)
  const [lang, setLang]                   = useState('en')
  const [showTranscript, setShowTranscript] = useState(false)
  const panelRef = useRef(null)

  const {
    isSupported, isSpeaking, isPaused, isLoading, error,
    hasPlayed, rate, volume, setRate, setVolume,
    speak, pause, resume, stop,
  } = useSpeech()

  const script = voiceScripts[lang] || voiceScripts.english

  const handlePlay = () => {
    speak(script, lang)
  }

  const handleLangChange = (newLang) => {
    stop()
    setLang(newLang)
  }

  // Toggle panel open/closed
  const toggleOpen = () => {
    setOpen(o => !o)
    if (isSpeaking || isPaused) stop()
  }

  if (!isSupported) {
    // Still render the button — panel will show unsupported message
  }

  return (
    <div
      className="voice-widget"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 'var(--z-above)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
      }}
    >
      {/* Floating mic button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Close voice assistant' : 'Open voice introduction'}
        aria-expanded={open}
        aria-controls="voice-panel"
        style={{
          width: 52,
          height: 52,
          borderRadius: 'var(--radius-full)',
          background: isSpeaking ? 'var(--grad-primary)' : 'var(--clr-surface)',
          border: '1.5px solid',
          borderColor: isSpeaking ? 'transparent' : 'var(--clr-border)',
          color: isSpeaking ? '#fff' : 'var(--clr-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isSpeaking ? 'var(--shadow-glow)' : 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Pulsing ring when speaking */}
        {isSpeaking && (
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'var(--clr-primary)',
            }}
          />
        )}
        <motion.div
          animate={open ? { rotate: 0 } : { rotate: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {open ? <X size={22} /> : <Mic size={22} />}
        </motion.div>
      </motion.button>

      {/* Voice panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="voice-panel"
            ref={panelRef}
            role="region"
            aria-label="Voice introduction panel"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="voice-panel"
            style={{
              width: 300,
              background: 'var(--clr-bg-2)',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: 36, height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'var(--clr-primary-dim)',
                border: '1px solid var(--clr-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--clr-primary)',
                flexShrink: 0,
              }} aria-hidden="true">
                <Mic size={18} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--clr-text)', margin: 0 }}>
                  Voice Introduction
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--clr-text-faint)', margin: 0 }}>
                  {!isSupported
                    ? 'Not supported in this browser'
                    : hasPlayed ? 'Tap to replay anytime' : 'Tap once to hear the intro'
                  }
                </p>
              </div>
            </div>

            {/* Unsupported message */}
            {!isSupported ? (
              <div style={{
                padding: '0.75rem',
                background: 'rgba(252,129,129,0.1)',
                border: '1px solid rgba(252,129,129,0.2)',
                borderRadius: 'var(--radius-md)',
              }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--clr-error)', margin: 0, lineHeight: 1.6 }}>
                  Your browser does not support the Web Speech API. Please try Chrome, Edge or Safari for the voice introduction.
                </p>
              </div>
            ) : (
              <>
                {/* Language selector */}
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Globe size={13} aria-hidden="true" /> Language
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <LangButton active={lang === 'en'} onClick={() => handleLangChange('en')}>
                      English
                    </LangButton>
                    <LangButton active={lang === 'mr'} onClick={() => handleLangChange('mr')}>
                      मराठी
                    </LangButton>
                  </div>
                </div>

                {/* Waveform */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Waveform active={isSpeaking && !isPaused} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)' }}>
                    {isLoading ? 'Loading…'
                      : isSpeaking && !isPaused ? 'Speaking…'
                      : isPaused ? 'Paused'
                      : hasPlayed ? 'Ready to replay'
                      : 'Ready'}
                  </span>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {/* Play / Replay */}
                  {!isSpeaking && !isPaused && (
                    <motion.button
                      className="btn btn--primary btn--sm"
                      onClick={handlePlay}
                      disabled={isLoading}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      style={{ flex: 1, justifyContent: 'center' }}
                      aria-label={hasPlayed ? 'Replay voice introduction' : 'Play voice introduction'}
                    >
                      {hasPlayed ? <RefreshCw size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                      {hasPlayed ? 'Replay' : 'Play Introduction'}
                    </motion.button>
                  )}

                  {/* Pause */}
                  {isSpeaking && !isPaused && (
                    <motion.button
                      className="btn btn--outline btn--sm"
                      onClick={pause}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Pause voice introduction"
                    >
                      <Pause size={14} aria-hidden="true" /> Pause
                    </motion.button>
                  )}

                  {/* Resume */}
                  {isPaused && (
                    <motion.button
                      className="btn btn--primary btn--sm"
                      onClick={resume}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Resume voice introduction"
                    >
                      <Play size={14} aria-hidden="true" /> Resume
                    </motion.button>
                  )}

                  {/* Stop */}
                  {(isSpeaking || isPaused) && (
                    <motion.button
                      className="btn btn--ghost btn--sm"
                      onClick={stop}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Stop voice introduction"
                    >
                      <Square size={14} aria-hidden="true" /> Stop
                    </motion.button>
                  )}
                </div>

                {/* Volume */}
                <div>
                  <label htmlFor="voice-volume" style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
                    <Volume2 size={13} aria-hidden="true" /> Volume: {Math.round(volume * 100)}%
                  </label>
                  <input
                    id="voice-volume"
                    type="range"
                    min="0.1" max="1" step="0.05"
                    value={volume}
                    onChange={e => setVolume(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--clr-primary)', cursor: 'pointer' }}
                    aria-label={`Volume: ${Math.round(volume * 100)} percent`}
                  />
                </div>

                {/* Speed */}
                <div>
                  <label htmlFor="voice-rate" style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
                    ⏩ Speed: {rate.toFixed(2)}×
                  </label>
                  <input
                    id="voice-rate"
                    type="range"
                    min="0.5" max="1.8" step="0.05"
                    value={rate}
                    onChange={e => setRate(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--clr-primary)', cursor: 'pointer' }}
                    aria-label={`Speech rate: ${rate.toFixed(2)} times`}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div style={{
                    padding: '0.6rem 0.85rem',
                    background: lang === 'mr' ? 'rgba(246,173,85,0.1)' : 'rgba(252,129,129,0.1)',
                    border: `1px solid ${lang === 'mr' ? 'rgba(246,173,85,0.25)' : 'rgba(252,129,129,0.2)'}`,
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <p style={{ fontSize: '0.78rem', color: lang === 'mr' ? 'var(--clr-warning)' : 'var(--clr-error)', margin: 0, lineHeight: 1.6 }}>
                      {error}
                    </p>
                  </div>
                )}

                {/* Transcript toggle */}
                <div>
                  <button
                    onClick={() => setShowTranscript(s => !s)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--clr-surface)',
                      border: '1px solid var(--clr-border)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      color: 'var(--clr-text-muted)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                    aria-expanded={showTranscript}
                    aria-controls="voice-transcript"
                  >
                    <span>Transcript</span>
                    {showTranscript ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {showTranscript && (
                      <motion.div
                        id="voice-transcript"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          aria-live="polite"
                          aria-label="Voice introduction transcript"
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.75rem',
                            background: 'var(--clr-surface)',
                            border: '1px solid var(--clr-border)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.8rem',
                            color: 'var(--clr-text-muted)',
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line',
                            maxHeight: 160,
                            overflowY: 'auto',
                          }}
                        >
                          {script}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
