'use client';
import { useState } from 'react';

export function useWrite(folderId: string) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Implement write logic
  return { text, setText, isLoading };
} 