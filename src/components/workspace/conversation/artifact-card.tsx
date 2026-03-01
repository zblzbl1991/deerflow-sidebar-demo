'use client'

import { FileText, FileCode, File, FileImage } from 'lucide-react'
import { useArtifacts } from '@/core/artifacts/context'

interface ArtifactCardProps {
  files: string[]
}

function getFileIcon(filename: string) {
  if (filename.endsWith('.md')) return <FileText className="h-5 w-5" />
  if (
    filename.endsWith('.ts') ||
    filename.endsWith('.tsx') ||
    filename.endsWith('.js')
  ) {
    return <FileCode className="h-5 w-5" />
  }
  if (filename.endsWith('.html')) return <FileImage className="h-5 w-5" />
  return <File className="h-5 w-5" />
}

function getFileName(filepath: string): string {
  return filepath.split('/').pop() || filepath
}

function getFileExt(filepath: string): string {
  const ext = filepath.split('.').pop()?.toUpperCase() || ''
  return ext
}

export function ArtifactCard({ files }: ArtifactCardProps) {
  const { select } = useArtifacts()

  if (!files || files.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        📄 已生成文件
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {files.map((file) => (
          <button
            key={file}
            className="
              flex items-center gap-3 rounded-md border border-border p-3
              text-left transition-all duration-200
              hover:border-blue-500/50 hover:bg-blue-500/5
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
            "
            onClick={() => select(file)}
          >
            <span className="text-blue-500">{getFileIcon(file)}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {getFileName(file)}
              </div>
              <div className="text-xs text-muted-foreground">
                {getFileExt(file)} 文件
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
