"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bell, Plus, Calendar, Image as ImageIcon, Lightbulb, ArrowRight, Sparkles, CheckCircle2, CheckSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useClients } from "@/hooks/use-clients"
import { useContent } from "@/hooks/use-content"
import { useTasks } from "@/hooks/use-tasks"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import Link from "next/link"

const generateGradient = (id: string) => {
  const gradients = [
    "from-rose-400 to-orange-300",
    "from-blue-400 to-emerald-400",
    "from-violet-400 to-fuchsia-400",
    "from-amber-300 to-orange-500",
    "from-cyan-400 to-blue-500"
  ]
  const index = id.charCodeAt(0) % gradients.length
  return gradients[index]
}

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

  const activeContent = content.filter(c => c.status !== "Published").slice(0, 6)
  const myTasks = tasks.filter(t => t.status !== "Done" && t.status !== "Canceled")

  // Trigger Cmd+K manually if clicked
  const handleSearchClick = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    document.dispatchEvent(event)
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-background relative overflow-hidden">
      
      {/* Organic Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b/50 bg-background/60 backdrop-blur-xl px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="w-full flex-1">
          <div 
            onClick={handleSearchClick}
            className="relative flex items-center w-full md:w-2/3 lg:w-1/3 bg-muted/40 border border-border/40 rounded-full px-4 py-2 cursor-text hover:bg-muted/60 transition-colors shadow-sm"
          >
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground flex-1 text-left">Search anything...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50" onClick={() => toast("No new notifications")}>
          <Bell className="h-4 w-4" />
        </Button>
      </header>
      
      <main className="flex-1 p-4 md:p-10 pt-8 max-w-[1600px] mx-auto w-full space-y-16 z-0 relative">
        
        {/* Greeting & Quick Capture */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
              {greeting}, Creative.
            </h2>
            <p className="text-muted-foreground mt-3 text-lg md:text-xl font-medium leading-relaxed">
              Your studio desk is ready. You have <span className="text-primary font-bold">{myTasks.length} action items</span> and <span className="text-primary font-bold">{activeContent.length} active deliverables</span> needing your eye today.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 bg-muted/30 p-2.5 rounded-3xl backdrop-blur-xl border border-border/50 shadow-sm self-start">
            <Button variant="ghost" className="rounded-2xl h-12 px-6 hover:bg-background/80" onClick={() => toast.info("Drop zone activated")}>
              <ImageIcon className="mr-2 h-5 w-5 text-blue-500" /> Save Asset
            </Button>
            <Button variant="ghost" className="rounded-2xl h-12 px-6 hover:bg-background/80" onClick={() => toast.info("Idea scratchpad opened")}>
              <Lightbulb className="mr-2 h-5 w-5 text-amber-500" /> Log Idea
            </Button>
            <Button className="rounded-2xl h-12 px-6 shadow-md bg-foreground text-background hover:bg-foreground/90">
              <Plus className="mr-2 h-5 w-5" /> New Deliverable
            </Button>
          </div>
        </div>
        
        {/* Active Deliverables (Visual Horizontal Scroll) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold tracking-tight flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-primary" /> On The Board
            </h3>
            <Link href="/content" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center">
              View Pipeline <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 md:-mx-10 md:px-10 no-scrollbar snap-x">
            {isLoadingContent ? (
              <div className="flex items-center space-x-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="min-w-[320px] h-[400px] rounded-3xl bg-muted/20 animate-pulse border border-border/40" />
                ))}
              </div>
            ) : activeContent.length === 0 ? (
              <div className="w-full py-20 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
                <p className="text-lg font-medium text-muted-foreground">The board is clear. Time to create.</p>
              </div>
            ) : (
              activeContent.map((item) => (
                <div 
                  key={item.id} 
                  className="group min-w-[320px] max-w-[320px] snap-start flex flex-col overflow-hidden rounded-[32px] bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-border/80 transition-all duration-500 cursor-pointer"
                  onClick={() => toast.info(`Viewing ${item.title}`)}
                >
                  <div className={`h-48 w-full relative bg-gradient-to-br ${generateGradient(item.id)} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    {/* Glassy overlay */}
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white border-none">
                      {item.type}
                    </Badge>
                  </div>
                  <div className="p-6 pt-5 bg-card/50 backdrop-blur-xl flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">
                        {item.client?.name || "Internal"}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="outline" className="bg-muted/50 border-none shadow-none text-xs">
                        {item.status}
                      </Badge>
                      <span className="text-xs font-semibold text-muted-foreground flex items-center">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {item.due_date ? format(new Date(item.due_date), "MMM d") : "No Date"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Action Items & Studio Pulse */}
        <section className="grid lg:grid-cols-2 gap-12">
          
          {/* Action Items */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight">Your Action Items</h3>
              <Link href="/tasks" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                View All Tasks
              </Link>
            </div>
            
            <div className="space-y-4">
              {isLoadingTasks ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted/20 rounded-2xl animate-pulse" />)}
                </div>
              ) : myTasks.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-border/50 rounded-3xl bg-muted/5">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground font-medium">You're all caught up.</p>
                </div>
              ) : (
                myTasks.slice(0, 5).map((task) => (
                  <div 
                    key={task.id} 
                    className="group flex items-center p-4 pr-6 bg-card border border-border/40 rounded-[24px] shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                    onClick={() => toast.info(`Completing task: ${task.title}`)}
                  >
                    <div className="mr-4 h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <CheckSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-base font-semibold group-hover:text-primary transition-colors">{task.title}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> {task.due_date || "Anytime"}
                        </span>
                        {task.client?.name && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                            {task.client.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant={task.status === 'In Review' ? 'secondary' : 'outline'} className="ml-4 border-border/50 shadow-none">
                      {task.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Studio Pulse */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight">Studio Pulse</h3>
            </div>
            
            <div className="bg-card border border-border/40 rounded-[32px] p-2 shadow-sm">
              {isLoadingClients ? (
                <div className="p-8 text-center text-muted-foreground animate-pulse">Loading pulse...</div>
              ) : (
                <div className="space-y-1">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client.id} className="flex items-center p-4 hover:bg-muted/40 rounded-[24px] transition-colors cursor-pointer group">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center font-bold text-primary text-lg shadow-sm group-hover:scale-105 transition-transform">
                        {client.name.charAt(0)}
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-base font-semibold">{client.name}</p>
                        <p className="text-sm text-muted-foreground">Active in <span className="font-medium text-foreground/80">{client.industry}</span></p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none">
                        Active Workspace
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}
