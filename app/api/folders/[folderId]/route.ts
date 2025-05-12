import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const supabase = createClient()

    // Get user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch specific folder
    const { data: folder, error } = await supabase
      .from('folders')
      .select('*')
      .eq('id', params.folderId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Folder not found' }, { status: 404 })
      }
      console.error('Error fetching folder:', error)
      return NextResponse.json({ error: 'Failed to fetch folder' }, { status: 500 })
    }

    return NextResponse.json(folder)
  } catch (error) {
    console.error('Error in GET /api/folders/[folderId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { folderId: string } }
) {
  try {
    const supabase = createClient()

    // Get user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete folder
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', params.folderId)

    if (error) {
      console.error('Error deleting folder:', error)
      return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error in DELETE /api/folders/[folderId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
