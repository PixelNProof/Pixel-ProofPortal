"use client"

import { useState } from "react"
import { Folder, FileText, Search, Plus, ChevronRight, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockKnowledgeBase } from "../data/mock-knowledge"
import { KnowledgeDocument } from "../types/knowledge"
import { toast } from "sonner"

export function KnowledgeBase() {
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(mockKnowledgeBase[0].documents[0])
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "f1": true, "f2": true, "f3": true })

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }))
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-60px)]">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Tree View */}
        <div className={`${selectedDoc ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r bg-muted/10 flex-col shrink-0`}>
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold tracking-tight mb-4">Knowledge Base</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search docs..." className="pl-8 bg-background" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
            {mockKnowledgeBase.map(folder => (
              <div key={folder.id} className="mb-1">
                <button 
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium hover:bg-muted rounded-md transition-colors text-foreground/80"
                >
                  {expandedFolders[folder.id] ? <ChevronDown className="h-4 w-4 opacity-50 shrink-0" /> : <ChevronRight className="h-4 w-4 opacity-50 shrink-0" />}
                  <Folder className="h-4 w-4 opacity-50 shrink-0" />
                  <span className="truncate">{folder.name}</span>
                </button>
                
                {expandedFolders[folder.id] && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-muted pl-2">
                    {folder.documents.map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors text-left ${selectedDoc?.id === doc.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                      >
                        <FileText className="h-4 w-4 opacity-50 shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <Button className="w-full" variant="outline" onClick={() => toast("New Document created")}><Plus className="h-4 w-4 mr-2" /> New Document</Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 flex-col bg-background min-w-0 ${selectedDoc ? 'flex' : 'hidden md:flex'}`}>
          {selectedDoc ? (
            <>
              <div className="h-14 lg:h-[60px] border-b flex items-center justify-between px-4 lg:px-6 shrink-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <button className="md:hidden p-1 mr-2 bg-muted rounded-md" onClick={() => setSelectedDoc(null)}>
                     <ChevronRight className="h-4 w-4 rotate-180" />
                  </button>
                  <span className="hidden sm:inline">Knowledge Base</span>
                  <ChevronRight className="h-4 w-4 hidden sm:block" />
                  <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{selectedDoc.title}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toast("Document options")}><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:px-24">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold tracking-tight">{selectedDoc.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-4">
                    <span>Last updated: {selectedDoc.updatedAt}</span>
                  </div>
                  
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {/* Fake Markdown rendering for mock data */}
                    {selectedDoc.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed mb-4">{paragraph}</p>
                    ))}
                    <div className="h-40 mt-8 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground bg-muted/20">
                      Block-based Rich Text Editor Placeholder (like Notion)
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a document to view
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
