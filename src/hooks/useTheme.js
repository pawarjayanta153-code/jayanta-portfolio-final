/**
 * useTheme.js
 * Manages dark/light theme state with localStorage persistence.
 * Respects the user's OS-level prefers-color-scheme on first visit.
 */
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'jp-theme'

export default function useTheme() {
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
    // Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  const [theme, setThemeState] = useState(getInitialTheme)

  // Apply the theme attribute to <html> and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((value) => {
    if (value === 'dark' || value === 'light') setThemeState(value)
  }, [])

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' }
}
