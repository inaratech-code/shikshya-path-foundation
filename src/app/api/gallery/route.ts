import { NextResponse } from 'next/server';
import {
  galleryErrorMessage,
  isGallerySupabaseMissingTableError,
  readAllGallery,
  writeAllGallery,
} from '@/lib/galleryStore';
import {
  dbGetAllGallery,
  dbGetPublicGallery,
  dbInsertGalleryItem,
  supabaseAnonConfigured,
  supabaseServiceConfigured,
} from '@/lib/galleryDb';
import { isValidGalleryStoredImageUrl } from '@/lib/galleryImageUpload';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';
import type { GalleryItem } from '@/types/gallery';

/** GET: active gallery for public; with Bearer, all items (admin). */
export async function GET(request: Request) {
  try {
    if (offersWriteAuthorized(request)) {
      if (supabaseServiceConfigured()) {
        try {
          return NextResponse.json(await dbGetAllGallery());
        } catch (e) {
          if (!isGallerySupabaseMissingTableError(e)) {
            console.warn('[api/gallery GET admin] dbGetAllGallery failed, using gallery.json', e);
          }
          return NextResponse.json(await readAllGallery());
        }
      }
      if (supabaseAnonConfigured()) {
        try {
          return NextResponse.json(await dbGetPublicGallery());
        } catch (e) {
          console.warn('[api/gallery GET admin] dbGetPublicGallery failed, using gallery.json', e);
        }
      }
      return NextResponse.json(await readAllGallery());
    }
    if (supabaseAnonConfigured()) {
      try {
        return NextResponse.json(await dbGetPublicGallery());
      } catch (e) {
        console.error('[api/gallery GET]', e);
      }
    }
    const all = await readAllGallery();
    const active = all
      .filter((g) => g.active)
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return NextResponse.json(active);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}

/** POST: add gallery item (admin). */
export async function POST(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<GalleryItem>;
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : '';
    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }
    if (!isValidGalleryStoredImageUrl(imageUrl)) {
      return NextResponse.json(
        {
          error:
            'Image must be an https URL or a path from gallery upload (e.g. /uploads/gallery/…).',
        },
        { status: 400 }
      );
    }
    const sortOrder =
      typeof body.sortOrder === 'number' && Number.isFinite(body.sortOrder) ? body.sortOrder : 0;
    const active = body.active !== false;

    if (supabaseServiceConfigured()) {
      try {
        const item = await dbInsertGalleryItem({ title, imageUrl, sortOrder, active });
        return NextResponse.json(item);
      } catch (e) {
        if (isGallerySupabaseMissingTableError(e)) {
          console.warn('[api/gallery POST] gallery_items table missing; saving to gallery.json instead');
        } else {
          console.error(e);
          return NextResponse.json({ error: galleryErrorMessage(e) }, { status: 500 });
        }
      }
    }

    const items = await readAllGallery();
    const item: GalleryItem = {
      id: crypto.randomUUID(),
      title,
      imageUrl,
      active,
      sortOrder,
      createdAt: new Date().toISOString(),
    };
    items.unshift(item);
    await writeAllGallery(items);
    return NextResponse.json(item);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          galleryErrorMessage(e) ||
          'Could not save gallery item. Check .env.local (SUPABASE_SERVICE_ROLE_KEY) or src/data/gallery.json permissions.',
      },
      { status: 500 }
    );
  }
}
