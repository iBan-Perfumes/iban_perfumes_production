import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/ProductDetail';
import {
  catalogProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/catalog';
import { SITE_NAME } from '@/lib/site';
import {
  getBreadcrumbJsonLd,
  getProductJsonLd,
} from '@/lib/structured-data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const description = product.heroCopy || product.story || product.description;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/products/${product.slug}`,
      siteName: SITE_NAME,
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: product.perfumeImage,
          width: 800,
          height: 800,
          alt: `${product.name} Eau de Parfum`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: [product.perfumeImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', path: '/home' },
    { name: 'Collection', path: '/collection' },
    { name: product.name, path: `/products/${product.slug}` },
  ]);
  const productLd = getProductJsonLd(product.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {productLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      )}
      <main id="main">
        <ProductDetail product={product} related={related} />
      </main>
    </>
  );
}
