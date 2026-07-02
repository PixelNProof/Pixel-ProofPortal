import { ContentItem } from "../types/content";

export const mockContent: ContentItem[] = [
  { id: "1", user_id: "demo", title: "Competitor Analysis Reel", client_id: "1", client: { name: "Acme Corp" }, status: "Ideation", type: "Reel", platform: "Instagram", due_date: "2026-10-12", created_at: "2026-10-01" },
  { id: "2", user_id: "demo", title: "5 Tips for SaaS Founders", client_id: "1", client: { name: "Acme Corp" }, status: "Production", type: "Carousel", platform: "LinkedIn", assignee: "Sarah", due_date: "2026-10-15", created_at: "2026-10-02" },
  { id: "3", user_id: "demo", title: "Behind the Scenes", client_id: "2", client: { name: "Lumina Fashion" }, status: "Production", type: "Reel", platform: "TikTok", assignee: "Mike", created_at: "2026-10-03" },
  { id: "4", user_id: "demo", title: "Winter Collection Teaser", client_id: "2", client: { name: "Lumina Fashion" }, status: "Review", type: "Reel", platform: "Instagram", created_at: "2026-10-04" },
  { id: "5", user_id: "demo", title: "Product Launch Post", client_id: "3", client: { name: "Zephyr Tech" }, status: "Scheduled", type: "Static", platform: "Twitter", due_date: "2026-10-10", created_at: "2026-10-05" },
];
