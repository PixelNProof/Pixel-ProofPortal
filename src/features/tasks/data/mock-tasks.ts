import { Task } from "../types/task"

export const mockTasks: Task[] = [
  { id: "PP-101", title: "Finalize brand guidelines document", status: "In Progress", priority: "High", client: "Acme Corp", assignee: "Sarah", dueDate: "Tomorrow", createdAt: "Oct 1" },
  { id: "PP-102", title: "Edit promotional reel for Q4 campaign", status: "Todo", priority: "Urgent", client: "Lumina Fashion", assignee: "Mike", dueDate: "Oct 15", createdAt: "Oct 2" },
  { id: "PP-103", title: "Draft 5 carousel posts on UX design", status: "In Review", priority: "Medium", client: "Zephyr Tech", assignee: "Sarah", dueDate: "Oct 12", createdAt: "Oct 5" },
  { id: "PP-104", title: "Send monthly invoice", status: "Done", priority: "Low", client: "Elevate Real Estate", createdAt: "Sep 28" },
  { id: "PP-105", title: "Schedule onboarding meeting", status: "Todo", priority: "High", client: "Acme Corp", assignee: "John", dueDate: "Today", createdAt: "Oct 8" },
  { id: "PP-106", title: "Update client portal mockups", status: "In Progress", priority: "Medium", assignee: "Mike", dueDate: "Next Week", createdAt: "Oct 8" },
]
