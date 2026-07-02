import { Task } from "../types/task"

export const mockTasks: Task[] = [
  { id: "1", user_id: "demo", title: "Finalize brand guidelines document", status: "In Progress", priority: "High", client_id: "1", client: { name: "Acme Corp" }, assignee: "Sarah", due_date: "Tomorrow", created_at: "Oct 1" },
  { id: "2", user_id: "demo", title: "Edit promotional reel for Q4 campaign", status: "Todo", priority: "Urgent", client_id: "2", client: { name: "Lumina Fashion" }, assignee: "Mike", due_date: "Oct 15", created_at: "Oct 2" },
  { id: "3", user_id: "demo", title: "Draft 5 carousel posts on UX design", status: "In Review", priority: "Medium", client_id: "3", client: { name: "Zephyr Tech" }, assignee: "Sarah", due_date: "Oct 12", created_at: "Oct 5" },
  { id: "4", user_id: "demo", title: "Send monthly invoice", status: "Done", priority: "Low", client_id: "4", client: { name: "Elevate Real Estate" }, created_at: "Sep 28" },
  { id: "5", user_id: "demo", title: "Schedule onboarding meeting", status: "Todo", priority: "High", client_id: "1", client: { name: "Acme Corp" }, assignee: "John", due_date: "Today", created_at: "Oct 8" },
  { id: "6", user_id: "demo", title: "Update client portal mockups", status: "In Progress", priority: "Medium", assignee: "Mike", due_date: "Next Week", created_at: "Oct 8" },
]
