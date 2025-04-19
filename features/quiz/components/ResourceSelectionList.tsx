'use client';

import React from 'react';
import { useResources } from '@/features/resources/hooks/useResources';
import { ResourceItemDisplay } from '@/features/resources/components/ResourceItemDisplay';
import { AddResourceModal } from '@/components/shared/AddResourceModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Loader2, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'; // Use ScrollArea for better UX if list is long

interface ResourceSelectionListProps {
  selectedResourceIds: string[];
  setSelectedResourceIds: (ids: string[]) => void;
}

export const ResourceSelectionList: React.FC<ResourceSelectionListProps> = ({ selectedResourceIds, setSelectedResourceIds }) => {
  const { resources, isLoading, error, refetch } = useResources();

  const handleSelectResource = (resourceId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedResourceIds([...selectedResourceIds, resourceId]);
    } else {
      setSelectedResourceIds(selectedResourceIds.filter(id => id !== resourceId));
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-10 text-center text-destructive flex flex-col items-center gap-2">
          <AlertTriangle className="h-8 w-8"/>
          <p>Error: {error.message}</p>
          <Button variant="outline" size="sm" onClick={refetch}>Retry</Button>
        </div>
      );
    }

    // Filter for resources that are ready
    const readyResources = resources.filter(r => r.status === 'ready');

    if (readyResources.length === 0 && !isLoading) {
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="p-10 text-center text-muted-foreground text-sm">
            No usable resources found.
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="max-h-[500px] p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {readyResources.map((resource) => (
              <div key={resource.id} className="relative flex items-start gap-2">
                 <Checkbox 
                    id={`resource-${resource.id}`}
                    checked={selectedResourceIds.includes(resource.id)}
                    onCheckedChange={(checked) => handleSelectResource(resource.id, !!checked)}
                    className="absolute top-2 left-2 z-10 bg-background border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    aria-label={`Select resource ${resource.name}`}
                 />
                <label htmlFor={`resource-${resource.id}`} className="w-full cursor-pointer">
                    <ResourceItemDisplay resource={resource} />
                </label>
              </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="flex justify-between items-center px-2 pt-2">
        <h3 className="text-lg font-semibold">Select Resources</h3>
        <AddResourceModal 
            trigger={
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
            }
            onUploadComplete={refetch} // Refetch resources after upload
        />
      </div>
      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
}; 