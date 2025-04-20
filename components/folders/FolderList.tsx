"use client";

import { useState } from "react";
import { FolderCard } from "./FolderCard";
import { Button } from "@/components/ui/button";
import { CreateFolderModal } from "@/components/shared/CreateFolderModal";
import { FolderPlus } from 'lucide-react';
import { type Folder } from '@/lib/types/folder';

// This would come from a hook in a real implementation
const mockFolders = [
  { id: "1", name: "Mathematics", description: "Math study materials", resourceCount: 5 },
  { id: "2", name: "Science", description: "Science study materials", resourceCount: 3 },
  { id: "3", name: "History", description: "History study materials", resourceCount: 2 },
];

export function FolderList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Folders</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Folder</Button>
      </div>

      {mockFolders.length === 0 ? (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">You don't have any folders yet.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create your first folder
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              name={folder.name}
              description={folder.description}
              resourceCount={folder.resourceCount}
            />
          ))}
        </div>
      )}

      <CreateFolderModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
