import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const getMarkdownfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/baqueano/bijagual-waterfall.md",
  );

  return response.data;
});

export const Route = createFileRoute("/baqueano/bijagual-waterfall")({
  head: () => ({
    meta: [
      {
        title: "Bijagual Waterfall",
      },
      {
        name: "description",
        content:
          "It features an article with information on hiking trails at two private nature reserves providing access to the Bijagual Waterfall",
      },
    ],
  }),
  loader: async () => {
    // Kick off loading as early as possible!
    return await getMarkdownfile();
  },
  component: RouteComponent,
});

function RouteComponent() {
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
    </div>
  );
}
