import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { mockEvents } from "@/features/calendar/data/mock-calendar"
import { CalendarEvent } from "@/features/calendar/types/calendar"

export function useEvents() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*, client:clients(name)')
          .order('date', { ascending: true })
        
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock events:", error?.message)
          return mockEvents as unknown as CalendarEvent[]
        }
        
        // Map data appropriately since Supabase dates are strings
        return data.map(d => ({
          ...d,
          date: new Date(d.date),
          client: d.client?.name
        })) as unknown as CalendarEvent[]
      } catch (err) {
        console.error("Error fetching events, using mocks:", err)
        return mockEvents as unknown as CalendarEvent[]
      }
    }
  })
}
