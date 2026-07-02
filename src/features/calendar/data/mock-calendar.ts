import { CalendarEvent } from "../types/calendar"

const today = new Date()

export const mockEvents: CalendarEvent[] = [
  { id: "e1", title: "Kickoff Call: Acme Corp", date: today, startTime: "10:00 AM", endTime: "11:00 AM", type: "Meeting", client: "Acme Corp", participants: ["John", "Sarah"] },
  { id: "e2", title: "Post Instagram Reel", date: today, startTime: "1:00 PM", type: "Content Posting", client: "Lumina Fashion" },
  { id: "e3", title: "Brand Guidelines Due", date: today, type: "Deadline", client: "Zephyr Tech" },
  { id: "e4", title: "Internal Weekly Sync", date: new Date(today.getTime() + 24 * 60 * 60 * 1000), startTime: "9:30 AM", endTime: "10:00 AM", type: "Internal" },
  { id: "e5", title: "Proposal Review", date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), startTime: "2:00 PM", endTime: "3:00 PM", type: "Meeting", client: "Elevate Real Estate" },
]
