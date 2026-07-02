export type TaskStatus = "Todo" | "In Progress" | "In Review" | "Done" | "Canceled";
export type TaskPriority = "Urgent" | "High" | "Medium" | "Low" | "None";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  client?: string;
  assignee?: string;
  dueDate?: string;
  createdAt: string;
}
