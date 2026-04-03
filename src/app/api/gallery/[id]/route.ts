import { NextResponse } from 'next/server';
import { deleteGalleryAssetForUrl } from '@/lib/galleryAssetDelete';
import { readAllGallery, writeAllGallery } from '@/lib/galleryStore';
import {
  dbDeleteGalleryItem,
  dbGetGalleryItemById,
  dbUpdateGalleryActive,
  supabaseServiceConfigured,
} from '@/lib/galleryDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const body = (await request.json()) as { active?: boolean };
    if (typeof body.active !== 'boolean') {
      return NextResponse.json({ error: 'active boolean required' }, { status: 400 });
    }

    if (supabaseServiceConfigured()) {
      const updated = await dbUpdateGalleryActive(id, body.active);
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(updated);
    }

    const items = await readAllGallery();
    const idx = items.findIndex((g) => g.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx].active = body.active;
    await writeAllGallery(items);
    return NextResponse.json(items[idx]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    if (supabaseServiceConfigured()) {
      const existing = await dbGetGalleryItemById(id);
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const ok = await dbDeleteGalleryItem(id);
      if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      await deleteGalleryAssetForUrl(existing.imageUrl);
      return NextResponse.json({ ok: true });
    }

    const items = await readAllGallery();
    const found = items.find((g) => g.id === id);
    if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const next = items.filter((g) => g.id !== id);
    await writeAllGallery(next);
    await deleteGalleryAssetForUrl(found.imageUrl);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
