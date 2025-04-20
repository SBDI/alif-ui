import { API_BASE_URL } from "../constants";
import { Resource } from "../types/resource";
import { FolderResourceLink } from "../types/folderResourceLink";

/**
 * Get all resources linked to a folder
 */
export async function getFolderResources(folderId: string): Promise<Resource[]> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/resources`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch folder resources: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Link a resource to a folder
 */
export async function linkResourceToFolder(folderId: string, resourceId: string): Promise<FolderResourceLink> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resourceId }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to link resource to folder: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Unlink a resource from a folder
 */
export async function unlinkResourceFromFolder(folderId: string, resourceId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/resources`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resourceId }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to unlink resource from folder: ${response.statusText}`);
  }
}
