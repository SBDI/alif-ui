export interface StudyGuide {
  id: string;
  folderId: string;
  title: string;
  content: string;
  format: "outline" | "detailed" | "summary";
  topics?: string[];
  createdAt: string;
}
