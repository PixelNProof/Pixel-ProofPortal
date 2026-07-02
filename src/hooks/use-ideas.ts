import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockIdeas } from "@/features/ideas/data/mock-ideas"
import { Idea } from "@/features/ideas/types/idea"

export function useIdeas() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['ideas'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('ideas')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock ideas:", error?.message)
          return mockIdeas as unknown as Idea[]
        }
        
        return data as unknown as Idea[]
      } catch (err) {
        console.error("Error fetching ideas, using mocks:", err)
        return mockIdeas as unknown as Idea[]
      }
    }
  })
}
