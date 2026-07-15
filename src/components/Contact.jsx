/**
 * Contact.jsx
 * Professional contact section with:
 *  – Client-side validated form (name, email, subject, message)
 *  – Honeypot spam field (hidden from real users)
 *  – EmailJS integration (falls back to mailto: when not configured)
 *  – Loading, success and error states
 *  – Character limits with live counter
 *  – Direct contact info cards (email, phone, LinkedIn, GitHub, location)
 *  – No API keys hardcoded — config lives in portfolioData.js
 */
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, Linkedin, Github, MapPin,
  Send, CheckCircle, AlertCircle, Loader, MessageSquare
} from 'lucide-react'
import { personal, contactInfo } from '../data/portfolioData'

// ── Validation helpers ─────────────────────────────────────────────────────
const RULES = {
  name:    { min: 2,  max: 60,  label: 'Name' },
  email:   { min: 5,  max: 120, label: 'Email' },
  subject: { min: 4,  max: 100, label: 'Subject' },
  message: { min: 20, max: 1200,label: 'Message' },
}

function validate(fields) {
  const errors = {}
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  Object.entries(RULES).forEach(([key, rule]) => {
    const val = (fields[key] || '').trim()
    if (!val) {
      errors[key] = `${rule.label} is required.`
    } else if (val.length < rule.min) {
      errors[key] = `${rule.label} must be at least ${rule.min} characters.`
    } else if (val.length > rule.max) {
      errors[key] = `${rule.label} must be ${rule.max} characters or fewer.`
    }
  })
  if (!errors.email && !emailRx.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

// ── Direct contact cards data ──────────────────────────────────────────────
function getContactCards() {
  return [
    { icon: Mail,    label: 'Email',    value: personal.email,    href: `mailto:${personal.email}`,  visible: !!personal.email },
    { icon: Phone,   label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}`,     visible: !!personal.phone && personal.phone !== '+91 XXXXX XXXXX' },
    { icon: Linkedin,label: 'LinkedIn', value: 'linkedin.com/in/jayantapawar', href: personal.linkedin, visible: !!personal.linkedin },
    { icon: Github,  label: 'GitHub',   value: 'github.com/jayantapawar',      href: personal.github,   visible: !!personal.github },
    { icon: MapPin,  label: 'Location', value: personal.location, href: null,                        visible: !!personal.location },
  ].filter(c => c.visible)
}

// ── FormField ──────────────────────────────────────────────────────────────
function FormField({ id, label, type = 'text', value, onChange, error, maxLength, rows, required }) {
  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'
  const charCount = value.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--clr-text)' }}
      >
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--clr-error)', marginLeft: 2 }}>*</span>}
      </label>

      <Tag
        id={id}
        name={id}
        type={isTextarea ? undefined : type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={isTextarea ? (rows || 5) : undefined}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          padding: '0.7rem 1rem',
          background: 'var(--clr-surface)',
          border: `1.5px solid ${error ? 'var(--clr-error)' : 'var(--clr-border)'}`,
          borderRadius: 'var(--radius-md)',
          color: 'var(--clr-text)',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
          resize: isTextarea ? 'vertical' : undefined,
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--clr-primary)'; e.target.style.boxShadow = '0 0 0 3px var(--clr-primary-dim)' }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--clr-error)' : 'var(--clr-border)'; e.target.style.boxShadow = 'none' }}
        placeholder={
          id === 'name'    ? 'Your full name' :
          id === 'email'   ? 'your@email.com' :
          id === 'subject' ? 'What is this regarding?' :
          'Write your message here…'
        }
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {error ? (
          <p id={`${id}-error`} role="alert" style={{ fontSize: '0.78rem', color: 'var(--clr-error)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <AlertCircle size={12} aria-hidden="true" /> {error}
          </p>
        ) : <span />}
        {maxLength && (
          <span style={{ fontSize: '0.72rem', color: charCount > maxLength * 0.9 ? 'var(--clr-warning)' : 'var(--clr-text-faint)' }}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Main Contact component ─────────────────────────────────────────────────
const INITIAL = { name: '', email: '', subject: '', message: '', honeypot: '' }

export default function Contact() {
  const [fields, setFields]       = useState(INITIAL)
  const [errors, setErrors]       = useState({})
  const [status, setStatus]       = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg]   = useState('')
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check — if filled, silently "succeed" to fool bots
    if (fields.honeypot) {
      setStatus('success')
      return
    }

    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first error field
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.focus()
      return
    }

    setStatus('loading')
    setErrorMsg('')

    // ── EmailJS path ──────────────────────────────────────────────────
    const { serviceId, templateId, publicKey } = contactInfo.emailjs
    if (serviceId && templateId && publicKey) {
      try {
        // Dynamic import so bundle stays lean when EmailJS is not configured
        const emailjs = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm')
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name:    fields.name.trim(),
            from_email:   fields.email.trim(),
            subject:      fields.subject.trim(),
            message:      fields.message.trim(),
            to_name:      personal.firstName,
          },
          publicKey
        )
        setStatus('success')
        setFields(INITIAL)
        return
      } catch (err) {
        console.error('EmailJS error:', err)
        // Fall through to mailto
      }
    }

    // ── mailto: fallback ──────────────────────────────────────────────
    const body = encodeURIComponent(
      `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`
    )
    const subj = encodeURIComponent(fields.subject.trim())
    window.location.href = `mailto:${personal.email}?subject=${subj}&body=${body}`

    // Show success state after opening mail client
    setTimeout(() => {
      setStatus('success')
      setFields(INITIAL)
    }, 500)
  }

  const handleReset = () => {
    setStatus('idle')
    setFields(INITIAL)
    setErrors({})
    setErrorMsg('')
  }

  const contactCards = getContactCards()

  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ background: 'var(--clr-bg)' }}>
      <div className="section">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__eyebrow">Get In Touch</span>
          <h2 className="section__title" id="contact-heading">
            {contactInfo.heading}
          </h2>
          <p className="section__subtitle">{contactInfo.description}</p>
        </motion.div>

        {/* Two-column layout */}
        <div
          className="contact__layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left — contact info cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <motion.div variants={fadeUp}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--clr-text)' }}>
                Contact Information
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                Feel free to reach out through any channel below. I typically respond within 24–48 hours.
              </p>
            </motion.div>

            {contactCards.map(card => {
              const Icon = card.icon
              const cardContent = (
                <motion.div
                  variants={fadeUp}
                  className="glass-card"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '0.9rem 1.1rem', cursor: card.href ? 'pointer' : 'default' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-md)',
                    background: 'var(--clr-primary-dim)', border: '1px solid var(--clr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--clr-primary)', flexShrink: 0,
                  }} aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--clr-text-faint)', marginBottom: '0.1rem' }}>
                      {card.label}
                    </p>
                    <p style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--clr-text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              )

              return card.href ? (
                <a key={card.label} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined}
                   rel="noopener noreferrer" style={{ textDecoration: 'none' }}
                   aria-label={`${card.label}: ${card.value}`}>
                  {cardContent}
                </a>
              ) : <div key={card.label}>{cardContent}</div>
            })}

            {/* Availability note */}
            <motion.div
              variants={fadeUp}
              style={{
                padding: '1rem 1.15rem',
                background: 'rgba(104,211,145,0.08)',
                border: '1px solid rgba(104,211,145,0.2)',
                borderRadius: 'var(--radius-lg)',
              }}
              role="note"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--clr-success)', animation: 'pulse-dot 1.5s infinite' }} aria-hidden="true" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clr-success)' }}>Currently Available</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)', margin: 0, lineHeight: 1.6 }}>
                Open to entry-level software development roles, internships and collaborative projects.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <MessageSquare size={20} style={{ color: 'var(--clr-primary)' }} aria-hidden="true" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--clr-text)', margin: 0 }}>
                  Send a Message
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                      padding: '2.5rem 1rem', textAlign: 'center',
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(104,211,145,0.15)', border: '2px solid var(--clr-success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--clr-success)',
                      }}
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--clr-text)', marginBottom: '0.4rem' }}>
                        Message Sent!
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', lineHeight: 1.7 }}>
                        Thank you for reaching out. I will get back to you as soon as possible.
                      </p>
                    </div>
                    <motion.button
                      className="btn btn--outline btn--sm"
                      onClick={handleReset}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}

                {/* ── Form state ── */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                  >
                    {/* Honeypot — hidden from real users, visible to bots */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                      <label htmlFor="website">Website (leave blank)</label>
                      <input
                        id="website"
                        name="honeypot"
                        type="text"
                        value={fields.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name + Email row */}
                    <div
                      className="contact-name-email-row"
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                    >
                      <FormField id="name"  label="Name"  value={fields.name}  onChange={handleChange} error={errors.name}  maxLength={60}  required />
                      <FormField id="email" label="Email" type="email" value={fields.email} onChange={handleChange} error={errors.email} maxLength={120} required />
                    </div>

                    <FormField id="subject" label="Subject" value={fields.subject} onChange={handleChange} error={errors.subject} maxLength={100} required />

                    <FormField id="message" label="Message" type="textarea" value={fields.message} onChange={handleChange} error={errors.message} maxLength={1200} rows={6} required />

                    {/* Server error */}
                    {status === 'error' && errorMsg && (
                      <div role="alert" style={{
                        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                        padding: '0.75rem 1rem',
                        background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.25)', borderRadius: 'var(--radius-md)',
                      }}>
                        <AlertCircle size={16} style={{ color: 'var(--clr-error)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                        <p style={{ fontSize: '0.85rem', color: 'var(--clr-error)', margin: 0 }}>{errorMsg}</p>
                      </div>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      className="btn btn--primary contact-submit-btn"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { scale: 1.03 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                      style={{ alignSelf: 'flex-start', minWidth: 160, justifyContent: 'center' }}
                      aria-label={status === 'loading' ? 'Sending message…' : 'Send message'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader size={16} style={{ animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', lineHeight: 1.6 }}>
                      Fields marked <span aria-label="required" style={{ color: 'var(--clr-error)' }}>*</span> are required.
                      {!contactInfo.emailjs.serviceId && ' Your message will open your default email client.'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
