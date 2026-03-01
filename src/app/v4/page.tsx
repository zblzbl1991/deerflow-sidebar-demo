'use client'

import { MessageListV4 } from '@/components/workspace/conversation/message-list-v4'

export default function V4Page() {
  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🤖 AI 协作助手</span>
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
            V4: 独立页面式
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          ← 返回首页
        </a>
      </header>

      {/* 主体内容 */}
      <div className="flex-1 overflow-hidden">
        <MessageListV4 />
      </div>
    </main>
  )
}
