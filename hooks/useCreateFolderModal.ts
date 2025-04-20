import { useState } from 'react';
import { useFolders } from './useFolders';

export function useCreateFolderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { addFolder } = useFolders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const createFolder = async (data: { name: string; description?: string }) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addFolder(data);
      closeModal();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create folder');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    createFolder,
    isSubmitting,
    error,
  };
}
