/**
 * CurrentlyLearning.jsx
 * Displays the Python Full Stack + GenAI course curriculum.
 * Each module shows one of three statuses: learning | practising | completed
 * Includes a prominent disclaimer so recruiters understand these are
 * learning-stage skills, not professional experience.
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle2, RefreshCw, Loader, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { currentCourse } from '../data/portfolioData'

/**
 * MODULE_STATUS
 * Keys must match the `status` values used in portfolioData.js → currentCourse.categories[].modules[].
 * To add a new status: add a key here and use it in the data file.
 *
 * Progress bar counts any module whose status === 'COMPLETED'.
 */
const MODULE_STATUS = {
  COMPLETED:  { icon: CheckCircle2, color: 'var(--clr-success)', label: 'Completed',  bg: 'rgba(104,211,145,0.1)' },
  PRACTISING: { icon: RefreshCw,    color: 'var(--clr-primary)', label: 'Practising', bg: 'var(--clr-primary-dim)' },
  LEARNING:   { icon: Loader,       color: 'var(--clr-warning)', label: 'Learning',   bg: 'rgba(246,173,85,0.1)'  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Single course category card, expandable
function CategoryCard({ cat, index }) {
  const [expanded, setExpanded] = useState(index < 2) // first two open by default

  // Progress is derived entirely from data — no manual counts needed.
  // Change a module's status to 'COMPLETED' in portfolioData.js and this updates automatically.
  const completed = cat.modules.filter(m => m.status === 'COMPLETED').length
  const total     = cat.modules.length
  const progress  = Math.round((completed / total) * 100)

  return (
    <motion.div
      variants={fadeUp}
      className="glass-card"
      style={{ cursor: 'default', padding: '1.25rem' }}
    >
      {/* Card header — click to expand/collapse */}
      <button
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-controls={`cat-${cat.id}`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: 0,
          color: 'inherit',
        }}
      >
        {/* Category icon */}
        <span aria-hidden="true" style={{ fontSize: '1.5rem', flexShrink: 0 }}>
          {cat.icon}
        </span>

        {/* Title + progress */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.98rem',
            color: 'var(--clr-text)',
            margin: 0,
            marginBottom: '0.35rem',
          }}>
            {cat.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Progress bar */}
            <div style={{
              flex: 1,
              height: 4,
              background: 'var(--clr-border)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                style={{
                  height: '100%',
                  background: 'var(--grad-primary)',
                  borderRadius: 2,
                }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--clr-text-faint)', whiteSpace: 'nowrap' }}>
              {completed}/{total}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <span style={{ color: 'var(--clr-text-faint)', flexShrink: 0 }} aria-hidden="true">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Expandable module list */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`cat-${cat.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--clr-border)',
            }}>
              {cat.modules.map(mod => {
                const cfg  = MODULE_STATUS[mod.status] || MODULE_STATUS.LEARNING
                const Icon = cfg.icon
                return (
                  <div
                    key={mod.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: cfg.bg,
                    }}
                  >
                    <Icon
                      size={14}
                      style={{ color: cfg.color, flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--clr-text)', flex: 1 }}>
                      {mod.name}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: cfg.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                    }}>
                      {cfg.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CurrentlyLearning() {
  return (
    <section
      id="learning"
      aria-labelledby="learning-heading"
      style={{ background: 'var(--clr-bg)' }}
    >
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__eyebrow">In Progress</span>
          <h2 className="section__title" id="learning-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <BookOpen size={28} style={{ color: 'var(--clr-primary)' }} aria-hidden="true" />
            {currentCourse.title}
          </h2>

          {/* Currently Learning badge */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem 0' }}>
            <span className="status-pill status-pill--learning">
              <span className="status-pill__dot" aria-hidden="true" />
              {currentCourse.status}
            </span>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            role="note"
            aria-label="Important disclaimer about learning status"
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              maxWidth: 680,
              margin: '1.25rem auto 0',
              padding: '1rem 1.25rem',
              background: 'rgba(246,173,85,0.08)',
              border: '1px solid rgba(246,173,85,0.25)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={18} style={{ color: 'var(--clr-warning)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', margin: 0, lineHeight: 1.7 }}>
              {currentCourse.disclaimer}
            </p>
          </motion.div>
        </motion.div>

        {/* Module status legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
          role="note"
          aria-label="Module status legend"
        >
          {Object.entries(MODULE_STATUS).map(([key, cfg]) => {
            const Icon = cfg.icon
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Icon size={14} style={{ color: cfg.color }} aria-hidden="true" />
                <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>{cfg.label}</span>
              </div>
            )
          })}
        </motion.div>

        {/* Category cards */}
        <motion.div
          className="learning__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {currentCourse.categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
