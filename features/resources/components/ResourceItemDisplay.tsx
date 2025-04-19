import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Resource } from "../types";
import { FileText, Link as LinkIcon, Database, UploadCloud, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface ResourceItemDisplayProps {
  resource: Resource;
  onDelete?: (id: string) => void; // Optional delete handler
  onRetry?: (id: string) => void; // Optional retry handler
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

export const ResourceItemDisplay: React.FC<ResourceItemDisplayProps> = ({ resource, onDelete, onRetry }) => {
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
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          {getIcon(type)}
          <CardTitle className="text-sm font-medium truncate flex-1" title={name}>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {/* Optional: Add more details like date/size here */} 
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {renderStatus()}
        {/* Add action buttons (e.g., delete, retry) */} 
        <div>
          {status === 'failed' && onRetry && (
             <Button variant="ghost" size="sm" onClick={() => onRetry(id)}>Retry</Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(id)}>Delete</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}; 