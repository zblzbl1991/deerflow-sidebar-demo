'use client'

import { useState, useEffect } from 'react'
import { MessageList } from '@/components/workspace/conversation/message-list'
import { mockFileContents } from '@/lib/mock-data'
import { useArtifacts } from '@/core/artifacts/context'
import { X, Eye, Code2, Loader2 } from 'lucide-react'

type ViewMode = 'code' | 'preview'

export default function V5Page() {
  const { selectedArtifact, isOpen, close, deselect } = useArtifacts()
  const [viewMode, setViewMode] = useState<ViewMode>('preview')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedArtifact) {
      setIsLoading(true)
      setTimeout(() => {
        setContent(mockFileContents[selectedArtifact] || '// 文件不存在')
        setIsLoading(false)
      }, 400)
    }
  }, [selectedArtifact])

  const canPreview = selectedArtifact?.endsWith('.md') || selectedArtifact?.endsWith('.html')

  useEffect(() => {
    if (canPreview) {
      setViewMode('preview')
    } else {
      setViewMode('code')
    }
  }, [selectedArtifact, canPreview])

  return (
    <main className="flex h-screen flex-col">
      {/* 头部 */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🤖 AI 协作助手</span>
          <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-600">
            V5: 模态框式
          </span>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          ← 返回首页
        </a>
      </header>

      {/* 主体内容 */}
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>

      {/* 模态框遮罩 */}
      {isOpen && selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 遮罩 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              deselect()
              close()
            }}
          />

          {/* 模态框 */}
          <div className="relative z-10 flex h-[80vh] w-[90vw] max-w-4xl flex-col rounded-xl bg-background shadow-2xl">
            {/* 头部 */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="truncate font-medium">
                {selectedArtifact.split('/').pop()}
              </h3>

              <div className="flex items-center gap-2">
                {canPreview && (
                  <div className="flex rounded-md border p-0.5">
                    <button
                      className={`
                        flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors
                        ${
                          viewMode === 'preview'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-muted'
                        }
                      `}
                      onClick={() => setViewMode('preview')}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      预览
                    </button>
                    <button
                      className={`
                        flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors
                        ${
                          viewMode === 'code'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-muted'
                        }
                      `}
                      onClick={() => setViewMode('code')}
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      代码
                    </button>
                  </div>
                )}

                <button
                  className="rounded p-1 hover:bg-muted"
                  onClick={() => {
                    deselect()
                    close()
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      加载文件中...
                    </span>
                  </div>
                </div>
              ) : viewMode === 'preview' && selectedArtifact?.endsWith('.md') ? (
                <div className="h-full overflow-y-auto px-8 py-4">
                  <div className="mx-auto max-w-3xl">
                    {content.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return (
                          <h1 key={i} className="mb-4 mt-6 text-2xl font-bold first:mt-0">
                            {line.slice(2)}
                          </h1>
                        )
                      }
                      if (line.startsWith('## ')) {
                        return (
                          <h2 key={i} className="mb-3 mt-5 text-xl font-semibold">
                            {line.slice(3)}
                          </h2>
                        )
                      }
                      if (line.startsWith('### ')) {
                        return (
                          <h3 key={i} className="mb-2 mt-4 text-lg font-medium">
                            {line.slice(4)}
                          </h3>
                        )
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <li key={i} className="ml-4 list-disc">
                            {line.slice(2)}
                          </li>
                        )
                      }
                      if (line.trim() === '') return <br key={i} />
                      return (
                        <p key={i} className="mb-2 leading-7">
                          {line}
                        </p>
                      )
                    })}
                  </div>
                </div>
              ) : viewMode === 'preview' && selectedArtifact?.endsWith('.html') ? (
                <iframe
                  srcDoc={content}
                  className="h-full w-full border-0"
                  sandbox="allow-scripts"
                />
              ) : (
                <pre className="h-full overflow-auto bg-muted p-4 text-sm">
                  <code className="font-mono">{content}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
