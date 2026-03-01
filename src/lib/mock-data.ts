import type { Subtask } from '@/core/tasks/context'

// 模拟文件列表
export const mockArtifacts = [
  '/mnt/user-data/outputs/README.md',
  '/mnt/user-data/outputs/proposal.md',
  '/mnt/user-data/outputs/implementation.ts',
  '/mnt/user-data/outputs/design.html',
]

// 模拟文件内容
export const mockFileContents: Record<string, string> = {
  '/mnt/user-data/outputs/README.md': `# 项目Proposal

## 概述
这是一个AI协作写作演示项目。

## 功能特性
- 实时文档预览
- 代码/预览切换
- 任务进度追踪

## 技术栈
- React + TypeScript
- Tailwind CSS
- Next.js 14

## 开始使用

\`\`\`bash
npm install
npm run dev
\`\`\`
`,

  '/mnt/user-data/outputs/proposal.md': `# 提案文档

## 目标
实现一个丝滑的AI协作界面，让用户在与AI对话的同时实时查看生成的文档。

## 实施方案

### 第一阶段 (已完成)
1. ✅ 搭建基础框架
2. ✅ 实现对话功能
3. ✅ 集成侧边栏

### 第二阶段 (进行中)
- 添加实时预览
- 优化用户体验
- 实现 Code/Preview 切换

### 第三阶段
- 添加更多文件类型支持
- 集成真实 API
- 性能优化
`,

  '/mnt/user-data/outputs/implementation.ts': `/**
 * DeerFlow 风格侧边栏实现
 */

interface ArtifactFile {
  filepath: string;
  content: string;
  language: string;
}

export function useArtifactContent(filepath: string): {
  content: string;
  isLoading: boolean;
  error: Error | null;
} {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // 模拟 API 请求
    setTimeout(() => {
      setContent(mockFileContents[filepath] || "");
      setIsLoading(false);
    }, 300);
  }, [filepath]);
  
  return { content, isLoading, error };
}

function useState<T>(initial: T) {
  // 简化实现
  return [initial, () => {}] as const;
}

function useEffect(fn: () => void, deps: any[]) {
  // 简化实现
  fn();
}
`,

  '/mnt/user-data/outputs/design.html': `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>设计稿预览</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    h1 {
      color: #1a1a2e;
      margin-bottom: 16px;
      font-size: 28px;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 24px;
    }
    .feature {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .feature h3 {
      color: #333;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .feature p {
      color: #666;
      font-size: 12px;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>✨ 智能文档助手</h1>
      <p>实时预览、AI 协作、丝滑体验。让你的工作效率翻倍！</p>
      <a href="#" class="button">立即体验</a>
      
      <div class="features">
        <div class="feature">
          <h3>📝 实时预览</h3>
          <p>边聊边看文档</p>
        </div>
        <div class="feature">
          <h3>🎨 Code/Preview</h3>
          <p>切换自如</p>
        </div>
        <div class="feature">
          <h3>⚡ 任务进度</h3>
          <p>了如指掌</p>
        </div>
        <div class="feature">
          <h3>🔄 自动刷新</h3>
          <p>内容实时同步</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`,
}

// 模拟任务进度
export const mockSubtasks: Subtask[] = [
  {
    id: 'task-1',
    description: '分析需求文档',
    status: 'completed',
    result: '已完成需求分析，包含5个主要功能模块：对话、侧边栏、文件预览、任务进度、代码展示',
  },
  {
    id: 'task-2',
    description: '编写项目Proposal',
    status: 'in_progress',
    latestMessage: '正在调用 write_file 工具...',
  },
  {
    id: 'task-3',
    description: '生成技术方案',
    status: 'pending',
  },
  {
    id: 'task-4',
    description: '设计 UI 界面',
    status: 'pending',
  },
]

// 模拟对话消息
export interface Message {
  id: string
  type: 'human' | 'ai'
  content: string
  tool_calls?: Array<{
    id: string
    name: string
    args: Record<string, unknown>
  }>
  createdAt: Date
}

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    type: 'human',
    content: '帮我写一个项目Proposal，要求包含需求分析、技术方案和UI设计',
    createdAt: new Date('2026-03-01T10:00:00'),
  },
  {
    id: 'msg-2',
    type: 'ai',
    content: '好的，我来帮你完成这个项目Proposal。让我先分析需求，然后逐步生成文档。',
    createdAt: new Date('2026-03-01T10:00:01'),
  },
  {
    id: 'msg-3',
    type: 'ai',
    content: '我先创建任务来并行处理各个部分：',
    tool_calls: [
      {
        id: 'call-1',
        name: 'task',
        args: {
          description: '分析需求文档',
          subagent_type: 'analyzer',
        },
      },
    ],
    createdAt: new Date('2026-03-01T10:00:02'),
  },
  {
    id: 'msg-4',
    type: 'ai',
    content: '现在我来生成项目Proposal文档：',
    tool_calls: [
      {
        id: 'call-2',
        name: 'present_files',
        args: {
          filepaths: mockArtifacts,
        },
      },
    ],
    createdAt: new Date('2026-03-01T10:00:15'),
  },
]
