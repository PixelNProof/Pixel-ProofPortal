"use client"

import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { ContentStatus, ContentItem, ContentPlatform } from "../types/content"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Calendar, User, Video, Image as ImageIcon, LayoutTemplate, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useContent } from "@/hooks/use-content"
import { useUpdateContentStatus, useDeleteContent } from "../api/content-mutations"
import { AddContentDialog } from "./add-content-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const columns: ContentStatus[] = ["Ideation", "Production", "Review", "Scheduled", "Published"]

const platformColors: Record<ContentPlatform, string> = {
  Instagram: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  TikTok: "bg-black/10 text-foreground border-foreground/20 dark:bg-white/10 dark:text-white",
  LinkedIn: "bg-blue-600/10 text-blue-600 border-blue-600/20",
  YouTube: "bg-red-500/10 text-red-500 border-red-500/20",
  Twitter: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Other: "bg-muted text-muted-foreground border-border"
}

export function KanbanBoard({ clientId }: { clientId?: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const { data: rawData = [], isLoading } = useContent()
  const contentData = clientId ? rawData.filter(c => String(c.client?.id) === String(clientId) || String(c.client_id) === String(clientId)) : rawData
  const { mutate: updateStatus } = useUpdateContentStatus()
  const { mutate: deleteContent } = useDeleteContent()
  
  // Local state for optimistic drag & drop
  const [boardData, setBoardData] = useState<Record<ContentStatus, ContentItem[]>>({
    Ideation: [], Production: [], Review: [], Scheduled: [], Published: []
  })

  // Sync server data to local state whenever it changes
  useEffect(() => {
    const newBoard = {
      Ideation: contentData.filter(c => c.status === "Ideation"),
      Production: contentData.filter(c => c.status === "Production"),
      Review: contentData.filter(c => c.status === "Review"),
      Scheduled: contentData.filter(c => c.status === "Scheduled"),
      Published: contentData.filter(c => c.status === "Published"),
    }
    setBoardData(newBoard)
  }, [JSON.stringify(contentData)]) // Stringify to prevent infinite loop on new references

  useEffect(() => {
    // Suppress @hello-pangea/dnd dev warnings about nested scroll containers
    const originalWarn = console.warn
    console.warn = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('unsupported nested scroll container detected')) {
        return
      }
      originalWarn(...args)
    }
    
    setIsMounted(true)
    
    return () => {
      console.warn = originalWarn
    }
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = source.droppableId as ContentStatus
    const destCol = destination.droppableId as ContentStatus

    // Optimistic UI update
    const sourceItems = [...boardData[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...boardData[destCol]]

    const [removed] = sourceItems.splice(source.index, 1)
    const originalStatus = removed.status
    removed.status = destCol

    destItems.splice(destination.index, 0, removed)

    setBoardData({
      ...boardData,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    })

    // Fire mutation to DB
    if (sourceCol !== destCol) {
      updateStatus({ id: draggableId, status: destCol })
    }
  }

  if (!isMounted) return null

  return (
    <div className="flex-1 h-full flex flex-col min-w-0">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center animate-pulse">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 pb-4 no-scrollbar">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 h-full items-start w-max">
              {columns.map((columnId) => (
                <div key={columnId} className="w-[320px] flex flex-col max-h-full bg-muted/30 rounded-2xl p-4 border border-border/50 shadow-sm backdrop-blur-xl transition-colors hover:bg-muted/40">
                  <div className="flex items-center justify-between mb-4 px-1 shrink-0">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        columnId === 'Ideation' ? 'bg-blue-500' :
                        columnId === 'Production' ? 'bg-amber-500' :
                        columnId === 'Review' ? 'bg-purple-500' :
                        columnId === 'Scheduled' ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`} />
                      {columnId}
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full bg-background/80 shadow-sm">
                        {boardData[columnId]?.length || 0}
                      </Badge>
                    </h3>
                  </div>

                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 overflow-y-auto min-h-[150px] space-y-3 px-1 transition-all no-scrollbar rounded-xl ${snapshot.isDraggingOver ? "bg-muted/50 ring-1 ring-border shadow-inner" : ""}`}
                      >
                        {boardData[columnId]?.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`group border-border/50 shadow-sm transition-all cursor-grab active:cursor-grabbing rounded-xl
                                  ${snapshot.isDragging ? "shadow-2xl ring-2 ring-primary rotate-3 scale-105 z-50 bg-background/95 backdrop-blur-sm" : "hover:shadow-md hover:border-primary/30 bg-card/90"} 
                                `}
                              >
                                <CardContent className="p-4 flex flex-col gap-3">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1.5">
                                      {item.platform && (
                                        <Badge variant="outline" className={`text-[10px] w-fit font-bold border ${platformColors[item.platform]}`}>
                                          {item.platform}
                                        </Badge>
                                      )}
                                      {item.client?.name && (
                                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                          {item.client.name}
                                        </span>
                                      )}
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger 
                                        render={
                                          <Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                          </Button>
                                        } 
                                      />
                                      <DropdownMenuContent align="end" className="w-[140px]">
                                        <DropdownMenuItem 
                                          className="text-destructive focus:bg-destructive/10 focus:text-destructive font-medium"
                                          onClick={() => {
                                            if (confirm("Are you sure you want to delete this piece of content?")) {
                                              deleteContent(item.id)
                                            }
                                          }}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  
                                  <h4 className="font-semibold text-sm leading-snug">{item.title}</h4>
                                  
                                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                                    <div className="flex items-center gap-1.5 font-medium bg-muted/50 px-2 py-1 rounded-md">
                                      {item.type === "Reel" || item.type === "Video" ? <Video className="w-3 h-3 text-primary" /> : item.type === "Carousel" ? <LayoutTemplate className="w-3 h-3 text-primary" /> : <ImageIcon className="w-3 h-3 text-primary" />}
                                      {item.type}
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {item.due_date && (
                                        <span className="text-[10px] font-mono">{new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                      )}
                                      {item.assignee && (
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-[10px] shadow-sm">
                                          {item.assignee.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  )
}
