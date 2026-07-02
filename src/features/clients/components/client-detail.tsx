"use client"

import { useClients } from "@/hooks/use-clients"
import { useContent } from "@/hooks/use-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Building2, Globe, Mail, MapPin, MoreVertical, CreditCard, LayoutTemplate, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentLayout } from "@/features/content/components/content-layout"
import { AssetManager } from "@/features/assets/components/asset-manager"
import { EditClientDialog } from "./edit-client-dialog"

export function ClientDetail({ clientId }: { clientId: string }) {
  const { data: clients = [], isLoading: isLoadingClients } = useClients()
  const { data: content = [], isLoading: isLoadingContent } = useContent()

  const client = clients.find(c => String(c.id) === String(clientId))
  const clientContent = content.filter(c => String(c.client?.id) === String(clientId) || String(c.client_id) === String(clientId))

  if (isLoadingClients) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex-1 p-8 min-h-screen flex flex-col items-center justify-center">
        <Building2 className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-2xl font-bold tracking-tight">Client Not Found</h2>
        <p className="text-muted-foreground mt-2">This client may have been deleted.</p>
        <Link href="/clients" className="mt-4">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Clients</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon" className="mt-1 rounded-full bg-muted/50 hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
              <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                {client.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
              <span className="flex items-center"><Building2 className="mr-1.5 h-3.5 w-3.5" /> {client.industry}</span>
              <span className="flex items-center"><Mail className="mr-1.5 h-3.5 w-3.5" /> {client.contact}</span>
              {client.website && <span className="flex items-center"><Globe className="mr-1.5 h-3.5 w-3.5" /> {client.website}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EditClientDialog client={client}>
            <Button variant="outline" className="shadow-sm">Edit Profile</Button>
          </EditClientDialog>
          <Button size="icon" variant="outline" className="shadow-sm"><MoreVertical className="h-4 w-4"/></Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6 inline-flex h-10 items-center justify-center rounded-lg text-muted-foreground self-start">
          <TabsTrigger value="overview" className="rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="content" className="rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Content</TabsTrigger>
          <TabsTrigger value="assets" className="rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Assets</TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 outline-none">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column: Metrics & Info */}
            <div className="space-y-6">
              <Card className="bg-card border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {client.services?.length > 0 ? client.services.map((s: string) => (
                      <Badge key={s} variant="secondary" className="bg-muted text-foreground">
                        {s}
                      </Badge>
                    )) : <span className="text-sm text-muted-foreground">No services listed</span>}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-emerald-600 flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" /> Lifetime Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-500">{client.spent || "$0"}</div>
                  <p className="text-xs text-emerald-600/70 mt-1">All invoices paid & pending</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recent Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">No recent notes for this client.</p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Content Summary */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-card border-border/50 shadow-sm h-full max-h-[600px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 bg-muted/20">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <LayoutTemplate className="mr-2 h-5 w-5 text-muted-foreground" /> 
                      Recent Pipeline Activity
                    </CardTitle>
                    <CardDescription>Latest deliverables for {client.name}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-0">
                  {isLoadingContent ? (
                    <div className="p-8 text-center text-muted-foreground animate-pulse">Loading content...</div>
                  ) : clientContent.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center text-muted-foreground">
                      <LayoutTemplate className="h-10 w-10 mb-3 opacity-20" />
                      <p className="font-medium">No active content</p>
                      <p className="text-sm mt-1">Create deliverables from the Content module.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {clientContent.slice(0,5).map(item => (
                        <div key={item.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{item.title}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {item.platform && <span className="font-semibold">{item.platform}</span>}
                              {item.type && <span>{item.type}</span>}
                              {item.due_date && <span>Due {format(new Date(item.due_date), "MMM d")}</span>}
                            </div>
                          </div>
                          <Badge variant="outline" className={
                            item.status === 'Published' ? 'text-emerald-500 border-emerald-500/30' : 
                            item.status === 'Review' ? 'text-purple-500 border-purple-500/30' : ''
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-0 outline-none -mx-4 md:-mx-8">
          <ContentLayout clientId={clientId} />
        </TabsContent>
        
        <TabsContent value="assets" className="mt-0 outline-none -mx-4 md:-mx-8">
          <AssetManager clientId={clientId} />
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-0 outline-none">
          <div className="p-12 text-center flex flex-col items-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
            <CreditCard className="h-10 w-10 mb-3 opacity-20" />
            <p className="font-medium">Invoices Workspace</p>
            <p className="text-sm mt-1 max-w-sm">A filtered invoice list for {client.name} will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
