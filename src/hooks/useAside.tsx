'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface AsideProviderProps {
  children: ReactNode
}

interface AsideContextData {
  isOpen: boolean
  handleToggleAside: () => void
}

const AsideContext = createContext<AsideContextData>({} as AsideContextData)

export function AsideProvider({ children }: AsideProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggleAside() {
    setIsOpen(!isOpen)
  }

  return (
    <AsideContext.Provider value={{ isOpen, handleToggleAside }}>
      {children}
    </AsideContext.Provider>
  )
}

export function useAside(): AsideContextData {
  const context = useContext(AsideContext)

  return context
}
