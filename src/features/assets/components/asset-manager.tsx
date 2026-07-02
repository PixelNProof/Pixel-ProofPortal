"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Search, Folder, File, FileText, Image as ImageIcon, Video, Archive, UploadCloud, Grid, List, MoreVertical, Download, Filter, FileUp } from "lucide-react"
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
import { useClients } from "@/hooks/use-clients"
import { AnimatePresence, motion } from "framer-motion"

export function AssetManager({ clientId }: { clientId?: string }) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedFilterId, setSelectedFilterId] = useState<string>("all")
  const { data: clients = [] } = useClients()

  const effectiveClientId = clientId || (selectedFilterId !== "all" ? selectedFilterId : undefined)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const brandName = effectiveClientId ? clients.find(c => c.id === effectiveClientId)?.name : null;
    if (brandName) {
      toast.success(`Uploading ${acceptedFiles.length} file(s) to ${brandName}.`)
    } else {
      toast.success(`Uploading ${acceptedFiles.length} file(s) to the visual drive.`)
    }
  }, [effectiveClientId, clients])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  })
  
  const files = effectiveClientId 
    ? mockAssetFiles.filter(f => f.client === mockAssetFiles.find(mf => mf.client)?.client)
    : mockAssetFiles

  const getFileIcon = (type: string) => {
    switch(type) {
      case "image": return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "video": return <Video className="h-6 w-6 text-purple-500" />
      case "document": return <FileText className="h-6 w-6 text-orange-500" />
      case "archive": return <Archive className="h-6 w-6 text-yellow-500" />
      default: return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  return (
    <div {...getRootProps()} className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full min-h-screen relative outline-none">
      <input {...getInputProps()} />

      {/* Drag Overlay */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl border-4 border-dashed border-primary/50 m-4 rounded-[32px]"
          >
            <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
                <FileUp className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Drop files to upload</h2>
              <p className="text-muted-foreground">Release your mouse to add them to the visual drive.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-8 max-w-[1600px] mx-auto w-full">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">The Visual Drive</h2>
          <p className="text-muted-foreground mt-2 text-base">Your agency's shared assets, raw files, and deliverables.</p>
        </div>
        <div className="flex items-center gap-4">
          {!clientId && (
            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 rounded-full border border-border/40 shadow-sm backdrop-blur-sm">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-transparent text-sm font-medium border-none outline-none focus:ring-0 text-foreground"
                value={selectedFilterId}
                onChange={(e) => setSelectedFilterId(e.target.value)}
              >
                <option value="all">All Brands</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <Button onClick={open} className="rounded-full px-6 shadow-md"><UploadCloud className="mr-2 h-4 w-4" /> Upload</Button>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input placeholder="Search visual drive..." className="pl-10 bg-muted/30 border-border/40 rounded-full h-10 transition-all focus-visible:ring-primary/30" />
          </div>
          <div className="flex items-center border border-border/40 rounded-full p-1 bg-muted/30 backdrop-blur-sm shadow-sm">
            <Button 
              variant={view === "grid" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 px-3 rounded-full"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === "list" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 px-3 rounded-full"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!clientId && (
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">Folders</h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {mockAssetFolders.map((folder) => (
                <div 
                  key={folder.id} 
                  className="group flex items-center p-5 rounded-[24px] border border-border/40 bg-card hover:bg-muted/30 hover:border-border/80 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Folder className="h-6 w-6 text-primary" fill="currentColor" opacity={0.3} />
                  </div>
                  <div className="ml-5 flex-1 overflow-hidden">
                    <p className="font-semibold text-base truncate group-hover:text-primary transition-colors">{folder.name}</p>
                    <p className="text-sm text-muted-foreground">{folder.itemCount} items</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold mb-4 tracking-tight">{clientId ? "Brand Assets" : "Recent Files"}</h3>
          {view === "list" ? (
            <div className="rounded-[24px] border border-border/40 bg-card overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="border-b-border/40 hover:bg-transparent">
                    <TableHead>File Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id} className="border-b-border/40 hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <span className="truncate max-w-[200px]">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {file.client ? <Badge variant="secondary" className="font-normal bg-muted/50">{file.client}</Badge> : "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{file.size}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{file.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-background">
                          <Download className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="group flex flex-col p-2 rounded-[24px] border border-border/40 bg-card hover:bg-muted/20 hover:border-border/80 cursor-pointer transition-all relative shadow-sm hover:shadow-xl"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                     <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur-md hover:bg-background">
                        <MoreVertical className="h-4 w-4" />
                     </Button>
                  </div>
                  <div className="h-36 w-full rounded-[16px] bg-muted/30 flex items-center justify-center mb-3 group-hover:bg-muted/50 transition-colors relative overflow-hidden">
                    {file.type === 'image' ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-blue-500/50" />
                      </div>
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>
                  <div className="flex-1 px-2 pb-2">
                    <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors" title={file.name}>{file.name}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-xs text-muted-foreground font-medium">{file.size}</p>
                      {file.client && <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-border/50 bg-transparent">{file.client}</Badge>}
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
