'use client'

import { useState } from 'react'
import { MessageList } from '@/components/workspace/conversation/message-list'
import { ArtifactsPanel } from '@/components/workspace/sidebar/artifacts-panel'
import { MessageSquare, FileText } from 'lucide-react'

type Tab = 'chat' | 'preview'

export default function V3Page() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')

  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🤖 AI 协作助手</span>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            V3: 标签页切换式
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          ← 返回首页
        </a>
      </header>

      {/* Tab 导航 */}
      <div className="flex border-b">
        <button
          className={`
            flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
            ${
              activeTab === 'chat'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }
          `}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare className="h-4 w-4" />
          对话
        </button>
        <button
          className={`
            flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
            ${
              activeTab === 'preview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }
          `}
          onClick={() => setActiveTab('preview')}
        >
          <FileText className="h-4 w-4" />
          文件预览
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <MessageList />
        ) : (
          <div className="h-full">
            <ArtifactsPanel />
          </div>
        )}
      </div>
    </main>
  )
}
