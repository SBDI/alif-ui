import { NextRequest, NextResponse } from "next/server";

// Mock data for development
const mockFolders = {
  "1": {
    id: "1",
    name: "Mathematics",
    description: "Math study materials",
    resources: [
      { id: "1", name: "Calculus Textbook", type: "pdf", size: "2.5 MB" },
      { id: "2", name: "Algebra Notes", type: "pdf", size: "1.2 MB" },
      { id: "3", name: "Geometry Formulas", type: "pdf", size: "0.8 MB" },
    ],
  },
  "2": {
    id: "2",
    name: "Science",
    description: "Science study materials",
    resources: [
      { id: "4", name: "Physics Lecture", type: "pdf", size: "3.1 MB" },
      { id: "5", name: "Chemistry Lab Report", type: "pdf", size: "1.5 MB" },
    ],
  },
  "3": {
    id: "3",
    name: "History",
    description: "History study materials",
    resources: [
      { id: "6", name: "World War II Notes", type: "pdf", size: "1.8 MB" },
      { id: "7", name: "Ancient Civilizations", type: "pdf", size: "2.2 MB" },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { folderId: string } }
) {
  const folderId = params.folderId;

  // In a real implementation, this would fetch a folder from a database
  const folder = mockFolders[folderId];

  if (!folder) {
    return NextResponse.json(
      { error: "Folder not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(folder);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { folderId: string } }
) {
  const folderId = params.folderId;

  // In a real implementation, this would delete a folder from a database
  const folder = mockFolders[folderId];

  if (!folder) {
    return NextResponse.json(
      { error: "Folder not found" },
      { status: 404 }
    );
  }

  // Simulate deletion
  return NextResponse.json({ success: true });
}
