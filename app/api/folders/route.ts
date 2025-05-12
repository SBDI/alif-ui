import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Validation schema for folder creation
const createFolderSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
})

export async function GET() {
  try {
    const supabase = createClient()

    // Get user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch folders for the user
    const { data: folders, error } = await supabase
      .from('folders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching folders:', error)
      return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 })
    }

    return NextResponse.json(folders)
  } catch (error) {
    console.error('Error in GET /api/folders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Get user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = createFolderSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.format() },
        { status: 400 }
      )
    }

    const { name, description, parentId } = validationResult.data

    // Create new folder
    const { data: folder, error } = await supabase
      .from('folders')
      .insert({
        name,
        description,
        parent_id: parentId,
        user_id: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating folder:', error)
      return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 })
    }

    return NextResponse.json(folder, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/folders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
