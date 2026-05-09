'use client'
import { motion } from 'framer-motion'
import { TECH } from '@/config/portfolio'

const CAT_COLORS: Record<string, string> = {
  'AI / LLMs':     '#22d3ee',
  'Voice & Speech':'#a855f7',
  'Frameworks':    '#10b981',
  'Backend':       '#f59e0b',
  'Frontend':      '#f472b6',
  'Cloud & Infra': '#38bdf8',
  'Databases':     '#818cf8',
  'Automation':    '#fb923c',
}

export default function TechStack() {
  return (
    <section id="stack" className="relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(168,85,247,0.03)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#10b981] tracking-[0.2em] mb-3">EXPERTISE</p>
          <h2 className="font-space font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            The AI <span className="gradient-text">Tech Arsenal</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Tools I use every day to build, deploy, and scale intelligent systems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(TECH).map(([cat, items], ci) => {
            const accent = CAT_COLORS[cat] ?? '#22d3ee'
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.07 }}
                className="card-glow rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
                  <span className="text-xs font-mono tracking-widest" style={{ color: accent }}>
                    {cat.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md font-inter text-slate-300 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] hover:border-current transition-colors cursor-default"
                      style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = accent; (e.target as HTMLElement).style.color = accent }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = ''; (e.target as HTMLElement).style.color = '' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
