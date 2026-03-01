'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockMessages, mockSubtasks, mockArtifacts } from '@/lib/mock-data'
import { useSubtasks } from '@/core/tasks/context'
import { StreamingIndicator } from './streaming-indicator'
import { MessageItem } from './message-item'
import { SubtaskCard } from './subtask-card'

export function MessageListV4() {
  const router = useRouter()
  const [messages, setMessages] = useState(mockMessages)
  const [isLoading, setIsLoading] = useState(true)
  const { tasks, addTask, updateTask } = useSubtasks()

  useEffect(() => {
    mockSubtasks.forEach((task) => addTask(task))
  }, [addTask])

  // 模拟任务进度更新
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
          result: 'Proposal 文档已生成完毕',
        })
        clearInterval(interval)
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [updateTask])

  const handleFileClick = (file: string) => {
    router.push(`/v4?file=${encodeURIComponent(file)}`)
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}

          <div className="space-y-3">
            {Object.values(tasks).map((task) => (
              <SubtaskCard key={task.id} task={task} />
            ))}
          </div>

          {/* V4 风格的文件卡片 - 点击跳转 */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              📄 已生成文件 (点击查看)
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {mockArtifacts.map((file) => (
                <button
                  key={file}
                  className="
                    flex items-center gap-3 rounded-md border border-border p-3
                    text-left transition-all duration-200
                    hover:border-orange-500/50 hover:bg-orange-500/5
                    focus:outline-none focus:ring-2 focus:ring-orange-500/20
                  "
                  onClick={() => handleFileClick(file)}
                >
                  <span className="text-orange-500">📄</span>
                  <span className="truncate text-sm">
                    {file.split('/').pop()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {isLoading && <StreamingIndicator />}
        </div>
      </div>
    </div>
  )
}
