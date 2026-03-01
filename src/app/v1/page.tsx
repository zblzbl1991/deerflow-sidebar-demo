'use client'

import { MessageList } from '@/components/workspace/conversation/message-list'
import { WorkspaceSidebar } from '@/components/workspace/sidebar/workspace-sidebar'

export default function V1Page() {
  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🤖 AI 协作助手</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
            V1: 右侧边栏式
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          ← 返回首页
        </a>
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
