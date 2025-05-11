"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResourceItemDisplay } from "@/features/resources/components/ResourceItemDisplay";
import { UploadKnowledgeModal } from "@/components/shared/UploadKnowledgeModal";
import { Plus } from 'lucide-react';
import { type Resource } from '@/lib/types/resource';

// This would come from a hook in a real implementation
const mockResources = [
  { id: "1", name: "Calculus Textbook", type: "pdf", size: "2.5 MB" },
  { id: "2", name: "Algebra Notes", type: "pdf", size: "1.2 MB" },
  { id: "3", name: "Geometry Formulas", type: "pdf", size: "0.8 MB" },
  { id: "4", name: "Physics Lecture", type: "pdf", size: "3.1 MB" },
  { id: "5", name: "Chemistry Lab Report", type: "pdf", size: "1.5 MB" },
];

export function KnowledgeBaseView() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Knowledge Resources</h2>
        <Button onClick={() => setIsUploadModalOpen(true)}>Upload Resource</Button>
      </div>

      {mockResources.length === 0 ? (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">You don't have any resources yet.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload your first resource
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockResources.map((resource) => (
            <ResourceItemDisplay 
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
      )}

      <UploadKnowledgeModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
}
