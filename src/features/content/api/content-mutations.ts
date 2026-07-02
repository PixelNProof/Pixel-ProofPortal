import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { ContentStatus, ContentType, ContentPlatform } from "../types/content"
import { mockContent } from "../data/mock-content"
import { mockClients } from "@/features/clients/data/mock-clients"

export function useCreateContent() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (newContent: {
      client_id?: string
      title: string
      type: ContentType
      platform?: ContentPlatform
      status: ContentStatus
      assignee?: string
      due_date?: string
    }) => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Not authenticated")

        const { data, error } = await supabase
          .from('content')
          .insert([{ ...newContent, user_id: user.id }])
          .select()
          .single()
        
        if (error) throw error
        return data
      } catch (err) {
        console.warn("Using mock fallback for createContent")
        const client = newContent.client_id ? mockClients.find(c => c.id === newContent.client_id) : undefined;
        const mockItem = {
          id: Math.random().toString(36).substring(7),
          ...newContent,
          client: client ? { name: client.name, id: client.id } : undefined,
        }
        mockContent.push(mockItem as any)
        return mockItem
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] })
      toast.success("Content item created successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to create content: ${error.message}`)
    }
  })
}

export function useDeleteContent() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (contentId: string) => {
      try {
        const { error } = await supabase
          .from('content')
          .delete()
          .eq('id', contentId)
        
        if (error) throw error
        return contentId
      } catch (err) {
        console.warn("Using mock fallback for deleteContent")
        const idx = mockContent.findIndex(c => String(c.id) === String(contentId))
        if (idx > -1) mockContent.splice(idx, 1)
        return contentId
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] })
      toast.success("Content deleted successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to delete content: ${error.message}`)
    }
  })
}

export function useUpdateContentStatus() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContentStatus }) => {
      const { data, error } = await supabase
        .from('content')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Opt not to show toast on every drag to avoid spam, but invalidate queries to sync DB
      queryClient.invalidateQueries({ queryKey: ['content'] })
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`)
    }
  })
}
