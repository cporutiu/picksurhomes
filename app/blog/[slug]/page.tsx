import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Picksur Homes Blog`,
    description: post.description ?? undefined,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url: `https://quicknotedeals.com/blog/${slug}`,
      type: "article",
    },
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? undefined,
    datePublished: post.publishedDate ?? undefined,
    author: {
      "@type": "Organization",
      name: "Picksur Homes",
    },
    publisher: {
      "@type": "Organization",
      name: "Picksur Homes",
    },
    mainEntityOfPage: `https://quicknotedeals.com/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="min-h-[100dvh] bg-zinc-950 pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-xs text-amber-400 font-medium uppercase tracking-widest mb-4">
              {formatDate(post.publishedDate)}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.1] mb-10">
              {post.title}
            </h1>
            <div
              className="prose-blog text-[15px] text-zinc-300 leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </FadeUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
