"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, DollarSign } from "lucide-react"
import { useCreateInvoice } from "../api/finance-mutations"
import { useClients } from "@/hooks/use-clients"

const invoiceSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  amount: z.coerce.number().min(1, "Amount must be at least $1"),
  status: z.enum(["Paid", "Pending", "Overdue"]),
  due_date: z.string().min(1, "Due date is required"),
})

type InvoiceFormValues = z.infer<typeof invoiceSchema>

export function AddInvoiceDialog() {
  const [open, setOpen] = useState(false)
  const { mutate: createInvoice, isPending } = useCreateInvoice()
  const { data: clients = [] } = useClients()

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client_id: "",
      amount: 0,
      status: "Pending",
      due_date: "",
    },
  })

  function onSubmit(data: InvoiceFormValues) {
    createInvoice(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> New Invoice
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[450px] border-muted/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            Create Invoice
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Bill your clients and track your revenue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          
          <div className="space-y-3">
            <Label htmlFor="client_id" className="text-sm font-semibold">Select Client <span className="text-destructive">*</span></Label>
            <select 
              id="client_id" 
              {...form.register("client_id")} 
              disabled={isPending} 
              className="flex h-10 w-full rounded-lg border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Choose a client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            {form.formState.errors.client_id && <p className="text-xs text-destructive font-medium">{form.formState.errors.client_id.message}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-semibold">Amount (USD) <span className="text-destructive">*</span></Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                {...form.register("amount")} 
                placeholder="0.00" 
                disabled={isPending} 
                className="pl-9 h-10 rounded-lg bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50 text-lg font-medium" 
              />
            </div>
            {form.formState.errors.amount && <p className="text-xs text-destructive font-medium">{form.formState.errors.amount.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="status" className="text-sm font-semibold">Status <span className="text-destructive">*</span></Label>
              <select 
                id="status" 
                {...form.register("status")} 
                disabled={isPending} 
                className="flex h-10 w-full rounded-lg border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="due_date" className="text-sm font-semibold">Due Date <span className="text-destructive">*</span></Label>
              <Input 
                id="due_date" 
                type="date" 
                {...form.register("due_date")} 
                disabled={isPending} 
                className="h-10 rounded-lg bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" 
              />
              {form.formState.errors.due_date && <p className="text-xs text-destructive font-medium">{form.formState.errors.due_date.message}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending} className="rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-sm rounded-lg px-6 font-semibold">
              {isPending ? "Saving..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
