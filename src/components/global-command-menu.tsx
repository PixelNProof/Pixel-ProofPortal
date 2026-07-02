"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  CreditCard,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Lightbulb,
  Search,
  Settings,
  Users,
  CheckSquare
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function GlobalCommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      {/* Hidden button for mobile access or if they don't know the shortcut */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground p-3 shadow-lg md:hidden"
      >
        <Search className="h-5 w-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/clients"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Clients</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/content"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Content Pipeline</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/ideas"))}>
              <Lightbulb className="mr-2 h-4 w-4" />
              <span>Idea Vault</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/tasks"))}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Tasks</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Finance</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/calendar"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/assets"))}>
              <FolderOpen className="mr-2 h-4 w-4" />
              <span>Assets</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => {
              router.push("/clients")
              // Triggering modal logic usually requires context, 
              // but routing to the page is a good first step.
            })}>
              <Users className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Add New Client</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/content"))}>
              <FileText className="mr-2 h-4 w-4 text-blue-500" />
              <span>Create Content Piece</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
              <CreditCard className="mr-2 h-4 w-4 text-amber-500" />
              <span>Generate Invoice</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="System">
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
