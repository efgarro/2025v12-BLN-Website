import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const getMarkdownfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/baqueano/baqueano-guide-index.md",
    {
      fetchOptions: {
        cache: "no-cache", // Disables fetch-level cache so React Query can manage it
      },
    },
  );

  return response.data;
});

export const Route = createFileRoute("/baqueano/")({
  head: () => ({
    meta: [
      {
        title: "Baqueano Guide",
      },
      {
        name: "description",
        content:
          "It includes an index menu of the published articles meant to provide the visitor with information on Bijagual and its surrounding areas",
      },
    ],
  }),
  loader: async () => {
    // Kick off loading as early as possible!
    return await getMarkdownfile();
  },
  component: BaqueanoHomepage,
});

function BaqueanoHomepage() {
  const data = Route.useLoaderData();
  return (
    <div>
      <div className="article_wrapper mt-8 mb-12">
        <div className="prose prose-lg prose-pre:bg-amber-900">
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {data}
          </Markdown>
        </div>
      </div>
      <div className="h-24 mb-12"></div>
    </div>
  );
}
