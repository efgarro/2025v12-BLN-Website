import axios from "axios";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import Markdown from "react-markdown";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/rooms-sunrise-1.md",
  );
  
  return response.data;
});

export const Route = createFileRoute("/_rooms/sunrise")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("rooms"));
    return await getMdfile();
  },
  component: SunriseRoom,
});

function SunriseRoom() {
  const data = Route.useLoaderData();
  return (
    <div>
      <div className="article_wrapper mt-6">
        <div className="prose prose-lg prose-pre:bg-amber-900">
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {data}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
