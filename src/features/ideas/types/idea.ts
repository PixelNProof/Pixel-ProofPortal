export interface Idea {
  id: string;
  title: string;
  imageUrl: string;
  source?: string;
  tags: string[];
  savedAt: string;
  aspectRatio: "square" | "portrait" | "landscape";
}
