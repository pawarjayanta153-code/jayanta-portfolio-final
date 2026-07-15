/**
 * Experience.jsx
 * Professional / internship experience timeline.
 * Only displays information provided in portfolioData.js — no invented responsibilities.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, Tag, CheckCircle } from 'lucide-react'
import { experience } from '../data/portfolioData'

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__eyebrow">Work History</span>
          <h2 className="section__title" id="experience-heading">Experience</h2>
          <p className="section__subtitle">
            Practical experience gained through internship and volunteer work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            maxWidth: 800,
            margin: '0 auto',
            paddingLeft: '2.5rem',
          }}
        >
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '1rem',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, var(--clr-accent), var(--clr-primary), transparent)',
              borderRadius: 1,
            }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              style={{
                position: 'relative',
                marginBottom: i < experience.length - 1 ? '2.5rem' : 0,
              }}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-1.95rem',
                  top: '1.6rem',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'var(--clr-accent)',
                  border: '2px solid var(--clr-bg)',
                  boxShadow: 'var(--shadow-glow-accent)',
                }}
              />

              {/* Card */}
              <motion.div
                className="glass-card"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Card top row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                }}>
                  {/* Icon + role + org */}
                  <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--clr-accent-dim)',
                      border: '1px solid rgba(159,122,234,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--clr-accent)',
                    }} aria-hidden="true">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--clr-text)',
                        marginBottom: '0.2rem',
                        lineHeight: 1.3,
                      }}>
                        {exp.role}
                      </h3>
                      <p style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--clr-accent)',
                        margin: 0,
                      }}>
                        {exp.organisation}
                      </p>
                    </div>
                  </div>

                  {/* Type + duration badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                    <span className="badge badge--accent">{exp.type}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} style={{ color: 'var(--clr-text-faint)' }} aria-hidden="true" />
                      <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)' }}>
                        {exp.duration} · {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul
                  aria-label="Key responsibilities"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    listStyle: 'none',
                  }}
                >
                  {exp.responsibilities.map(r => (
                    <li key={r} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <CheckCircle
                        size={15}
                        style={{ color: 'var(--clr-success)', flexShrink: 0, marginTop: '0.15rem' }}
                        aria-hidden="true"
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {exp.tags && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                    <Tag size={13} style={{ color: 'var(--clr-text-faint)' }} aria-hidden="true" />
                    {exp.tags.map(t => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* "Looking for first role" note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              padding: '1.25rem 1.5rem',
              background: 'var(--clr-primary-dim)',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
            role="note"
          >
            <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>🎯</span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>
              Currently looking for an <strong style={{ color: 'var(--clr-text)' }}>entry-level software development role</strong> or
              a <strong style={{ color: 'var(--clr-text)' }}>software engineering internship</strong> where I can contribute and grow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
