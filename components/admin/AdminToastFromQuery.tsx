'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminToast } from '@/components/admin/AdminToast';

const MESSAGES: Record<string, string> = {
  'product-saved': 'Product saved successfully',
  'product-deleted': 'Product deleted successfully',
  'category-created': 'Category created successfully',
  'category-updated': 'Category updated successfully',
  'category-deleted': 'Category deleted successfully',
  'image-deleted': 'Image deleted successfully',
  'thumbnail-set': 'Thumbnail updated',
};

export function AdminToastFromQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { pushToast } = useAdminToast();

  useEffect(() => {
    const toast = searchParams.get('toast');
    if (!toast) return;
    const message = MESSAGES[toast] ?? toast;
    pushToast(message, toast.includes('error') ? 'error' : 'success');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('toast');
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [searchParams, pathname, router, pushToast]);

  return null;
}
