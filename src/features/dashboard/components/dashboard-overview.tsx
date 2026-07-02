"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bell, Plus, Users, LayoutDashboard, Calendar, CreditCard, ArrowUpRight, Activity, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useClients } from "@/hooks/use-clients"
import { useContent } from "@/hooks/use-content"
import { useTasks } from "@/hooks/use-tasks"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export function DashboardOverview() {
  const { data: clients = [], isLoading: isLoadingClients } = useClients()
  const { data: content = [], isLoading: isLoadingContent } = useContent()
  const { data: tasks = [], isLoading: isLoadingTasks } = useTasks()
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon")
    else if (hour >= 17) setGreeting("Good evening")
  }, [])

  const activeClientsCount = clients.filter(c => c.status === "Active").length
  const contentDueThisWeek = content.filter(c => c.status !== "Published").slice(0, 5)
  const myTasks = tasks.filter(t => t.status !== "Done" && t.status !== "Canceled")

  // Trigger Cmd+K manually if clicked
  const handleSearchClick = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    document.dispatchEvent(event)
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="w-full flex-1">
          <div 
            onClick={handleSearchClick}
            className="relative flex items-center w-full md:w-2/3 lg:w-1/3 bg-muted/50 border border-border/50 rounded-lg px-3 py-1.5 cursor-text hover:bg-muted/80 transition-colors"
          >
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground flex-1 text-left">Search or run command...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50" onClick={() => toast("No new notifications")}>
          <Bell className="h-4 w-4" />
        </Button>
      </header>
      
      <main className="flex-1 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{greeting}, Admin.</h2>
            <p className="text-muted-foreground mt-1">Here is what's happening in your workspace today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="shadow-sm font-semibold group" onClick={() => toast("Action modal opened")}>
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" /> Quick Action
            </Button>
          </div>
        </div>
        
        {/* Health Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Action Items</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <CheckSquare className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myTasks.length}</div>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Tasks needing your attention
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Revenue</CardTitle>
              <div className="p-2 bg-emerald-500/10 rounded-full">
                <CreditCard className="h-4 w-4 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Across 4 outstanding invoices
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Content</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{content.length}</div>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                <span className="text-emerald-500">2 publishing today</span>
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
              <div className="p-2 bg-pink-500/10 rounded-full">
                <Users className="h-4 w-4 text-pink-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeClientsCount}</div>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> +1 this month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Feeds */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-6">
          
          <Card className="col-span-4 border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20 pb-4">
              <div>
                <CardTitle className="text-lg">My Action Items</CardTitle>
                <CardDescription>Your high-priority tasks</CardDescription>
              </div>
              <CheckSquare className="h-5 w-5 text-muted-foreground/50" />
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingTasks ? (
                <div className="p-8 text-center text-muted-foreground">Loading tasks...</div>
              ) : (
                <div className="divide-y divide-border/50">
                  {myTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center p-4 hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => toast.info("Task clicked: " + task.title)}>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{task.due_date || "No due date"}</span>
                          {task.client?.name && (
                            <Badge variant="outline" className="text-[10px] bg-background font-normal text-muted-foreground border-border/50">
                              {task.client.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge variant={task.status === 'Done' ? 'default' : 'secondary'} className="ml-4">
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                  {myTasks.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No action items assigned to you.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-3 border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-lg">Content Priority</CardTitle>
              <CardDescription>Deliverables needing attention</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingContent ? (
                <div className="p-8 text-center text-muted-foreground">Loading content...</div>
              ) : (
                <div className="divide-y divide-border/50">
                  {contentDueThisWeek.map((item) => (
                    <div key={item.id} className="flex items-start p-4 hover:bg-muted/30 transition-colors">
                      <div className="space-y-1.5 flex-1 pr-4">
                        <p className="text-sm font-semibold leading-tight line-clamp-1">{item.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.client?.name || "Internal"}</span>
                          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                            {item.due_date ? format(new Date(item.due_date), "MMM d") : "No Date"}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] whitespace-nowrap shrink-0">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                  {contentDueThisWeek.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No urgent content items.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
        </div>

        {/* Second Row of Feeds */}
        <div className="grid gap-6 md:grid-cols-1 mb-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Client Pulse</CardTitle>
                <CardDescription>Active clients in your workspace</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground/50" />
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingClients ? (
                <div className="p-8 text-center text-muted-foreground">Loading pulse...</div>
              ) : (
                <div className="divide-y divide-border/50">
                  {clients.slice(0, 3).map((client) => (
                    <div key={client.id} className="flex items-center p-4 hover:bg-muted/30 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                        {client.name.charAt(0)}
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-semibold leading-none">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.industry}</p>
                      </div>
                      <Badge variant="outline" className={client.status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : ''}>
                        {client.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
