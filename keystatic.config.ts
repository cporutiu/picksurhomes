import { config, fields, collection } from "@keystatic/core";

export default config({
  // Local dev keeps using plain files on disk (fast, no GitHub API calls
  // needed while writing). The deployed site uses GitHub storage, which
  // gives /keystatic a real GitHub-login-gated admin UI — only accounts
  // with write access to this repo can read/write content there.
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: { owner: "cporutiu", name: "picksurhomes" },
        },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description:
            "Short summary shown on the blog listing page and used as the meta description.",
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
        }),
      },
    }),
  },
});
