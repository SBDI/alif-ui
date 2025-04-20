import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Resource } from "../types";
import { FileText, Link as LinkIcon, Database, UploadCloud, AlertCircle, CheckCircle, Loader2, FolderPlus, Trash2 } from 'lucide-react';

interface ResourceItemDisplayProps {
  resource: Resource;
  onDelete?: (id: string) => void; // Optional delete handler
  onRetry?: (id: string) => void; // Optional retry handler
  className?: string;
}

// Helper to get appropriate icon based on resource type
const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
    case 'txt':
    case 'doc':
    case 'docx':
      return <FileText className="h-5 w-5 text-muted-foreground" />;
    case 'url':
      return <LinkIcon className="h-5 w-5 text-muted-foreground" />;
    case 'knowledge_base': // Example type
      return <Database className="h-5 w-5 text-muted-foreground" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};

export const ResourceItemDisplay: React.FC<ResourceItemDisplayProps> = ({ resource, onDelete, onRetry, className }) => {
  const { id, name, type, status, progress } = resource;

  const renderStatus = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{status}...</span>
            {progress !== undefined && (
                <Progress value={progress} className="h-1 w-16" />
            )}
          </div>
        );
      case 'ready':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1"/> Ready</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1"/> Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={cn("border rounded-lg p-4 flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3 flex-grow min-w-0">
        {getIcon(type)}
        <div className="flex-grow min-w-0">
          <CardTitle className="text-sm font-medium truncate" title={name}>{name}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {type?.toUpperCase()} - {resource.size}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {renderStatus()}
        <Button variant="outline" size="sm" disabled title="Add to Folder (Not Implemented)">
          <FolderPlus className="h-4 w-4 mr-1" /> Add to Folder
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" disabled title="Delete (Not Implemented)">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Resource</span>
        </Button>
      </div>
    </div>
  );
}; 