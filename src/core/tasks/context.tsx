'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed'

export interface Subtask {
  id: string
  description: string
  status: TaskStatus
  result?: string
  error?: string
  latestMessage?: string
  startedAt?: number
}

interface SubtaskContextType {
  tasks: Record<string, Subtask>
  addTask: (task: Subtask) => void
  updateTask: (id: string, updates: Partial<Subtask>) => void
  getTask: (id: string) => Subtask | undefined
  clearTasks: () => void
}

const SubtaskContext = createContext<SubtaskContextType | undefined>(undefined)

export function SubtasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Record<string, Subtask>>({})

  const addTask = useCallback((task: Subtask) => {
    setTasks((prev) => ({ ...prev, [task.id]: task }))
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Subtask>) => {
    setTasks((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }))
  }, [])

  const getTask = useCallback(
    (id: string) => tasks[id],
    [tasks]
  )

  const clearTasks = useCallback(() => setTasks({}), [])

  return (
    <SubtaskContext.Provider
      value={{ tasks, addTask, updateTask, getTask, clearTasks }}
    >
      {children}
    </SubtaskContext.Provider>
  )
}

export function useSubtasks() {
  const context = useContext(SubtaskContext)
  if (!context) {
    throw new Error('useSubtasks must be used within SubtasksProvider')
  }
  return context
}

export function useSubtask(id: string) {
  const { getTask } = useSubtasks()
  return getTask(id)
}
