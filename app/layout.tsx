import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
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
      <body>
        <ContactWidgetProvider>
          {children}
          <ContactWidget />
        </ContactWidgetProvider>
      </body>
    </html>
  )
}
