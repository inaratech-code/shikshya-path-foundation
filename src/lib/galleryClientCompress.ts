/** Max width/height in CSS pixels — enough for web, much smaller than phone originals. */
const MAX_EDGE = 2048;
const JPEG_QUALITY = 0.82;
/** Below this size we skip work unless dimensions exceed {@link MAX_EDGE}. */
const BYTES_SKIP = 500_000;

/**
 * Downscales large photos and recompresses heavy JPEGs before upload so the request is smaller and faster.
 * Skips SVG, GIF, and files that fail to decode (e.g. some HEIC in unsupported browsers).
 */
export async function prepareGalleryImageForUpload(file: File): Promise<File> {
  const t = (file.type || '').split(';')[0].trim().toLowerCase();
  if (t === 'image/svg+xml' || t === 'image/gif') return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const iw = bitmap.width;
    const ih = bitmap.height;
    const maxDim = Math.max(iw, ih);
    const scale = maxDim > MAX_EDGE ? MAX_EDGE / maxDim : 1;
    const needResize = scale < 0.999;
    const largeFile = file.size > BYTES_SKIP;

    if (!needResize && !largeFile) {
      bitmap.close();
      return file;
    }

    const w = needResize ? Math.max(1, Math.round(iw * scale)) : iw;
    const h = needResize ? Math.max(1, Math.round(ih * scale)) : ih;

    let source: ImageBitmap = bitmap;
    if (needResize) {
      const resized = await createImageBitmap(bitmap, {
        resizeWidth: w,
        resizeHeight: h,
        resizeQuality: 'high',
      });
      bitmap.close();
      source = resized;
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      source.close();
      return file;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0);
    source.close();

    const outPng = t === 'image/png';
    const mime = outPng ? 'image/png' : 'image/jpeg';
    const blob = await new Promise<Blob | null>((resolve) => {
      if (outPng) canvas.toBlob((b) => resolve(b), 'image/png');
      else canvas.toBlob((b) => resolve(b), 'image/jpeg', JPEG_QUALITY);
    });
    if (!blob) return file;

    const ext = outPng ? '.png' : '.jpg';
    const base = (file.name || 'image').replace(/\.[^.]+$/, '') || 'image';
    const out = new File([blob], `${base}${ext}`, { type: mime, lastModified: Date.now() });

    if (out.size >= file.size * 0.97 && !needResize) return file;
    return out;
  } catch {
    try {
      bitmap.close();
    } catch {
      /* ignore */
    }
    return file;
  }
}
