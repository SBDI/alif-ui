import { NextResponse } from "next/server";

// Mock data for development
const mockResources = [
  { id: "1", name: "Calculus Textbook", type: "pdf", size: "2.5 MB" },
  { id: "2", name: "Algebra Notes", type: "pdf", size: "1.2 MB" },
  { id: "3", name: "Geometry Formulas", type: "pdf", size: "0.8 MB" },
  { id: "4", name: "Physics Lecture", type: "pdf", size: "3.1 MB" },
  { id: "5", name: "Chemistry Lab Report", type: "pdf", size: "1.5 MB" },
];

export async function GET() {
  // In a real implementation, this would fetch resources from a database
  return NextResponse.json(mockResources);
}
