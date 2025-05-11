'use client';

import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
}

export function useNotes(folderId: string, activityId?: string) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Sample Note 1',
      content: '<p>This is a sample note to demonstrate the notes feature.</p>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const selectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const createNote = async (params: CreateNoteParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newNote: Note = {
        id: Date.now().toString(),
        title: params.title,
        content: params.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setNotes((prev) => [...prev, newNote]);
      setSelectedNoteId(newNote.id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create note'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (id: string, params: CreateNoteParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                title: params.title,
                content: params.content,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update note'));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setNotes((prev) => prev.filter((note) => note.id !== id));
      
      // If the deleted note was selected, select another note if available
      if (selectedNoteId === id) {
        const remainingNotes = notes.filter((note) => note.id !== id);
        if (remainingNotes.length > 0) {
          setSelectedNoteId(remainingNotes[0].id);
        } else {
          setSelectedNoteId('');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete note'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notes,
    selectedNoteId,
    isLoading,
    error,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
  };
}
