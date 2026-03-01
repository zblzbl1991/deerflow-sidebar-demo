'use client'

import { ArtifactsProvider } from '@/core/artifacts/context'
import { SubtasksProvider } from '@/core/tasks/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ArtifactsProvider>
      <SubtasksProvider>
        {children}
      </SubtasksProvider>
    </ArtifactsProvider>
  )
}
