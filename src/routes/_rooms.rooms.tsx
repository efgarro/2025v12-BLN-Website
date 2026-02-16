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
import CardGrounds from "~/components/CardGrounds";
import CardHabitat from "~/components/CardHabitat";
import CardEatdo from "~/components/CardEatdo";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/rooms-1.md",
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
        <div className="card bg-base-100 w-auto shadow-sm rounded-none mb-12">
          <figure>
            <img
              src="https://r2storage.bijalapa.com/logos/2024_BIJALAPA_LOGO_750x500.png"
              alt="Logo"
            />
          </figure>
          <div className="card-body bg-bln-azul-arena">
            <p className="prose lg:prose-lg">
              Just to the side of the high grounds at BijaLapa Natural, a
              two-room, rural-style place looks out over an expansive undulating
              mountain range. On a clear, calm and breezy day the deep blue sky
              contrasts with the colors of the mountains, which transition from
              forest green to greyish blue. While sitting on the rustic porch,
              nothing beats peaceful contemplation with cup of coffee in hand.
            </p>
          </div>
        </div>
        <p className="text-center text-4xl bln-rojo">ᴥ</p>
        <p className="text-center text-4xl bln-verde">ᴥ</p>
        <p className="text-center text-4xl bln-amarillo">ᴥ</p>
        <p className="text-center text-4xl mb-14 bln-lila">ᴥ</p>
        <p className="text-center text-lg mb-8 bg-bln-verde-arena p-2">
          Back to
        </p>
        <CardGrounds />
        <CardHabitat />
        <CardEatdo />
      </div>
    </div>
  );
}
