import { createContext, useContext, useMemo, useState } from 'react'

const UiContext = createContext(null)

export function UiProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false)

  const value = useMemo(
    () => ({
      chatOpen,
      openChat: () => setChatOpen(true),
      closeChat: () => setChatOpen(false),
    }),
    [chatOpen],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUi() {
  const context = useContext(UiContext)
  if (!context) throw new Error('useUi must be used within UiProvider')
  return context
}
