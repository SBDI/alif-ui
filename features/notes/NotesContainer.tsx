'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotes } from "@/hooks/useNotes";

interface NotesContainerProps {
  folderId: string;
  activityId?: string;
}

export function NotesContainer({ folderId, activityId }: NotesContainerProps) {
  const [activeTab, setActiveTab] = useState<"view" | "edit" | "new">("view");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const { notes, selectedNoteId, selectNote, createNote, updateNote, isLoading, error } = useNotes(folderId, activityId);

  const handleCreateNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      createNote({
        title: noteTitle,
        content: noteContent,
      });
      setNoteTitle("");
      setNoteContent("");
      setActiveTab("view");
    }
  };

  const handleUpdateNote = () => {
    if (selectedNoteId && noteTitle.trim() && noteContent.trim()) {
      updateNote(selectedNoteId, {
        title: noteTitle,
        content: noteContent,
      });
      setActiveTab("view");
    }
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
      selectNote(id);
      setActiveTab("edit");
    }
  };

  const handleNewNote = () => {
    setNoteTitle("");
    setNoteContent("");
    setActiveTab("new");
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Button onClick={handleNewNote}>New Note</Button>
      </div>
      <p className="text-muted-foreground">
        View and manage your notes for this activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Your Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {notes.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-muted-foreground">No notes yet</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={handleNewNote}
                >
                  Create your first note
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-muted ${
                      note.id === selectedNoteId ? "bg-muted" : ""
                    }`}
                    onClick={() => selectNote(note.id)}
                  >
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {note.content.substring(0, 50)}
                      {note.content.length > 50 ? "..." : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {activeTab === "view"
                ? selectedNote?.title || "Select a note"
                : activeTab === "edit"
                ? "Edit Note"
                : "New Note"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                {error.message}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="view" disabled={!selectedNote}>
                  View
                </TabsTrigger>
                <TabsTrigger value="edit" disabled={!selectedNote}>
                  Edit
                </TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                {selectedNote ? (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedNote.content }} />
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center border rounded-lg p-4">
                    <p className="text-muted-foreground">
                      Select a note to view its content
                    </p>
                  </div>
                )}
                {selectedNote && (
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditNote(selectedNote.id)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="edit">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="Note title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-content">Content</Label>
                    <Textarea
                      id="edit-content"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Note content"
                      className="min-h-[300px]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("view")}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateNote}
                      disabled={isLoading || !noteTitle.trim() || !noteContent.trim()}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="new">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Title</Label>
                    <Input
                      id="new-title"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="Note title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-content">Content</Label>
                    <Textarea
                      id="new-content"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Note content"
                      className="min-h-[300px]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("view")}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateNote}
                      disabled={isLoading || !noteTitle.trim() || !noteContent.trim()}
                    >
                      {isLoading ? "Creating..." : "Create Note"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
