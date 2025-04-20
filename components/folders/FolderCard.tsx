import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FolderCardProps {
  id: string;
  name: string;
  description?: string;
  resourceCount: number;
}

export function FolderCard({ id, name, description, resourceCount }: FolderCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">
          {description || "No description provided."}
        </p>
        <p className="mt-2 text-sm">
          {resourceCount} {resourceCount === 1 ? "resource" : "resources"}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/folders/${id}`}>Open Folder</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
