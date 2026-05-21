import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { VillaCard } from '@/components/VillaCard';
import { Calendar, ArrowLeft } from 'lucide-react';
import blogs from '@/lib/data/blogs.json';
import villas from '@/lib/data/villas.json';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} - Mahabaleshwar Villa Stays Blog`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
      title: `${blog.title} - Mahabaleshwar Villa Stays Blog`,
      description: blog.excerpt,
      publishedTime: blog.date,
      images: [
        {
          url: blog.banner,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} - Mahabaleshwar Villa Stays Blog`,
      description: blog.excerpt,
      images: [blog.banner],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) {
    notFound();
  }

  const relatedVillas = villas.filter((villa) =>
    blog.relatedVillas.includes(villa.id)
  );

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: `https://www.mahabaleshwarvillastays.com${blog.banner}`,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',
      url: 'https://www.mahabaleshwarvillastays.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',
      url: 'https://www.mahabaleshwarvillastays.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mahabaleshwarvillastays.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.mahabaleshwarvillastays.com/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar />

      {/* Banner */}
      <section className="pt-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-elevated mb-8">
            <Image
              src={blog.banner}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </Link>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
              {blog.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
              {blog.content}
            </p>
          </div>

          {relatedVillas.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Featured Villas from This Article
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    id={villa.id}
                    name={villa.name}
                    location={villa.location}
                    rating={villa.rating}
                    capacity={villa.capacity}
                    amenities={villa.amenities}
                    image={villa.images.listing}
                    category={villa.category}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
