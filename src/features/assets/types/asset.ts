export interface AssetFolder {
  id: string;
  name: string;
  itemCount: number;
  updatedAt: string;
}

export interface AssetFile {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "archive";
  size: string;
  updatedAt: string;
  client?: string;
}
