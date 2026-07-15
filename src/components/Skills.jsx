/**
 * Skills.jsx
 * Filterable skill cards grouped by category.
 * Uses status labels (Comfortable / Familiar / Currently Learning) — no fake percentages.
 */
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillFilters } from '../data/portfolioData'

// Status display config
const STATUS_CONFIG = {
  comfortable: { label: 'Comfortable',         className: 'badge badge--cyan' },
  familiar:    { label: 'Familiar',             className: 'badge badge--accent' },
  learning:    { label: 'Currently Learning',   className: 'badge badge--learning' },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.25 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() =>
    activeFilter === 'all'
      ? skills
      : skills.filter(s => s.category === activeFilter),
    [activeFilter]
  )

  return (
    <section id="skills" aria-labelledby="skills-heading" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__eyebrow">What I Work With</span>
          <h2 className="section__title" id="skills-heading">Skills &amp; Technologies</h2>
          <p className="section__subtitle">
            Technologies I have worked with in academic projects and coursework. Status labels reflect current proficiency honestly.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="skills__filters"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          role="tablist"
          aria-label="Filter skills by category"
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {skillFilters.map(f => (
            <motion.button
              key={f.id}
              role="tab"
              aria-selected={activeFilter === f.id}
              aria-controls="skills-grid"
              onClick={() => setActiveFilter(f.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1.5px solid',
                transition: 'all 0.2s ease',
                borderColor: activeFilter === f.id ? 'var(--clr-primary)' : 'var(--clr-border)',
                background: activeFilter === f.id ? 'var(--clr-primary-dim)' : 'transparent',
                color: activeFilter === f.id ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          id="skills-grid"
          className="skills__grid"
          role="tabpanel"
          aria-label={`${activeFilter === 'all' ? 'All' : activeFilter} skills`}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(skill => {
              const statusCfg = STATUS_CONFIG[skill.status] || STATUS_CONFIG.familiar
              return (
                <motion.div
                  key={skill.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    padding: '1.1rem',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: 'var(--clr-border-2)',
                    boxShadow: 'var(--shadow-md), var(--shadow-glow)',
                  }}
                >
                  {/* Icon */}
                  <span
                    aria-hidden="true"
                    style={{ fontSize: '1.6rem', lineHeight: 1 }}
                  >
                    {skill.icon}
                  </span>

                  {/* Skill name */}
                  <p style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--clr-text)',
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {skill.name}
                  </p>

                  {/* Status badge */}
                  <span className={statusCfg.className} style={{ alignSelf: 'flex-start', fontSize: '0.72rem' }}>
                    {statusCfg.label}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.5rem',
            padding: '1rem 1.5rem',
            background: 'var(--clr-surface)',
            border: '1px solid var(--clr-border)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          aria-label="Skill status legend"
          role="note"
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-faint)', width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>
            Status Key
          </p>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <span key={key} className={cfg.className} style={{ fontSize: '0.75rem' }}>
              {cfg.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
