import { useState, useEffect } from 'react';
import { getFolders, createFolder, deleteFolder } from '@/lib/api/folders';
import { Folder } from '@/lib/types/folder';

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFolders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch folders'));
    } finally {
      setIsLoading(false);
    }
  };

  const addFolder = async (data: { name: string; description?: string }) => {
    try {
      const newFolder = await createFolder(data);
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create folder');
    }
  };

  const removeFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId);
      setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete folder');
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return {
    folders,
    isLoading,
    error,
    refetch: fetchFolders,
    addFolder,
    removeFolder,
  };
}
