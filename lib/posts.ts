import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import config from "../keystatic.config";

const reader = createReader(process.cwd(), config);

export async function getAllPosts() {
  const posts = await reader.collections.posts.all();
  return posts
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      publishedDate: entry.publishedDate,
      description: entry.description,
    }))
    .sort((a, b) => (b.publishedDate ?? "").localeCompare(a.publishedDate ?? ""));
}

export async function getPost(slug: string) {
  const post = await reader.collections.posts.read(slug);
  if (!post) return null;

  const { node } = await post.content();
  const renderableTree = Markdoc.transform(node);
  const contentHtml = Markdoc.renderers.html(renderableTree);

  return {
    title: post.title,
    publishedDate: post.publishedDate,
    description: post.description,
    contentHtml,
  };
}
