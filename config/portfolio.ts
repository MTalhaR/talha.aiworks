// ─── Personal Info ─────────────────────────────────────────────────────────
export const OWNER = {
  name: 'Talha Riaz',
  initials: 'TR',
  title: 'AI Agent & Automation Architect',
  tagline:
    'I build AI systems that think, talk, and act — so your business scales without limits.',
  email: 'talha.aiworks@gmail.com',
  phone: '+92 334 0548100',
  location: 'Islamabad, Pakistan',
  // linkedin: 'https://linkedin.com/in/yourprofile',
  // Instagram: 'https://github.com/yourprofile',
  /**
   * Paste your AI Voice Agent live-demo URL here when ready.
   * It will appear as a "Live Demo" button on the Projects section.
   */
  voiceAgentUrl: 'https://testyouragent.online/test/f803a68', // ← replace with real URL
  available: true,
}

// ─── Hero Stats ─────────────────────────────────────────────────────────────
export const STATS = [
  { value: '50+', label: 'AI Systems Deployed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '3×', label: 'Average ROI' },
  { value: '24h', label: 'Response Time' },
]

// ─── Services ────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'voice',
    icon: '🎙️',
    title: 'AI Voice Agents',
    subtitle: 'Speak. Understand. Convert.',
    description:
      'Deploy intelligent voice systems that handle inbound calls, qualify leads, book appointments/reservation, takes orders, and resolve support tickets — around the clock, without a human on the line.',
    features: [
      'Natural multi-turn conversations',
      'CRM & calendar integrations',
      'Custom voice & personality',
      'Real-time transcription & analytics',
    ],
    color: 'cyan',
  },
  {
    id: 'chatbot',
    icon: '💬',
    title: 'AI Chatbots',
    subtitle: 'Engage. Answer. Sell.',
    description:
      'Conversational AI that lives on your website, app, or WhatsApp. Trained on your knowledge base, it handles FAQs, onboarding, and sales conversations at scale and also book appointments/reservation, takes orders, and resolve support tickets — around the clock, without a human on the line.',
    features: [
      'Trained on your own data',
      'Multi-channel deployment',
      'Human handoff logic',
      'Continuous learning loop',
    ],
    color: 'purple',
  },
  {
    id: 'automation',
    icon: '⚡',
    title: 'AI Automation',
    subtitle: 'Trigger. Execute. Report.',
    description:
      'End-to-end workflow automation powered by AI decision-making. Connect any tool, remove repetitive work, and let intelligent pipelines run your operations. Reduce any dependibilty and increase your work efficieny at a scale.',
    features: [
      'No-code + custom integrations',
      'AI-driven branching logic',
      'Error handling & retries',
    ],
    color: 'green',
  },
  {
    id: 'agents',
    icon: '🤖',
    title: 'AI Agents',
    subtitle: 'Research. Reason. Act.',
    description:
      'Autonomous multi-step agents that browse the web, analyze data, write reports, and execute tasks — replacing entire workflows, not just single steps and can also qualify leads, book appointments/reservation, takes orders, and resolve support tickets — around the clock, without a human on the line.',
    features: [
      'Tool-use & web browsing',
      'Long-horizon task planning',
      'Multi-agent collaboration',
      'Audit-trail & explainability',
    ],
    color: 'pink',
  },
]

// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'voice-agent',
    badge: 'LIVE DEMO →',
    title: 'AI Voice Agent Platform',
    description:
      'An intelligent voice agent that handles inbound customer service calls end-to-end — understanding intent, resolving issues, and escalating only when necessary.',
    result: '95% call resolution without human intervention',
    tags: ['Voxiqo', 'Call Studio', 'ElevenLabs', 'Twilio', 'LangChain', 'Deepgram'],
    liveUrl: '#', // ← replaced by voiceAgentUrl at runtime
    isVoiceDemo: true,
    color: 'cyan',
  },
  {
    id: 'enterprise-automation',
    badge: 'ENTERPRISE',
    title: 'Enterprise HR & Knowledge Automation',
    description:
      'A unified AI layer on top of an enterprise HRM and internal knowledge base. Employees ask natural-language questions and the agent retrieves HR policies, processes leave requests, onboards new hires, and cross-references procedures — all without touching a dashboard.',
    result: '65% drop in HR query resolution time & zero manual data re-entry',
    tags: ['n8n', 'OpenAI', 'Pinecone', 'LangChain', 'HRM API', 'Supabase'],
    liveUrl: null,
    isVoiceDemo: false,
    color: 'purple',
  },
  {
    id: 'reservation-agent',
    badge: 'AI AGENTS',
    title: 'Autonomous Reservation & POS Agent',
    description:
      'A multi-agent system where customers message a chatbot to book, modify, or cancel reservations. The agent orchestrates every downstream action: creates and updates records in Supabase (with pgvector for semantic search), fires instant notifications to both sender and recipient, syncs the Point-of-Sale system, and writes enriched data back to the CRM — fully hands-free.',
    result: 'End-to-end reservation lifecycle automated — 0 manual steps',
    tags: ['n8n', 'Supabase', 'pgvector', 'OpenAI', 'Twilio', 'POS API', 'CRM API'],
    liveUrl: null,
    isVoiceDemo: false,
    color: 'green',
  },
]

// ─── Tech Stack ───────────────────────────────────────────────────────────────
export const TECH = {
  'AI / LLMs': ['OpenAI', 'Anthropic Claude', 'Llama', 'Mistral', 'Gemini'],
  'Voice & Speech': ['ElevenLabs', 'Deepgram', 'Whisper', 'Twilio', 'Voxiqo', 'Call Studio'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Pinecone', 'Supabase'],
  'Automation': ['Make', 'n8n', 'Zapier'],
}
