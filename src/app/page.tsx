'use client'

import { useEffect } from 'react'
import { useArtifacts } from '@/core/artifacts/context'
import { useSubtasks } from '@/core/tasks/context'
import { mockMessages, mockSubtasks, mockArtifacts } from '@/lib/mock-data'
import { MessageItem } from '@/components/workspace/conversation/message-item'
import { SubtaskCard } from '@/components/workspace/conversation/subtask-card'
import { StreamingIndicator } from '@/components/workspace/conversation/streaming-indicator'
import { ArtifactCard } from '@/components/workspace/conversation/artifact-card'
import Link from 'next/link'

export default function HomePage() {
  const { setArtifacts } = useArtifacts()
  const { tasks, addTask, updateTask } = useSubtasks()

  useEffect(() => {
    mockSubtasks.forEach((task) => addTask(task))
  }, [addTask])

  useEffect(() => {
    const latestMessage = mockMessages[mockMessages.length - 1]
    if (latestMessage?.tool_calls) {
      for (const tc of latestMessage.tool_calls) {
        if (tc.name === 'present_files') {
          setArtifacts(tc.args.filepaths as string[])
        }
      }
    }
  }, [setArtifacts])

  useEffect(() => {
    const messages = [
      '正在分析需求...',
      '正在编写 README.md...',
      '正在生成 proposal.md...',
      '正在编写 implementation.ts...',
      '正在设计 HTML 页面...',
    ]
    let index = 0

    const interval = setInterval(() => {
      if (index < messages.length) {
        updateTask('task-2', { latestMessage: messages[index] })
        index++
      } else {
        updateTask('task-2', {
          status: 'completed',
          result: 'Proposal 文档已生成完毕，包含 README、Proposal、技术实现和UI设计',
        })
        clearInterval(interval)
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [updateTask])

  return (
    <main className="flex min-h-screen flex-col">
      {/* 顶部导航 */}
      <header className="flex h-16 shrink-0 items-center border-b px-6">
        <h1 className="text-xl font-bold">🎨 界面风格对比</h1>
      </header>

      {/* 内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧：版本选择 */}
        <div className="w-80 shrink-0 border-r bg-slate-50 p-6">
          <h2 className="mb-4 text-lg font-semibold">选择预览版本</h2>
          <div className="space-y-2">
            <VersionLink href="/v1" version="V1" title="右侧边栏式" color="blue" />
            <VersionLink href="/v2" version="V2" title="底部抽屉式" color="green" />
            <VersionLink href="/v3" version="V3" title="标签页切换式" color="purple" />
            <VersionLink href="/v4" version="V4" title="独立页面式" color="orange" />
            <VersionLink href="/v5" version="V5" title="模态框式" color="pink" />
          </div>
        </div>

        {/* 右侧：预览区 */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-blue-800">
                  👈 点击左侧版本查看预览效果
                </p>
              </div>

              {/* 模拟对话内容展示 */}
              <h2 className="text-lg font-semibold">📝 当前演示内容</h2>

              {mockMessages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}

              <div className="space-y-3">
                {Object.values(tasks).map((task) => (
                  <SubtaskCard key={task.id} task={task} />
                ))}
              </div>

              <ArtifactCard files={mockArtifacts} />

              <StreamingIndicator />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function VersionLink({
  href,
  version,
  title,
  color,
}: {
  href: string
  version: string
  title: string
  color: string
}) {
  const colors: Record<string, string> = {
    blue: 'border-blue-200 bg-white hover:border-blue-500 hover:bg-blue-50',
    green: 'border-green-200 bg-white hover:border-green-500 hover:bg-green-50',
    purple: 'border-purple-200 bg-white hover:border-purple-500 hover:bg-purple-50',
    orange: 'border-orange-200 bg-white hover:border-orange-500 hover:bg-orange-50',
    pink: 'border-pink-200 bg-white hover:border-pink-500 hover:bg-pink-50',
  }

  const badgeColors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
  }

  return (
    <Link href={href}>
      <div
        className={`
          flex items-center gap-3 rounded-lg border p-3 transition-all duration-200
          ${colors[color]}
        `}
      >
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold text-white ${badgeColors[color]}`}
        >
          {version}
        </span>
        <span className="font-medium">{title}</span>
      </div>
    </Link>
  )
}
