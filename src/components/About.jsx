/**
 * About.jsx
 * Personal bio, detail cards, and resume download button.
 * Scroll-reveal via Framer Motion whileInView.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { User, GraduationCap, MapPin, Target, Briefcase, Languages, Download, ExternalLink } from 'lucide-react'
import { about, personal } from '../data/portfolioData'

// Icon map for detail cards
const ICONS = { User, GraduationCap, MapPin, Target, Briefcase, Languages }

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span className="section__eyebrow" variants={fadeUp}>
            Get to Know Me
          </motion.span>
          <motion.h2 className="section__title" id="about-heading" variants={fadeUp}>
            About Me
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div
          className="about__layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left — bio text + resume button */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <motion.div variants={fadeUp}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                marginBottom: '1rem',
                color: 'var(--clr-text)',
              }}>
                Aspiring Software Engineer &amp; Lifelong Learner
              </h3>
              {about.bio.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '1rem', lineHeight: 1.85 }}>
                  {para.trim()}
                </p>
              ))}
            </motion.div>

            {/* Resume buttons */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={personal.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                aria-label="View resume in new tab"
              >
                <ExternalLink size={16} />
                View Resume
              </a>
              <a
                href={personal.resumePath}
                download="Jayanta_Rajendra_Pawar_Resume.pdf"
                className="btn btn--outline"
                aria-label="Download resume PDF"
              >
                <Download size={16} />
                Download PDF
              </a>
            </motion.div>

            {/* Decorative quote */}
            <motion.blockquote
              variants={fadeUp}
              style={{
                borderLeft: '3px solid var(--clr-primary)',
                paddingLeft: '1rem',
                margin: 0,
                fontStyle: 'italic',
                color: 'var(--clr-text-faint)',
                fontSize: '0.9rem',
              }}
            >
              "Focused on building practical skills through projects and continuous learning."
            </motion.blockquote>
          </motion.div>

          {/* Right — detail cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {about.details.map((item) => {
              const Icon = ICONS[item.icon] || User
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.9rem 1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--clr-primary-dim)',
                      border: '1px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--clr-primary)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--clr-text-faint)',
                      marginBottom: '0.1rem',
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--clr-text)',
                      margin: 0,
                    }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
