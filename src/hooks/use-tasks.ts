import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockTasks } from "@/features/tasks/data/mock-tasks"
import { Task } from "@/features/tasks/types/task"

export function useTasks() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*, client:clients(name)')
          .order('created_at', { ascending: false })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock tasks:", error?.message)
          return mockTasks as unknown as Task[]
        }
        
        return data as unknown as Task[]
      } catch (err) {
        console.error("Error fetching tasks, using mocks:", err)
        return mockTasks as unknown as Task[]
      }
    }
  })
}
