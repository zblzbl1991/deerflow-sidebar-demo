'use client'

export function StreamingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex gap-1">
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      <span className="text-sm text-muted-foreground">AI 正在思考...</span>
    </div>
  )
}
