# DeerFlow 风格侧边栏预览演示

🎉 这是一个演示项目，展示如何实现类似 DeerFlow 的 AI 协作界面。

![Preview](https://img.shields.io/badge/Next.js-14-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ 功能特性

- 📝 **对话界面** - 模拟 AI 流式响应
- 📄 **文件卡片** - 显示 AI 生成的文档列表
- 👀 **侧边栏预览** - 右侧滑出式侧边栏
- 🔄 **Code/Preview 切换** - 代码模式 ↔ 预览模式
- 📊 **任务进度** - 显示子任务进行状态
- 🎨 **丝滑动画** - 过渡动画效果

## 🚀 快速开始

### 安装依赖

```bash
cd deerflow-sidebar-demo
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
src/
├── app/
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 主页面
│   ├── providers.tsx    # Context Providers
│   └── globals.css     # 全局样式
│
├── components/
│   └── workspace/
│       ├── conversation/    # 对话区域
│       │   ├── message-list.tsx
│       │   ├── message-item.tsx
│       │   ├── subtask-card.tsx
│       │   └── artifact-card.tsx
│       │
│       └── sidebar/         # 侧边栏
│           ├── workspace-sidebar.tsx
│           └── artifacts-panel.tsx
│
├── core/
│   ├── artifacts/      # 文件状态管理
│   │   └── context.tsx
│   │
│   └── tasks/         # 任务状态管理
│       └── context.tsx
│
└── lib/
    └── mock-data.ts   # 模拟数据
```

## 🔑 核心实现

### 1. Artifacts Context

管理侧边栏和文件选中状态：

```typescript
const { artifacts, selectedArtifact, select, isOpen } = useArtifacts()
```

### 2. Subtask Context

管理任务进度状态：

```typescript
const { tasks, addTask, updateTask } = useSubtasks()
```

### 3. 交互流程

```
AI 消息包含 present_files 工具调用
           ↓
  更新 artifacts 数组
           ↓
  渲染 ArtifactCard 文件列表
           ↓
  用户点击 → select(filepath)
           ↓
  侧边栏滑入 + 加载内容
           ↓
  切换 Code/Preview 视图
```

## 🎮 交互演示

1. **查看对话** - 模拟 AI 响应消息
2. **查看任务进度** - SubtaskCard 组件展示三个任务
3. **点击文件卡片** - 右侧边栏滑入
4. **切换预览/代码** - 点击顶部切换按钮
5. **关闭侧边栏** - 点击 X 按钮

## 🔧 技术栈

- **框架**: Next.js 14
- **UI**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React

## 📝 License

MIT License
