export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface KnowledgeFolder {
  id: string;
  name: string;
  documents: KnowledgeDocument[];
}
