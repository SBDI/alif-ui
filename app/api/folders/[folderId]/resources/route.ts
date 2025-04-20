import { NextRequest, NextResponse } from "next/server";

// Mock data for development
const mockFolderResources = {
  "1": [
    { id: "1", name: "Calculus Textbook", type: "pdf", size: "2.5 MB" },
    { id: "2", name: "Algebra Notes", type: "pdf", size: "1.2 MB" },
    { id: "3", name: "Geometry Formulas", type: "pdf", size: "0.8 MB" },
  ],
  "2": [
    { id: "4", name: "Physics Lecture", type: "pdf", size: "3.1 MB" },
    { id: "5", name: "Chemistry Lab Report", type: "pdf", size: "1.5 MB" },
  ],
  "3": [
    { id: "6", name: "World War II Notes", type: "pdf", size: "1.8 MB" },
    { id: "7", name: "Ancient Civilizations", type: "pdf", size: "2.2 MB" },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { folderId: string } }
) {
  const folderId = params.folderId;

  // In a real implementation, this would fetch resources linked to a folder from a database
  const resources = mockFolderResources[folderId] || [];

  return NextResponse.json(resources);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { folderId: string } }
) {
  try {
    const folderId = params.folderId;
    const body = await request.json();
    
    // Validate request body
    if (!body.resourceId) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }

    // In a real implementation, this would link a resource to a folder in a database
    const link = {
      id: Math.random().toString(36).substring(2, 9),
      folderId,
      resourceId: body.resourceId,
    };

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error linking resource to folder:", error);
    return NextResponse.json(
      { error: "Failed to link resource to folder" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { folderId: string } }
) {
  try {
    const folderId = params.folderId;
    const body = await request.json();
    
    // Validate request body
    if (!body.resourceId) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }

    // In a real implementation, this would unlink a resource from a folder in a database
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unlinking resource from folder:", error);
    return NextResponse.json(
      { error: "Failed to unlink resource from folder" },
      { status: 500 }
    );
  }
}
