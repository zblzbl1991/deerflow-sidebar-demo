'use client'

import { MessageList } from '@/components/workspace/conversation/message-list'
import { WorkspaceSidebar } from '@/components/workspace/sidebar/workspace-sidebar'

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center border-b px-6">
        <h1 className="text-lg font-semibold">🤖 AI 协作助手</h1>
      </header>

      {/* 主体内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 主对话区域 */}
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>

        {/* 右侧边栏 */}
        <WorkspaceSidebar />
      </div>
    </main>
  )
}
