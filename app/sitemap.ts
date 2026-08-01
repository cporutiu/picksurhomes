import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    {
      url: "https://quicknotedeals.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://quicknotedeals.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://quicknotedeals.com/blog/${post.slug}`,
      lastModified: post.publishedDate
        ? new Date(post.publishedDate)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
