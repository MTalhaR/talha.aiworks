'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContactWidget } from '@/context/ContactWidgetContext'

/* ── Types ─────────────────────────────────────────────────── */
interface FormData {
  name: string
  email: string
  phone: string
  services: string[]
  budget: string
  timeline: string
  description: string
}

type Step = 1 | 2 | 3 | 'success'

/* ── Options ────────────────────────────────────────────────── */
const SERVICES_OPTIONS = [
  { id: 'voice',      icon: '🎙️', label: 'AI Voice Agent' },
  { id: 'chatbot',    icon: '💬', label: 'AI Chatbot' },
  { id: 'automation', icon: '⚡', label: 'AI Automation' },
  { id: 'agents',     icon: '🤖', label: 'AI Agents' },
  { id: 'combo',      icon: '🔗', label: 'Full AI Stack' },
]

const BUDGET_OPTIONS = ['< $1k', '$1k – $3k', '$3k – $5k', "Let's discuss"]
const TIMELINE_OPTIONS = ['ASAP', '1 week', '2 weeks', '3 weeks', 'Flexible']

/* ── Validation helpers ─────────────────────────────────────── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isValidPhone = (v: string) =>
  v.replace(/[\s\-+()\d]/g, '').length === 0 && v.replace(/\D/g, '').length >= 7

/* ── Sub-components defined OUTSIDE main component ──────────────
   Defining them inside causes React to treat them as new component
   types on every render, which unmounts/remounts inputs and loses focus.
─────────────────────────────────────────────────────────────── */
interface FieldProps {
  id: keyof FormData
  label: string
  type?: string
  placeholder: string
  value: string
  err?: string
  isTouched: boolean
  onChange: (id: keyof FormData, value: string) => void
  onBlur: (id: keyof FormData) => void
}

function Field({ id, label, type = 'text', placeholder, value, err, isTouched, onChange, onBlur }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        {label} *
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={() => onBlur(id)}
        className={`bg-[#0a1628] border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600
          outline-none transition-all focus:ring-1 ${
            isTouched && err
              ? 'border-red-500/60 focus:ring-red-500/40'
              : 'border-[rgba(34,211,238,0.2)] focus:border-[#22d3ee] focus:ring-[#22d3ee]/20'
          }`}
      />
      {isTouched && err && (
        <p className="text-xs text-red-400 mt-0.5">{err}</p>
      )}
    </div>
  )
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        selected
          ? 'bg-[rgba(34,211,238,0.15)] border-[#22d3ee] text-[#22d3ee]'
          : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-slate-400 hover:border-[rgba(34,211,238,0.4)] hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  )
}

function Progress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-2 flex-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              n < current
                ? 'bg-gradient-to-br from-[#22d3ee] to-[#a855f7] text-white'
                : n === current
                ? 'border-2 border-[#22d3ee] text-[#22d3ee]'
                : 'border border-[rgba(255,255,255,0.1)] text-slate-600'
            }`}
          >
            {n < current ? '✓' : n}
          </div>
          {n < 3 && (
            <div
              className={`h-0.5 flex-1 rounded-full transition-all ${
                n < current
                  ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7]'
                  : 'bg-[rgba(255,255,255,0.08)]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Main Component ─────────────────────────────────────────── */
const STEP_TITLES: Record<string, string> = {
  '1': 'Your Details',
  '2': 'Project Scope',
  '3': 'Describe Your Vision',
}

