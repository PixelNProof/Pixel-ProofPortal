"use client"

import { ArrowLeft, ExternalLink, Mail, Phone, MoreHorizontal, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { mockClients } from "../data/mock-clients"
import { toast } from "sonner"

export function ClientDetail({ id }: { id: string }) {
  const client = mockClients.find(c => c.id === id) || mockClients[0]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Link href="/clients">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {client.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight leading-none">{client.name}</h2>
              <p className="text-sm text-muted-foreground">{client.industry}</p>
            </div>
            <Badge className="ml-2" variant={client.status === "Active" ? "secondary" : "outline"}>{client.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast("Opening Google Drive...")}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Drive Folder
            </Button>
            <Button variant="default" onClick={() => toast("Edit Client modal opened")}>Edit Client</Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-10 p-0 space-x-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">Overview</TabsTrigger>
          <TabsTrigger value="strategy" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">Brand Strategy</TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">Content Calendar</TabsTrigger>
          <TabsTrigger value="deliverables" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">Deliverables</TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
                <CardDescription>Primary contact and basic info.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a href={`https://${client.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">{client.website}</a>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Active Services</h4>
                  <div className="flex gap-2 flex-wrap">
                    {client.services.map(s => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates for {client.name}.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toast("View all activity")}><MoreHorizontal className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-0.5 w-2 h-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/10" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Invoice #00{i} Paid</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="strategy" className="mt-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-2 space-y-2 md:space-y-0">
              <div className="space-y-1">
                <CardTitle>Brand Strategy Document</CardTitle>
                <CardDescription>Core positioning, voice and audience.</CardDescription>
              </div>
              <Button size="sm" onClick={() => toast("Upload dialog opened")}><Upload className="mr-2 h-4 w-4"/> Upload New Version</Button>
            </CardHeader>
            <CardContent>
               <div className="h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground bg-muted/50 p-4 text-center">
                  Rich Text Editor / PDF Viewer Placeholder
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar Preview</CardTitle>
              <CardDescription>Upcoming posts and reels.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-64 border border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground gap-4 p-4 text-center">
                  <p>Kanban Board integration goes here.</p>
                  <Button variant="outline" onClick={() => toast("Redirecting to full calendar...")}>View Full Calendar</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
