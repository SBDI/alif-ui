import { NextResponse } from 'next/server';

// Placeholder data - replace with actual backend calls
const mockResources = [
  { id: '1', name: 'Lecture Notes Week 1.pdf', type: 'pdf', createdAt: new Date().toISOString() },
  { id: '2', name: 'History Chapter 5 Summary.txt', type: 'txt', createdAt: new Date().toISOString() },
];

// GET /api/resources - List resources
export async function GET() {
  console.log('[API] GET /api/resources called');
  // TODO: Replace with fetch call to FastAPI backend
  return NextResponse.json(mockResources);
}

// POST /api/resources - Create resource metadata (before upload)
export async function POST(request: Request) {
  const body = await request.json();
  console.log('[API] POST /api/resources called with body:', body);
  // TODO: Replace with fetch call to FastAPI backend to create resource entry
  const newResourceId = Math.random().toString(36).substring(7); // Mock ID
  return NextResponse.json({ id: newResourceId, ...body }, { status: 201 });
} 