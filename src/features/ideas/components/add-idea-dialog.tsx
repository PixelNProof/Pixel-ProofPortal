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
import { Plus, Lightbulb } from "lucide-react"
import { useCreateIdea } from "../api/idea-mutations"

const ideaSchema = z.object({
  title: z.string().min(2, "Title is required"),
  image_url: z.string().url("Must be a valid image URL"),
  source: z.string().optional(),
  tags: z.string().optional(),
  aspect_ratio: z.enum(["square", "portrait", "landscape"]),
})

type IdeaFormValues = z.infer<typeof ideaSchema>

export function AddIdeaDialog() {
  const [open, setOpen] = useState(false)
  const { mutate: createIdea, isPending } = useCreateIdea()

  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: "",
      image_url: "",
      source: "",
      tags: "",
      aspect_ratio: "portrait",
    },
  })

  function onSubmit(data: IdeaFormValues) {
    const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    
    createIdea(
      {
        title: data.title,
        image_url: data.image_url,
        source: data.source,
        aspect_ratio: data.aspect_ratio,
        tags: tagsArray,
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
            <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Save Idea
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[450px] border-muted/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            Save Idea
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Store visual references and moodboard inspiration.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title <span className="text-destructive">*</span></Label>
            <Input id="title" {...form.register("title")} placeholder="e.g. Minimalist UI Layout" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.title && <p className="text-xs text-destructive font-medium">{form.formState.errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-sm font-semibold">Image URL <span className="text-destructive">*</span></Label>
            <Input id="image_url" {...form.register("image_url")} placeholder="https://..." disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
            {form.formState.errors.image_url && <p className="text-xs text-destructive font-medium">{form.formState.errors.image_url.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aspect_ratio" className="text-sm font-semibold">Aspect Ratio <span className="text-destructive">*</span></Label>
            <select 
              id="aspect_ratio" 
              {...form.register("aspect_ratio")} 
              disabled={isPending} 
              className="flex h-10 w-full rounded-md border border-muted-foreground/20 bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="portrait">Portrait (9:16)</option>
              <option value="square">Square (1:1)</option>
              <option value="landscape">Landscape (16:9)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source" className="text-sm font-semibold">Source / Platform (Optional)</Label>
            <Input id="source" {...form.register("source")} placeholder="e.g. Pinterest, Behance" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-semibold">Tags (comma separated)</Label>
            <Input id="tags" {...form.register("tags")} placeholder="e.g. typography, dark-mode, layout" disabled={isPending} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50" />
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending} className="rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-sm rounded-lg px-6 font-semibold">
              {isPending ? "Saving..." : "Save to Vault"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
