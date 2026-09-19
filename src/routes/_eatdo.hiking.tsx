import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { axiosR2storage } from "~/config/axios";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axiosR2storage.get("/prose/hiking-1.md");

  return response.data;
});

export const Route = createFileRoute("/_eatdo/hiking")({
  head: () => ({
    meta: [
      {
        title: "Hiking around Bijagual",
      },
      {
        name: "description",
        content:
          "It includes information on several hiking trails around the Bijagual area",
      },
    ],
  }),
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("hiking"));
    return await getMdfile();
  },
  component: Hiking,
});

function Hiking() {
  const data = Route.useLoaderData();
  return (
    <div>
      <div className="article_wrapper mt-8">
        <div className="prose prose-lg prose-pre:bg-amber-900">
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {data}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
