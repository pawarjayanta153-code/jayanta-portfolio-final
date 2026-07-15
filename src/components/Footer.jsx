/**
 * Footer.jsx
 * Site footer with:
 *  – Brand / tagline
 *  – Quick nav links
 *  – Social icons
 *  – Resume download
 *  – Copyright line
 *  – "Back to top" shortcut
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, Heart, ArrowUp } from 'lucide-react'
import { personal, footerLinks } from '../data/portfolioData'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer
      aria-label="Site footer"
      style={{
        background: 'var(--clr-bg-2)',
        borderTop: '1px solid var(--clr-border)',
        padding: '3rem 1.5rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main footer row */}
        <div
          className="footer__layout"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: 280 }}
          >
            <a
              href="#home"
              onClick={e => scrollTo(e, '#home')}
              style={{ display: 'inline-block', marginBottom: '0.75rem', textDecoration: 'none' }}
              aria-label="Jayanta Pawar — go to top"
            >
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: 'var(--clr-text)',
              }}>
                <span style={{ color: 'var(--clr-primary)' }}>J</span>ayanta
                <span style={{ color: 'var(--clr-accent)' }}>.</span>
              </span>
            </a>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--clr-text-muted)', margin: 0 }}>
              BCA graduate and aspiring software engineer learning Python Full Stack Development with Generative AI.
              Open to entry-level roles and internships.
            </p>

            {/* Social row */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.1rem' }}>
              {[
                { href: personal.github,          Icon: Github,   label: 'GitHub profile' },
                { href: personal.linkedin,         Icon: Linkedin, label: 'LinkedIn profile' },
                { href: `mailto:${personal.email}`,Icon: Mail,     label: 'Send email' },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 38, height: 38,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--clr-surface)',
                    border: '1px solid var(--clr-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--clr-text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--clr-primary)'; e.currentTarget.style.borderColor = 'var(--clr-border-2)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--clr-text-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)' }}
                >
                  <Icon size={17} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-faint)', marginBottom: '0.9rem' }}>
              Quick Links
            </p>
            <ul
              className="footer__links"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}
            >
              {footerLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => scrollTo(e, link.href)}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--clr-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.color = 'var(--clr-primary)' }}
                    onMouseLeave={e => { e.target.style.color = 'var(--clr-text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Resume download */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-faint)', marginBottom: '0.9rem' }}>
              Resume
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a
                href={personal.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--sm"
                aria-label="View resume in new tab"
                style={{ gap: '0.4rem' }}
              >
                <Download size={14} aria-hidden="true" />
                Download Resume
              </a>
              <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', margin: 0 }}>
                PDF · Updated 2024
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingTop: '0.5rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-faint)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
            © {YEAR} Jayanta Rajendra Pawar · Built with
            <Heart size={13} style={{ color: 'var(--clr-error)' }} aria-label="love" />
            using React &amp; Vite
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              background: 'var(--clr-primary-dim)',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--clr-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowUp size={14} aria-hidden="true" /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
