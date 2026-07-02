"use client"

import { Plus, Search, ArrowUpRight } from "lucide-react"
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
import Link from "next/link"
import { useClients } from "@/hooks/use-clients"
import { toast } from "sonner"

export function ClientList() {
  const { data: clients = [], isLoading } = useClients()
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => toast("Add Client modal opened")}><Plus className="mr-2 h-4 w-4" /> Add Client</Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
        <Button variant="outline" onClick={() => toast("Filter menu opened")}>Filter</Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Services</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading clients...</TableCell>
              </TableRow>
            ) : clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {client.name.charAt(0)}
                    </div>
                    {client.name}
                  </div>
                </TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : client.status === "Onboarding" ? "secondary" : "outline"}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {client.services.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs bg-muted">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{client.contact}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/clients/${client.id}`}>
                    <Button variant="ghost" size="sm">
                      View <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
