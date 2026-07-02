import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockClients } from "@/features/clients/data/mock-clients"

export function useClients() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock clients:", error?.message)
          return mockClients
        }
        
        return data
      } catch (err) {
        console.error("Error fetching clients, using mocks:", err)
        return mockClients
      }
    }
  })
}

export function useClient(id: string) {
  const supabase = createClient()

  return useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error || !data) {
          const mock = mockClients.find(c => c.id === id)
          return mock || null
        }
        
        return data
      } catch (err) {
        return mockClients.find(c => c.id === id) || null
      }
    },
    enabled: !!id
  })
}
