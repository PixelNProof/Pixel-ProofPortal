export type ContentStatus = "Research" | "Script" | "Editing" | "Review" | "Scheduled" | "Posted";

export interface ContentItem {
  id: string;
  title: string;
  clientName: string;
  status: ContentStatus;
  assignee?: string;
  dueDate?: string;
  type: "Reel" | "Carousel" | "Static" | "Story";
}
