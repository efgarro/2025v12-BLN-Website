import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useGetImageMixOptions } from "~/apiFns/apiFns";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/restaurants-1.md",
    {
      fetchOptions: {
        cache: "no-cache", // Disables fetch-level cache so React Query can manage it
      },
    },
  );

  return response.data;
});

export const Route = createFileRoute("/_eatdo/restaurants")({
  head: () => ({
    meta: [
      {
        title: "Restaurants around Bijagual",
      },
      {
        name: "description",
        content:
          "It includes information on several restaurants around the Bijagual area",
      },
    ],
  }),
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("restaurant"));
    return await getMdfile();
  },
  component: Restaurants,
});

function Restaurants() {
  const data = Route.useLoaderData();
  return (
    <>
      <div className="article_wrapper">
        <div className="prose prose-lg prose-pre:bg-amber-900">
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {data}
          </Markdown>
        </div>
      </div>
    </>
  );
}
