"use client"

import { useState } from "react"
import { Search, Plus, Folder, File, FileText, Image as ImageIcon, Video, Archive, UploadCloud, Grid, List, MoreVertical, Download } from "lucide-react"
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
import { mockAssetFolders, mockAssetFiles } from "../data/mock-assets"
import { toast } from "sonner"

export function AssetManager() {
  const [view, setView] = useState<"grid" | "list">("list")

  const getFileIcon = (type: string) => {
    switch(type) {
      case "image": return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "video": return <Video className="h-5 w-5 text-purple-500" />
      case "document": return <FileText className="h-5 w-5 text-orange-500" />
      case "archive": return <Archive className="h-5 w-5 text-yellow-500" />
      default: return <File className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Assets</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => toast("Upload modal opened")}><UploadCloud className="mr-2 h-4 w-4" /> Upload Files</Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search files, folders..." className="pl-8 bg-background" />
        </div>
        <div className="flex items-center border rounded-md p-1 bg-muted/50">
          <Button 
            variant={view === "grid" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-7 px-2"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={view === "list" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-7 px-2"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Folders</h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {mockAssetFolders.map((folder) => (
              <div 
                key={folder.id} 
                className="group flex items-center p-4 rounded-xl border bg-card hover:border-primary/50 cursor-pointer transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Folder className="h-5 w-5 text-primary" fill="currentColor" opacity={0.2} />
                </div>
                <div className="ml-4 flex-1 overflow-hidden">
                  <p className="font-medium text-sm truncate">{folder.name}</p>
                  <p className="text-xs text-muted-foreground">{folder.itemCount} files</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Recent Files</h3>
          {view === "list" ? (
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssetFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <span className="truncate">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {file.client ? <Badge variant="secondary" className="font-normal">{file.client}</Badge> : "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{file.size}</TableCell>
                      <TableCell className="text-muted-foreground">{file.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4">
              {mockAssetFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="group flex flex-col p-4 rounded-xl border bg-card hover:border-primary/50 cursor-pointer transition-colors relative"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                        <MoreVertical className="h-3 w-3" />
                     </Button>
                  </div>
                  <div className="h-24 w-full rounded-lg bg-muted/50 flex items-center justify-center mb-4">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium text-sm truncate" title={file.name}>{file.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
