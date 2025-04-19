import { NextResponse } from 'next/server';

// POST /api/resources/upload - Handle file upload
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const resourceId = formData.get('resourceId'); // Optional: Link upload to a resource

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  console.log('[API] POST /api/resources/upload called');
  console.log('  Resource ID:', resourceId);
  console.log('  File Name:', file.name);
  console.log('  File Size:', file.size);
  console.log('  File Type:', file.type);

  // TODO: 
  // 1. Stream/Send the file to the FastAPI backend's upload endpoint.
  // 2. Handle response from FastAPI (success/failure).

  // Mock success response
  return NextResponse.json({ 
    message: 'File received, processing started', 
    fileName: file.name,
    resourceId: resourceId || 'N/A'
  });
} 