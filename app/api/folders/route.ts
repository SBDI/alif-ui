import { NextRequest, NextResponse } from "next/server";

// Mock data for development
const mockFolders = [
  { id: "1", name: "Mathematics", description: "Math study materials", resourceCount: 5 },
  { id: "2", name: "Science", description: "Science study materials", resourceCount: 3 },
  { id: "3", name: "History", description: "History study materials", resourceCount: 2 },
];

export async function GET() {
  // In a real implementation, this would fetch folders from a database
  return NextResponse.json(mockFolders);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.name) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    // In a real implementation, this would create a folder in a database
    const newFolder = {
      id: Math.random().toString(36).substring(2, 9),
      name: body.name,
      description: body.description || "",
      resourceCount: 0,
    };

    return NextResponse.json(newFolder);
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}
