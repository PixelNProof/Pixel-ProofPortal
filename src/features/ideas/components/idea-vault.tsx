"use client"

import { Plus, Search, ExternalLink, MoreHorizontal, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockIdeas } from "../data/mock-ideas"
import { toast } from "sonner"

export function IdeaVault() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Idea Vault</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => toast("Save Idea modal opened")}><Plus className="mr-2 h-4 w-4" /> Save Idea</Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tags, titles..." className="pl-8" />
        </div>
        <Button variant="outline" onClick={() => toast("Filters menu opened")}>Filters</Button>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {mockIdeas.map((idea) => (
          <div key={idea.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
            {/* Image Placeholder with varying height based on ratio */}
            <div 
              className={`w-full bg-muted overflow-hidden
                ${idea.aspectRatio === 'portrait' ? 'aspect-[3/4]' : idea.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'}
              `}
            >
              {/* Using standard img for mock purposes, Next/Image normally preferred */}
              <img 
                src={idea.imageUrl} 
                alt={idea.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border-none" onClick={(e) => { e.stopPropagation(); toast("Idea bookmarked"); }}>
                  <Bookmark className="h-4 w-4" fill="currentColor" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium text-sm leading-snug">{idea.title}</h3>
                {idea.source && (
                  <div className="flex items-center text-white/80 text-xs">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    {idea.source}
                  </div>
                )}
              </div>
            </div>

            {/* Always visible info below image */}
            <div className="p-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {idea.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
