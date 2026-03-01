'use client'

import type { Message } from '@/lib/mock-data'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isHuman = message.type === 'human'

  return (
    <div
      className={`flex gap-3 ${isHuman ? 'flex-row-reverse' : ''}`}
    >
      {/* 头像 */}
      <div
        className={`
          flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium
          ${isHuman
            ? 'bg-blue-500 text-white'
            : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
          }
        `}
      >
        {isHuman ? '你' : 'AI'}
      </div>

      {/* 消息内容 */}
      <div
        className={`
          group max-w-[80%] rounded-2xl px-4 py-2
          ${isHuman
            ? 'bg-blue-500 text-white'
            : 'bg-muted'
          }
        `}
      >
        <p className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>

        {/* 工具调用提示 */}
        {message.tool_calls && message.tool_calls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.tool_calls.map((tc) => (
              <span
                key={tc.id}
                className={`
                  inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs
                  ${tc.name === 'present_files'
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                    : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                  }
                `}
              >
                <span>🔧</span>
                {tc.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
