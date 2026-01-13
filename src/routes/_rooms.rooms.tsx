import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMix, useGetImageMixOptions } from "~/apiFns/apiFns";
import MenuBarViewRooms from "~/components/MenuBarRooms";
import { ImageCluster } from "../components/ImageCluster";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/rooms-1.md"
  );

  return response.data;
});

export const Route = createFileRoute("/_rooms/rooms")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("rooms"));
    return await getMdfile();
  },
  component: Rooms,
});

function Rooms() {
  const data = Route.useLoaderData();
  // const { data: mix } = useGetImageMix("home");
  // console.log(mix);
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"rooms"} />
        </ClientOnly>
      </Suspense>
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
