import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ContactWidgetProvider } from '@/context/ContactWidgetContext'
import ContactWidget from '@/components/ContactWidget'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'AI Engineer & Automation Architect | Portfolio',
  description:
    'I build AI Voice Agents, Chatbots, Automation Pipelines, and Autonomous Agents that help businesses scale without limits.',
  keywords: [
    'AI Engineer',
    'AI Voice Agent',
    'AI Chatbot',
    'AI Automation',
    'LangChain',
    'OpenAI',
    'Anthropic',
  ],
  openGraph: {
    type: 'website',
    title: 'AI Engineer & Automation Architect',
    description: 'Building intelligent systems that think, talk, and act.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://sidewidget.vercel.app/react-widget-uv.css" />
      </head>
      <body>
        <ContactWidgetProvider>
          {children}
          <ContactWidget />
        </ContactWidgetProvider>

        {/* ── Chatbot widget ─────────────────────────────────────────
            Loads after the page is interactive so it never blocks render.
            window.process polyfill is required by the widget bundle.
        ─────────────────────────────────────────────────────────── */}
        <Script id="process-polyfill" strategy="beforeInteractive">
          {`window.process = { env: {} };`}
        </Script>
        <Script
          src="https://sidewidget.vercel.app/react-widget-uv.iife.js"
          strategy="afterInteractive"
        />
        {/* @ts-expect-error — custom web component not in React's JSX types */}
        <react-widget-uv
          agent_id="e836fb55-180a-4c95-8493-f2cb6b1f92f6"
          schema="db84d0ac-ea5e-45b9-b1c2-caeaf63b227a"
          type="thunderemotionlite"
        />
      </body>
    </html>
  )
}
