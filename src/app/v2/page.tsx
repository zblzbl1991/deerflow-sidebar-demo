'use client'

import { useState } from 'react'
import { MessageList } from '@/components/workspace/conversation/message-list'
import { ArtifactsPanel } from '@/components/workspace/sidebar/artifacts-panel'
import { useArtifacts } from '@/core/artifacts/context'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function V2Page() {
  const { isOpen } = useArtifacts()
  const [panelHeight, setPanelHeight] = useState(350)

  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🤖 AI 协作助手</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
            V2: 底部抽屉式
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          ← 返回首页
        </a>
      </header>

      {/* 主体内容 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 主对话区域 */}
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>

        {/* 底部抽屉 */}
        <div
          className={`
            border-t bg-background transition-all duration-300 ease-in-out
            ${isOpen ? 'h-[350px]' : 'h-0'}
          `}
        >
          <div className="flex h-full flex-col">
            {/* 抽屉头部 */}
            <div className="flex h-10 shrink-0 items-center justify-between border-b px-4">
              <span className="text-sm font-medium">📄 文件预览</span>
              <div className="flex items-center gap-2">
                {/* 高度调节提示 */}
                <span className="text-xs text-muted-foreground">
                  拖动边缘调整高度
                </span>
              </div>
            </div>

            {/* 抽屉内容 */}
            <div className="flex-1 overflow-hidden">
              <ArtifactsPanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
