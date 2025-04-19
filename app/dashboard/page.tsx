'use client';

import { Button } from "@/components/ui/button";
import { AddResourceModal } from "@/components/shared/AddResourceModal";
import { useResources } from "@/features/resources/hooks/useResources";
import { ResourceItemDisplay } from "@/features/resources/components/ResourceItemDisplay";
import { PlusCircle, Loader2, AlertTriangle } from "lucide-react";

export default function DashboardHomePage() {
  const { resources, isLoading, error, refetch } = useResources();

  // Placeholder delete handler
  const handleDelete = (id: string) => {
    console.log('[TODO] Delete resource:', id);
    // Add API call here: DELETE /api/resources/{id}
    // Optimistically remove from UI or refetch list
  };

  // Placeholder retry handler (could refetch list or trigger re-upload)
  const handleRetry = (id: string) => {
    console.log('[TODO] Retry resource processing/upload:', id);
    // Add specific retry logic here
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-10 text-center text-destructive flex flex-col items-center gap-2">
          <AlertTriangle className="h-8 w-8"/>
          <p>Error loading resources: {error.message}</p>
          <Button variant="outline" size="sm" onClick={refetch}>Retry</Button>
        </div>
      );
    }

    if (resources.length === 0) {
      return <p className="mt-6 text-center text-muted-foreground">No resources added yet. Add your first one!</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {resources.map((resource) => (
          <ResourceItemDisplay 
            key={resource.id} 
            resource={resource} 
            onDelete={handleDelete} // Pass delete handler
            onRetry={handleRetry}   // Pass retry handler
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Resources</h1>
        <AddResourceModal 
            trigger={
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
                </Button>
            }
            onUploadComplete={() => {
                console.log('Upload complete, refreshing list...');
                refetch(); // Refetch resources after upload
            }}
        />
      </div>
      
      {renderContent()}
      
    </div>
  );
} 