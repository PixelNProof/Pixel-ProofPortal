"use client"

import React from "react"
import { useContent } from "@/hooks/use-content"
import { Badge } from "@/components/ui/badge"
import { Video, Image as ImageIcon, LayoutTemplate, MoreHorizontal, Trash2 } from "lucide-react"
import { ContentPlatform } from "../types/content"
import { Button } from "@/components/ui/button"
import { useDeleteContent, useUpdateContentStatus } from "../api/content-mutations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const platformColors: Record<ContentPlatform, string> = {
  Instagram: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  TikTok: "bg-black/10 text-foreground border-foreground/20 dark:bg-white/10 dark:text-white",
  LinkedIn: "bg-blue-600/10 text-blue-600 border-blue-600/20",
  YouTube: "bg-red-500/10 text-red-500 border-red-500/20",
  Twitter: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Other: "bg-muted text-muted-foreground border-border"
}

export function ContentListView({ clientId }: { clientId?: string }) {
  const { data: rawData = [], isLoading } = useContent()
  const contentData = clientId ? rawData.filter(c => String(c.client?.id) === String(clientId) || String(c.client_id) === String(clientId)) : rawData
  const { mutate: deleteContent } = useDeleteContent()
  const { mutate: updateStatus } = useUpdateContentStatus()

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Client</th>
              <th className="px-6 py-4 font-semibold">Platform</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Due Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {contentData.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted/50 text-primary">
                    {item.type === "Reel" || item.type === "Video" ? (
                      <Video className="w-4 h-4" />
                    ) : item.type === "Carousel" ? (
                      <LayoutTemplate className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </div>
                  {item.title}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {item.client?.name || "-"}
                </td>
                <td className="px-6 py-4">
                  {item.platform ? (
                    <Badge variant="outline" className={`text-[10px] font-bold border ${platformColors[item.platform]}`}>
                      {item.platform}
                    </Badge>
                  ) : "-"}
                </td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs font-medium rounded-full bg-muted/50 border-border/50">
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          item.status === 'Ideation' ? 'bg-blue-500' :
                          item.status === 'Production' ? 'bg-amber-500' :
                          item.status === 'Review' ? 'bg-purple-500' :
                          item.status === 'Scheduled' ? 'bg-indigo-500' : 'bg-emerald-500'
                        }`} />
                        {item.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[160px]">
                      <DropdownMenuLabel className="text-xs text-muted-foreground">Change Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["Ideation", "Production", "Review", "Scheduled", "Published"].map((status) => (
                        <DropdownMenuItem 
                          key={status}
                          disabled={status === item.status}
                          onClick={() => updateStatus({ id: item.id, status: status as any })}
                          className="text-xs"
                        >
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                  {item.due_date ? new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                      <DropdownMenuItem 
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive font-medium"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this piece of content?")) {
                            deleteContent(item.id)
                          }
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            
            {contentData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No content found. Click "New Content" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
