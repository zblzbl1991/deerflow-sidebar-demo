'use client'

import { useArtifacts } from '@/core/artifacts/context'
import { ArtifactsPanel } from './artifacts-panel'

export function WorkspaceSidebar() {
  const { isOpen } = useArtifacts()

  return (
    <>
      {/* 右侧：文件预览侧边栏 */}
      <div
        className={`
          fixed right-0 top-0 z-40 h-screen border-l bg-background
          shadow-lg transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ width: '420px', marginTop: '56px' }}
      >
        <ArtifactsPanel />
      </div>
    </>
  )
}
