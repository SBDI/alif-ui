'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useResourceUpload } from '@/components/features/resources/hooks/useResourceUpload';
import { UploadCloud, Link as LinkIcon, Database, AlertCircle, CheckCircle, X } from 'lucide-react';

interface AddResourceModalProps {
  trigger: React.ReactNode; // The element that opens the modal
  onUploadComplete?: (resourceId?: string) => void; // Optional callback
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({ trigger, onUploadComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadState, uploadFile, resetUploadState } = useResourceUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file).then(() => {
        // Optionally trigger callback after success state is set
        if (onUploadComplete && uploadState.status === 'success') { // Check status after upload attempt
           onUploadComplete(uploadState.uploadedResourceId);
        }
        // Consider closing modal or showing success message here
        // setIsOpen(false); // Example: Close on success
      });
    }
  };

  const handleComputerUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Reset state when modal is closed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        resetUploadState();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Resource</DialogTitle>
          <DialogDescription>
            Choose a source to add new study material.
          </DialogDescription>
        </DialogHeader>
        
        {uploadState.status === 'idle' && (
            <div className="grid gap-4 py-4">
              {/* Option 1: From Knowledge Base (Placeholder) */}
              <Button variant="outline" disabled className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                From Knowledge (Coming Soon)
              </Button>
              {/* Option 2: From Link (Placeholder) */}
              <Button variant="outline" disabled className="w-full justify-start">
                <LinkIcon className="mr-2 h-4 w-4" />
                From Link (Coming Soon)
              </Button>
              {/* Option 3: From Computer */}
              <Button variant="outline" className="w-full justify-start" onClick={handleComputerUploadClick}>
                <UploadCloud className="mr-2 h-4 w-4" />
                From Computer
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                // Add accept attribute for specific file types if needed
                // accept=".pdf,.txt,.doc,.docx"
              />
            </div>
        )}
        
        {uploadState.status === 'uploading' && (
            <div className="py-4 flex flex-col items-center gap-4">
                <p>Uploading: {fileInputRef.current?.files?.[0]?.name}</p>
                <Progress value={uploadState.progress} className="w-[60%]" />
                <p className="text-sm text-muted-foreground">{uploadState.progress}% complete</p>
            </div>
        )}
        
        {uploadState.status === 'success' && (
            <div className="py-4 flex flex-col items-center gap-2 text-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <p className="font-medium">Upload Complete!</p>
                <p className="text-sm text-muted-foreground">Resource added successfully.</p>
                 <DialogClose asChild>
                    <Button type="button" className="mt-4">
                        Done
                    </Button>
                 </DialogClose>
            </div>
        )}
        
        {uploadState.status === 'error' && (
             <div className="py-4 flex flex-col items-center gap-2 text-center">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="font-medium">Upload Failed</p>
                <p className="text-sm text-destructive">{uploadState.error || 'An error occurred.'}</p>
                <div className="flex gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={resetUploadState}>
                        Try Again
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                           Close
                        </Button>
                    </DialogClose>
                </div>
            </div>
        )}
        
        {/* Hide default footer if showing status */}
        {uploadState.status === 'idle' && (
            <DialogFooter>
              {/* Could add a general cancel button here if needed */}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}; 