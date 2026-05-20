import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { SectionTitle } from '@/components/SectionTitle';
import { ArrowRight, Calendar } from 'lucide-react';
import blogs from '@/lib/data/blogs.json';

export const metadata = {
  title: 'Travel Guides & Tips | Mahabaleshwar Villa Stays Blog',
  description: 'Discover insider tips, travel guides, and local insights for planning your perfect Mahabaleshwar vacation.',
  keywords: 'Mahabaleshwar travel guide, hill station tips, travel blog, vacation planning, Mahabaleshwar attractions',
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      {/* Header Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Travel Guides & Tips
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover insider tips, travel guides, and local insights for your Mahabaleshwar adventure
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, idx) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all mb-4">
                    <Image
                      src={blog.banner}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-2">{blog.excerpt}</p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
