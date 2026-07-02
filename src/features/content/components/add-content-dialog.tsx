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
import { Plus, Video } from "lucide-react"
import { useCreateContent } from "../api/content-mutations"
import { useClients } from "@/hooks/use-clients"

const contentSchema = z.object({
  title: z.string().min(2, "Title is required"),
  client_id: z.string().optional().or(z.literal("")),
  type: z.enum(["Reel", "Carousel", "Static", "Story", "Video"]),
  platform: z.enum(["Instagram", "TikTok", "LinkedIn", "YouTube", "Twitter", "Other"]),
  status: z.enum(["Ideation", "Production", "Review", "Scheduled", "Published"]),
  assignee: z.string().optional(),
  due_date: z.string().optional(),
})

type ContentFormValues = z.infer<typeof contentSchema>

export function AddContentDialog() {
  const [open, setOpen] = useState(false)
  const { mutate: createContent, isPending } = useCreateContent()
  const { data: clients = [] } = useClients()

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      client_id: "",
      type: "Reel",
      platform: "Instagram",
      status: "Ideation",
      assignee: "",
      due_date: "",
    },
  })

  function onSubmit(data: ContentFormValues) {
    createContent(
      {
        ...data,
        client_id: data.client_id || undefined,
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
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group">
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> New Content
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[500px] border-muted/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Video className="h-4 w-4 text-primary" />
            </div>
            Draft Content
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Add a new piece of content to your pipeline.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title <span className="text-destructive">*</span></Label>
            <Input id="title" {...form.register("title")} placeholder="e.g. Summer Sale Reel" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.title && <p className="text-xs text-destructive font-medium">{form.formState.errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id" className="text-sm font-semibold">Client (Optional)</Label>
            <select 
              id="client_id" 
              {...form.register("client_id")} 
              disabled={isPending} 
              className="flex h-10 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">No Client (Internal)</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold">Type <span className="text-destructive">*</span></Label>
              <select 
                id="type" 
                {...form.register("type")} 
                disabled={isPending} 
                className="flex h-10 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Reel">Reel</option>
                <option value="Carousel">Carousel</option>
                <option value="Static">Static Post</option>
                <option value="Story">Story</option>
                <option value="Video">Long-form Video</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-semibold">Platform <span className="text-destructive">*</span></Label>
              <select 
                id="platform" 
                {...form.register("platform")} 
                disabled={isPending} 
                className="flex h-10 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-semibold">Status <span className="text-destructive">*</span></Label>
            <select 
              id="status" 
              {...form.register("status")} 
              disabled={isPending} 
              className="flex h-10 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Ideation">Ideation</option>
              <option value="Production">Production</option>
              <option value="Review">Review</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-sm font-semibold">Assignee</Label>
              <Input id="assignee" {...form.register("assignee")} placeholder="Name" disabled={isPending} className="h-10 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-sm font-semibold">Due Date</Label>
              <Input id="due_date" type="date" {...form.register("due_date")} disabled={isPending} className="h-10 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            </div>
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending} className="rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-sm rounded-lg px-6 font-semibold">
              {isPending ? "Saving..." : "Add to Pipeline"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
