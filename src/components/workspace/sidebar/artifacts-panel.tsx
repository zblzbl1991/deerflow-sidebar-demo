'use client'

import { useState, useEffect, useMemo } from 'react'
import { Eye, Code2, X, Download, ExternalLink, Loader2 } from 'lucide-react'
import { useArtifacts } from '@/core/artifacts/context'
import { mockFileContents } from '@/lib/mock-data'

type ViewMode = 'code' | 'preview'

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function ArtifactsPanel() {
  const { selectedArtifact, isOpen, close, deselect } = useArtifacts()
  const [viewMode, setViewMode] = useState<ViewMode>('preview')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 加载文件内容
  useEffect(() => {
    if (selectedArtifact) {
      setIsLoading(true)
      // 模拟 API 请求延迟
      const timer = setTimeout(() => {
        setContent(mockFileContents[selectedArtifact] || '// 文件不存在')
        setIsLoading(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [selectedArtifact])

  // 根据文件类型判断是否可预览
  const canPreview = useMemo(() => {
    if (!selectedArtifact) return false
    return selectedArtifact.endsWith('.md') || selectedArtifact.endsWith('.html')
  }, [selectedArtifact])

  // 自动切换到预览模式
  useEffect(() => {
    if (canPreview) {
      setViewMode('preview')
    } else {
      setViewMode('code')
    }
  }, [selectedArtifact, canPreview])

  if (!isOpen || !selectedArtifact) return null

  const fileName = selectedArtifact.split('/').pop()

  // 简单的 Markdown 渲染
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
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
      if (line.startsWith('```')) {
        return null
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.slice(2)}
          </li>
        )
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-4 list-decimal">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        )
      }
      if (line.trim() === '') {
        return <br key={i} />
      }
      // 处理行内代码
      const parts = line.split(/(`[^`]+`)/)
      return (
        <p key={i} className="mb-2 leading-7">
          {parts.map((part, j) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={j}
                  className="rounded bg-muted px-1.5 py-0.5 text-sm"
                >
                  {part.slice(1, -1)}
                </code>
              )
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="truncate font-medium">{fileName}</h3>

        <div className="flex items-center gap-2">
          {/* 预览/代码切换 */}
          {canPreview && (
            <div className="flex rounded-md border p-0.5">
              <button
                className={cn(
                  'flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors',
                  viewMode === 'preview'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-muted'
                )}
                onClick={() => setViewMode('preview')}
              >
                <Eye className="h-3.5 w-3.5" />
                预览
              </button>
              <button
                className={cn(
                  'flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors',
                  viewMode === 'code'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-muted'
                )}
                onClick={() => setViewMode('code')}
              >
                <Code2 className="h-3.5 w-3.5" />
                代码
              </button>
            </div>
          )}

          {/* 关闭按钮 */}
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

      {/* 内容区 */}
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
          /* Markdown 预览 */
          <div className="h-full overflow-y-auto px-4 py-2">
            <div className="text-sm">{renderMarkdown(content)}</div>
          </div>
        ) : viewMode === 'preview' && selectedArtifact?.endsWith('.html') ? (
          /* HTML 预览 */
          <iframe
            srcDoc={content}
            className="h-full w-full border-0"
            sandbox="allow-scripts"
            title="HTML Preview"
          />
        ) : (
          /* 代码模式 */
          <pre className="h-full overflow-auto bg-muted p-4 text-sm">
            <code className="font-mono">{content}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
