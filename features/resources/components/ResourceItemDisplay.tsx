'use client';

import React from 'react';

// Define a basic type for a resource, adjust as needed
interface Resource {
  id: string;
  name: string;
  type: string;
  size?: string; // Optional size
  // Add other relevant properties like createdAt, path, etc.
}

interface ResourceItemDisplayProps {
  resource: Resource;
  // Add any other props this component might need, e.g., event handlers
}

export function ResourceItemDisplay({ resource }: ResourceItemDisplayProps) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-muted/50 transition-colors">
      <div>
        <h3 className="font-medium">{resource.name}</h3>
        <p className="text-sm text-muted-foreground">
          Type: {resource.type} {resource.size ? `(${resource.size})` : ''}
        </p>
      </div>
      {/* Add action buttons here, e.g., View, Delete */}
      <button className="text-xs p-1 px-2 border rounded">Options</button> 
    </div>
  );
} 