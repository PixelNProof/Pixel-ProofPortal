"use client"

import React, { useState } from "react"
import { useContent } from "@/hooks/use-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Video, Image as ImageIcon, LayoutTemplate } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO
} from "date-fns"

export function ContentCalendarView({ clientId }: { clientId?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: rawData = [], isLoading } = useContent()
  const contentData = clientId ? rawData.filter(c => String(c.client?.id) === String(clientId) || String(c.client_id) === String(clientId)) : rawData

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const today = () => setCurrentDate(new Date())

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = "d"
  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ""

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat)
      const cloneDay = day
      
      // Find content for this day
      const dayContent = contentData.filter(item => {
        if (!item.due_date) return false
        return isSameDay(parseISO(item.due_date), cloneDay)
      })

      days.push(
        <div
          key={day.toString()}
          className={`min-h-[120px] p-2 border-r border-b border-border/50 flex flex-col gap-1 transition-colors ${
            !isSameMonth(day, monthStart)
              ? "bg-muted/20 text-muted-foreground/50"
              : isSameDay(day, new Date())
              ? "bg-primary/5"
              : "bg-card hover:bg-muted/30"
          }`}
        >
          <div className="flex justify-between items-start">
            <span
              className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                isSameDay(day, new Date())
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : ""
              }`}
            >
              {formattedDate}
            </span>
            {dayContent.length > 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-muted text-muted-foreground">
                {dayContent.length}
              </Badge>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1.5 mt-1 no-scrollbar pb-1">
            {dayContent.map(item => (
              <div 
                key={item.id} 
                className="group flex items-center gap-1.5 p-1.5 rounded-md text-xs border border-border/50 bg-background hover:border-primary/30 transition-colors shadow-sm cursor-pointer"
              >
                <div className={`w-1 h-full rounded-full shrink-0 ${
                  item.status === 'Ideation' ? 'bg-blue-500' :
                  item.status === 'Production' ? 'bg-amber-500' :
                  item.status === 'Review' ? 'bg-purple-500' :
                  item.status === 'Scheduled' ? 'bg-indigo-500' : 'bg-emerald-500'
                }`} />
                <span className="truncate font-medium flex-1">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    )
    days = []
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button variant="outline" size="sm" onClick={today} className="h-8 rounded-full px-4 font-medium bg-background shadow-sm">
            Today
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-full bg-background shadow-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-full bg-background shadow-sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 border-b border-border/50 bg-muted/10">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div key={dayName} className="p-3 text-center text-xs font-semibold uppercase text-muted-foreground tracking-wider border-r border-border/50 last:border-r-0">
            {dayName}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col min-h-[600px] bg-muted/10">
        {rows}
      </div>
    </div>
  )
}
