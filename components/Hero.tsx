'use client'
import { motion } from 'framer-motion'
import NeuralBackground from './NeuralBackground'
import { OWNER, STATS } from '@/config/portfolio'
import { useContactWidget } from '@/context/ContactWidgetContext'

const WORDS = ['AI Voice Agents', 'AI Chatbots', 'AI Automation', 'AI Agents']

export default function Hero() {
  const { openWidget } = useContactWidget()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <NeuralBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#22d3ee] opacity-[0.04] blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[#a855f7] opacity-[0.05] blur-[140px] animate-float-delayed pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left column ─────────────────────────────── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 tracking-wide">
                AVAILABLE FOR PROJECTS
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-space font-bold leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              <span className="text-white">Building</span>
              <br />
              <span className="gradient-text">Intelligent</span>
              <br />
              <span className="text-white">Systems.</span>
            </motion.h1>

            {/* Cycling service list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {WORDS.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-[rgba(34,211,238,0.2)] text-[#22d3ee] bg-[rgba(34,211,238,0.06)]"
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {OWNER.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={openWidget}
                className="btn-primary px-7 py-3 text-base flex items-center gap-2"
              >
                🚀 Start Your AI Project
              </button>
              <a
                href="#projects"
                className="btn-ghost px-7 py-3 text-base flex items-center gap-2"
              >
                View My Work ↓
              </a>
            </motion.div>
          </div>

          {/* ── Right column — floating service cards ───── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative hidden lg:flex items-center justify-center h-[420px]"
          >
            {/* Centre orb */}
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a855f7] opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a855f7] opacity-40 blur-lg" />

            {[
              { icon: '🎙️', label: 'Voice Agents', x: '-190px', y: '-80px', delay: 0, anim: 'animate-float' },
              { icon: '💬', label: 'AI Chatbots',  x: '170px',  y: '-90px', delay: 0.5, anim: 'animate-float-delayed' },
              { icon: '⚡', label: 'Automation',   x: '-160px', y: '100px', delay: 1, anim: 'animate-float-delayed-2' },
              { icon: '🤖', label: 'AI Agents',    x: '155px',  y: '110px', delay: 1.5, anim: 'animate-float' },
            ].map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + card.delay * 0.15, type: 'spring', stiffness: 200 }}
                className={`absolute card-glow rounded-2xl p-4 flex flex-col items-center gap-2 cursor-default select-none ${card.anim}`}
                style={{ left: `calc(50% + ${card.x})`, top: `calc(50% + ${card.y})`, transform: 'translate(-50%,-50%)' }}
              >
                <span className="text-3xl">{card.icon}</span>
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Stats row ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.08 }}
              className="card-glow rounded-xl p-5 text-center"
            >
              <div className="text-3xl font-bold gradient-text font-space">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-mono tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-4 h-4 border-b-2 border-r-2 border-slate-600 rotate-45"
        />
      </motion.div>
    </section>
  )
}
