/**
 * Education.jsx
 * Animated vertical timeline showing academic qualifications.
 * Marks are hidden by default — controlled via portfolioData.js showMarks field.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react'
import { education } from '../data/portfolioData'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// Status badge colours
const STATUS_STYLE = {
  Pursuing:  { bg: 'rgba(246,173,85,0.12)', color: 'var(--clr-warning)', border: 'rgba(246,173,85,0.25)' },
  Completed: { bg: 'rgba(104,211,145,0.12)', color: 'var(--clr-success)', border: 'rgba(104,211,145,0.25)' },
}

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading">
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
            Academic Background
          </motion.span>
          <motion.h2 className="section__title" id="education-heading" variants={fadeUp}>
            Education
          </motion.h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            My academic journey and qualifications in computer applications.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            maxWidth: 760,
            margin: '0 auto',
            paddingLeft: '2.5rem',
          }}
        >
          {/* Vertical line */}
          <div
            className="timeline__line"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '1rem',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, var(--clr-primary), var(--clr-accent), transparent)',
              borderRadius: 1,
            }}
          />

          {education.map((edu, i) => {
            const statusStyle = STATUS_STYLE[edu.status] || STATUS_STYLE.Completed
            const IsLast = i === education.length - 1

            return (
              <motion.div
                key={edu.id}
                className="timeline__item"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                style={{ marginBottom: IsLast ? 0 : '2.5rem', position: 'relative' }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="timeline__dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-1.95rem',
                    top: '1.4rem',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'var(--grad-primary)',
                    border: '2px solid var(--clr-bg)',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                />

                {/* Card */}
                <motion.div
                  className="glass-card"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'default' }}
                >
                  {/* Card header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '0.75rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--clr-primary-dim)',
                        border: '1px solid var(--clr-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: 'var(--clr-primary)',
                      }} aria-hidden="true">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--clr-text)',
                          marginBottom: '0.2rem',
                          lineHeight: 1.3,
                        }}>
                          {edu.degree}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'var(--clr-primary)',
                          fontWeight: 500,
                          margin: 0,
                        }}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {edu.status === 'Pursuing'
                        ? <Clock size={12} aria-hidden="true" />
                        : <CheckCircle size={12} aria-hidden="true" />
                      }
                      {edu.status}
                    </span>
                  </div>

                  {/* Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <Calendar size={14} style={{ color: 'var(--clr-text-faint)' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>{edu.duration}</span>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                      {edu.description}
                    </p>
                  )}

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      {edu.highlights.map(h => (
                        <span key={h} className="badge">{h}</span>
                      ))}
                    </div>
                  )}

                  {/* Marks — only shown if enabled in data */}
                  {edu.showMarks && edu.marks && (
                    <p style={{
                      marginTop: '0.75rem',
                      fontSize: '0.85rem',
                      color: 'var(--clr-text-muted)',
                    }}>
                      Result: <strong style={{ color: 'var(--clr-text)' }}>{edu.marks}</strong>
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
