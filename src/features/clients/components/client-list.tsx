"use client"

import { useState } from "react"
import { Search, ArrowUpRight, MoreHorizontal, Building2, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

export function ClientList() {
  const { data: clients = [], isLoading } = useClients()
  const { mutate: deleteClient } = useDeleteClient()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.contact.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your agency's clients and their active services.</p>
        </div>
        <div className="flex items-center space-x-2">
          <AddClientDialog />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-2">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search clients..." 
            className="pl-9 bg-background/50 backdrop-blur shadow-sm border-muted/50 focus-visible:ring-primary/30 transition-all" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shadow-sm border-muted/50">Filter</Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-b-border/50">
              <TableHead className="font-semibold">Brand Name</TableHead>
              <TableHead className="font-semibold">Industry</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Active Services</TableHead>
              <TableHead className="font-semibold">Primary Contact</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-3 animate-pulse">
                    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm font-medium">Loading your clients...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                      <Building2 className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-lg font-medium text-foreground">No clients found</p>
                    <p className="text-sm max-w-sm text-center">
                      {searchQuery ? "We couldn't find any clients matching your search." : "You haven't added any clients yet. Click the button above to get started."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.map((client) => (
              <TableRow key={client.id} className="group hover:bg-muted/30 transition-colors cursor-default border-b-border/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm ring-1 ring-primary/20">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block truncate max-w-[150px] font-semibold">{client.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{client.industry}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : client.status === "Onboarding" ? "secondary" : "outline"} className="shadow-sm">
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 flex-wrap">
                    {client.services?.length > 0 ? client.services.map((s: string) => (
                      <Badge key={s} variant="outline" className="text-[10px] bg-background/50 hover:bg-muted font-medium transition-colors">
                        {s}
                      </Badge>
                    )) : <span className="text-xs text-muted-foreground italic">No services</span>}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{client.contact}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link href={`/clients/${client.id}`}>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger 
                        render={
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        } 
                      />
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => toast.info("Edit client (coming soon)")}>
                          <Edit className="mr-2 h-4 w-4" /> Edit details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this client?")) {
                              deleteClient(client.id)
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
