export type TaskStatus = 'todo' | 'inprogress' | 'done';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags?: string[];
  createdAt: string;
}