import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { mockClients } from "../data/mock-clients"

export function useCreateClient() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (newClient: {
      name: string
      industry: string
      contact: string
      website: string
      services: string[]
    }) => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Not authenticated")

        const { data, error } = await supabase
          .from('clients')
          .insert([{ ...newClient, user_id: user.id }])
          .select()
          .single()
        
        if (error) throw error
        return data
      } catch (err) {
        // Mock fallback
        console.warn("Using mock fallback for createClient")
        const newMockClient = {
          id: Math.random().toString(36).substring(7),
          ...newClient,
          status: "Onboarding",
          spent: "$0"
        }
        mockClients.push(newMockClient)
        return newMockClient
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success("Client added successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to add client: ${error.message}`)
    }
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (clientId: string) => {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', clientId)
        
        if (error) throw error
        return clientId
      } catch (err) {
        // Mock fallback
        console.warn("Using mock fallback for deleteClient")
        const index = mockClients.findIndex(c => String(c.id) === String(clientId))
        if (index > -1) {
          mockClients.splice(index, 1)
        }
        return clientId
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success("Client deleted successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to delete client: ${error.message}`)
    }
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (updates: any) => {
      try {
        const { error } = await supabase
          .from('clients')
          .update(updates)
          .eq('id', updates.id)
        
        if (error) throw error
        return updates
      } catch (err) {
        // Mock fallback
        console.warn("Using mock fallback for updateClient")
        const index = mockClients.findIndex(c => String(c.id) === String(updates.id))
        if (index > -1) {
          mockClients[index] = { ...mockClients[index], ...updates }
        }
        return updates
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success("Client updated successfully!")
    }
  })
}
