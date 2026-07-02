export type TaskStatus = "Todo" | "In Progress" | "In Review" | "Done" | "Canceled";
export type TaskPriority = "Urgent" | "High" | "Medium" | "Low" | "None";

export interface Task {
  id: string;
  user_id: string;
  client_id?: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string | null;
  due_date?: string | null;
  created_at: string;
  
  // Joined relation
  client?: {
    name: string;
  } | null;
}
