"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, Image as ImageIcon, Link as LinkIcon, Trash2, ExternalLink, ArrowRightCircle } from "lucide-react"
import { useIdeas } from "@/hooks/use-ideas"
import { useDeleteIdea } from "../api/idea-mutations"
import { AddIdeaDialog } from "./add-idea-dialog"
import { useCreateContent } from "@/features/content/api/content-mutations"
import { toast } from "sonner"

export function IdeaVault() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: ideas = [], isLoading } = useIdeas()
  const { mutate: deleteIdea } = useDeleteIdea()
  const { mutate: createContent, isPending: isPushing } = useCreateContent()

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getAspectClass = (aspectRatio: string) => {
    switch(aspectRatio) {
      case "portrait": return "aspect-[9/16]"
      case "landscape": return "aspect-[16/9]"
      case "square": return "aspect-square"
      default: return "aspect-square"
    }
  }

  const pushToPipeline = (idea: any) => {
    createContent(
      {
        title: idea.title,
        type: idea.aspect_ratio === "portrait" ? "Reel" : idea.aspect_ratio === "landscape" ? "Video" : "Static Image",
        status: "Ideation",
        platform: "Instagram",
      },
      {
        onSuccess: () => {
          toast.success("Idea pushed to Content Pipeline!")
        }
      }
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Idea Vault</h2>
          <p className="text-muted-foreground mt-1">A curated moodboard of inspiration and references.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tags or titles..." 
              className="pl-9 bg-muted/50 border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-muted/50">
            <Filter className="h-4 w-4" />
          </Button>
          <AddIdeaDialog />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading vault...</p>
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/20">
          <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="font-medium text-lg">No ideas found</p>
          <p className="text-muted-foreground mt-1 max-w-[250px]">Save some inspiration to start building your moodboard.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredIdeas.map((idea) => (
            <div 
              key={idea.id} 
              className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-muted/30 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className={`w-full relative overflow-hidden bg-muted ${getAspectClass(idea.aspect_ratio)}`}>
                <img 
                  src={idea.image_url} 
                  alt={idea.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="rounded-full bg-white/90 hover:bg-white text-black backdrop-blur-md font-medium text-xs shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        pushToPipeline(idea);
                      }}
                      disabled={isPushing}
                    >
                      <ArrowRightCircle className="mr-1.5 h-3.5 w-3.5" /> Push to Pipeline
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-destructive/90 hover:bg-destructive backdrop-blur-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete this idea?")) {
                          deleteIdea(idea.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {idea.source && (
                    <a 
                      href={idea.source.startsWith('http') ? idea.source : `https://${idea.source}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium transition-colors mt-auto"
                    >
                      <LinkIcon className="h-3 w-3" />
                      {new URL(idea.source.startsWith('http') ? idea.source : `https://${idea.source}`).hostname.replace('www.', '')}
                      <ExternalLink className="h-3 w-3 ml-0.5 opacity-70" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-card/80 backdrop-blur-xl">
                <h3 className="font-semibold text-base leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {idea.title}
                </h3>
                
                <div className="flex flex-wrap gap-1.5">
                  {idea.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-muted/50 text-muted-foreground hover:bg-muted/80 text-[10px] font-medium px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
