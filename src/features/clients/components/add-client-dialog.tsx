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
import { Plus } from "lucide-react"
import { useCreateClient } from "../api/client-mutations"

const clientSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters"),
  industry: z.string().min(2, "Industry is required"),
  contact: z.string().email("Must be a valid email address"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  services: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

export function AddClientDialog() {
  const [open, setOpen] = useState(false)
  const { mutate: createClient, isPending } = useCreateClient()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      industry: "",
      contact: "",
      website: "",
      services: "",
    },
  })

  function onSubmit(data: ClientFormValues) {
    createClient(
      {
        ...data,
        website: data.website || "",
        services: data.services ? data.services.split(",").map(s => s.trim()) : [],
      },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Client
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[500px] border-muted/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Client</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new client profile for your agency. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Brand Name <span className="text-destructive">*</span></Label>
            <Input id="name" {...form.register("name")} placeholder="Acme Corp" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.name && <p className="text-xs text-destructive font-medium">{form.formState.errors.name.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium">Industry <span className="text-destructive">*</span></Label>
              <Input id="industry" {...form.register("industry")} placeholder="Technology" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
              {form.formState.errors.industry && <p className="text-xs text-destructive font-medium">{form.formState.errors.industry.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-sm font-medium">Contact Email <span className="text-destructive">*</span></Label>
              <Input id="contact" type="email" {...form.register("contact")} placeholder="hello@acme.com" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
              {form.formState.errors.contact && <p className="text-xs text-destructive font-medium">{form.formState.errors.contact.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium">Website</Label>
            <Input id="website" type="url" {...form.register("website")} placeholder="https://acme.com" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.website && <p className="text-xs text-destructive font-medium">{form.formState.errors.website.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="services" className="text-sm font-medium">Services (comma separated)</Label>
            <Input id="services" {...form.register("services")} placeholder="Web Design, SEO" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
          </div>

          <div className="flex justify-end pt-4 space-x-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-sm">
              {isPending ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
