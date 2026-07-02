import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { TaskStatus, TaskPriority } from "../types/task"

export function useCreateTask() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (newTask: {
      title: string
      status: TaskStatus
      priority: TaskPriority
      assignee?: string
      client_id?: string
      due_date?: string
    }) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...newTask, user_id: user.id }])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success("Task created successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to create task: ${error.message}`)
    }
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
      
      if (error) throw error
      return taskId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success("Task deleted successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`)
    }
  })
}
