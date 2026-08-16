import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { convertAndUploadWebp } from '@/lib/blob';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const files = formData
    .getAll('images')
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) {
    return NextResponse.json({ error: 'No images provided' }, { status: 400 });
  }

  const urls: string[] = [];
  try {
    for (const file of files) {
      const url = await convertAndUploadWebp(file);
      urls.push(url);
    }
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to upload one or more images',
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ urls });
}
