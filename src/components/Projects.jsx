/**
 * Projects.jsx
 * Filterable project cards + full detail modal.
 * Gracefully handles missing images, missing links, and educational disclaimers.
 */
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, ExternalLink, X, ChevronRight, AlertCircle,
  Layers, Image as ImageIcon, CheckCircle, Lightbulb, BookOpen
} from 'lucide-react'
import { projects, projectFilters } from '../data/portfolioData'

// ── Helpers ────────────────────────────────────────────────────────────────

function ProjectImage({ src, alt, style }) {
  const [error, setError] = useState(false)
  if (error || !src) {
    return (
      <div
        className="img-fallback"
        style={{ ...style, minHeight: 180, flexDirection: 'column', gap: '0.5rem' }}
        aria-label={`Project image unavailable: ${alt}`}
      >
        <ImageIcon size={32} style={{ color: 'var(--clr-text-faint)', opacity: 0.4 }} aria-hidden="true" />
        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)' }}>Image coming soon</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      loading="lazy"
      style={style}
    />
  )
}

function LinkButton({ href, icon: Icon, label, disabled, className }) {
  if (disabled || !href) {
    return (
      <span
        className={`btn btn--ghost btn--sm ${className || ''}`}
        style={{ opacity: 0.4, cursor: 'not-allowed' }}
        aria-label={`${label} — not available yet`}
        title="Coming soon"
      >
        <Icon size={14} aria-hidden="true" />
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--ghost btn--sm ${className || ''}`}
      aria-label={`${label} — opens in new tab`}
    >
      <Icon size={14} aria-hidden="true" />
      {label}
    </a>
  )
}

// ── Project Detail Modal ───────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <motion.div
        className="modal__inner"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--clr-bg-2)',
          border: '1px solid var(--clr-border)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: 700,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          style={{
            position: 'sticky',
            top: '1rem',
            float: 'right',
            marginRight: '1rem',
            marginTop: '1rem',
            zIndex: 10,
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--clr-surface)',
            border: '1px solid var(--clr-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--clr-text)',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '1.75rem', paddingTop: '0.75rem', clear: 'both' }}>
          {/* Project image */}
          <ProjectImage
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: 220,
              objectFit: 'cover',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.5rem',
            }}
          />

          {/* Title */}
          <h3
            id={`modal-title-${project.id}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--clr-text)',
              marginBottom: '0.75rem',
            }}
          >
            {project.title}
          </h3>

          {/* Tech badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.technologies.map(t => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>

          {/* Educational disclaimer */}
          {project.disclaimer && (
            <div
              role="note"
              style={{
                display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                padding: '0.75rem 1rem',
                background: 'rgba(246,173,85,0.08)',
                border: '1px solid rgba(246,173,85,0.25)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={15} style={{ color: 'var(--clr-warning)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
              <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)', margin: 0, lineHeight: 1.6 }}>
                {project.disclaimer}
              </p>
            </div>
          )}

          {/* Overview */}
          <ModalSection icon={<Layers size={16} />} title="Overview">
            <p style={{ lineHeight: 1.8 }}>{project.description}</p>
          </ModalSection>

          {/* Problem */}
          {project.problem && (
            <ModalSection icon={<Lightbulb size={16} />} title="Problem Statement">
              <p style={{ lineHeight: 1.8 }}>{project.problem}</p>
            </ModalSection>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <ModalSection icon={<CheckCircle size={16} />} title="Key Features">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <ChevronRight size={14} style={{ color: 'var(--clr-primary)', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <ModalSection icon={<AlertCircle size={16} />} title="Challenges">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.challenges.map(c => (
                  <li key={c} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <ChevronRight size={14} style={{ color: 'var(--clr-accent)', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>{c}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Learning outcomes */}
          {project.learningOutcomes && project.learningOutcomes.length > 0 && (
            <ModalSection icon={<BookOpen size={16} />} title="Learning Outcomes">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.learningOutcomes.map(l => (
                  <li key={l} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <ChevronRight size={14} style={{ color: 'var(--clr-cyan)', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>{l}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <LinkButton href={project.github}   icon={Github}       label="View on GitHub" disabled={!project.github} />
            <LinkButton href={project.liveDemo} icon={ExternalLink} label="Live Demo"       disabled={!project.liveDemo} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ModalSection({ icon, title, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <span style={{ color: 'var(--clr-primary)' }} aria-hidden="true">{icon}</span>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--clr-text)', margin: 0 }}>
          {title}
        </h4>
      </div>
      {children}
    </div>
  )
}

// ── Project Card ───────────────────────────────────────────────────────────

function ProjectCard({ project, onOpenModal }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-card"
      style={{
        display: 'flex', flexDirection: 'column',
        padding: 0, overflow: 'hidden', cursor: 'default',
      }}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg), var(--shadow-glow)' }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Project image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 190 }}>
        <ProjectImage
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />
        {/* Category pills overlay */}
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          display: 'flex', gap: '0.3rem', flexWrap: 'wrap',
        }}>
          {project.categories.slice(0, 2).map(cat => (
            <span
              key={cat}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.68rem',
                fontWeight: 600,
                background: 'rgba(10,14,26,0.75)',
                color: 'var(--clr-primary)',
                border: '1px solid var(--clr-border)',
                backdropFilter: 'blur(6px)',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700, fontSize: '1rem',
          color: 'var(--clr-text)', lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '0.88rem', lineHeight: 1.7, flex: 1, margin: 0 }}>
          {project.shortDescription}
        </p>

        {/* Tech stack badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {project.technologies.slice(0, 4).map(t => (
            <span key={t} className="badge" style={{ fontSize: '0.7rem' }}>{t}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="badge" style={{ fontSize: '0.7rem' }}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--clr-border)' }}>
          <motion.button
            className="btn btn--primary btn--sm"
            onClick={() => onOpenModal(project)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ flex: 1, justifyContent: 'center' }}
            aria-label={`View details for ${project.title}`}
          >
            View Details
          </motion.button>

          <LinkButton href={project.github}   icon={Github}       label="Code"  disabled={!project.github} />
          <LinkButton href={project.liveDemo} icon={ExternalLink} label="Demo"  disabled={!project.liveDemo} />
        </div>
      </div>
    </motion.article>
  )
}

// ── Main Projects section ──────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = useMemo(() =>
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.categories.includes(activeFilter)),
    [activeFilter]
  )

  const handleOpen  = useCallback(p => setSelectedProject(p), [])
  const handleClose = useCallback(() => setSelectedProject(null), [])

  return (
    <section id="projects" aria-labelledby="projects-heading" style={{ background: 'var(--clr-bg)' }}>
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__eyebrow">What I've Built</span>
          <h2 className="section__title" id="projects-heading">Projects</h2>
          <p className="section__subtitle">
            Academic and personal projects built during my BCA programme and self-directed learning.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          role="tablist"
          aria-label="Filter projects by category"
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          {projectFilters.map(f => (
            <motion.button
              key={f.id}
              role="tab"
              aria-selected={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', border: '1.5px solid',
                transition: 'all 0.2s ease',
                borderColor: activeFilter === f.id ? 'var(--clr-primary)' : 'var(--clr-border)',
                background:  activeFilter === f.id ? 'var(--clr-primary-dim)' : 'transparent',
                color:       activeFilter === f.id ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="projects__grid"
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={handleOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--clr-text-faint)', padding: '3rem 0' }}>
            No projects found for this filter.
          </p>
        )}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
