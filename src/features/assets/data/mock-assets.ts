import { AssetFolder, AssetFile } from "../types/asset"

export const mockAssetFolders: AssetFolder[] = [
  { id: "f1", name: "Brand Identity Files", itemCount: 12, updatedAt: "2 days ago" },
  { id: "f2", name: "Raw Footage - Q3", itemCount: 45, updatedAt: "1 week ago" },
  { id: "f3", name: "Final Deliverables", itemCount: 8, updatedAt: "3 hours ago" },
  { id: "f4", name: "Social Media Templates", itemCount: 24, updatedAt: "1 month ago" },
]

export const mockAssetFiles: AssetFile[] = [
  { id: "a1", name: "Acme_Logo_Pack.zip", type: "archive", size: "14.2 MB", updatedAt: "Oct 1", client: "Acme Corp" },
  { id: "a2", name: "Lumina_Promo_v2.mp4", type: "video", size: "450 MB", updatedAt: "Oct 12", client: "Lumina Fashion" },
  { id: "a3", name: "Brand_Guidelines_Final.pdf", type: "document", size: "2.4 MB", updatedAt: "Sep 28", client: "Elevate Real Estate" },
  { id: "a4", name: "Instagram_Post_01.png", type: "image", size: "1.1 MB", updatedAt: "Oct 15", client: "Zephyr Tech" },
  { id: "a5", name: "Pitch_Deck_Draft.pdf", type: "document", size: "5.8 MB", updatedAt: "Oct 14", client: "Zephyr Tech" },
]
