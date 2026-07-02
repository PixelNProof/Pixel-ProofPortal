"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  CheckSquare,
  CreditCard,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Lightbulb,
  Search,
  Settings,
  Users,
} from "lucide-react"

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          title: "Clients",
          url: "/clients",
          icon: Users,
        },
        {
          title: "Content",
          url: "/content",
          icon: FileText,
        },
        {
          title: "Ideas",
          url: "/ideas",
          icon: Lightbulb,
        },
        {
          title: "Knowledge Base",
          url: "/knowledge",
          icon: BookOpen,
        },
        {
          title: "Assets",
          url: "/assets",
          icon: FolderOpen,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Tasks",
          url: "/tasks",
          icon: CheckSquare,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Finance",
          url: "/finance",
          icon: CreditCard,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4 font-semibold text-lg tracking-tight">
          Pixel & Proof HQ
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
