import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ResourceItemDisplay } from "@/features/resources/components/ResourceItemDisplay";

// This would come from a hook in a real implementation
const mockFolder = {
  id: "1",
  name: "Mathematics",
  description: "Math study materials",
  resources: [
    { id: "1", name: "Calculus Textbook", type: "pdf", size: "2.5 MB" },
    { id: "2", name: "Algebra Notes", type: "pdf", size: "1.2 MB" },
    { id: "3", name: "Geometry Formulas", type: "pdf", size: "0.8 MB" },
  ]
};

interface FolderViewProps {
  folderId: string;
}

export function FolderView({ folderId }: FolderViewProps) {
  // In a real implementation, we would fetch the folder data using the folderId
  const folder = mockFolder;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{folder.name}</h1>
          <p className="text-muted-foreground">{folder.description}</p>
        </div>
        <Button>Add Resources</Button>
      </div>

      <Tabs defaultValue="resources">
        <TabsList>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="resources" className="space-y-4">
          {folder.resources.length === 0 ? (
            <div className="border rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No resources in this folder yet.</p>
              <Button variant="outline" className="mt-4">Add your first resource</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {folder.resources.map((resource) => (
                <ResourceItemDisplay 
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
                <CardDescription>Ask questions about your resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/chat`}>Open Chat</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Study Guide</CardTitle>
                <CardDescription>Generate study guides from your resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/study-guide`}>Create Study Guide</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Practice Quiz</CardTitle>
                <CardDescription>Test your knowledge with practice quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/practice-quiz`}>Take Quiz</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>Study with AI-generated flashcards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/flashcards`}>Create Flashcards</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Solve</CardTitle>
                <CardDescription>Get help solving problems</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/solve`}>Solve Problems</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Write</CardTitle>
                <CardDescription>Get help with writing assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/folders/${folderId}/write`}>Start Writing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
