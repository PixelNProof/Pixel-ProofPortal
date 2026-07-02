export type ContentStatus = "Ideation" | "Production" | "Review" | "Scheduled" | "Published";
export type ContentType = "Reel" | "Carousel" | "Static" | "Story" | "Video";
export type ContentPlatform = "Instagram" | "TikTok" | "LinkedIn" | "YouTube" | "Twitter" | "Other";

export interface ContentItem {
  id: string;
  user_id: string;
  client_id?: string | null;
  title: string;
  type: ContentType;
  platform?: ContentPlatform | null;
  status: ContentStatus;
  assignee?: string | null;
  due_date?: string | null;
  created_at: string;
  
  // Joined field
  client?: {
    name: string;
  } | null;
}
