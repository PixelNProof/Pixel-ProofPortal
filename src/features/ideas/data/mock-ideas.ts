import { Idea } from "../types/idea";

export const mockIdeas: Idea[] = [
  {
    id: "1",
    user_id: "demo",
    title: "Minimalist Typography Poster",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    source: "Instagram",
    tags: ["typography", "minimalism", "design"],
    created_at: "2026-10-15",
    aspect_ratio: "portrait"
  },
  {
    id: "2",
    user_id: "demo",
    title: "Brand Identity Layout",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2670&auto=format&fit=crop",
    image_url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2670&auto=format&fit=crop",
    source: "Behance",
    tags: ["branding", "layout", "print"],
    created_at: "2026-10-14",
    aspect_ratio: "landscape"
  },
  {
    id: "3",
    user_id: "demo",
    title: "3D Abstract Render",
    imageUrl: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    image_url: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    source: "Pinterest",
    tags: ["3D", "abstract", "color"],
    created_at: "2026-10-12",
    aspect_ratio: "square"
  },
  {
    id: "4",
    user_id: "demo",
    title: "Dark Mode Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    tags: ["UI/UX", "dark mode", "dashboard"],
    created_at: "2026-10-10",
    aspect_ratio: "landscape"
  },
  {
    id: "5",
    user_id: "demo",
    title: "Neon Typography",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2569&auto=format&fit=crop",
    image_url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2569&auto=format&fit=crop",
    source: "Dribbble",
    tags: ["neon", "typography", "cyberpunk"],
    created_at: "2026-10-09",
    aspect_ratio: "portrait"
  },
];
