'use client'

import { useState, useEffect } from 'react'
import { mockMessages, mockSubtasks, mockArtifacts } from '@/lib/mock-data'
import { useArtifacts } from '@/core/artifacts/context'
import { useSubtasks } from '@/core/tasks/context'
import { StreamingIndicator } from './streaming-indicator'
import { MessageItem } from './message-item'
import { SubtaskCard } from './subtask-card'
import { ArtifactCard } from './artifact-card'

export function MessageList() {
  const [messages, setMessages] = useState(mockMessages)
  const [isLoading, setIsLoading] = useState(true)
  const { setArtifacts } = useArtifacts()
  const { tasks, addTask, updateTask } = useSubtasks()

  // 初始化模拟任务
  useEffect(() => {
    mockSubtasks.forEach((task) => addTask(task))
  }, [addTask])

  // 模拟：消息中出现 present_files 时更新 artifacts
  useEffect(() => {
    const latestMessage = messages[messages.length - 1]
    if (latestMessage?.tool_calls) {
      for (const tc of latestMessage.tool_calls) {
        if (tc.name === 'present_files') {
          setArtifacts(tc.args.filepaths as string[])
        }
      }
    }
  }, [messages, setArtifacts])

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
        updateTask('task-2', {
          latestMessage: messages[index],
        })
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
    <div className="flex h-full">
      {/* 主对话区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 消息列表 */}
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}

          {/* 任务进度卡片 */}
          <div className="space-y-3">
            {Object.values(tasks).map((task) => (
              <SubtaskCard key={task.id} task={task} />
            ))}
          </div>

          {/* 文件列表（当有 present_files 时显示） */}
          <ArtifactCard files={mockArtifacts} />

          {/* 流式指示器 */}
          {isLoading && <StreamingIndicator />}
        </div>
      </div>
    </div>
  )
}
