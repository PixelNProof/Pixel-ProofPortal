import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockContent } from "@/features/content/data/mock-content"
import { ContentItem } from "@/features/content/types/content"

export function useContent() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*, client:clients(name)')
          .order('created_at', { ascending: false })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock content:", error?.message)
          return mockContent as unknown as ContentItem[]
        }
        
        return data as unknown as ContentItem[]
      } catch (err) {
        console.error("Error fetching content, using mocks:", err)
        return mockContent as unknown as ContentItem[]
      }
    }
  })
}
