'use client';
import React from 'react';

interface WriteContainerProps {
  folderId: string;
}

export function WriteContainer({ folderId }: WriteContainerProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Write Assistant (Folder: {folderId})</h2>
      <p className="text-muted-foreground">Write feature content will go here.</p>
      {/* TODO: Implement actual writing assistance UI */}
    </div>
  );
}
