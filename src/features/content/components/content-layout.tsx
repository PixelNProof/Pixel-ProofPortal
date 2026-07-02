"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanbanBoard } from "./kanban-board"
import { ContentListView } from "./content-list-view"
import { ContentCalendarView } from "./content-calendar-view"
import { AddContentDialog } from "./add-content-dialog"
import { LayoutGrid, List, Calendar, Filter } from "lucide-react"
import { useClients } from "@/hooks/use-clients"

export function ContentLayout({ clientId }: { clientId?: string }) {
  const [activeTab, setActiveTab] = useState("board")
  const [selectedFilterId, setSelectedFilterId] = useState<string>("all")
  const { data: clients = [] } = useClients()

  const effectiveClientId = clientId || (selectedFilterId !== "all" ? selectedFilterId : undefined)

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 flex flex-col min-w-0 max-w-[1600px] mx-auto w-full h-[calc(100vh-2rem)]">
      {/* Page Header Shared Across Views */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Pipeline</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your creative workflow across all channels.</p>
        </div>
        <div className="flex items-center gap-3">
          {!clientId && (
            <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-md border border-border/50">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-transparent text-sm border-none outline-none focus:ring-0 text-foreground"
                value={selectedFilterId}
                onChange={(e) => setSelectedFilterId(e.target.value)}
              >
                <option value="all">All Clients</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <AddContentDialog />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-muted/50 p-1 mb-4 inline-flex h-10 items-center justify-center rounded-lg text-muted-foreground self-start">
          <TabsTrigger value="list" className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <List className="w-4 h-4" /> List
          </TabsTrigger>
          <TabsTrigger value="board" className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <LayoutGrid className="w-4 h-4" /> Board
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <Calendar className="w-4 h-4" /> Calendar
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
          <TabsContent value="list" className="h-full m-0 data-[state=inactive]:hidden outline-none">
            <ContentListView clientId={effectiveClientId} />
          </TabsContent>
          
          <TabsContent value="board" className="h-full m-0 data-[state=inactive]:hidden outline-none">
            <KanbanBoard clientId={effectiveClientId} />
          </TabsContent>
          
          <TabsContent value="calendar" className="h-full m-0 data-[state=inactive]:hidden outline-none">
            <ContentCalendarView clientId={effectiveClientId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
