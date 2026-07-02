export interface Idea {
  id: string;
  user_id: string;
  title: string;
  tags: string[];
  aspect_ratio: "square" | "portrait" | "landscape" | string;
  image_url: string;
  source?: string;
  created_at: string;
}
