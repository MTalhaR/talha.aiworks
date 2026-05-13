'use client'
import { OWNER } from '@/config/portfolio'
import { useContactWidget } from '@/context/ContactWidgetContext'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { openWidget } = useContactWidget()

  return (
    <footer className="border-t border-[rgba(34,211,238,0.1)] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#2563eb] flex items-center justify-center text-white font-bold text-xs font-space">
              {OWNER.initials}
            </span>
            <span className="text-sm text-slate-400 font-mono">{OWNER.title}</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-slate-500 hover:text-[#22d3ee] transition-colors font-mono">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={openWidget}
            className="btn-primary px-5 py-2 text-sm"
          >
            Hire Me
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} {OWNER.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Built with Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
