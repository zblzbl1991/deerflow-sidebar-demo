'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-800">
          🎨 界面风格对比
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          这里是 5 种不同的 AI 协作界面设计，请点击你喜欢的风格进行预览
        </p>

        <div className="grid gap-4">
          <VersionCard
            href="/v1"
            version="V1"
            title="右侧边栏式"
            description="DeerFlow 风格 - 点击文件后，右侧滑入预览面板"
            color="blue"
          />
          
          <VersionCard
            href="/v2"
            version="V2"
            title="底部抽屉式"
            description="类似 Claude/ChatGPT - 底部弹出文件预览"
            color="green"
          />
          
          <VersionCard
            href="/v3"
            version="V3"
            title="标签页切换式"
            description="主对话区和预览区并排，顶部 Tab 切换"
            color="purple"
          />
          
          <VersionCard
            href="/v4"
            version="V4"
            title="独立页面式"
            description="点击文件跳转到独立预览页面"
            color="orange"
          />
          
          <VersionCard
            href="/v5"
            version="V5"
            title="模态框式"
            description="点击文件后弹出居中预览窗口"
            color="pink"
          />
        </div>
      </div>
    </main>
  )
}

function VersionCard({
  href,
  version,
  title,
  description,
  color,
}: {
  href: string
  version: string
  title: string
  description: string
  color: string
}) {
  const colors: Record<string, string> = {
    blue: 'hover:border-blue-500 hover:bg-blue-50',
    green: 'hover:border-green-500 hover:bg-green-50',
    purple: 'hover:border-purple-500 hover:bg-purple-50',
    orange: 'hover:border-orange-500 hover:bg-orange-50',
    pink: 'hover:border-pink-500 hover:bg-pink-50',
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
          group flex cursor-pointer items-start gap-4 rounded-lg border-2 border-slate-200 bg-white p-4 text-left
          transition-all duration-200 hover:shadow-lg ${colors[color]}
        `}
      >
        <span
          className={`shrink-0 rounded px-3 py-1 text-sm font-bold text-white ${badgeColors[color]}`}
        >
          {version}
        </span>
        <div>
          <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
            {title}
          </h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </Link>
  )
}
