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
