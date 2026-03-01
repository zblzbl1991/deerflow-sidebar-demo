'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ArtifactsContextType {
  artifacts: string[]
  setArtifacts: (artifacts: string[]) => void
  selectedArtifact: string | null
  select: (filepath: string) => void
  deselect: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const ArtifactsContext = createContext<ArtifactsContextType | undefined>(undefined)

export function ArtifactsProvider({ children }: { children: ReactNode }) {
  const [artifacts, setArtifacts] = useState<string[]>([])
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const select = useCallback((filepath: string) => {
    setSelectedArtifact(filepath)
    setIsOpen(true)
  }, [])

  const deselect = useCallback(() => {
    setSelectedArtifact(null)
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <ArtifactsContext.Provider
      value={{
        artifacts,
        setArtifacts,
        selectedArtifact,
        select,
        deselect,
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </ArtifactsContext.Provider>
  )
}

export function useArtifacts() {
  const context = useContext(ArtifactsContext)
  if (!context) {
    throw new Error('useArtifacts must be used within ArtifactsProvider')
  }
  return context
}
