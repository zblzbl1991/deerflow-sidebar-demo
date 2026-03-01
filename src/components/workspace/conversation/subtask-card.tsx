'use client'

import { useState } from 'react'
import {
  CheckCircle,
  Circle,
  Loader2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { Subtask, TaskStatus } from '@/core/tasks/context'

interface SubtaskCardProps {
  task: Subtask
}

const statusConfig: Record<
  TaskStatus,
  { icon: React.ReactNode; color: string; label: string }
> = {
  pending: {
    icon: <Circle className="h-4 w-4" />,
    color: 'text-gray-400',
    label: '待处理',
  },
  in_progress: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    color: 'text-blue-500',
    label: '进行中',
  },
  completed: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'text-green-500',
    label: '已完成',
  },
  failed: {
    icon: <XCircle className="h-4 w-4" />,
    color: 'text-red-500',
    label: '失败',
  },
}

export function SubtaskCard({ task }: SubtaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = statusConfig[task.status]

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border border-border
        transition-all duration-300
        ${task.status === 'in_progress' ? 'ring-2 ring-blue-500/30' : ''}
      `}
      style={{
        background:
          task.status === 'in_progress'
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
            : 'background',
      }}
    >
      {/* 进行中的动画效果 */}
      {task.status === 'in_progress' && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      )}

      <div className="relative bg-background/95 p-4">
        {/* 头部 - 始终显示 */}
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <span className={config.color}>{config.icon}</span>
            <span className="font-medium">{task.description}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* 状态标签 */}
            <span className={`text-sm ${config.color}`}>{config.label}</span>

            {/* 当前步骤（折叠状态） */}
            {!isExpanded && task.latestMessage && (
              <span className="max-w-[300px] truncate text-sm text-muted-foreground">
                {task.latestMessage}
              </span>
            )}

            {/* 展开/收起图标 */}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* 展开内容 */}
        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-4">
            {/* 进行中的消息 */}
            {task.status === 'in_progress' && task.latestMessage && (
              <div className="flex items-start gap-2">
                <Loader2 className="mt-1 h-3 w-3 animate-spin text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  {task.latestMessage}
                </span>
              </div>
            )}

            {/* 完成结果 */}
            {task.status === 'completed' && task.result && (
              <div className="rounded-md bg-green-500/10 p-3">
                <p className="text-sm">{task.result}</p>
              </div>
            )}

            {/* 失败错误 */}
            {task.status === 'failed' && task.error && (
              <div className="rounded-md bg-red-500/10 p-3">
                <p className="text-sm text-red-500">{task.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
