"use client"

import { useState, useEffect } from "react"
import { Calendar as CalendarIcon, Clock, Users, Video, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "../data/mock-calendar"
import { EventType } from "../types/calendar"
import { toast } from "sonner"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case "Meeting": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Content Posting": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Deadline": return "bg-destructive/10 text-destructive border-destructive/20"
      case "Internal": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    }
  }

  // Simple filter to show events for selected date (mock logic compares just the day number for simplicity in this mock)
  const selectedEvents = mockEvents.filter(e => date && e.date.getDate() === date.getDate() && e.date.getMonth() === date.getMonth())

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 h-full flex flex-col min-w-0 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => toast("New Event modal opened")}><Plus className="mr-2 h-4 w-4" /> New Event</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar: Date Picker */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-3 min-h-[350px] flex items-center justify-center">
              {isMounted ? (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md w-full flex justify-center"
                />
              ) : (
                <div className="text-muted-foreground text-sm">Loading calendar...</div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Calendars</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-md">
                <input type="checkbox" defaultChecked className="rounded border-muted-foreground/30 text-primary focus:ring-primary" />
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Meetings
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-md">
                <input type="checkbox" defaultChecked className="rounded border-muted-foreground/30 text-primary focus:ring-primary" />
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                Content Schedule
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-md">
                <input type="checkbox" defaultChecked className="rounded border-muted-foreground/30 text-primary focus:ring-primary" />
                <span className="w-3 h-3 rounded-full bg-destructive" />
                Deadlines
              </label>
            </div>
          </div>
        </div>

        {/* Right Area: Agenda View */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-xl font-semibold">
              {isMounted && date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : "Select a date"}
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => toast("Previous Day")}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="h-8" onClick={() => setDate(new Date())}>Today</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => toast("Next Day")}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            {selectedEvents.length > 0 ? (
              selectedEvents.map(event => (
                <Card key={event.id} className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                    <div className="sm:w-32 shrink-0 flex flex-col gap-1">
                      <span className="font-medium">{event.startTime || "All Day"}</span>
                      {event.endTime && <span className="text-xs text-muted-foreground">to {event.endTime}</span>}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold leading-none mb-2">{event.title}</h4>
                          {event.client && (
                            <span className="text-sm text-muted-foreground">{event.client}</span>
                          )}
                        </div>
                        <Badge variant="outline" className={`${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        {event.type === "Meeting" && (
                          <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors" onClick={() => toast("Opening Google Meet...")}>
                            <Video className="w-4 h-4" />
                            <span className="underline underline-offset-2">Google Meet</span>
                          </div>
                        )}
                        {event.participants && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{event.participants.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="shrink-0 pt-1">
                      <Button variant="ghost" size="icon" onClick={() => toast("Event options")}><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                <CalendarIcon className="h-10 w-10 mb-4 opacity-20" />
                <p>No events scheduled for this day.</p>
                <Button variant="link" className="mt-2 text-primary" onClick={() => toast("New Event modal opened")}>Schedule something</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
