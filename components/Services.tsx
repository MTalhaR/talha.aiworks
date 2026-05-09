'use client'
import { motion } from 'framer-motion'
import { SERVICES } from '@/config/portfolio'
import { useContactWidget } from '@/context/ContactWidgetContext'

const COLOR_MAP: Record<string, { border: string; glow: string; badge: string; text: string }> = {
  cyan:   { border: 'rgba(34,211,238,0.3)',   glow: 'rgba(34,211,238,0.15)',   badge: 'bg-[rgba(34,211,238,0.1)] text-[#22d3ee] border-[rgba(34,211,238,0.3)]',   text: 'text-[#22d3ee]' },
  purple: { border: 'rgba(168,85,247,0.3)',   glow: 'rgba(168,85,247,0.12)',   badge: 'bg-[rgba(168,85,247,0.1)] text-[#a855f7] border-[rgba(168,85,247,0.3)]',   text: 'text-[#a855f7]' },
  green:  { border: 'rgba(16,185,129,0.3)',   glow: 'rgba(16,185,129,0.12)',   badge: 'bg-[rgba(16,185,129,0.1)] text-[#10b981] border-[rgba(16,185,129,0.3)]',   text: 'text-[#10b981]' },
  pink:   { border: 'rgba(244,114,182,0.3)',  glow: 'rgba(244,114,182,0.12)',  badge: 'bg-[rgba(244,114,182,0.1)] text-[#f472b6] border-[rgba(244,114,182,0.3)]', text: 'text-[#f472b6]' },
}

export default function Services() {
  const { openWidget } = useContactWidget()

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Subtle section gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(10,22,40,0.5)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#22d3ee] tracking-[0.2em] mb-3">CAPABILITIES</p>
          <h2 className="font-space font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            What I Can Build <span className="gradient-text">For You</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            From idea to production — end-to-end AI systems that fit your industry, workflow, and goals.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => {
            const c = COLOR_MAP[svc.color]
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 cursor-default"
                style={{
                  background: 'var(--card)',
                  border: `1px solid ${c.border}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 36px ${c.glow}`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Icon + title row */}
                <div className="flex items-start gap-4">
                  <div className="text-4xl leading-none">{svc.icon}</div>
                  <div>
                    <div className={`text-xs font-mono tracking-widest mb-1 ${c.text}`}>{svc.subtitle}</div>
                    <h3 className="font-space font-semibold text-xl text-white">{svc.title}</h3>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{svc.description}</p>

                {/* Feature chips */}
                <ul className="flex flex-col gap-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${c.text.replace('text', 'bg')}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={openWidget}
                  className={`mt-auto self-start text-sm font-medium px-4 py-1.5 rounded-lg border transition-all ${c.badge} hover:opacity-80`}
                >
                  Start a project →
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
