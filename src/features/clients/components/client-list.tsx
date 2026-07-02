"use client"

import { useState } from "react"
import { Search, ArrowRight, MoreVertical, Building2, Trash2, Edit, Palette, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useClients } from "@/hooks/use-clients"
import { useDeleteClient } from "../api/client-mutations"
import { toast } from "sonner"
import { AddClientDialog } from "./add-client-dialog"
import { EditClientDialog } from "./edit-client-dialog"

// Helper to generate a beautiful gradient based on a string
const generateGradient = (name: string) => {
  const gradients = [
    "from-rose-400 to-orange-300",
    "from-blue-400 to-emerald-400",
    "from-violet-400 to-fuchsia-400",
    "from-amber-300 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-cyan-400",
    "from-fuchsia-500 to-pink-500",
    "from-slate-400 to-slate-600"
  ]
  const index = name.length % gradients.length
  return gradients[index]
}

export function ClientList() {
  const { data: clients = [], isLoading } = useClients()
  const { mutate: deleteClient } = useDeleteClient()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.contact.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 mb-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground mt-2 text-base">Your creative partnerships and dedicated workspaces.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="Search brands..." 
              className="pl-10 bg-muted/30 backdrop-blur shadow-sm border-border/50 focus-visible:ring-primary/30 transition-all rounded-full h-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddClientDialog />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <p className="font-medium text-lg">Loading workspaces...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4 rotate-3">
            <Palette className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="text-xl font-medium text-foreground">No brands found</p>
          <p className="text-muted-foreground mt-2 max-w-sm">
            {searchQuery ? "We couldn't find any brands matching your search." : "You haven't added any brands yet. Create your first workspace to begin."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <div 
              key={client.id} 
              className="group relative flex flex-col overflow-hidden rounded-[32px] bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-border/80 transition-all duration-500"
            >
              {/* Visual Header / "Cover Image" */}
              <Link href={`/clients/${client.id}`} className="block relative h-40 w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${generateGradient(client.name)} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Glassy overlay effect */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Brand Initial Logo */}
                <div className="absolute bottom-4 left-6 h-16 w-16 rounded-2xl bg-white/90 dark:bg-black/90 shadow-lg backdrop-blur-xl flex items-center justify-center border border-white/20 transform group-hover:-translate-y-1 transition-transform duration-500 z-10">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                    {client.name.charAt(0)}
                  </span>
                </div>

                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none shadow-sm"
                >
                  {client.status}
                </Badge>
              </Link>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 pt-5 bg-card/50 backdrop-blur-xl">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/clients/${client.id}`} className="group/title">
                    <h3 className="font-bold text-xl tracking-tight leading-tight group-hover/title:text-primary transition-colors flex items-center">
                      {client.name}
                      <ArrowUpRight className="ml-1.5 h-4 w-4 opacity-0 -translate-x-2 translate-y-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all duration-300" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{client.industry}</p>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] rounded-xl">
                      <EditClientDialog client={client}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                      </EditClientDialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${client.name}?`)) {
                            deleteClient(client.id)
                          }
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Brand
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Services Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 flex-1 content-start">
                  {client.services?.length > 0 ? (
                    client.services.slice(0, 3).map((s: string) => (
                      <Badge key={s} variant="outline" className="text-[10px] px-2 py-0.5 rounded-md bg-muted/30 border-border/50 text-muted-foreground font-medium">
                        {s}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">No services defined</span>
                  )}
                  {client.services?.length > 3 && (
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-md bg-muted/30 border-border/50 text-muted-foreground font-medium">
                      +{client.services.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center truncate max-w-[150px]">
                    {client.contact}
                  </span>
                  <Link href={`/clients/${client.id}`} className="font-medium text-primary hover:underline underline-offset-4 flex items-center">
                    Workspace <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
