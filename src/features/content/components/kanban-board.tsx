"use client"

import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { ContentStatus, ContentItem } from "../types/content"
import { initialColumns } from "../data/mock-content"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Calendar, User, Video, Image as ImageIcon, LayoutTemplate } from "lucide-react"
import { toast } from "sonner"

const columns: ContentStatus[] = ["Research", "Script", "Editing", "Review", "Scheduled", "Posted"]

export function KanbanBoard() {
  const [isMounted, setIsMounted] = useState(false)
  const [boardData, setBoardData] = useState(initialColumns)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = source.droppableId as ContentStatus
    const destCol = destination.droppableId as ContentStatus

    const sourceItems = [...boardData[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...boardData[destCol]]

    const [removed] = sourceItems.splice(source.index, 1)
    removed.status = destCol

    destItems.splice(destination.index, 0, removed)

    setBoardData({
      ...boardData,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    })
  }

  if (!isMounted) return <div className="p-8 text-muted-foreground">Loading board...</div>

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 h-[calc(100vh-2rem)] flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Content Pipeline</h2>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 pb-4 no-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full items-start w-max">
            {columns.map((columnId) => (
              <div key={columnId} className="w-80 flex flex-col max-h-full bg-muted/40 rounded-xl p-3 border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-3 px-1 shrink-0">
                  <h3 className="font-semibold text-sm text-foreground/80 flex items-center gap-2">
                    {columnId}
                    <Badge variant="secondary" className="text-xs px-1.5 py-0 rounded-sm bg-background">
                      {boardData[columnId].length}
                    </Badge>
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => toast("Column options")}><MoreHorizontal className="w-4 h-4" /></button>
                </div>

                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 overflow-y-auto min-h-[150px] space-y-3 px-1 transition-colors no-scrollbar ${snapshot.isDraggingOver ? "bg-muted/60 rounded-lg" : ""}`}
                    >
                      {boardData[columnId].map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`border-border/50 shadow-sm ${snapshot.isDragging ? "shadow-lg ring-1 ring-primary rotate-2 z-50 bg-background" : "hover:border-primary/30"} transition-all cursor-grab active:cursor-grabbing`}
                            >
                              <CardContent className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                  <Badge variant="outline" className="text-[10px] bg-background">
                                    {item.clientName}
                                  </Badge>
                                  {item.type === "Reel" ? <Video className="w-3.5 h-3.5 text-muted-foreground" /> : item.type === "Carousel" ? <LayoutTemplate className="w-3.5 h-3.5 text-muted-foreground" /> : <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />}
                                </div>
                                <h4 className="font-medium text-sm leading-snug">{item.title}</h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                                  {item.dueDate ? (
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{item.dueDate}</span>
                                    </div>
                                  ) : <div/>}
                                  {item.assignee && (
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                                      {item.assignee.charAt(0)}
                                    </div>
                                  )}
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
    </div>
  )
}
