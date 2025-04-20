import { API_BASE_URL } from "../constants";
import { Folder } from "../types/folder";

/**
 * Get all folders for the current user
 */
export async function getFolders(): Promise<Folder[]> {
  const response = await fetch(`${API_BASE_URL}/folders`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch folders: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Get a specific folder by ID
 */
export async function getFolder(folderId: string): Promise<Folder> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch folder: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Create a new folder
 */
export async function createFolder(data: { name: string; description?: string }): Promise<Folder> {
  const response = await fetch(`${API_BASE_URL}/folders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create folder: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Delete a folder
 */
export async function deleteFolder(folderId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete folder: ${response.statusText}`);
  }
}
