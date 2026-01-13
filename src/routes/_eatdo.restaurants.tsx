import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { Suspense } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/restaurants-1.md"
  );

  return response.data;
});

export const Route = createFileRoute("/_eatdo/restaurants")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("restaurant"));
    return await getMdfile();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  console.log(data);
  return (
    <>
      <div className="core_wrapper">
        <Suspense fallback="Loading Middleman...">
          <ClientOnly>
            <ImageCluster image_mix_name={"restaurant"} />
          </ClientOnly>
        </Suspense>
        <div className="article_wrapper">
          <div className="prose prose-lg prose-pre:bg-amber-900">
            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
              {data}
            </Markdown>
          </div>
        </div>
      </div>
    </>
  );
}
