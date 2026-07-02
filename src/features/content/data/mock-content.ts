import { ContentItem, ContentStatus } from "../types/content";

export const initialColumns: Record<ContentStatus, ContentItem[]> = {
  Research: [
    { id: "c1", title: "Competitor Analysis Reel", clientName: "Acme Corp", status: "Research", type: "Reel", dueDate: "Oct 12" }
  ],
  Script: [
    { id: "c2", title: "5 Tips for SaaS Founders", clientName: "Acme Corp", status: "Script", type: "Carousel", assignee: "Sarah", dueDate: "Oct 15" }
  ],
  Editing: [
    { id: "c3", title: "Behind the Scenes", clientName: "Lumina Fashion", status: "Editing", type: "Reel", assignee: "Mike" }
  ],
  Review: [
    { id: "c4", title: "Winter Collection Teaser", clientName: "Lumina Fashion", status: "Review", type: "Reel" }
  ],
  Scheduled: [
    { id: "c5", title: "Product Launch Post", clientName: "Zephyr Tech", status: "Scheduled", type: "Static", dueDate: "Oct 10" }
  ],
  Posted: []
}
