'use client'
import { createContext, useContext, useState } from 'react'

interface ContactWidgetCtx {
  isOpen: boolean
  openWidget: () => void
  closeWidget: () => void
}

const ContactWidgetContext = createContext<ContactWidgetCtx>({
  isOpen: false,
  openWidget: () => {},
  closeWidget: () => {},
})

export function ContactWidgetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ContactWidgetContext.Provider
      value={{
        isOpen,
        openWidget: () => setIsOpen(true),
        closeWidget: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactWidgetContext.Provider>
  )
}

export const useContactWidget = () => useContext(ContactWidgetContext)
