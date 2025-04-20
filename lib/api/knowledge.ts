import { API_BASE_URL } from "../constants";
import { Resource } from "../types/resource";

/**
 * Get all knowledge resources for the current user
 */
export async function getKnowledgeResources(): Promise<Resource[]> {
  const response = await fetch(`${API_BASE_URL}/knowledge`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch knowledge resources: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Upload a new resource to the knowledge base
 */
export async function uploadResource(file: File): Promise<Resource> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/knowledge/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to upload resource: ${response.statusText}`);
  }
  
  return response.json();
}