export default function ContactWidget() {
  const { isOpen, openWidget, closeWidget } = useContactWidget()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    services: [], budget: '', timeline: '', description: '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})

  const update = useCallback((field: keyof FormData, value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value })), [])

  const touch = useCallback((field: keyof FormData) =>
    setTouched((t) => ({ ...t, [field]: true })), [])

  const toggleService = (id: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }))

  /* ── Validation ────────────────────────────────────────────── */
  const s1Errors = {
    name:  form.name.trim().length < 2  ? 'Please enter your full name' : '',
    email: !isValidEmail(form.email)    ? 'Enter a valid email address' : '',
    phone: !isValidPhone(form.phone)    ? 'Enter a valid phone number'  : '',
  }
  const step1Valid = !s1Errors.name && !s1Errors.email && !s1Errors.phone
  const step2Valid = form.services.length > 0 && !!form.budget && !!form.timeline
  const step3Valid = form.description.trim().length >= 20

  /* ── Submit ────────────────────────────────────────────────── */
  const handleSubmit = useCallback(async () => {
    if (!step3Valid) return
    setLoading(true)
    setError('')
    try {
      const serviceLabels = form.services.map(
        (id) => SERVICES_OPTIONS.find((s) => s.id === id)?.label ?? id
      )
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, services: serviceLabels }),
      })
      if (!res.ok) throw new Error('Failed')
      setStep('success')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [form, step3Valid])

  /* ── Reset & close ─────────────────────────────────────────── */
  const handleClose = () => {
    closeWidget()
    setTimeout(() => {
      setStep(1)
      setForm({ name: '', email: '', phone: '', services: [], budget: '', timeline: '', description: '' })
      setTouched({})
      setError('')
    }, 400)
  }

  return (
    <>
      {/* ── Floating trigger button ────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={openWidget}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl
              bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white font-semibold text-sm
              shadow-2xl shadow-[rgba(34,211,238,0.3)] hover:shadow-[rgba(34,211,238,0.5)]
              hover:scale-105 active:scale-95 transition-all relative widget-ring"
            aria-label="Open contact form"
          >
            <span className="text-lg">🤖</span>
            <span className="hidden sm:inline">Let&apos;s Build Together</span>
            <span className="sm:hidden">Contact</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Widget panel + backdrop ────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[rgba(2,8,23,0.7)] backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto
                z-50 w-full sm:w-[420px] max-h-[95vh] overflow-y-auto
                rounded-t-3xl sm:rounded-2xl
                bg-[#070f1e] border border-[rgba(34,211,238,0.2)]
                shadow-2xl shadow-[rgba(34,211,238,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#070f1e] border-b border-[rgba(34,211,238,0.1)] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-xs font-mono text-[#22d3ee] tracking-widest">LET&apos;S BUILD AI TOGETHER</p>
                  <h3 className="font-space font-semibold text-white text-base mt-0.5">
                    {step === 'success' ? 'Request Sent!' : STEP_TITLES[String(step)]}
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-5">
                <AnimatePresence mode="wait">

                  {/* ── STEP 1 ───────────────────────────── */}
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                      <Progress current={1} />
                      <div className="flex flex-col gap-4">
                        <Field
                          id="name" label="Full Name" placeholder="Muhammad Talha"
                          value={form.name} err={s1Errors.name}
                          isTouched={!!touched.name} onChange={update} onBlur={touch}
                        />
                        <Field
                          id="email" label="Email Address" type="email" placeholder="you@company.com"
                          value={form.email} err={s1Errors.email}
                          isTouched={!!touched.email} onChange={update} onBlur={touch}
                        />
                        <Field
                          id="phone" label="Phone Number" type="tel" placeholder="+92 300 0000000"
                          value={form.phone} err={s1Errors.phone}
                          isTouched={!!touched.phone} onChange={update} onBlur={touch}
                        />
                      </div>
                      <button
                        onClick={() => {
                          (['name', 'email', 'phone'] as (keyof FormData)[]).forEach(touch)
                          if (step1Valid) setStep(2)
                        }}
                        disabled={!step1Valid}
                        className="mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-all
                          bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white
                          disabled:opacity-30 disabled:cursor-not-allowed
                          hover:shadow-lg hover:shadow-[rgba(34,211,238,0.25)] active:scale-[0.98]"
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {/* ── STEP 2 ───────────────────────────── */}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                      <Progress current={2} />

                      <div className="mb-5">
                        <label className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block mb-2">
                          I Need… <span className="text-slate-600">(select all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SERVICES_OPTIONS.map((s) => (
                            <Chip
                              key={s.id}
                              label={`${s.icon} ${s.label}`}
                              selected={form.services.includes(s.id)}
                              onClick={() => toggleService(s.id)}
                            />
                          ))}
                        </div>
                        {form.services.length === 0 && (
                          <p className="text-xs text-slate-600 mt-1.5">Select at least one service</p>
                        )}
                      </div>

                      <div className="mb-5">
                        <label className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block mb-2">
                          Budget Range *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BUDGET_OPTIONS.map((b) => (
                            <Chip key={b} label={b} selected={form.budget === b} onClick={() => update('budget', b)} />
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block mb-2">
                          Timeline *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINE_OPTIONS.map((t) => (
                            <Chip key={t} label={t} selected={form.timeline === t} onClick={() => update('timeline', t)} />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm border border-[rgba(255,255,255,0.1)] text-slate-400 hover:text-white hover:border-[rgba(34,211,238,0.3)] transition-all"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => { if (step2Valid) setStep(3) }}
                          disabled={!step2Valid}
                          className="flex-[2] py-3 rounded-xl font-semibold text-sm transition-all
                            bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white
                            disabled:opacity-30 disabled:cursor-not-allowed
                            hover:shadow-lg hover:shadow-[rgba(34,211,238,0.25)] active:scale-[0.98]"
                        >
                          Continue →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3 ───────────────────────────── */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                      <Progress current={3} />

                      {/* Selection summary chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {form.services.map((id) => {
                          const s = SERVICES_OPTIONS.find((o) => o.id === id)
                          return s ? (
                            <span key={id} className="text-xs px-2.5 py-1 rounded-full bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.2)] text-[#22d3ee] font-mono">
                              {s.icon} {s.label}
                            </span>
                          ) : null
                        })}
                        {form.budget && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.2)] text-[#a855f7] font-mono">
                            {form.budget}
                          </span>
                        )}
                        {form.timeline && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] text-emerald-400 font-mono">
                            {form.timeline}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 mb-5">
                        <label className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
                          Your Project *
                        </label>
                        <textarea
                          rows={5}
                          value={form.description}
                          placeholder="Tell me about your project, goals, technical requirements, and what success looks like for you..."
                          onChange={(e) => update('description', e.target.value)}
                          className="bg-[#0a1628] border border-[rgba(34,211,238,0.2)] rounded-xl px-4 py-3
                            text-sm text-slate-200 placeholder-slate-600 outline-none resize-none
                            focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all"
                        />
                        <div className="flex justify-between mt-1">
                          <p className={`text-xs ${form.description.trim().length < 20 ? 'text-slate-600' : 'text-emerald-500'}`}>
                            {form.description.trim().length < 20
                              ? `${20 - form.description.trim().length} more characters needed`
                              : '✓ Looks good'}
                          </p>
                          <p className="text-xs text-slate-600">{form.description.length} chars</p>
                        </div>
                      </div>

                      {error && (
                        <p className="text-xs text-red-400 mb-4 p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                          ⚠ {error}
                        </p>
                      )}

                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-4">
                        <span>🔒</span> Your details are private and never shared.
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep(2)}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm border border-[rgba(255,255,255,0.1)] text-slate-400 hover:text-white hover:border-[rgba(34,211,238,0.3)] transition-all"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={!step3Valid || loading}
                          className="flex-[2] py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2
                            bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white
                            disabled:opacity-30 disabled:cursor-not-allowed
                            hover:shadow-lg hover:shadow-[rgba(34,211,238,0.25)] active:scale-[0.98]"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>Send Request 🚀</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── SUCCESS ──────────────────────────── */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#10b981] flex items-center justify-center text-4xl mx-auto mb-5"
                      >
                        ✓
                      </motion.div>
                      <h4 className="font-space font-bold text-xl text-white mb-2">You&apos;re all set!</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        I&apos;ve received your request and will get back to you within{' '}
                        <strong className="text-white">24 hours</strong>. Check your inbox for a confirmation.
                      </p>
                      <button
                        onClick={handleClose}
                        className="btn-primary w-full py-3 text-sm rounded-xl"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
