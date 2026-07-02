import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockInvoices } from "@/features/finance/data/mock-finance"
import { Invoice } from "@/features/finance/types/finance"

export function useInvoices() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('invoices')
          .select('*, client:clients(name)')
          .order('created_at', { ascending: false })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock invoices:", error?.message)
          return mockInvoices as unknown as Invoice[]
        }
        
        return data as unknown as Invoice[]
      } catch (err) {
        console.error("Error fetching invoices, using mocks:", err)
        return mockInvoices as unknown as Invoice[]
      }
    }
  })
}
