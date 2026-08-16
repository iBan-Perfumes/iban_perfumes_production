import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/pdp/Breadcrumb';
import { BuyBox } from '@/components/pdp/BuyBox';
import { LifestyleBanner } from '@/components/pdp/LifestyleBanner';
import { ProductFooterCta } from '@/components/pdp/ProductFooterCta';
import { ProductGallery } from '@/components/pdp/ProductGallery';
import { ProductInfoSections } from '@/components/pdp/ProductInfoSections';
import { RelatedProducts } from '@/components/pdp/RelatedProducts';
import {
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/catalog-db';
import { SITE_NAME } from '@/lib/site';
import {
  getBreadcrumbJsonLd,
  getProductJsonLd,
} from '@/lib/structured-data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const description =
    product.shortDescription || product.heroCopy || product.story;
  const imageUrl = product.perfumeImage.startsWith('http')
    ? product.perfumeImage
    : product.perfumeImage;

  return {
    title: `${product.name} Eau de Parfum`,
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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.slug, 4);
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: product.name, path: `/products/${product.slug}` },
  ]);
  const productLd = await getProductJsonLd(product.slug);

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
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Collection', href: '/collection' },
              { label: product.family },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <ProductGallery images={product.gallery} />
            <BuyBox product={product} />
          </div>

          <section
            className="mt-16 max-w-3xl sm:mt-20 lg:max-w-none"
            aria-labelledby="product-info-heading"
          >
            <header className="mb-10 sm:mb-12">
              <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
                DETAILS
              </p>
              <h2
                id="product-info-heading"
                className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
              >
                Product Information
              </h2>
            </header>
            <ProductInfoSections product={product} />
          </section>
        </div>

        <LifestyleBanner
          src={product.lifestyleBanner}
          alt={`${product.name} lifestyle banner`}
        />

        <RelatedProducts products={related} />
        <ProductFooterCta productName={product.name} />
      </main>
    </>
  );
}
