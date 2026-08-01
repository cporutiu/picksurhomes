import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Picksur Homes",
  description:
    "Insights on mortgage note investing, brokering, and private lending from Picksur Homes.",
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Nav />
      <main className="min-h-[100dvh] bg-zinc-950 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-16">
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                Insights
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08] mt-2">
                From the blog.
              </h1>
            </div>
          </FadeUp>

          {posts.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, i) => (
                <FadeUp key={post.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full border border-zinc-800/70 rounded-2xl p-6 lg:p-8 bg-zinc-900/30 hover:border-zinc-700 transition-colors duration-200"
                  >
                    <div className="text-xs text-amber-400 font-medium uppercase tracking-widest mb-3">
                      {formatDate(post.publishedDate)}
                    </div>
                    <h2 className="font-display text-xl font-semibold text-zinc-100 tracking-tight group-hover:text-amber-400 transition-colors duration-200">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-[14px] text-zinc-400 leading-relaxed mt-3">
                        {post.description}
                      </p>
                    )}
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
