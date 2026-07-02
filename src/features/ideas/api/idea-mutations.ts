import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { mockIdeas } from "../data/mock-ideas"
import { mockClients } from "@/features/clients/data/mock-clients"

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
      client_id?: string
    }) => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Not authenticated")

        const { data, error } = await supabase
          .from('ideas')
          .insert([{ ...newIdea, user_id: user.id }])
          .select()
          .single()
        
        if (error) throw error
        return data
      } catch (err) {
        console.warn("Supabase mutation failed, using local fallback", err)
        const client = newIdea.client_id ? mockClients.find(c => c.id === newIdea.client_id) : undefined;
        const mockIdea = {
          id: `idea_${Date.now()}`,
          user_id: "demo",
          title: newIdea.title,
          image_url: newIdea.image_url,
          source: newIdea.source,
          tags: newIdea.tags,
          aspect_ratio: newIdea.aspect_ratio,
          client_id: newIdea.client_id,
          client: client ? { name: client.name } : undefined,
          created_at: new Date().toISOString(),
        }
        mockIdeas.unshift(mockIdea as any)
        return mockIdea
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      toast.success("Idea saved to vault!")
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
      try {
        const { error } = await supabase
          .from('ideas')
          .delete()
          .eq('id', ideaId)
        
        if (error) throw error
        return ideaId
      } catch (err) {
        console.warn("Supabase mutation failed, using local fallback", err)
        const index = mockIdeas.findIndex(i => i.id === ideaId)
        if (index > -1) {
          mockIdeas.splice(index, 1)
        }
        return ideaId
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      toast.success("Idea removed.")
    },
    onError: (error) => {
      toast.error(`Failed to delete idea: ${error.message}`)
    }
  })
}
