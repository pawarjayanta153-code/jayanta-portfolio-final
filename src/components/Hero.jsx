/**
 * Hero.jsx
 * Full-screen landing section with:
 *  – Animated role-text typewriter cycle
 *  – Profile image with glowing ring
 *  – Floating tech-icon orbits
 *  – Stat cards
 *  – CTA buttons (View Work / Download Resume / Let's Connect)
 *  – Social links (GitHub, LinkedIn, Email)
 *  – Mouse-follow glow effect
 *  – Three.js background (lazy-loaded)
 *  – Reduced-motion safe
 */
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowRight, GraduationCap, Briefcase, Code2, FolderGit2 } from 'lucide-react'
import { personal, heroRoles, heroStats } from '../data/portfolioData'

// Lazy-load Three.js background so it never blocks first paint
const ThreeBackground = lazy(() => import('./ThreeBackground'))

// ── Icon map for stat cards ────────────────────────────────────────────────
const STAT_ICONS = { GraduationCap, Briefcase, Code2, FolderGit2 }


// ── Typing animation hook ──────────────────────────────────────────────────
function useTypingText(items, typingSpeed = 80, pause = 1800, deletingSpeed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex]         = useState(0)
  const [phase, setPhase]         = useState('typing') // typing | pausing | deleting
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = items[index]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          typingSpeed
        )
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      setPhase('deleting')
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(prev => prev.slice(0, -1)),
          deletingSpeed
        )
      } else {
        setIndex(i => (i + 1) % items.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, phase, index, items, typingSpeed, pause, deletingSpeed])

  return displayed
}

// ── Mouse glow ────────────────────────────────────────────────────────────
function MouseGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 60, damping: 20 })
  const springY = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="mouse-glow"
      style={{ left: springX, top: springY }}
      aria-hidden="true"
    />
  )
}

// ── Profile image with animated glow ring ────────────────────────────────
function ProfileImage() {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="profile-image-wrapper"
      style={{ position: 'relative', width: 280, height: 280, margin: '0 auto' }}
    >

      {/* Outer animated blue/purple ring — unchanged */}
      <motion.div
        className="profile-ring-outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--clr-primary)',
          borderRightColor: 'transparent',
          borderBottomColor: 'var(--clr-accent)',
          borderLeftColor: 'transparent',
        }}
        aria-hidden="true"
      />

      {/* Inner dashed counter-rotating ring — unchanged */}
      <motion.div
        className="profile-ring-inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: '1px dashed var(--clr-border-2)',
        }}
        aria-hidden="true"
      />

      {/* Circular clip container — overflow:hidden creates the circle */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid var(--clr-border)',
          boxShadow: 'var(--shadow-glow)',
          position: 'relative',
        }}
      >
        {imgError ? (
          /* Fallback: shows initials if image file is missing */
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--clr-surface)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            aria-label="Profile photo placeholder"
          >
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--grad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
            }}>
              JP
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-faint)', textAlign: 'center', padding: '0 1rem' }}>
              Add photo to<br />/public/images/profile-placeholder.jpeg
            </p>
          </div>
        ) : (
          <img
            src={personal.profileImage}
            alt="Jayanta Rajendra Pawar — profile photo"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        )}
      </div>

    </div>
  )
}

// ── Main Hero component ────────────────────────────────────────────────────
export default function Hero() {
  const roleName    = useTypingText(heroRoles)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── Entrance animation variants ──
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="home"
      aria-label="Hero — Introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64, // navbar height
      }}
    >
      {/* Three.js background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Mouse glow (desktop only) */}
      {!prefersReduced && <MouseGlow />}

      {/* Radial gradient overlays */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 10% 50%, rgba(99,179,237,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 90% 30%, rgba(159,122,234,0.07) 0%, transparent 70%)
        `,
      }} />

      {/* Content grid */}
      <div
        className="hero__layout"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '4rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ── LEFT: Text content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Available badge */}
          <motion.div variants={itemVariants}>
            <span className="status-pill status-pill--available" aria-label="Job status: available for entry-level opportunities">
              <span className="status-pill__dot" aria-hidden="true" />
              Available for Entry-Level Opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants}>
            <h1 style={{ lineHeight: 1.15, marginBottom: '0.5rem' }}>
              Hi, I'm{' '}
              <span className="gradient-text">Jayanta Pawar</span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div variants={itemVariants}>
            <p
              aria-live="polite"
              aria-label={`Currently: ${roleName}`}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 600,
                color: 'var(--clr-text-muted)',
                minHeight: '2rem',
              }}
            >
              <span style={{ color: 'var(--clr-primary)' }}>&gt; </span>
              {roleName}
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 2,
                  height: '1.2em',
                  background: 'var(--clr-primary)',
                  marginLeft: 3,
                  verticalAlign: 'middle',
                  animation: 'typing-cursor 0.9s step-end infinite',
                }}
              />
            </p>
          </motion.div>

          {/* Supporting bio */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--clr-text-muted)',
              maxWidth: '100%',
            }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="hero__buttons"
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.button
              className="btn btn--primary btn-glow"
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my work — scroll to projects"
            >
              View My Work
              <ArrowRight size={16} />
            </motion.button>

            <motion.a
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              download="Jayanta Pawar Resume.pdf"
              className="btn btn--outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Download resume PDF"
            >
              <Download size={16} />
              Download Resume
            </motion.a>

            <motion.button
              className="btn btn--ghost"
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Navigate to contact section"
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="hero__socials"
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
          >
            {[
              {
                href: personal.github,
                Icon: Github,
                label: 'GitHub profile',
                title: 'GitHub',
              },
              {
                href: personal.linkedin,
                Icon: Linkedin,
                label: 'LinkedIn profile',
                title: 'LinkedIn',
              },
              {
                href: `mailto:${personal.email}`,
                Icon: Mail,
                label: 'Send email',
                title: 'Email',
              },
            ].map(({ href, Icon, label, title }) => (
              <motion.a
                key={title}
                href={href}
                target={title !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                title={title}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--clr-surface)',
                  border: '1px solid var(--clr-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--clr-text-muted)',
                  transition: 'color 0.2s, border-color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--clr-primary)'; e.currentTarget.style.borderColor = 'var(--clr-border-2)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--clr-text-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)' }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Profile image + stats ── */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <ProfileImage />

          {/* Stat cards grid */}
          <div
            className="hero__stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              width: '100%',
              maxWidth: 340,
            }}
          >
            {heroStats.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon] || Code2
              return (
                <motion.div
                  key={stat.label}
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.9rem 0.75rem',
                    textAlign: 'center',
                    cursor: 'default',
                  }}
                >
                  <Icon size={20} style={{ color: 'var(--clr-primary)' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--clr-text)', lineHeight: 1.3 }}>
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--clr-text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24,
            height: 38,
            border: '2px solid var(--clr-border)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '5px 0',
          }}
        >
          <div style={{
            width: 4,
            height: 8,
            background: 'var(--clr-primary)',
            borderRadius: 2,
          }} />
        </motion.div>
      </motion.div>

      {/* Inline keyframe for cursor blink */}
      <style>{`
        @keyframes typing-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

