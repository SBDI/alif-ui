// Placeholder for resource related types
export {};

export type ResourceStatus = 'uploading' | 'processing' | 'ready' | 'failed';

export interface Resource {
  id: string;
  name: string;
  type: string; // e.g., 'pdf', 'txt', 'url', 'knowledge_base'
  status: ResourceStatus;
  createdAt: string; // ISO string format
  updatedAt?: string; // ISO string format
  // Add other relevant fields like size, pageCount, etc. as needed
  progress?: number; // Optional upload/processing progress (0-100)
} 