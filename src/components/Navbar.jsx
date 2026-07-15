/**
 * Navbar.jsx
 * Sticky top navigation with:
 *  – Transparent at top → glass blur after scroll
 *  – Active section highlighting via IntersectionObserver
 *  – Mobile hamburger menu with overlay
 *  – Resume download button
 *  – Theme toggle
 *  – Keyboard navigation and ARIA attributes
 */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { navLinks, personal } from '../data/portfolioData'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActive]    = useState('home')
  const menuRef = useRef(null)

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Active section via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.id)
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35, rootMargin: '-60px 0px -30% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // ── Close menu on outside click ──
  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  // ── Close menu on Escape ──
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 'var(--z-nav)',
    transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    background: scrolled ? 'var(--clr-surface)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--clr-border)' : '1px solid transparent',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  }

  return (
    <header style={navStyle} role="banner">
      <nav
        className="navbar"
        aria-label="Primary navigation"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Jayanta Pawar — go to top"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--clr-text)',
            flexShrink: 0,
            textDecoration: 'none',
          }}
        >
          <span style={{ color: 'var(--clr-primary)' }}>J</span>ayanta
          <span style={{ color: 'var(--clr-accent)' }}>.</span>
        </a>

        {/* Desktop nav links */}
        <ul
          className="navbar__links"
          role="list"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            listStyle: 'none',
          }}
        >
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: activeSection === link.id ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
                  background: activeSection === link.id ? 'var(--clr-primary-dim)' : 'transparent',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activeSection !== link.id) e.target.style.color = 'var(--clr-text)'
                }}
                onMouseLeave={e => {
                  if (activeSection !== link.id) e.target.style.color = 'var(--clr-text-muted)'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div
          className="navbar__actions"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
        >
          <ThemeToggle />

          {/* Resume download — desktop */}
          <a
            href={personal.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            download="Jayanta_Rajendra_Pawar_Resume.pdf"
            className="btn btn--outline btn--sm"
            aria-label="Download Resume PDF"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Resume</span>
          </a>

          {/* Hamburger — mobile only */}
          <motion.button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'none', // shown via CSS media query
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--clr-primary-dim)',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--clr-primary)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 'calc(var(--z-nav) - 2)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(80vw, 300px)',
              height: '100vh',
              background: 'var(--clr-bg-2)',
              borderLeft: '1px solid var(--clr-border)',
              zIndex: 'calc(var(--z-nav) - 1)',
              display: 'flex',
              flexDirection: 'column',
              padding: '5rem 1.5rem 2rem',
              gap: '0.5rem',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--clr-surface)',
                border: '1px solid var(--clr-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--clr-text)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Name tag in drawer */}
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--clr-text)',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--clr-border)',
            }}>
              <span style={{ color: 'var(--clr-primary)' }}>J</span>ayanta
              <span style={{ color: 'var(--clr-accent)' }}>.</span>
            </p>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                aria-current={activeSection === link.id ? 'page' : undefined}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: activeSection === link.id ? 'var(--clr-primary)' : 'var(--clr-text)',
                  background: activeSection === link.id ? 'var(--clr-primary-dim)' : 'transparent',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Resume download in drawer */}
            <a
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              download="Jayanta_Rajendra_Pawar_Resume.pdf"
              className="btn btn--primary"
              style={{ marginTop: '1rem', justifyContent: 'center' }}
              aria-label="Download Resume PDF"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline style to show hamburger on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .navbar__hamburger { display: flex !important; }
          .navbar__links { display: none !important; }
          .navbar__actions .btn--outline { display: none !important; }
        }
      `}</style>
    </header>
  )
}
