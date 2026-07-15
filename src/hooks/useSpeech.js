/**
 * useSpeech.js
 * Web Speech API hook for the voice introduction feature.
 *
 * Browser autoplay rule:
 *  – Speech synthesis requires a prior user gesture (click/tap).
 *  – This hook NEVER initiates speech automatically.
 *  – The UI component must call speak() inside a click handler.
 *
 * sessionStorage key 'jp-voice-played' is set to 'true' after the
 * first successful play so the component can show a "Replay" hint.
 */
import { useState, useEffect, useRef, useCallback } from 'react'

const SESSION_KEY = 'jp-voice-played'

export default function useSpeech() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused]   = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)
  const [availableVoices, setAvailableVoices] = useState([])
  const [rate, setRate]     = useState(0.95)
  const [volume, setVolume] = useState(1)

  const utteranceRef = useRef(null)
  const hasPlayedRef = useRef(
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem(SESSION_KEY) === 'true'
      : false
  )
  const [hasPlayed, setHasPlayed] = useState(hasPlayedRef.current)

  // ── Detect support and load voices ──
  useEffect(() => {
    if (!window.speechSynthesis) {
      setIsSupported(false)
      return
    }
    setIsSupported(true)

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  // ── Pick the best matching voice for a given language ──
  const selectVoice = useCallback((lang = 'en') => {
    if (!availableVoices.length) return null

    if (lang === 'mr') {
      // Try Marathi voices first
      const marathi = availableVoices.find(
        v => v.lang.startsWith('mr') || v.name.toLowerCase().includes('marathi')
      )
      if (marathi) return marathi
      // Fallback: any Indian English voice
      const indianEn = availableVoices.find(v => v.lang === 'en-IN')
      return indianEn || null // null = system default
    }

    // English: prefer en-IN, then en-US, then any en
    return (
      availableVoices.find(v => v.lang === 'en-IN') ||
      availableVoices.find(v => v.lang === 'en-US') ||
      availableVoices.find(v => v.lang.startsWith('en')) ||
      null
    )
  }, [availableVoices])

  // ── Speak a text string ──
  const speak = useCallback((text, lang = 'en') => {
    if (!window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    setError(null)
    setIsLoading(true)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate   = rate
    utterance.volume = volume
    utterance.lang   = lang === 'mr' ? 'mr-IN' : 'en-IN'

    const voice = selectVoice(lang)
    if (voice) {
      utterance.voice = voice
    } else if (lang === 'mr') {
      setError('A Marathi voice is not available on this device. Using the default system voice instead.')
    }

    utterance.onstart = () => {
      setIsLoading(false)
      setIsSpeaking(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      setIsLoading(false)
      // Mark as played in session
      try { sessionStorage.setItem(SESSION_KEY, 'true') } catch { /* ignore */ }
      hasPlayedRef.current = true
      setHasPlayed(true)
    }

    utterance.onerror = (e) => {
      // 'interrupted' is a normal cancellation — not a real error
      if (e.error === 'interrupted') {
        setIsSpeaking(false)
        setIsPaused(false)
        setIsLoading(false)
        return
      }
      setError(`Speech error: ${e.error}`)
      setIsSpeaking(false)
      setIsPaused(false)
      setIsLoading(false)
    }

    utteranceRef.current = utterance

    // Small delay to allow voices to load on some browsers
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 100)
  }, [rate, volume, selectVoice])

  const pause = useCallback(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }, [isSpeaking])

  const resume = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }, [isPaused])

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
      setIsLoading(false)
    }
  }, [])

  // ── Clean up on unmount ──
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  return {
    isSupported,
    isSpeaking,
    isPaused,
    isLoading,
    error,
    hasPlayed,
    availableVoices,
    rate,
    volume,
    setRate,
    setVolume,
    speak,
    pause,
    resume,
    stop,
  }
}
