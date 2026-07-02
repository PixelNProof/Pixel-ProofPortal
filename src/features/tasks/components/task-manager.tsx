"use client"

import { useState } from "react"
import { Search, Plus, CheckCircle2, Circle, Clock, XCircle, AlertCircle, SignalHigh, SignalMedium, SignalLow, MoreHorizontal, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockTasks } from "../data/mock-tasks"
import { Task, TaskStatus, TaskPriority } from "../types/task"
import { toast } from "sonner"

export function TaskManager() {
  const [filter, setFilter] = useState<string>("All")

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

  // Group tasks by status for a Linear-like view
  const statuses: TaskStatus[] = ["Todo", "In Progress", "In Review", "Done"]

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full min-h-screen max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <Badge variant="secondary" className="font-mono">{mockTasks.length}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => toast("New Task modal opened")}><Plus className="mr-2 h-4 w-4" /> New Issue</Button>
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
            <Input placeholder="Search tasks..." className="pl-8 h-9 bg-background border-none shadow-none" />
          </div>
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast("View options opened")}><Filter className="h-4 w-4 mr-2" /> View</Button>
        </div>
      </div>

      <div className="space-y-8">
        {statuses.map(status => {
          const groupTasks = mockTasks.filter(t => t.status === status)
          if (groupTasks.length === 0) return null

          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                {getStatusIcon(status)}
                <h3 className="font-semibold text-sm">{status}</h3>
                <span className="text-xs text-muted-foreground">{groupTasks.length}</span>
              </div>
              
              <div className="border rounded-lg bg-card/50 overflow-hidden shadow-sm">
                {groupTasks.map((task, idx) => (
                  <div 
                    key={task.id} 
                    className={`group flex items-center gap-3 p-3 text-sm hover:bg-muted/50 transition-colors cursor-pointer ${idx !== groupTasks.length - 1 ? 'border-b' : ''}`}
                  >
                    <div className="w-16 text-xs text-muted-foreground font-mono shrink-0">{task.id}</div>
                    
                    <div className="shrink-0 flex items-center justify-center w-5">
                      {getPriorityIcon(task.priority)}
                    </div>
                    
                    <div className="shrink-0 flex items-center justify-center w-5">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    <div className="flex-1 font-medium truncate pr-4">
                      {task.title}
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      {task.client && (
                        <Badge variant="outline" className="hidden md:inline-flex text-[10px] bg-background font-normal text-muted-foreground border-border/50">
                          {task.client}
                        </Badge>
                      )}
                      
                      {task.dueDate && (
                        <div className="hidden sm:flex text-xs text-muted-foreground w-20 justify-end">
                          {task.dueDate}
                        </div>
                      )}
                      
                      {task.assignee ? (
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20 shrink-0">
                          {task.assignee.charAt(0)}
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full border border-dashed border-muted-foreground/50 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
