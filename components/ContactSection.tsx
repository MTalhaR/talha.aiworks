'use client'
import { motion } from 'framer-motion'
import { useContactWidget } from '@/context/ContactWidgetContext'
import { OWNER } from '@/config/portfolio'

export default function ContactSection() {
  const { openWidget } = useContactWidget()

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#22d3ee] opacity-[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 rounded-full bg-[#a855f7] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#22d3ee] tracking-[0.2em] mb-4">LET&apos;S BUILD</p>

          <h2 className="font-space font-bold leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.4rem,6vw,4.5rem)' }}>
            Got an idea that needs{' '}
            <span className="gradient-text">AI?</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I work with startups and enterprises to turn ambitious AI ideas into production-ready systems.
            Let&apos;s talk about what we can build together.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <button
              onClick={openWidget}
              className="btn-primary px-10 py-4 text-base flex items-center gap-2 rounded-xl relative widget-ring"
            >
              📅 Book a Discovery Call
            </button>
            <a
              href={`mailto:${OWNER.email}`}
              className="btn-ghost px-10 py-4 text-base rounded-xl"
            >
              Send an Email
            </a>
          </div>

          {/* Contact info row */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: 'EMAIL', value: OWNER.email, href: `mailto:${OWNER.email}` },
              { label: 'PHONE', value: OWNER.phone, href: `tel:${OWNER.phone}` },
              { label: 'LOCATION', value: OWNER.location, href: '#' },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-glow rounded-xl p-5 text-center"
              >
                <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">{item.label}</div>
                <a
                  href={item.href}
                  className="text-sm text-slate-300 hover:text-[#22d3ee] transition-colors break-all"
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
