"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useCreateTask } from "../api/task-mutations"
import { TaskStatus, TaskPriority } from "../types/task"
import { useClients } from "@/hooks/use-clients"

const taskSchema = z.object({
  title: z.string().min(2, "Task title must be at least 2 characters"),
  status: z.enum(["Todo", "In Progress", "In Review", "Done", "Canceled"]),
  priority: z.enum(["Urgent", "High", "Medium", "Low", "None"]),
  client_id: z.string().optional().or(z.literal("")),
  assignee: z.string().optional(),
  due_date: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskSchema>

export function AddTaskDialog() {
  const [open, setOpen] = useState(false)
  const { mutate: createTask, isPending } = useCreateTask()
  const { data: clients = [] } = useClients()

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "Todo",
      priority: "Medium",
      client_id: "",
      assignee: "",
      due_date: "",
    },
  })

  function onSubmit(data: TaskFormValues) {
    createTask(
      {
        ...data,
        client_id: data.client_id || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> New Issue
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[500px] border-muted/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Task</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new task to your workspace. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Task Title <span className="text-destructive">*</span></Label>
            <Input id="title" {...form.register("title")} placeholder="Finalize brand guidelines..." disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.title && <p className="text-xs text-destructive font-medium">{form.formState.errors.title.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Status <span className="text-destructive">*</span></Label>
              <select 
                id="status" 
                {...form.register("status")} 
                disabled={isPending} 
                className="flex h-9 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">Priority <span className="text-destructive">*</span></Label>
              <select 
                id="priority" 
                {...form.register("priority")} 
                disabled={isPending} 
                className="flex h-9 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id" className="text-sm font-medium">Client (Optional)</Label>
            <select 
              id="client_id" 
              {...form.register("client_id")} 
              disabled={isPending} 
              className="flex h-9 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">No Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-sm font-medium">Assignee</Label>
              <Input id="assignee" {...form.register("assignee")} placeholder="Name" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-sm font-medium">Due Date</Label>
              <Input id="due_date" type="text" {...form.register("due_date")} placeholder="e.g. Next Friday" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            </div>
          </div>

          <div className="flex justify-end pt-4 space-x-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-sm">
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
