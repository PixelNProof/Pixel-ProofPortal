"use client"

import { useState } from "react"
import { Search, CheckCircle2, Circle, Clock, XCircle, AlertCircle, SignalHigh, SignalMedium, SignalLow, MoreHorizontal, Filter, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskStatus, TaskPriority } from "../types/task"
import { toast } from "sonner"
import { useTasks } from "@/hooks/use-tasks"
import { useDeleteTask } from "../api/task-mutations"
import { AddTaskDialog } from "./add-task-dialog"

export function TaskManager() {
  const { data: tasks = [], isLoading } = useTasks()
  const { mutate: deleteTask } = useDeleteTask()
  
  const [filter, setFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "Todo": return <Circle className="h-4 w-4 text-muted-foreground" />
      case "In Progress": return <Clock className="h-4 w-4 text-blue-500" />
      case "In Review": return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "Done": return <CheckCircle2 className="h-4 w-4 text-primary" />
      case "Canceled": return <XCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case "Urgent": return <SignalHigh className="h-4 w-4 text-destructive" />
      case "High": return <SignalHigh className="h-4 w-4 text-orange-500" />
      case "Medium": return <SignalMedium className="h-4 w-4 text-blue-500" />
      case "Low": return <SignalLow className="h-4 w-4 text-muted-foreground" />
      case "None": return <span className="text-muted-foreground text-xs font-bold px-1">-</span>
    }
  }

  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Tab filter
    if (filter === "Active") {
      return task.status === "In Progress" || task.status === "In Review"
    }
    if (filter === "Backlog") {
      return task.status === "Todo" || task.status === "Canceled"
    }
    return true
  })

  // Group tasks by status for a Linear-like view
  const statuses: TaskStatus[] = ["Todo", "In Progress", "In Review", "Done", "Canceled"]

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full min-h-screen max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <Badge variant="secondary" className="font-mono">{tasks.length}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <AddTaskDialog />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <Button variant={filter === "All" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("All")}>All Issues</Button>
          <Button variant={filter === "Active" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("Active")}>Active</Button>
          <Button variant={filter === "Backlog" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("Backlog")}>Backlog</Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-full sm:w-64 hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-8 h-9 bg-background border-none shadow-none" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast("View options opened")}><Filter className="h-4 w-4 mr-2" /> View</Button>
        </div>
      </div>

      <div className="space-y-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border rounded-lg bg-card/30 border-dashed">
            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-medium text-foreground">No tasks found</p>
            <p className="text-sm max-w-sm text-center mb-6">Create your first task to start organizing your workflow.</p>
          </div>
        ) : (
          statuses.map(status => {
            const groupTasks = filteredTasks.filter(t => t.status === status)
            if (groupTasks.length === 0) return null

            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  {getStatusIcon(status)}
                  <h3 className="font-semibold text-sm">{status}</h3>
                  <span className="text-xs text-muted-foreground">{groupTasks.length}</span>
                </div>
                
                <div className="border rounded-lg bg-card/50 shadow-sm transition-all duration-300">
                  {groupTasks.map((task, idx) => (
                    <div 
                      key={task.id} 
                      className={`group flex items-center gap-3 p-3 text-sm hover:bg-muted/50 transition-colors cursor-default ${idx !== groupTasks.length - 1 ? 'border-b' : ''}`}
                    >
                      <div className="w-12 md:w-16 text-xs text-muted-foreground font-mono shrink-0 truncate">
                        {task.id.slice(0,6)}
                      </div>
                      
                      <div className="shrink-0 flex items-center justify-center w-5">
                        {getPriorityIcon(task.priority)}
                      </div>
                      
                      <div className="shrink-0 flex items-center justify-center w-5">
                        {getStatusIcon(task.status)}
                      </div>
                      
                      <div className="flex-1 font-medium truncate pr-4">
                        {task.title}
                      </div>
                      
                      <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        {task.client?.name && (
                          <Badge variant="outline" className="hidden md:inline-flex text-[10px] bg-background font-normal text-muted-foreground border-border/50">
                            {task.client.name}
                          </Badge>
                        )}
                        
                        {task.due_date && (
                          <div className="hidden sm:flex text-xs text-muted-foreground w-20 justify-end truncate">
                            {task.due_date}
                          </div>
                        )}
                        
                        {task.assignee ? (
                          <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20 shrink-0 uppercase">
                            {task.assignee.charAt(0)}
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full border border-dashed border-muted-foreground/50 shrink-0" />
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger 
                            render={
                              <Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            } 
                          />
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => toast.info("Edit task (coming soon)")}>
                              <Edit className="mr-2 h-4 w-4" /> Edit task
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this task?")) {
                                  deleteTask(task.id)
                                }
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
