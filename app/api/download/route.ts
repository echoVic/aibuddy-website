import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Download token required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Download service not configured' },
        { status: 500 }
      );
    }

    // Look up download by token
    const { data: download, error } = await supabaseAdmin
      .from('downloads')
      .select('*')
      .eq('download_token', token)
      .single();

    if (error || !download) {
      console.error('Download lookup error:', error);
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(download.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      );
    }

    // Check if already downloaded too many times (optional limit)
    if (download.download_count && download.download_count >= 5) {
      return NextResponse.json(
        { error: 'Download limit exceeded' },
        { status: 429 }
      );
    }

    // Increment download count
    await supabaseAdmin
      .from('downloads')
      .update({
        download_count: (download.download_count || 0) + 1,
        last_downloaded_at: new Date().toISOString(),
      })
      .eq('id', download.id);

    // For now, redirect to the actual file URL
    // In production, you might want to stream the file or use signed URLs
    return NextResponse.redirect(download.file_path);
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}
