"use client"; // Added directive

import { useState, useCallback } from 'react';
import { Resource } from '../types'; // Assuming you might add the new resource optimistically

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  status: UploadStatus;
  progress: number; // Percentage 0-100
  error: string | null;
  uploadedResourceId?: string; // ID of the resource after successful metadata creation/upload
}

// TODO: Potentially enhance this hook:
// - Add optimistic updates to a resource list (passed in or managed via context/global state)
// - Integrate with the POST /api/resources call to create metadata first
// - Implement actual progress tracking using XMLHttpRequest if needed

export function useResourceUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
    error: null,
  });

  const uploadFile = useCallback(async (file: File) => {
    setUploadState({ status: 'uploading', progress: 0, error: null });

    const formData = new FormData();
    formData.append('file', file);
    // Optionally add resourceId if pre-created via POST /api/resources
    // formData.append('resourceId', someResourceId);

    try {
      // Simulate progress for now
      await new Promise(resolve => setTimeout(resolve, 500)); // Initial delay
      setUploadState(prev => ({ ...prev, progress: 30 }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadState(prev => ({ ...prev, progress: 70 }));

      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header for FormData, browser does it
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }
      
      setUploadState({ status: 'success', progress: 100, error: null, uploadedResourceId: result.resourceId });
      console.log('Upload successful:', result);
      // Maybe return the result or resource ID? 
      // return result.resourceId;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setUploadState({ status: 'error', progress: 0, error: errorMessage });
      console.error('Upload error:', err);
    }
  }, []);

  const resetUploadState = useCallback(() => {
     setUploadState({ status: 'idle', progress: 0, error: null });
  }, []);

  return { uploadState, uploadFile, resetUploadState };
} 