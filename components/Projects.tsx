'use client'
import { motion } from 'framer-motion'
import { PROJECTS, OWNER } from '@/config/portfolio'

const COLOR_MAP: Record<string, { accent: string; badge: string }> = {
  cyan:   { accent: '#22d3ee', badge: 'text-[#22d3ee] bg-[rgba(34,211,238,0.1)] border-[rgba(34,211,238,0.25)]' },
  purple: { accent: '#a855f7', badge: 'text-[#a855f7] bg-[rgba(168,85,247,0.1)] border-[rgba(168,85,247,0.25)]' },
  green:  { accent: '#10b981', badge: 'text-[#10b981] bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.25)]' },
  pink:   { accent: '#f472b6', badge: 'text-[#f472b6] bg-[rgba(244,114,182,0.1)] border-[rgba(244,114,182,0.25)]' },
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#a855f7] tracking-[0.2em] mb-3">CASE STUDIES</p>
          <h2 className="font-space font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            AI Systems <span className="gradient-text">in the Wild</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Real projects with measurable outcomes — not just demos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => {
            const c = COLOR_MAP[p.color]
            const href = p.isVoiceDemo ? OWNER.voiceAgentUrl : p.liveUrl

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glow rounded-2xl p-7 flex flex-col gap-4 group"
              >
                {/* Badge + number */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${c.badge}`}>
                    {p.badge}
                  </span>
                  <span className="text-5xl font-bold font-space opacity-[0.06] text-white select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-space font-semibold text-xl text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>

                {/* Result metric */}
                <div
                  className="rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2"
                  style={{ background: `rgba(${c.accent === '#22d3ee' ? '34,211,238' : c.accent === '#a855f7' ? '168,85,247' : c.accent === '#10b981' ? '16,185,129' : '244,114,182'},0.06)` }}
                >
                  <span style={{ color: c.accent }}>↑</span>
                  <span className="text-slate-300">{p.result}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-slate-400 border border-[rgba(255,255,255,0.07)]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                {href && href !== '#' && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto self-start text-sm font-medium flex items-center gap-1 transition-all"
                    style={{ color: c.accent }}
                  >
                    {p.isVoiceDemo ? '🎙️ Try the Voice Demo' : '↗ View Project'}
                  </a>
                )}
                {p.isVoiceDemo && (!href || href === '#') && (
                  <span className="mt-auto self-start text-xs font-mono text-slate-600 border border-dashed border-slate-700 px-3 py-1 rounded-md">
                    Demo link coming soon
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
