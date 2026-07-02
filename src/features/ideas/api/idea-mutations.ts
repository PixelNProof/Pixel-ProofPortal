import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export function useCreateIdea() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (newIdea: {
      title: string
      image_url: string
      source?: string
      tags: string[]
      aspect_ratio: string
    }) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from('ideas')
        .insert([{ ...newIdea, user_id: user.id }])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      toast.success("Idea saved successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to save idea: ${error.message}`)
    }
  })
}

export function useDeleteIdea() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (ideaId: string) => {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId)
      
      if (error) throw error
      return ideaId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      toast.success("Idea deleted successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to delete idea: ${error.message}`)
    }
  })
}
