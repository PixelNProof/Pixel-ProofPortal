"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bell, Plus, Users, LayoutDashboard, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export function DashboardOverview() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="w-full flex-1">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Press ⌘K to search..."
                className="w-full bg-background border-none shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 outline-none"
              />
            </div>
          </form>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast("Notifications opened")}>
          <Bell className="h-4 w-4" />
        </Button>
      </header>
      
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <div className="flex items-center space-x-2 hidden md:flex">
            <Button size="sm" onClick={() => toast("New Client modal opened")}><Plus className="mr-2 h-4 w-4"/> New Client</Button>
            <Button size="sm" variant="secondary" onClick={() => toast("New Proposal modal opened")}><Plus className="mr-2 h-4 w-4"/> New Proposal</Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">3 invoices overdue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: 2:00 PM (Acme Corp)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 since last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
              <CardDescription>Overview of recent client activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                      C{i}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Client Name {i}</p>
                      <p className="text-sm text-muted-foreground">hello@client{i}.com</p>
                    </div>
                    <div className="ml-auto font-medium">Active</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Content Due This Week</CardTitle>
              <CardDescription>Upcoming deliverables for active clients.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Instagram Reel {i}</p>
                      <p className="text-xs text-muted-foreground">Acme Corp</p>
                    </div>
                    <div className="text-xs px-2 py-1 bg-secondary rounded-full">In Review</div>
                  </div>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
